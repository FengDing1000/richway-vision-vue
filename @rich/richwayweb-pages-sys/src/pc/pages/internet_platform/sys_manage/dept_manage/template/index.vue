<template>
	<div class="content content-dept-manage">
		<DataTableStandard
			ref="dts"
			:config="deptListDataTable" />

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogFormVisible"
			title="请填写分组信息">
			<DeptInfoForm
				:dept-info="currentInfo"
				@on-success="handleUpdateSuccess"
				@on-cancel="handleUpdateCancel" />
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';
import orgScalType from './orgScalType';
import menbType from './menbType';

const DeptInfoForm = r => require.ensure([], () => r(require(`./deptInfoForm`)), `components/pagesSys/deptManage`);
const { DataTableStandard } = RichWayWebComponents;

export default {
    components: {
        DeptInfoForm,
        DataTableStandard
    },
    data() {
        return {
            dialogFormVisible: false,
            currentInfo: {},
            deptListDataTable: {
                table: {
                    fieldList: [
                        {
                            key: `deptCd`,
                            label: `分组编码`,
                            width: `130`,
                            fixed: `left`
                        },
                        {
                            key: `deptNm`,
                            label: `分组名称`,
                            width: `130`,
                            fixed: `left`,
                            sortable: true
                        },
                        {
                            key: `pnm`,
                            label: `父分组`,
                            width: `130`
                        },
                        {
                            key: `orgShnm`,
                            label: `机构`
                        },
                        {
                            key: `lrNm`,
                            label: `法人代表`
                        },
                        {
                            key: `orgScal`,
                            label: `机构规格`,
                            render: {
                                type: `html`,
                                data: (row = {}) => orgScalType.fiterOrgScalType(row.orgScal)
                            }
                        },
                        {
                            key: `menb`,
                            label: `隶属关系`,
                            render: {
                                type: `html`,
                                data: (row = {}) => menbType.fiterMenbType(row.menb)
                            }
                        },

                        {
                            label: `操作`,
                            width: `210`,
                            fixed: `right`,
                            render: {
                                type: `btn`,
                                list: [
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
                            label: `导出分组`,
                            btnType: `info`,
                            handleClick: this.handleExport
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
                getDataFun: `GetDeptList`
            }
        };
    },
    computed: {},
    mounted() {
        this._log(`dept_manage has mounted`);
    },
    methods: {
        // 导出分组
        handleExport() {
            this.$message({
                showClose: true,
                message: `导出分组`,
                type: `success`
            });
        },
        // 新增或者修改分组信息成功
        handleUpdateSuccess() {
            this.currentInfo = {};
            this.dialogFormVisible = false;
            this.$refs.dts.paging.queryFun();
        },
        handleUpdateCancel() {
            this.currentInfo = {};
            this.dialogFormVisible = false;
        },
        // 新增分组
        handleAdd() {
            this.currentInfo = {};
            this.dialogFormVisible = true;
            this._log(`add: `);
        },
        // 编辑分组
        handleEdit(index, row) {
            this.currentInfo = row;
            this.dialogFormVisible = true;
            this._log(`edit row:`, this.currentInfo);
        },
        // 删除分组
        handleDelete(index, row) {
            this._log(`delete row:`, row);
            this.$confirm(`确定要删除该分组吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                const info = {
                    deptCd: row.deptCd
                };
                return this.$getData.DeleteDept(info);
            }).then((res = {}) => {
                this._log(res);
                this.$refs.dts.paging.queryFun();
            }).catch((err = {}) => {
                this._log(err);
            });
        }
    }

};
</script>

<style lang="scss" scoped>
    .content-dept-manage {
        position: relative;
    }
</style>
