<template>
	<div class="content content-duty-arrangement">
		<DataTableStandard
			ref="user_dt"
			:config="userListDataTable"
			@on-query-change="handleQueryChange" />
		<el-dialog
			:visible.sync="dialogTableVisibleDuty"
			:modal="false"
			title="值班记录">
			<el-table
				v-loading="loadingRecord"
				:data="queryDutyRecordDetails">
				<el-table-column
					property="recordTime"
					label="记录时间"
					width="200" />
				<el-table-column
					property="content"
					label="记录内容" />
				<el-table-column
					property="crtBy"
					label="人员"
					width="200" />
			</el-table>
			<el-button
				class="elButton"
				type="primary"
				@click="closeDutyRecord">关闭
			</el-button>
		</el-dialog>

		<!-- 添加编辑 -->
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:title="title"
			:visible.sync="dialogFormVisibleAddEdit">
			<DutyInfoForm
				:duty-info="currentDutyInfo"
				@on-success="handleUpdateSuccess"
				@on-cancel="handleUpdateCancel" />
		</el-dialog>

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogTableVisibleDetails"
			title="值班详情">
			<DutyDetailsTable
				:duty-details-current="currentUserInfoTable"
				@on-close="handleCloseWindow" />
		</el-dialog>

		<el-dialog
			:modal="false"
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisible"
			width="20rem"
			title="导入用户信息">
			<UpLoad
				@on-load-success="handleImportSuccess" />
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';

const moment = require(`moment`);
// import { triggerAsyncId } from 'async_hooks';

const DutyInfoForm = r => require.ensure([], () => r(require(`./dutyInfoForm`)), `components/pagesDuty/dutyArrangement`);
const DutyDetailsTable = r => require.ensure([], () => r(require(`./dutyDetailsTable`)), `components/pagesDuty/dutyArrangement`);
const { DataTableStandard, UpLoad } = RichWayWebComponents;
const { downloadFile } = RichWayWebUtils;
export default {
    components: {
        DataTableStandard, UpLoad, DutyInfoForm, DutyDetailsTable
    },
    data() {
        return {
            userListDataTable: {
                query: {
                    fieldList: [
                        [
                            {
                                key: `personName`,
                                label: `值&ensp;班&ensp;人&ensp;员`,
                                value: ``,
                                type: `input`
                            },
                            {
                                key: `dateRange`,
                                label: `时间范围`,
                                value: [moment().subtract(1, `month`).format(`YYYY-MM-DD`), moment().format(`YYYY-MM-DD`)],
                                type: `date`,
                                pickerType: `daterange`,
                                format: `yyyy-MM-dd`,
                                valueFormat: `yyyy-MM-dd`,
                                fieldKeys: [`scheduleBeginDate`, `scheduleEndDate`]
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
                        },
                        {
                            label: `导入`,
                            type: `import`,
                            btnType: `info`,
                            handleClick: this.handleImport
                        },
                        {
                            label: `导出`,
                            type: `add`,
                            btnType: `info`,
                            handleClick: this.handleExport
                        }
                    ],
                    fieldList: [
                        {
                            key: `scheduleDate`,
                            label: `值班日期 `,
                            sortable: true,
                            width: `120`,
                            fixed: `left`
                        },
                        {
                            key: `scheduleEtm`,
                            label: `值班时间`,
                            width: `160`,
                            fixed: `left`
                        },
                        {
                            key: `wecatId`,
                            label: `星期`,
                            width: `100`,
                            render: {
                                type: `html`,
                                data: (row = {}) => {
                                    const weekOfday = moment(row.scheduleDate).format(`E`);
                                    let weekOfdayFmt = ``;
                                    switch (weekOfday) {
                                    case `1`:
                                        weekOfdayFmt = `一`;
                                        break;
                                    case `2`:
                                        weekOfdayFmt = `二`;
                                        break;
                                    case `3`:
                                        weekOfdayFmt = `三`;
                                        break;
                                    case `4`:
                                        weekOfdayFmt = `四`;
                                        break;
                                    case `5`:
                                        weekOfdayFmt = `五`;
                                        break;
                                    case `6`:
                                        weekOfdayFmt = `六`;
                                        break;
                                    case `7`:
                                        weekOfdayFmt = `日`;
                                        break;
                                    default:
                                        weekOfdayFmt = ``;
                                    }
                                    return weekOfdayFmt;
                                }
                            }
                        },
                        {
                            key: `planLeadNames`,
                            label: `计划正带班领导`,
                            width: `160`
                        },
                        {
                            key: `planViceLeadNames`,
                            label: `计划副带班领导`,
                            width: `160`
                        },
                        {
                            key: `planMemberNames`,
                            label: `计划值班人员`,
                            width: `160`
                        },
                        {
                            key: `planDriverNames`,
                            label: `计划司机`,
                            width: `100`
                        },
                        {
                            key: `realLeadNames`,
                            label: `实际正带班领导`,
                            width: `160`
                        },
                        {
                            key: `realViceLeadNames`,
                            label: `实际副带班领导`,
                            width: `160`
                        },
                        {
                            key: `realMemberNames`,
                            label: `实际值班人员`,
                            width: `160`
                        },
                        {
                            key: `realDriverNames`,
                            label: `实际司机`
                        },
                        {
                            key: `recordCnt`,
                            label: `值班记录`,
                            width: `120`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `详情`,
                                        btnType: `info`,
                                        handleClick: this.handleDutyRecord,
                                        formatFun: (index, row) => `${row.recordCnt}条记录`
                                    }
                                ]
                            }
                        },
                        {
                            label: `操作`,
                            width: `300`,
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
                getDataFun: `GetDutyList`//
            },
            title: `添加信息`,
            loading: false,
            currentDutyInfo: {},
            currentUserInfo: {},
            currentUserInfoTable: {},
            dialogFormVisibleAddEdit: false,
            dialogUploadVisible: false,
            dialogTableVisibleDetails: false,
            dialogTableVisibleDuty: false,
            queryDutyRecordDetails: [],
            scheduleId: ``,
            loadingRecord: true,
            queryInfo: {}
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(`submit!`);
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        handleQuery() {
            this.tableColumns = this.getTableColumns();
        },
        handleSelectChange(selection) {
            this._log(`table checkbox has click`, selection);
            this.paging.selectedList = selection;
        },
        // 点击记录
        handleDutyRecord(index, row) {
            this.scheduleId = row.scheduleId;
            this.dialogTableVisibleDuty = true;
            this.GetQueryDutyRecordDetails();
        },
        // 值班记录的详细记录的数据请求
        GetQueryDutyRecordDetails() {
            this.$getData.GetQueryDutyRecordDetails({ scheduleId: this.scheduleId }).then(res => {
                this.queryDutyRecordDetails = res.data;
                this.loadingRecord = false;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 关闭记录
        closeDutyRecord() {
            this.dialogTableVisibleDuty = false;
        },
        // 导入
        handleImport() {
            this.dialogUploadVisible = true;
        },
        // 导入用户成功，发送上传文件的请求
        handleImportSuccess(info) {
            this.$getData.ImportSchedulee({ files: info }).then(() => {
                this.dialogUploadVisible = false;
                this.$refs.user_dt.paging.queryFun();
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 导出
        handleExport() {
            // downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/duty/schedule/downloadTemplate`);
            // const queryInfo = this.$refs.user_dt.paging.queryInfo;
            //  console.log(25435353535,queryInfo);
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/duty/schedule/explorDutySchedules&personName=${this.queryInfo.personName || ``}&scheduleBeginDate=${this.queryInfo.scheduleBeginDate || ``}&scheduleEndDate=${this.queryInfo.scheduleEndDate || ``}`);
        },
        // 详情
        handleDetails(index, row) {
            this.currentUserInfoTable = row;
            this.dialogTableVisibleDetails = true;
        },
        // 新增
        handleAdd() {
            this.currentDutyInfo = {};
            this.dialogFormVisibleAddEdit = true;
            this.title = `添加信息`;
        },
        // 编辑
        handleEdit(index, row) {
            this.currentDutyInfo = row;
            this.dialogFormVisibleAddEdit = true;
            this.title = `编辑信息`;
        },
        // 删除
        handleDelete(index, row) {
            this._log(`delete row:`, row);
            this.$confirm(`确定删除值班信息吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                const info = {
                    scheduleIds: row.scheduleId
                };
                this.$getData.DeleteDuty(info).then(() => {
                    this.$refs.user_dt.paging.queryFun();
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            }).then((res = {}) => {
                this._log(res);
            }).catch((err = {}) => {
                this._log(err);
            });
        },
        GetDutyList() {
            return this.$getData.GetDutyList();
        },
        // 点击添加弹框按确定，关闭弹窗
        handleUpdateSuccess(info) {
            if (info) {
                this.$refs.user_dt.paging.queryFun();
            }
            this.dialogFormVisibleAddEdit = false;
        },
        // 点击添加弹框按取消，关闭弹窗
        handleUpdateCancel() {
            this.dialogFormVisibleAddEdit = false;
        },
        // 点击详情之后关闭弹窗
        handleCloseWindow() {
            this.dialogTableVisibleDetails = false;
        },
        // 点击一行，复选框选中
        handleRowClick(row) {
            this.$refs.dt_table.toggleRowSelection(row);
        },
        // 获取参数
        handleQueryChange(info) {
            this.queryInfo = info.queryInfo;
        }
    }

};
</script>

<style lang="scss" scoped>
		.content-duty-arrangement {
			position: relative;

			.elButton {
				margin-top: 10px;
				margin-left: 90%;
			}

			.query-detail {
				.el-form {
					.el-row {
						height: 60/20rem;

						.el-form-item--medium {
							padding-right: 183/20rem;

							.el-form-item__content {
								position: absolute;

								.el-range-separator {
									width: 20/20rem;
								}
							}
						}
					}
				}
			}
		}
</style>
