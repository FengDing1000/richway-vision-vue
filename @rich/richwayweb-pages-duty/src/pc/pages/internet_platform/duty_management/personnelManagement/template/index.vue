<template>
	<div class="content content-epress">
		<DataTableStandard
			ref="user_dt"
			:config="dutyBulletinList" />
		<!-- 添加编辑信息 -->
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:title="title"
			:visible.sync="dialogFormVisibleAddEdit">
			<AddEditForm
				:user-info-current="userInfoCurrent"
				@on-success="handleOnSuccess"
				@on-cancel="handleOnCancel" />
		</el-dialog>
		<!-- 详情 -->
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogTableVisibleDetails"
			title="值班详情">
			<DetailsTable
				:user-details-info="userDetailsInfo"
				@on-close="handleCloseWindow" />
		</el-dialog>

	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';
// const moment = require('moment');

const AddEditForm = r => require.ensure([], () => r(require(`./addEditForm`)), `components/pagesDuty/personnelManagement`);
const DetailsTable = r => require.ensure([], () => r(require(`./detailsTable`)), `components/pagesDuty/personnelManagement`);
const { DataTableStandard } = RichWayWebComponents;

export default {
    components: {
        DataTableStandard,
        AddEditForm,
        DetailsTable
    },
    data() {
        return {
            dutyBulletinList: {
                query: {
                    fieldList: [
                        [
                            {
                                key: `keyword`,
                                label: `关键字`,
                                value: ``,
                                type: `input`
                            },
                            {
                                key: `dutyRole`,
                                label: `值班角色`,
                                value: ``,
                                type: `select`,
                                options: [{
                                    value: ``,
                                    label: `请选择`
                                }, {
                                    value: `1`,
                                    label: `正带班领导`
                                }, {
                                    value: `2`,
                                    label: `值班人员`
                                }, {
                                    value: `3`,
                                    label: `值班司机`
                                }, {
                                    value: `4`,
                                    label: `副带班领导`
                                }]
                            },
                            {
                                key: `sex`,
                                label: `性别`,
                                value: ``,
                                type: `select`,
                                options: [{
                                    value: ``,
                                    label: `请选择`
                                }, {
                                    value: `1`,
                                    label: `男`
                                }, {
                                    value: `0`,
                                    label: `女`
                                }]
                            }

                        ]
                    ]
                },
                table: {
                    btnList: [
                        {
                            label: `添加`,
                            type: `add`,
                            icon: `icon-add`,
                            btnType: `primary`,
                            handleClick: this.handleAdd
                        }
                    ],
                    fieldList: [
                        {
                            key: `personName`,
                            label: `人员名称`,
                            sortable: true,
                            fixed: `left`
                        },
                        {
                            key: `dutyRole`,
                            label: `值班角色`,
                            fixed: `left`,
                            render: {
                                type: `html`,
                                data: (row = {}) => {
                                    let html = ``;
                                    switch (row.dutyRole) {
                                    case `1`:
                                        html = `正带班领导`;
                                        break;
                                    case `2`:
                                        html = `值班人员`;
                                        break;
                                    case `3`:
                                        html = `值班司机`;
                                        break;
                                    case `4`:
                                        html = `副带班领导`;
                                        break;
                                    default:
                                        html = ``;
                                    }
                                    return html;
                                }
                            }
                        },
                        {
                            key: `mobile`,
                            label: `手机号码`
                        },
                        {
                            key: `sex`,
                            label: `性别`,
                            render: {
                                type: `html`,
                                data: (row = {}) => {
                                    let html = ``;
                                    switch (row.sex) {
                                    case `1`:
                                        html = `男`;
                                        break;
                                    case `0`:
                                        html = `女`;
                                        break;
                                    default:
                                        html = ``;
                                    }
                                    return html;
                                }
                            }
                        },
                        {
                            label: `操作`,
                            fixed: `right`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `详情`,
                                        icon: `icon-about`,
                                        btnType: `primary`,
                                        handleClick: this.handleDetails
                                    },
                                    {
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

                    ]
                },
                getDataFun: `GetDutyBulletinList` // GetDutyList
            },
            userDetailsInfo: {},
            userInfoCurrent: {},
            dialogFormVisibleAddEdit: false,
            dialogTableVisibleDetails: false,
            title: `添加信息`
        };
    },
    computed: {},
    mounted() {
        this._log(`epress has mounted`);
    },
    methods: {
        // 点击添加
        handleAdd() {
            this.userInfoCurrent = {};
            this.dialogFormVisibleAddEdit = true;
            this.title = `添加信息`;
        },
        // 点击编辑
        handleEdit(index, row) {
            this.userInfoCurrent = row;
            this.dialogFormVisibleAddEdit = true;
            this.title = `编辑信息`;
        },
        // 点击详情
        handleDetails(index, row) {
            this.dialogTableVisibleDetails = true;
            let sex = ``;
            let dutyRole = ``;
            switch (row.sex) {
            case `1`:
                sex = `男`;
                break;
            case `0`:
                sex = `女`;
                break;
            default:
                sex = ``;
            }
            switch (row.dutyRole) {
            case `1`:
                dutyRole = `正带班领导`;
                break;
            case `2`:
                dutyRole = `值班人员`;
                break;
            case `3`:
                dutyRole = `值班司机`;
                break;
            case `4`:
                dutyRole = `副带班领导`;
                break;
            default:
                dutyRole = ``;
            }
            this.userDetailsInfo = row;
            this.userDetailsInfo.sexFmt = sex;
            this.userDetailsInfo.dutyRoleFmt = dutyRole;
        },
        // 点击删除
        handleDelete(index, row) {
            this.$confirm(`确定要删除人员管理信息吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                const info = {
                    personId: row.personId
                };
                return this.$getData.ExpressDeleteInfo(info).then(() => {
                    this.$refs.user_dt.paging.queryFun();
                });
            }).catch((err = {}) => {
                this._log(err);
            });
        },
        // 弹框-添加、编辑的确定按钮
        handleOnSuccess(data) {
            if (data) {
                this.$refs.user_dt.paging.queryFun();
            }
            this.dialogFormVisibleAddEdit = false;
        },
        // 弹框-添加、编辑的取消按钮
        handleOnCancel() {
            this.dialogFormVisibleAddEdit = false;
        },
        // 弹框-关闭详情按钮
        handleCloseWindow() {
            this.dialogTableVisibleDetails = false;
        }
    }

};
</script>

<style lang="scss" scoped>
		.content-epress {
			position: relative;
		}
</style>
