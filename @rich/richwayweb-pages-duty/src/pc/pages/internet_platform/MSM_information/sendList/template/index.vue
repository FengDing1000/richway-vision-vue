<template>
	<div class="content content-sendList">
		<DataTableStandard
			ref="dataTableStandard"
			:config="sendListTable"
			@on-select-change="onSelectChange" />
           <div>
                <el-dialog
                    :close-on-click-modal="!1"
                    :close-on-press-escape="!1"
                    :modal-append-to-body="!1"
                    title="短信发送状态"
                    :visible.sync="dialogTableVisible"
                    style="width:100%;height:100%;">
                    <div style="font-size:16px;">数据列表</div>
                    <el-button type="primary" @click="handleTotalReplacement" style="float:right;margin-bottom:.5rem">补发所有失败短信</el-button>
                    <el-table :data="stateTableInfo" ref="dt_table1" @row-click="handleRowClick1" stripe  border height="30rem">
                        <el-table-column align="center"
                        :width="55 * rem"
						type="selection"
						fixed
						class="el-table-column"/>
                        <el-table-column align="center"  property="revUser" label="接收人" ></el-table-column>
                        <el-table-column align="center"   property="telNum" label="电话号码"></el-table-column>
                        <el-table-column align="center"  label="发送状态">
                            <template slot-scope="scope">
                                <el-tag
                                :type="scope.row.hasSend === `发送成功` ?'success'  :scope.row.hasSend === `正在发送`?``:`danger` "
                                disable-transitions>{{scope.row.hasSend}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column  align="center"  property="failedReason" label="失败原因"></el-table-column>
                        <el-table-column  align="center"  property="sendDate" label="成功发送时间"></el-table-column>
                        <el-table-column  align="center"  label="补发">
                             <template slot-scope="scope">
                                <el-button @click="handleReplacement(scope.row)" type="primary" size="small">补发</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                    style="margin-top:0.5rem"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogTableVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
           </div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { DataTableStandard } = RichWayWebComponents;

export default {
    components: {
        DataTableStandard
    },
    data() {
        return {
            sendListTable: {
                query: {
                    fieldList: [
                        [
                            {
                                key: `sendUser`,
                                label: `发&ensp;送&ensp;人`,
                                value: ``,
                                type: `input`
                            },
                            {
                                key: `title`,
                                label: `短信主题`,
                                value: ``,
                                type: `input`
                            }

                        ]
                    ]
                },
                table: {
                     btnList: [
                        {
                            label: `新增`,
                            type: `add`,
                            icon: `icon-add`,
                            btnType: `primary`,
                            handleClick: this.handleAdd
                        }],
                    fieldList: [
                        {
                            key: `state`,
                            label: `状态`,
                            width: `80`,
                            render: {
                                type: `html`,
                                data: (row = {}) => {
                                    const html = `<span class="el-tag grouping">${row.success ||0}/${row.count}</span>`;
                                    return html;
                                },
                                handleClick: this.handleState
                            }
                        },
                        {
                            key: `msg`,
                            label: `短信内容`

                        },
                        {
                            key: `wecatId`,
                            label: `发送人`,
                            width: `80`,
                            render: {
                                type: `html`,
                                data: (row = {}) => {
                                    let html = ``;
                                    if (row.sendUser === `admin`) {
                                        html = `超级管理员`;
                                    } else if (row.sendUser === `系统自动`) {
                                        html = `系统自动`;
                                    }
                                    return html;
                                }
                            }
                        },
                        {
                            key: `sdate`,
                            label: `发送时间`,
                            width: `160`
                        },
                        {
                            key: `realViceLeadNames`,
                            label: `消息类型`,
                            width: `160`,
                            render: {
                                type: `html`,
                                data: (row = {}) => {
                                    let html = ``;
                                    if (row.sendType === `0`) {
                                        html = `人工发送短信`;
                                    } else if (row.sendType === `2`) {
                                        html = `人工发送邮件`;
                                    }
                                    return html;
                                }
                            }
                        },

                        {
                            key: `recordCnt`,
                            label: `补发`,
                            width: `110`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `补发`,
                                        btnType: `primary`,
                                        handleClick: this.handleReissue
                                    }
                                ]
                            }
                        },
                        {
                            key: `isActive`,
                            label: `操作`,
                            width: `110`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `删除`,
                                        icon: `icon-about`,
                                        btnType: `warning`,
                                        handleClick: this.handleDetails
                                    }
                                ]
                            }
                        }
                    ]
                },
                getDataFun: `GetSendList` // GetDutyList
            },
            id: ``,
            dialogTableVisible: false,
            stateTableInfo: [],
            currentPage:`1`,
            total:``,
            stateId: ``,
            page: 1,
            rows: 10
        };
    },
    computed: {},
    mounted() {
        this._log(`sendList has mounted`);
    },
    methods: {
        onSelectChange(item) {
            this.id = item.id;
        },
        // 点击补发
        handleReissue() {
            this.$confirm(`确定重新补发吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                this.$getData.Reissue({ id: this.id }).then(() => {
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            });
        },
        handleDetails() {
            this.$confirm(`您确定要删除吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                this.$getData.DeleteSMSList({ msgId: this.id }).then(() => {
                    this.$refs.dataTableStandard.paging.queryFun();
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            });
        },
        // 点击状态
        handleState(index, row) {
            this.dialogTableVisible = true;
            this.stateId = row.id;
            this.SendListStateTableInfo();
        },
        // 点击状态数据请求
        SendListStateTableInfo() {
            const info = {
                id:this.stateId,
                page: this.page,
                rows: this.rows,
            }
            this.$getData.SendListStateTableInfo(info).then((res) => {
                this.stateTableInfo = res.data;
                for(let item of this.stateTableInfo || []) {
                    if(item.hasSend ===1000 || item.hasSend ===0) {
                            item.hasSend = `正在发送`
                    } else if(item.hasSend ===1) {
                            item.hasSend = `发送成功`
                    }else {
                            item.hasSend = `发送失败`
                    }

                }
                this.total = res.total;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 每页的条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.rows = val;
            // this.page = this.page;
            this.SendListStateTableInfo();
        },
        // 当前页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            // this.rows = this.rows;
            this.SendListStateTableInfo();
        },
        // 点击表格里面的补发所有失败短信
        handleTotalReplacement() {
            this.$getData.Reissue({id:this.stateId}).then(() => {
                this.SendListStateTableInfo();
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });

        },
        // 点击表格列表补发
        handleReplacement(info) {
            this.$getData.SendListStateReplacement({id:info.id}).then(() => {
               this.SendListStateTableInfo();
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击新增
        handleAdd() {
            this.$router.push({path:'/internet_platform/MSM_information/editShortMessage'});
        },
        // 点击一行，复选框选中
        handleRowClick1(row) {
            this.$refs.dt_table1.toggleRowSelection(row);

            this.$emit(`on-select-change`, row, this.paging.selectedList);
        },
    }

};
</script>

<style lang="scss" >
		.content-sendList {
            position: relative;
           // 序列号
            .el-table__fixed-body-wrapper {
                counter-reset: section 0;
                .el-table-column--selection {
                    .el-checkbox {
                        position: relative;
                        &:after {
                            content: counter(section);
                            counter-increment: section;
                            color: #fff;
                            position: absolute;
                            width: .75rem;
                            height: .75rem;
                            background: #108ee9;
                            font-size: .5rem;
                            right: -.75rem;
                            top: 0;
                            line-height: .75rem;
                            text-align: center;
                            z-index: 999;
                            -webkit-border-radius: 3px;
                            -moz-border-radius: 3px;
                            border-radius: 3px;
                        }
                    }
                }
            }

        }

</style>
