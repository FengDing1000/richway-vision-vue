<template>
	<div class="content content-user">
		<ContentLeftRight>
			<div slot="left">
				<p>eeeeeeeeeeee</p>
			</div>
			<DataTableStandard
				slot="right"
				:config="userListDataTable" />
		</ContentLeftRight>

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogFormVisible"
			title="请填写账号信息">
			<UserInfoForm
				:user-info="currentUserInfo"
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
				type="user"
				@on-success="handleImportSuccess" />
		</el-dialog>

		<transition
			mode="out-in"
			enter-active-class="slideInRight animated"
			leave-active-class="slideOutRight animated">
			<router-view />
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '$src/pc/components';
import { _filterIsActive, _filterUserStatus } from '@rich/richwayweb-utils/lib/filter/filterUser';
import ContentLeftRight from '../../../../../components/layout/contentLeftRight';

const { DataTableStandard, UpLoad, UserInfoForm } = RichWayWebComponents;

export default {
    components: {
        UserInfoForm,
        DataTableStandard,
        UpLoad,
        ContentLeftRight
    },
    filters: {
        _filterIsActive, _filterUserStatus
    },
    data() {
        return {
            dialogFormVisible: false,
            dialogUploadVisible: false,
            currentUserInfo: {},
            userListDataTable: {
                query: {
                    fieldList: [
                        [
                            {
                                key: `keyword`,
                                label: `关&ensp;键&ensp;字`,
                                value: ``,
                                type: `input`
                            }
                        ],
                        [
                            {
                                key: `userAccount`,
                                label: `用&ensp;户&ensp;名`,
                                value: ``,
                                type: `input`
                            },
                            {
                                key: `adCd`,
                                label: `行政区划`,
                                value: ``,
                                type: `segion`
                            },
                            {
                                key: `isActive`,
                                label: `激活状态`,
                                value: ``,
                                type: `select`,
                                options: [
                                    {
                                        label: `全部`,
                                        value: ``
                                    },
                                    {
                                        label: `已激活`,
                                        value: `1`
                                    },
                                    {
                                        label: `未激活`,
                                        value: `2`
                                    }
                                ]
                            }, {
                                key: `sex`,
                                label: `性&emsp;&emsp;别`,
                                value: ``,
                                type: `radio`,
                                options: [
                                    {
                                        label: `男`,
                                        value: `M`
                                    },
                                    {
                                        label: `女`,
                                        value: `F`
                                    }
                                ]
                            }
                        ],
                        [
                            {
                                key: `adnmList`,
                                label: `行&ensp;政&ensp;区`,
                                value: [],
                                type: `checkbox`,
                                options: [
                                    {
                                        label: `北京`,
                                        value: `1`
                                    },
                                    {
                                        label: `上海`,
                                        value: `2`
                                    }
                                ]
                            },
                            {
                                key: `createDate`,
                                label: `创建时间`,
                                value: `2018-09-20`,
                                type: `date`
                            },
                            {
                                key: `dateRange`,
                                label: `时间范围`,
                                value: [`2018-09-20 12:00:08`, `2018-09-22 12:00:08`],
                                type: `date`,
                                pickerType: `datetimerange`,
                                format: `yyyy-MM-dd HH:mm:SS`,
                                valueFormat: `yyyy-MM-dd HH:mm:SS`,
                                fieldKeys: [`stm`, `etm`]
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
        // 导入用户
        handleImport() {
            this.dialogUploadVisible = true;
        },
        // 导入用户成功，重新查询
        handleImportSuccess() {
            this._log(666);
        },
        // 导出用户
        handleExport() {
            this.$message({
                showClose: true,
                message: `导出用户`,
                type: `success`
            });
        },
        // 新增或者修改用户信息成功
        handleUpdateSuccess() {
            this.currentUserInfo = {};
            this.dialogFormVisible = false;
        },
        handleUpdateCancel() {
            this.currentUserInfo = {};
            this.dialogFormVisible = false;
        },
        // 新增
        handleAdd() {
            this.currentUserInfo = {};
            this.dialogFormVisible = true;
            this._log(`add: `);
        },
        // 编辑
        handleEdit(index, row) {
            this.currentUserInfo = row;
            this.dialogFormVisible = true;
            this._log(`edit row:`, this.currentUserInfo);
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
                this.$refs.user_dt.paging.queryFun();
            }).catch((err = {}) => {
                this._log(err);
            });
        },
        // 授权
        handleAuthor(index, row) {
            this._log(`handleAuthor`, index, row);
            this.$notify({
                title: `授权通知`,
                message: `${JSON.stringify(row)}`
            });

            this.$router.push(`/internet_platform/platform_manage/user_manage/editor`);
        },
        // 分组
        handleGroup(index, row) {
            this._log(`handleGroup`, index, row);
            // this.$notify({
            //     title: `分组通知`,
            //     message: `${JSON.stringify(row)}`
            // });
            this.dialogDeptVisible = true;
        },
        // 账户激活
        handleActive(index, row) {
            const info = {
                userAccount: row.userAccount
            };
            this.$getData.SetUserActive(info);
        },
        // 账户锁定
        handleLock(index, row) {
            const info = {
                userAccount: row.userAccount
            };
            this.$getData.SetUserLock(info);
        },
        // 账户解锁
        handleUnlock(index, row) {
            const info = {
                userAccount: row.userAccount
            };
            this.$getData.SetUserUnLock(info);
        },
        // 重置密码
        handleResetPassWord(index, row) {
            const info = {
                userAccount: row.userAccount
            };
            this.$getData.ResetPassword(info);
        },
        // 设置分组
        handleChooseDept(rows) {
            this._log(`handleChooseDept`, rows);
        }
    }

};
</script>

<style lang="scss">
    .content-user{
        position: relative;
    }

</style>
