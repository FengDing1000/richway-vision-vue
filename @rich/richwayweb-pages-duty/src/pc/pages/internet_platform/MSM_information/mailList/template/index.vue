<template>
	<div class="content content-mailList">
		<ContentLeftRight>
			<template slot="left">
				<div
					v-loading="loading"
					class="MLLeft">
					<div class="MLLeftTitle">
						<div class="div div1">联系人</div>
						<el-menu
							default-active="1"
							class="el-menu-vertical-demo">
							<el-menu-item index="1">
								<div
									class="div div2"
									@click="allContacts(`1`)">所有联系人（{{ iall }}）</div>
							</el-menu-item>
							<el-menu-item index="2">
								<div
									class="div div3"
									@click="allContacts(`2`)">未分组联系人（{{ inone }}）</div>
							</el-menu-item>
						</el-menu>
						<div class="div div4"> 联系组
							<el-button
								v-model="filterText"
								size="small"
								class="richway-right btn"
								type="primary"
								@click="handleAddTotal()"><i class="icon-plus richway-right" />新增分组
							</el-button>
						</div>
						<el-tree
							ref="tree"
							:data="data"
							:props="defaultProps"
							highlight-current="true"
							node-key="appId"
							expand-on-click-node="false"
							@node-click="handleNodeClick">
							<span
								ref="tree"
								slot-scope="{ node, data }"
								class="custom-tree-node">
								<span>{{ node.label }}</span>
								<span>
									<el-dropdown
										class="catalog"
										trigger="click"
										@command="handleCommand(node,data,$event)">
										<span class="el-dropdown-link">
											<i class="icon-list" />
										</span>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item command="handleAdd">添加子分组</el-dropdown-item>
											<el-dropdown-item command="handleEdit">编辑组</el-dropdown-item>
											<el-dropdown-item command="handleDelete">删除组</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</span>
							</span>
						</el-tree>
					</div>
				</div>
			</template>
			<DataTableStandard
				slot="right"
				ref="user_dt"
				:config="mailList"
				@on-query-change="onQueryChange"
				@on-select-change="onSelectChange" />
		</ContentLeftRight>
		<!-- 全局新增 -->
		<el-dialog
			:visible.sync="dialogFormVisibleTotal"
			:modal-append-to-body="!1"
			:modal="false"
			title="新增分组"
			width="30%">
			<NewAddDialog
				:tree-date-info="treeDateInfo"
				:dataTree="data"
				@handleSuccess="handleSuccess"
				@handleCancel="handleCancel"
				@sendContact="sendContact" />
		</el-dialog>
		<!-- 新增子分组 -->
		<el-dialog
			:visible.sync="dialogFormVisible"
			:modal-append-to-body="!1"
			:modal="false"
			title="新增子分组"
			width="30%">
			<NewAddDialog
				:isAdd="isAdd"
				:tree-date-info="treeDateInfo"
				@handleSuccess="handleSuccess"
				@sendContact="sendContact"
				@handleCancel="handleCancel" />
		</el-dialog>
		<!-- 编辑分组 -->
		<el-dialog
			:visible.sync="dialogFormVisibleModify"
			:modal-append-to-body="!1"
			:modal="false"
			title="修改分组"
			width="30%">
			<NewAddDialog
				:tree-date-info="treeDateInfo"
				:deptNm="deptNm"
				:isEdit="isEdit"
				@handleSuccess="handleSuccess"
				@handleCancel="handleCancel"
				@sendContact="sendContact"
			/>
		</el-dialog>
		<!-- 修改添加联系人 -->
		<el-dialog
			:title="title"
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogFormVisibleAddEdit">
			<AddAContact
				:cascaderInfo="cascaderInfo"
				:userInfo="userInfo"
				:dataList="data"
				:isAddEdit ="isAddEdit"
				@handleSure="handleAddSure"
				@handleCancel="handleAddSure"
				@newTableData="newTableData" />
		</el-dialog>
		<!-- 修改联系人 -->
		<!-- <el-dialog title="修改联系人" :visible.sync="dialogFormVisibleEdit"  :modal-append-to-body="!1" :modal="false">
            <AddAContact
            :userInfo="userInfo"
            @handleSure="handleAddSure"
            @handleCancel="handleAddSure"
            @newTableData ="newTableData"/>
        </el-dialog> -->
		<!-- 导入联系人 -->
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisible"
			width="20rem"
			title="导入联系人">
			<UpLoad
				@on-load-success="handleImportSuccess" />
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from "@rich/richwayweb-utils";
import RichWayWebComponents from "@rich/richwayweb-components";

const NewAddDialog = r => require.ensure([], () => r(require(`./newAddDialog`)), `components/pagesDuty/mSMMailList`);
const AddAContact = r => require.ensure([], () => r(require(`./addAContact`)), `components/pagesDuty/mSMMailList`);
const { DataTableStandard, ContentLeftRight, UpLoad } = RichWayWebComponents;
const { downloadFile } = RichWayWebUtils;
export default {
    components: {
        DataTableStandard,
        ContentLeftRight,
        NewAddDialog,
        AddAContact,
        UpLoad
    },
    data() {
        return {
            mailList: {
                query: {
                    fieldList: [
                        [{
                            key: `keyword`,
                            label: `联系人`,
                            value: ``,
                            type: `input`
                        },
                        {
                            key: `isActive`,
                            label: `移动到组`,
                            value: ``,
                            type: `select`,
                            options: []
                        },
                        {
                            key: `isActive`,
                            label: `复制到组`,
                            value: ``,
                            type: `select`,
                            options: []
                        }
                        ]
                    ]
                },
                table: {
                    fieldList: [{
                        key: `contactsName`,
                        label: `姓名`,
                        width: `130`,
                        fixed: `left`
                    },
                    {
                        key: `mobile`,
                        label: `手机号`,
                        width: `140`,
                        render: {
                            type: `html`,
                            data: (row = {}) => `<i class="richway-icon icon-phone" /><span style="margin-left: 6px;">${row.mobile}</span>`
                        }
                    },
                    {
                        key: `email`,
                        label: `电子邮件`,
                        width: `130`
                    },
                    {
                        key: `position`,
                        label: `职位`,
                        width: `130`
                    },

                    {
                        key: `wechatAccount`,
                        label: `微信关注`,
                        render: {
                            type: `html`,
                            data: (row = {}) => {
                                let html = ``;
                                if (row.wechatAccount === ``) {
                                    html = `<span style="margin-left: 6px;">未关注</span>`;
                                }
                                return html;
                            }
                        }
                    },
                    {
                        key: `groups`,
                        label: `所属分组`,
                        width: `200`,
                        render: {
                            type: `html`,
                            data: (row = {}) => {
                                let html = ``;
                                const arr = row.groups || [];
                                for (const element of arr) {
                                    html += `<span class="el-tag grouping">${element.value}</span>`;
                                }
                                return html;
                            }


                        }
                    },
                    // {
                    //     key: `sort`,
                    //     label: `排序`
                    // },
                    {
                        key: `email`,
                        label: `备注`
                    },

                    {
                        label: `操作`,
                        width: `200`,
                        render: {
                            type: `btn`,
                            list: [{
                                label: `编辑`,
                                icon: `icon-edit`,
                                btnType: `success`,
                                handleClick: this.handleEdit
                            },
                            {
                                label: `删除`,
                                icon: `icon-close`,
                                btnType: `warning`,
                                handleClick: this.handleDelete
                            }
                            ]
                        }
                    }
                    ],
                    btnList: [{
                        label: `新建联系人`,
                        type: `add`,
                        icon: `icon-add`,
                        btnType: `primary`,
                        handleClick: this.handleAdd
                    },
                    {
                        label: `导入联系人`,
                        btnType: `info`,
                        handleClick: this.handleImport
                    },
                    {
                        label: `导出`,
                        btnType: `info`,
                        handleClick: this.handleExport
                    }
                    ]
                },
                getDataFun: `GetContactTable`
            },
            data: [],
            defaultProps: {
                children: `children`,
                label: `deptNm` //
            },
            form: {},
            dialogFormVisible: false,
            dialogFormVisibleTotal: false,
            dialogFormVisibleAddEdit: false,
            // dialogFormVisibleAdd: false,
            // dialogFormVisibleEdit: false,
            dialogFormVisibleModify: false,
            dialogUploadVisible: false,
            iall: ``,
            inone: ``,
            dataArr: [],
            treeDateInfo: {},
            userInfo: {},
            isEdit: true,
            isAdd: true,
            deptNm: ``,
            deptCd: ``,
            selectMove: ``,
            selectCopy: ``,
            tableIdsArr: [],
            loading: true,
            title: `添加联系人`,
            cascaderInfo: [],
            isAddEdit: true

        };
    },
    computed: {},
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler(val) {
                this.data = val;
            }
        }
        // userInfo:{
        //     handler(val) {
        //         this.userInfo = val;
        //         console.log(2525252512121212, this.userInfo)
        //     }
        // }
    },
    mounted() {
        this.GetContactList();
        this.GetCount();
        this._log(`mailList has mounted`);
    },
    methods: {
        // 增加一级分组
        handleAddTotal() {
            this.dialogFormVisibleTotal = true;
        },
        // 添加 编辑 删除
        handleCommand(node, data, command) {
            if (command === `handleAdd`) {
                // 新增加
                this.dialogFormVisible = true;
                this.treeDateInfo = data;
                this.deptNm = ``;
                this.isEdit = false;
                this.isAdd = true;
            }
            if (command === `handleEdit`) {
                // 编辑
                this.dialogFormVisibleModify = true;
                this.treeDateInfo = data;
                this.deptNm = data.deptNm;
                this.isEdit = true;
                this.GetContactList();
            }
            if (command === `handleDelete`) {
                // 删除
                this.$confirm(`此操作将永远删除分组, 是否继续?`, `提示`, {
                    confirmButtonText: `确定`,
                    cancelButtonText: `取消`,
                    type: `warning`
                })
                    .then(() => {
                        this.$getData
                            .DeleteTreelist({
                                deptCd: data.deptCd
                            })
                            .then(() => {
                                this.GetContactList();
                            })
                            .catch(err => {
                                this.$emit(`on-failed`, err);
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: `info`,
                            message: `已取消删除`
                        });
                    });
            }
        },
        // 编辑自分组的弹框的确定
        handleSuccessModify() {
        },
        // 点击增加，编辑的弹框的确定
        handleSuccess() {
            this.dialogFormVisible = false;
            this.dialogFormVisibleTotal = false;
            this.dialogFormVisibleModify = false;
        },
        // 新增之后，确定按钮，发送的数据请求，数据回来从新赋值
        sendContact(data) {
            this.data = data;
            this.GetContactList();
        },
        // 取消弹框
        handleCancel() {
            this.dialogFormVisible = false;
            this.dialogFormVisibleTotal = false;
            this.dialogFormVisibleModify = false;
        },
        // 新建联系人
        handleAdd() {
            this.userInfo = {};
            this.isAddEdit = true;
            // this.dialogFormVisibleAdd = true;
            this.dialogFormVisibleAddEdit = true;
            this.title = `添加联系人`;
        },
        // 编辑联系人
        handleEdit(index, row) {
            this.isAddEdit = false;
            this.userInfo = row;
            this.dialogFormVisibleAddEdit = true;
            this.title = `编辑联系人`;
        },
        // 导入用户
        handleImport() {
            this.dialogUploadVisible = true;
        },
        // 导入用户成功，重新查询
        handleImportSuccess(info) {
            // console.log(2525252525363636,info);
            const data = {
                deptParentNm: ``,
                deptCd: ``,
                files: info.mainfile
            };
            this.$getData.ImportContacts(data).then(() => {
                this.$refs.user_dt.paging.queryFun();
            });
        },
        // 导出联系人
        handleExport() {
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/base/api/contacts/expBaseInfoData/&type=1&deptCd=${this.deptCd || ``}`);
        },
        // 添加编辑联系人，成功之后的回调
        handleAddSure() {
            this.dialogFormVisibleAddEdit = false;
            this.$refs.user_dt.paging.queryFun();
            this.GetCount();
            this.GetContactList();
        },
        // 删除联系人
        handleDelete(index, row) {
            this.$confirm(`此操作将永久删除该联系人, 是否继续?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            })
                .then(() => {
                    this.$getData
                        .DeleteContact({
                            ids: [row.contactsId],
                            deptId: ``
                        })
                        .then(() => {
                            this.GetCount();
                            this.GetContactList();
                            this.$refs.user_dt.paging.queryFun();
                        })
                        .catch(err => {
                            this.$emit(`on-failed`, err);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: `info`,
                        message: `已取消删除`
                    });
                });
        },
        // 递归函数
        Recursion(arr, data) {
            for (const item of data || []) {
                arr.push({
                    value: item.deptNm,
                    label: item.deptNm,
                    deptCd: item.deptCd
                });
                if (item.children && item.children.length > 0) {
                    this.Recursion(arr, item.children);
                }
            }
            return arr;
        },
        // 发送数据请求-左侧联系人列表
        GetContactList() {
            const dataArr = [];
            this.$getData.GetContactList().then(res => {
                this.loading = false;
                this.data = res.data;
                console.log(2323232323, this.data);
                this.Recursion(dataArr, this.data); // 调用递归函数
                this.dataArr = dataArr;
                this.$set(this.mailList.query.fieldList[0], 1, {
                    key: `deptCd`,
                    label: `移动到组`,
                    value: ``,
                    type: `select`,
                    options: dataArr
                });
                this.$set(this.mailList.query.fieldList[0], 2, {
                    key: `deptNm`,
                    label: `复制到组`,
                    value: ``,
                    type: `select`,
                    options: dataArr
                });
                this.$refs.user_dt.paging.queryFun();
            })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 发送数据请求-左侧联系人列表
        GetCount() {
            this.$getData.GetCount().then(res => {
                this.iall = res.data.iall;
                this.inone = res.data.inone;
            })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 点击select的一行 visible-change
        onQueryChange(item) {
            if (item.field.type === `select`) {
                const selectMoveVal = item.queryInfo.deptCd;
                const selectCopyVal = item.queryInfo.deptNm;
                const selectArr = item.field.options;
                const selectLabel = item.field.label;
                let selectMove = ``;
                let selectCopy = ``;
                for (const item of selectArr) {
                    if (selectMoveVal === item.value) {
                        selectMove = item.deptCd;
                    }
                    if (selectCopyVal === item.value) {
                        selectCopy = item.deptCd;
                    }
                }
                this.selectMove = selectMove;
                this.selectCopy = selectCopy;
                // console.log(2525252525, item,selectLabel);
                // console.log(2525252525,this.selectMove );
                // console.log(2525252525,this.selectCopy );
                // 发送移动到组的数据请求
                if (this.tableIdsArr.length === 0) {
                    // console.log(1212121212,'没有联系人');
                    this.$notify.error({
                        title: `警告`,
                        message: `请选择信息`
                    });
                    return;
                }
                if (selectLabel === `移动到组`) {
                    const info = {
                        deptCd: this.selectMove,
                        deptCdOld: ``,
                        ids: this.tableIdsArr
                    };
                    this.$confirm(`是否移动到该组, 是否继续?`, `提示`, {
                        confirmButtonText: `确定`,
                        cancelButtonText: `取消`,
                        type: `warning`
                    }).then(() => {
                        this.$getData.MoveToGrp(info).then(() => {
                            this.GetCount();
                            this.$refs.user_dt.paging.queryFun();
                        }).catch(err => {
                            this.$emit(`on-failed`, err);
                        });
                    }).catch(() => {
                        this.$message({
                            type: `info`,
                            message: `已取消删除`
                        });
                    });
                } else if (selectLabel === `复制到组`) {
                    const info = {
                        deptCd: this.selectCopy,
                        deptCdOld: ``,
                        ids: this.tableIdsArr
                    };
                    this.$confirm(`是否复制到该组, 是否继续?`, `提示`, {
                        confirmButtonText: `确定`,
                        cancelButtonText: `取消`,
                        type: `warning`
                    }).then(() => {
                        this.$getData.CopyToGrp(info).then(() => {
                            this.GetCount();
                            this.$refs.user_dt.paging.queryFun();
                        }).catch(err => {
                            this.$emit(`on-failed`, err);
                        });
                    }).catch(() => {
                        this.$message({
                            type: `info`,
                            message: `已取消删除`
                        });
                    });
                }
            }
        },
        // 点击表格的一行
        onSelectChange(item, obj) {
            const tableIdsArr = [];
            for (const item of obj) {
                tableIdsArr.push(item.contactsId);
            }
            this.tableIdsArr = tableIdsArr;
        },
        // 点击tree
        handleNodeClick(data) {
            console.log(55555532323, data);
            const newDeptArr = [];
            if (data.deptParent === ``) {
                newDeptArr.push(data.deptCd);
            } else {
                newDeptArr.push(data.deptParent);
                newDeptArr.push(data.deptCd);
            }
            this.cascaderInfo = newDeptArr;
            const info = {
                deptId: data.deptCd,
                deptParent: data.deptCd
            };
            this.$refs.user_dt.paging.queryInfo = Object.assign(this.$refs.user_dt.paging.queryInfo, info);
            this.$refs.user_dt.paging.queryFun();
        },
        allContacts(data) {
        //    this.cascaderInfo = [];
            const info = {
                deptId: ``,
                deptParent: ``
            };
            if (data === `1`) {
                info.deptId = `all`;
                info.deptParent = `all`;
            } else {
                info.deptId = `ng`;
                info.deptParent = `ng`;
            }
            this.$refs.user_dt.paging.queryInfo = Object.assign(this.$refs.user_dt.paging.queryInfo, info);
            this.$refs.user_dt.paging.queryFun();
        }
    }
};
</script>

<style lang="scss">
		.content-mailList {
			position: relative;

			.MLLeft {
				padding: 10px;
				border: 1px solid #ebebeb;

				.MLLeftTitle {
					.div {
						height: 45px;
						line-height: 45px;
					}

					.div1 {
						padding-left: .5rem;
                        margin-bottom: 10px;
						// background-color: rgb(16, 131, 238);
						border: 1px solid #ebebeb;
						border-radius: .5rem;
					}
                    .div2 {
                        font-size: 16px;
                    }
                    .div3 {
                        font-size: 16px;
                    }
					.div4 {
                        height: 45px;
                        line-height: 45px;
						margin-top: 10px;
						border-top: 1px solid #ebebeb;
						border-bottom: 1px solid #ebebeb;
                        .btn {
                            margin-top: 5px;
                        }
					}
				}

				.el-tree-node__content {
					position: relative;
					height: 45px;

					.catalog {
						position: absolute;
						top: 15px;
						right: 5px;
						display: none;
					}
				}

				.el-tree-node__content:hover .catalog {
					display: block;
				}
			}

			.MLRight {
				flex-grow: 1;
				margin-left: 20px;
			}

			.grouping {
				margin-right: 5px;
			}
            .el-menu {
                border-right: none;
            }
		}
</style>
