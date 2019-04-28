<template>
	<div class="content content-role">
		<DataTableStandard
			ref="dts"
			:config="roleListDataTable" />

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogFormVisible"
			width="20rem"
			title="请填写角色信息">
			<RoleInfoForm
				:role-info="currentInfo"
				@on-success="handleUpdateSuccess"
				@on-cancel="handleUpdateCancel" />
		</el-dialog>

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogFilterVisible"
			width="30rem"
			title="配置数据权限过滤条件">
            <RoleFilterForm
                :role-info="currentInfo"
                @on-success="handleFilterSuccess"
                @on-cancel="handleFilterCancel" />
		</el-dialog>

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisible"
			width="20rem"
			title="导入角色信息">
			<UpLoad
				@on-load-success="handleImportSuccess" />
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const RoleInfoForm = r => require.ensure([], () => r(require(`./roleInfoForm`)), `components/pagesSys/roleManage`);
const RoleFilterForm = r => require.ensure([], () => r(require(`./roleFilterForm`)), `components/pagesSys/roleManage`);
const { DataTableStandard, UpLoad } = RichWayWebComponents;

export default {
    components: {
        RoleInfoForm,
        RoleFilterForm,
        DataTableStandard,
        UpLoad
    },
    data() {
        return {
            dialogFormVisible: false,
            dialogFilterVisible: false,
            currentInfo: {},
            dialogUploadVisible: false,
            roleListDataTable: {
                table: {
                    fieldList: [
                        {
                            key: `roleCode`,
                            label: `角色编码`,
                            width: `130`
                        },
                        {
                            key: `roleName`,
                            label: `角色名称`,
                            width: `130`
                        },
                        {
                            key: `roleDesc`,
                            label: `角色描述`
                        },
                        {
                            key: `roleOrder`,
                            label: `角色排序`,
                            width: `100`
                        },
                        {
                            label: `操作`,
                            width: `470`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `设置过滤条件`,
                                        btnType: `primary`,
                                        icon: `icon-group`,
                                        handleClick: this.handleFilter
                                    },
                                    {
                                        label: `规则设置`,
                                        btnType: `info`,
                                        icon: `icon-setting`,
                                        handleClick: this.handleRule
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
                                        btnType: `danger`,
                                        handleClick: this.handleDelete
                                    }
                                ]
                            }
                        }
                    ],
                    btnList: [
                        {
                            label: `导入角色`,
                            type: `import`,
                            btnType: `info`,
                            handleClick: this.handleImport
                        },
                        {
                            label: `添加`,
                            type: `add`,
                            icon: `icon-add`,
                            btnType: `primary`,
                            handleClick: this.handleAdd
                        }
                    ]
                },
                getDataFun: `GetRoleList`
            }
        };
    },
    mounted() {
        this._log(`role_manage has mounted`);
    },
    methods: {
        // 导入角色
        handleImport() {
            this.dialogUploadVisible = true;
        },
        // 导入角色成功，重新查询
        handleImportSuccess(info) {
            // info.isUser = 1;
            this.$getData.ImportSaveRole(info).then(() => {
                this.$refs.dts.paging.queryFun();
            });
        },
        // 新增或者修改角色信息成功
        handleUpdateSuccess() {
            this.currentUserInfo = {};
            this.dialogFormVisible = false;
            this.$refs.dts.paging.queryFun();
        },
        handleUpdateCancel() {
            this.currentInfo = {};
            this.dialogFormVisible = false;
        },
        handleFilterSuccess() {
            this.currentInfo = {};
            this.dialogFilterVisible = false;
            this.$refs.dts.paging.queryFun();
        },
        handleFilterCancel() {
            this.currentInfo = {};
            this.dialogFilterVisible = false;
        },
        // 新增角色
        handleAdd() {
            this.currentInfo = {};
            this.dialogFormVisible = true;
            this._log(`add: `);
        },
        // 编辑角色
        handleEdit(index, row) {
            this.currentInfo = row;
            this.dialogFormVisible = true;
            this._log(`edit: `, this.currentInfo);
        },
        // 删除角色
        handleDelete(index, row) {
            this._log(`delete: `, row);
            this.$confirm(`确定要删除该角色吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => this.$getData.DeleteRole(row)).then((res = {}) => {
                this._log(res);
                this.$refs.dts.paging.queryFun();
            }).catch((err = {}) => {
                this._log(err);
            });
        },
        // 过滤条件设置
        handleFilter(index, row) {
            this._log(`handleFilter`, index, row);
            this.currentInfo = row;
            this.sttp = [];
            this.adCd = ``;
            this.dialogFilterVisible = true;
        },
        // 规则设置
        handleRule(index, row) {
            this.$notify({
                message: `规则设置-${index}-${JSON.stringify(row)}`,
                type: `success`
            });
        }
    }

};
</script>

<style lang="scss">
    .content-role {
        position: relative;

        .el-cascader {
            width: 100%;
        }

        .el-checkbox {
            margin-right: 30px;
            margin-left: 0;
        }
    }
</style>
