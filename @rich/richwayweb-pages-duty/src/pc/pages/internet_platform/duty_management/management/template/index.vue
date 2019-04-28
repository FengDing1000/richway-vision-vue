<template>
	<div class="content content-duty-record">
		<DataTableStandard
			:config="userListDataTable" />
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogTableVisibleDuty"
			title="值班记录">
			<el-table :data="queryDutyRecordDetails">
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
				type="primary"
				class="elButtonClose"
				@click="closeDutyRecord">关闭
			</el-button>
		</el-dialog>
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogTableVisibleDetails"
			title="值班详情">
			<DutyDetailsTable
				:duty-details-current="currentUserInfo"
				@on-close="handleCloseWindow"
			/>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const moment = require(`moment`);

const DutyDetailsTable = r => require.ensure([], () => r(require(`../../arrangement/template/dutyDetailsTable`)), `components/pagesDuty/dutyManagement`);
const { DataTableStandard } = RichWayWebComponents;

export default {
    components: {
        DataTableStandard, DutyDetailsTable
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
                                key: `adcd`,
                                label: `政区`,
                                value: ``,
                                type: `select`,
                                options: []
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
                    fieldList: [
                        {
                            key: `scheduleDate`,
                            label: `值班日期`,
                            sortable: true,
                            fixed: `left`
                        },
                        {
                            key: `scheduleEtm`,
                            label: `值班时间`,
                            fixed: `left`
                        },
                        {
                            key: `wecatId`,
                            label: `星期`,
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
                            key: `realLeadNames`,
                            label: `正带班领导`
                        },
                        {
                            key: `realViceLeadNames`,
                            label: `副带班领导`
                        },
                        {
                            key: `realMemberNames`,
                            label: `值班人员`
                        },
                        {
                            key: `realDriverNames`,
                            label: `司机`
                        },
                        {
                            key: `recordCnt`,
                            label: `值班记录`,
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
                            key: `isActive`,
                            label: `详情`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `详情`,
                                        icon: `icon-about`,
                                        btnType: `primary`,
                                        handleClick: this.handleDetails
                                    }
                                ]
                            }
                        }
                    ]
                },
                getDataFun: `GetDutyRecordInfo` // GetDutyList
            },
            queryDutyRecordDetails: [],
            dialogTableVisibleDuty: false,
            dialogTableVisibleDetails: false,
            currentUserInfo: {},
            scheduleId: ``,
            adcdCity: []
        };
    },
    mounted() {
        this.GetAdcdCity();
        this._log(`duty_record has mounted`);
    },
    methods: {
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
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 请求省份
        GetAdcdCity() {
            const info = {
                adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                flag: `parent`,
                isadnmall: `false`
            };
            this.$getData.GetAdcdCity(info).then(res => {
                this.adcdCity = res.data;
                const adcdCityFmt = [];
                for (const item of (this.adcdCity || [])) {
                    adcdCityFmt.push({ label: item.adnm, value: item.adcd });
                }
                adcdCityFmt.unshift({ label: `全部`, value: `` });
                this.$set(this.userListDataTable.query.fieldList[0], 1, {
                    key: `adcd`,
                    label: `政区`,
                    value: ``,
                    type: `select`,
                    options: adcdCityFmt
                });
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击记录详情
        handleDetails(index, row) {
            this.currentUserInfo = row;
            this.dialogTableVisibleDetails = true;
            this._log(2563256325, this.currentUserInfo);
        },
        // 关闭记录
        closeDutyRecord() {
            this.dialogTableVisibleDuty = false;
        },
        // 关闭详情
        handleCloseWindow() {
            this.dialogTableVisibleDetails = false;
        }

    }

};
</script>

<style lang="scss">
		.content-duty-record {
			position: relative;

			.elButtonClose {
				margin-top: .5rem;
				margin-left: 90%;
			}

			.richway-build-panel {
				display: none;
			}
			// 起始日期的样式调整
			.el-row {
				height: 3rem;

				.el-form-item--medium {
					padding-right: 183/20rem;
				}
			}

			.el-form {
				.el-row {
					.el-form-item--medium {
						.el-form-item__content {
							position: absolute;

							.el-range-separator {
								width: 1rem;
							}
						}
					}
				}
			}
		}
</style>
