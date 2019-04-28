<template>
	<div class="content content-user">
		<DataTableStandard
			ref="dts"
			:config="userListDataTable"
			@on-query-change="handleQueryChange" />
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogFormVisible"
			title="请填写账号信息">
			<UserInfoForm
				:user-info="currentInfo"
				@on-success="handleUpdateSuccess"
				@on-cancel="handleUpdateCancel" />
		</el-dialog>

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisible"
			width="20rem"
			title="导入用户信息">
			<UpLoad
				@on-load-success="handleImportSuccess" />
		</el-dialog>

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogDeptVisible"
			width="35rem"
			title="设置分组">
			<DataTableChoice
				:config="deptListDataTable"
				:detail-info="currentInfo"
				@on-close="handleChooseDeptClose"
				@on-choose="handleChooseDept" />
		</el-dialog>

        <el-dialog
            :close-on-click-modal="!1"
            :close-on-press-escape="!1"
            :modal-append-to-body="!1"
            :visible.sync="dialogRoleVisible"
            width="35rem"
            title="选择角色">
            <TransferBasePanel
                :config="roleTransferData"
                :detail-info="currentInfo"
                @on-close="handleChooseRoleClose"
                @on-choose="handleChooseRole" />
        </el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';
import { _filterIsActive, _filterUserStatus } from '@rich/richwayweb-utils/lib/filter/filterUser';
import RichWayWebUtils from '@rich/richwayweb-utils';
import UserInfoForm from './userInfoForm';
import User from './user';

const { DataTableStandard, UpLoad, DataTableChoice, TransferBasePanel } = RichWayWebComponents;
const { downloadFile } = RichWayWebUtils;

export default {
    components: {
        UserInfoForm,
        DataTableStandard,
        UpLoad,
        DataTableChoice,
        TransferBasePanel
    },
    filters: {
        _filterIsActive, _filterUserStatus
    },
    data() {
        return {
            // 显示与隐藏编辑用户信息的弹窗
            dialogFormVisible: false,
            // 显示与隐藏上传文件的弹窗
            dialogUploadVisible: false,
            // 显示与隐藏用户分组的弹窗
            dialogDeptVisible: false,
            deptListDataTable: {
                type: `choice`,
                table: {
                    fieldList: [
                        {
                            key: `deptNm`,
                            label: `分组名称`
                        }
                    ]
                },
                getDataFun: `GetDeptsForUser`,
                getDataFunHasChoose: `GetUserDepts`
            },
            // 显示与隐藏用户角色授权的弹窗
            dialogRoleVisible: false,
            roleTransferData: {
                type: `transfer`,
                search: {
                    fieldList: [
                        {
                            key: `keywords`,
                            label: `关键字`,
                            value: ``
                        }
                    ]
                },
                getLeftDataFun: `GetRolesForUser`,
                getRightDataFun: `GetUserRoles`,
                defaultProps: {
                    key: `roleCode`,
                    label: `roleName`
                },
                titles: [`待选角色列表`, `已选角色列表`],
                filterPlaceholder: `请输入角色名称`
            },
            currentInfo: {},
            userListDataTable: {
                query: {
                    fieldList: [
                        [
                            {
                                key: `keyword`,
                                label: `关&ensp;键&ensp;字`,
                                value: ``,
                                type: `input`
                            },
                            {
                                key: `phone`,
                                label: `手&ensp;机&ensp;号`,
                                value: ``,
                                type: `input`
                            }
                        ]
                    ]
                },
                table: {
                    fieldList: [
                        {
                            key: `userAccount`,
                            label: `用户名`,
                            width: `130`,
                            fixed: `left`
                        },
                        {
                            key: `userName`,
                            label: `姓名`,
                            width: `130`,
                            fixed: `left`
                        },
                        {
                            key: `wecatId`,
                            label: `微信号`,
                            width: `130`
                        },
                        {
                            key: `mobileNo`,
                            label: `手机`,
                            width: `140`,
                            render: {
                                type: `html`,
                                data: (row = {}) => `<i class="richway-icon icon-phone" /><span style="margin-left: 6px;">${row.mobileNo}</span>`
                            }
                        },
                        {
                            key: `adnm`,
                            label: `行政区`
                        },
                        {
                            key: `email`,
                            label: `邮箱地址`,
                            sortable: true
                        },
                        {
                            key: `userStatus`,
                            label: `是否锁定`,
                            width: `80`,
                            render: {
                                type: `tag`,
                                data: (row = {}) => ({
                                    type: row.userStatus === 1 ? `info` : `warning`,
                                    text: _filterUserStatus(row.userStatus)
                                })
                            }
                        },
                        {
                            key: `isActive`,
                            label: `激活`,
                            width: `90`,
                            render: {
                                type: `tag`,
                                data: (row = {}) => ({
                                    type: row.isActive === 1 ? `info` : `warning`,
                                    text: _filterIsActive(row.isActive)
                                })
                            }
                        },
                        {
                            label: `工具`,
                            width: `60`,
                            render: {
                                type: `popover_btn`,
                                list: [
                                    {
                                        label: `账户激活`,
                                        btnType: `info`,
                                        handleClick: this.handleActive
                                    },
                                    {
                                        label: `账户锁定`,
                                        btnType: `info`,
                                        handleClick: this.handleLock
                                    },
                                    {
                                        label: `账户解锁`,
                                        btnType: `info`,
                                        handleClick: this.handleUnlock
                                    },
                                    {
                                        label: `重置密码`,
                                        btnType: `info`,
                                        handleClick: this.handleResetPassWord
                                    }
                                ]
                            }
                        },
                        {
                            label: `操作`,
                            width: `380`,
                            fixed: `right`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `授权`,
                                        btnType: `primary`,
                                        icon: `icon-tool`,
                                        handleClick: this.handleAuthor
                                    },
                                    {
                                        label: `分组`,
                                        btnType: `info`,
                                        icon: `icon-tool`,
                                        handleClick: this.handleGroup
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
                            label: `导入用户`,
                            btnType: `info`,
                            handleClick: this.handleImport
                        },
                        {
                            label: `导出用户`,
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
                getDataFun: `GetUserAll`
            }
        };
    },
    mounted() {
        this._log(`user_manage has mounted`);
    },
    methods: {
        handleQueryChange() {
            // this.queryInfo = info.queryInfo;
        },
        // 导入用户
        handleImport() {
            this.dialogUploadVisible = true;
        },
        // 导入用户成功，重新查询
        handleImportSuccess(info) {
            info.isUser = 1;
            this.$getData.ImportSaveUser(info).then(() => {
                this.$refs.dts.paging.queryFun();
            });
        },
        // 导出用户
        handleExport() {
            const { queryInfo } = this.$refs.dts.paging;
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/base/api/sysmana/userinfo/exportData&key=${queryInfo.keyword || ``}&phone=${queryInfo.phone || ``}`);
        },
        // 新增或者修改用户信息成功
        handleUpdateSuccess() {
            this.currentInfo = {};
            this.dialogFormVisible = false;
            this.$refs.dts.paging.queryFun();
        },
        // 新增或者修改用户信息取消
        handleUpdateCancel() {
            this.currentInfo = {};
            this.dialogFormVisible = false;
        },
        // 新增
        handleAdd() {
            this.currentInfo = {};
            this.dialogFormVisible = true;
            this._log(`add: `);
        },
        // 编辑
        handleEdit(index, row) {
            this.currentInfo = row;
            this.dialogFormVisible = true;
            this._log(`edit row:`, this.currentInfo);
        },
        // 删除
        handleDelete(index, row) {
            this._log(`delete row:`, row);
            this.$confirm(`确定要删除该账号吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                const info = {
                    userAccount: row.userAccount
                };
                return this.$getData.DeleteUser(info);
            }).then((res = {}) => {
                this._log(res);
                this.$refs.dts.paging.queryFun();
            }).catch((err = {}) => {
                this._log(err);
            });
        },
        // 授权
        handleAuthor(index, row) {
            this._log(`handleAuthor`, index, row);
            this.currentInfo = row;
            this.dialogRoleVisible = true;
        },
        // 分组
        handleGroup(index, row) {
            this._log(`handleGroup`, index, row);
            this.currentInfo = row;
            this.dialogDeptVisible = true;
        },
        // 账户激活
        handleActive(index, row) {
            this.updateUser(row, `SetUserActive`);
        },
        // 账户锁定
        handleLock(index, row) {
            this.updateUser(row, `SetUserLock`);
        },
        // 账户解锁
        handleUnlock(index, row) {
            this.updateUser(row, `SetUserUnLock`);
        },
        // 重置密码
        handleResetPassWord(index, row) {
            this.updateUser(row, `ResetPassword`);
        },
        updateUser(user, handle) {
            const info = {
                userAccount: (new User(user)).userAccount
            };
            this.$getData[handle](info).then(() => {
                this.$refs.dts.paging.queryFun();
            });
        },
        // 选择了分组
        handleChooseDept(rows) {
            const deptCodes = [];
            for (const item of rows) {
                deptCodes.push(item.deptCd);
            }
            this._log(`handleChooseDept`, rows);
            this.$getData.SetUserDepts({
                userAccount: this.currentInfo.userAccount,
                deptId: deptCodes.join(`,`)
            }).then(() => {
                this.currentInfo = {};
                this.handleChooseDeptClose();
                this.$refs.dts.paging.queryFun();
            });
        },
        // 关闭了分组弹窗
        handleChooseDeptClose() {
            this.dialogDeptVisible = false;
        },
        // 选择了角色
        handleChooseRole(codes) {
            this.handleChooseDeptClose();
            this._log(`handleChooseRole`, codes);
            this.$getData.SetUserRoles({
                userAccount: this.currentInfo.userAccount,
                roleCodes: codes.join(`,`)
            }).then(() => {
                this.currentInfo = {};
                this.handleChooseRoleClose();
                this.$refs.dts.paging.queryFun();
            });
        },
        // 关闭了角色弹窗
        handleChooseRoleClose() {
            this.dialogRoleVisible = false;
        }
    }

};
</script>

<style lang="scss" scoped>

</style>
