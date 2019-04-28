<template>
	<div class="content content-duty-registration">

		<!-- 值班登记页 -->
		<el-row
			v-if="contentIsShow"
			:gutter="20"
			class="elRowcontentIsShow">
			<!-- 初次渲染页面的，值班登记和编辑页面 -->
			<el-col
				v-if="isShow"
				:span="17">
				<el-collapse
					v-model="activeNames1"
					accordion>
					<el-collapse-item
						:title="title"
						name="1">
						<DutyRegisterForm
							:duty-register-info-prop="aaaa"
							@on-success="GetDutyPersonnelInfo" />
					</el-collapse-item>
				</el-collapse>
			</el-col>
			<!-- 跳转之后的页面显示 -->
			<el-col
				v-if="!isShow"
				ref="user_dt"
				:span="17"
				class="elColIsShow">
				<div>
					<div class="elColIsShowDiv">
						<div class="grid-content gridContentDiv1">
							值班日期{{ dutyTime.scheduleStm ||defaultDutyDateStm }}-{{
							dutyTime.scheduleEtm||defaultDutyDateEdm }}
						</div>
						<div class="gridContentDiv2">
							<el-button
								type="primary"
								@click="clickDutyReport">值班报告
							</el-button>
							<el-button
								type="success"
								@click="changeShifts">换班
							</el-button>
						</div>
					</div>
					<el-form
						ref="formTwo"
						:rules="formTwoRules"
						:model="formTwo"
						label-width="5rem"
						class="formTwo">
						<el-form-item
							label="内容"
							prop="contentInfo">
							<el-input
								v-model="formTwo.contentInfo"
								type="textarea"
								maxlength="200" />
						</el-form-item>
						<el-form-item label="附件">
							<el-button
								type="primary"
								@click="dutyRegistrationUpload">点击上传
							</el-button>
						</el-form-item>
						<el-form-item>
							<el-button
								type="primary"
								@click="onSubmitDutyRecord('formTwo')">提交
							</el-button>
							<el-button @click="resetFormTwo('formTwo')">取消</el-button>
						</el-form-item>
					</el-form>
				</div>

				<div
					style="margin-top:2.5rem;
">
					<el-tabs
						v-model="elTabPane"
						type="card"
						@tab-click="handleClick">
						<el-tab-pane
							label="最近值班"
							name="first">
							<DutyRegisterTag
								:type="type=`info`"
								:closable="closable=true"
								:duty-register-tag-info="DutyRecordListInfo"
								@delete-success="deleteSuccess" />
							<div v-if="DutyRecordListInfo.length === 0 || `` ">今日没有值班记录</div>
						</el-tab-pane>
						<el-tab-pane
							label="值班记录列表"
							name="second">
							<DutyRegisterTag
								:type="type=`info`"
								:closable="closable=true"
								:duty-register-tag-info="DutyRecordListInfo"
								@delete-success="deleteSuccess" />
							<div v-if="DutyRecordListInfo.length === 0 || `` ">没有值班列表</div>
						</el-tab-pane>
						<el-tab-pane
							label="值班报告"
							name="third">
							<el-collapse
								v-model="activeNames2"
								@change="handleChange">
								<el-collapse-item
									v-for="(item, index) in DutyReportFormInfo"
									:title="`值班报告${item.dutySchedule.scheduleStm}-${item.dutySchedule.scheduleEtm}`"
									:key="index"
									:name="index"
								>
									<DutyRegisterTable :duty-register-table-info="item.dutyReport" />
								</el-collapse-item>
							</el-collapse>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
			<!-- 日历 -->
			<el-col
				:span="7"
				class="elColCalendar">
				<Calendar
					ref="Calendar"
					style="max-width:none;
"
					@choseDay="clickDay"
					@changeMonth="changeDate"
					@isToday="clickToday" />
				<el-collapse
					v-model="activeNames3"
					class="right-collapse"
					style="width: 100%;
"
					@change="handleChange">
					<el-collapse-item
						title="值班人员"
						name="3">
						<el-row
							v-for="item in dutyPersonShow"
							:gutter="20"
							:key="item.scheduleId"
							class="dutyInformation">
							<div class="dutyInfo">
								<el-col
									:span="3"
									class="dutyInformation-col">
									<div class="grid-content"><i class="icon-login-after" /></div>
								</el-col>
								<el-col :span="17">
									<div class="grid-content">
										<div class="dutyInfoName">{{ item.personName }} <span>({{ item.mobile }})</span>
										</div>
										<div
											class="dutyInfoTitle"
											v-text="item.dutyRole==='1'?'正带班领导':item.dutyRole==='2'?'值班人员':item.dutyRole==='3'?'值班司机':'副带班领导'" />
									</div>
								</el-col>
							</div>
						</el-row>
					</el-collapse-item>
				</el-collapse>
			</el-col>
		</el-row>
		<!-- 值班报告页 -->
		<el-row
			v-loading="loadingDutyReport"
			v-if="!contentIsShow"
			ref="dutyReport"
			:gutter="20"
			class="dutyReport">
			<el-col :span="16">
				<div class="grid-content">
					<el-form
						ref="dutyReporForm"
						:model="dutyReporForm"
						:rules="rulesdutyReporForm"
						label-width="6rem">
						<el-form-item
							label="降雨情况"
							prop="rainInfo">
							<el-input
								v-model="dutyReporForm.rainInfo"
								type="textarea" />
						</el-form-item>
						<el-form-item
							label="江河水情"
							prop="waterInfo">
							<el-input
								v-model="dutyReporForm.waterInfo"
								type="textarea" />
						</el-form-item>
						<el-form-item
							label="水库运行"
							prop="reserviorInfo">
							<el-input
								v-model="dutyReporForm.reserviorInfo"
								type="textarea" />
						</el-form-item>
						<el-form-item
							label="灾情险情"
							prop="desc4">
							<el-input
								v-model="dutyReporForm.desc4"
								type="textarea" />
						</el-form-item>
						<el-form-item
							label="上级指示部署及其他事项"
							prop="desc5">
							<el-input
								v-model="dutyReporForm.desc5"
								type="textarea" />
						</el-form-item>
						<el-form-item
							label="重大气象信息和重要汛情旱情"
							prop="desc6">
							<el-input
								v-model="dutyReporForm.desc6"
								type="textarea" />
						</el-form-item>
						<el-form-item
							label="对下一值班建议"
							prop="desc7">
							<el-input
								v-model="dutyReporForm.desc7"
								type="textarea" />
						</el-form-item>
						<el-form-item
							label="附件"
							prop="desc8">
							<el-button
								type="primary"
								@click="dutyReportUpload">点击上传
							</el-button>
						</el-form-item>
						<el-form-item
							style="text-align:center;
">
							<el-button
								type="primary"
								@click="clickdutyReporPvn('dutyReporForm')">保存
							</el-button>
							<el-button
								type="success"
								@click="saveAndExport">保存并导出
							</el-button>
							<el-button @click="resetForm('dutyReporForm')">重置</el-button>
							<el-button @click="dutyReportReturn">返回</el-button>
						</el-form-item>

					</el-form>
				</div>
			</el-col>
			<el-col :span="7">
				<div class="grid-content gridContentRight">
					<!--DutyRecordListInfo -->
					<DutyRegisterTag
						:type="type=`info`"
						:closable="closable=false"
						:duty-register-tag-info="DutyRecordListInfo" />
				</div>
			</el-col>
		</el-row>
		<!-- 内容页面的上传附件 -->
		<el-dialog
			:modal="false"
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisibleContent"
			width="20rem"
			title="上传信息">
			<UpLoad
				@on-load-success="handleLoadSuccessContent" />
		</el-dialog>
		<!-- 值班报告里面的上传附件 -->
		<el-dialog
			:modal="false"
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisible"
			width="20rem"
			title="上传附件">
			<UpLoad
				@on-load-success="handleLoadSuccessEnclosure" />
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from "@rich/richwayweb-utils";
import RichWayWebComponents from '@rich/richwayweb-components';
import Calendar from "vue-calendar-component";

const moment = require(`moment`);

const DutyRegisterForm = r => require.ensure([], () => r(require(`./dutyRegisterForm`)), `components/pagesDuty/dutyRegistration`);
const DutyRegisterTable = r => require.ensure([], () => r(require(`./dutyRegisterTable`)), `components/pagesDuty/dutyRegistration`);
const DutyRegisterTag = r => require.ensure([], () => r(require(`./dutyRegisterTag`)), `components/pagesDuty/dutyRegistration`);
const { UpLoad } = RichWayWebComponents;
const _log = RichWayWebUtils.console.log;
const { downloadFile } = RichWayWebUtils;

export default {
    components: {
        DutyRegisterForm,
        DutyRegisterTable,
        DutyRegisterTag,
        Calendar,
        UpLoad
    },
    data() {
        return {
            title: `值班人员登记`,
            dynamicTags: [`标签一`, `标签二`, `标签三`],
            dutyPersonShow: [],
            scheduleId: ``,
            dutyTime: {},
            activeNames1: [`1`],
            activeNames2: [`0`],
            activeNames3: [`3`],
            allPersonArr: [], // 返回的所有值班人员的信息
            dutyPersonnelInfo: [], // 日历下面的列表
            loadingDutyReport: false,
            formTwo: {
                contentInfo: ``
            },
            formTwoRules: {
                contentInfo: [{
                    required: true,
                    message: `请输入内容`,
                    trigger: `blur`
                }]
            },
            elTabPane: `first`,
            isShow: true,
            contentIsShow: true,
            scheduleDate: ``,
            dutyScheduleList: [], // 折叠面板里面的信息
            dutyScheduleListOne: ``,
            dutyScheduleListTwo: {},
            GetFloodSeasonTableInfo: {}, // 值班报告降水情况里面的数据
            DutyReportFormInfo: [],
            DutyRecordListInfo: [],
            dutyReporForm: {
                rainInfo: ``,
                waterInfo: ``,
                reserviorInfo: ``,
                disasterInfoCount: ``,
                otherInfoCount: ``,
                metInfoCount: ``,
                dutySuggest: ``,
                main: ``,
                mainfile: ``,
                dutyReportId: ``,
                scheduleId: ``,
                desc4: ``,
                desc5: ``,
                desc6: ``,
                desc7: ``
            },
            rulesdutyReporForm: {
                rainInfo: [{
                    required: true,
                    message: `请输入降雨情况`,
                    trigger: `blur`
                }],
                waterInfo: [{
                    required: true,
                    message: `请输入江河水情`,
                    trigger: `blur`
                }],
                reserviorInfo: [{
                    required: true,
                    message: `请输入水库运行`,
                    trigger: `blur`
                }]
            },
            dialogUploadVisible: false,
            dialogUploadVisibleEdit: false,
            dialogUploadVisibleContent: false,
            defaultDutyDateStm: moment().format(`YYYY-MM-DD 08:30:00`),
            defaultDutyDateEdm: moment().format(`YYYY-MM-DD 19:30:00`),
            contentMainFile: `` // 跳转之后内容页面的mainfile
        };
    },
    computed: {
        // 格式化当日值班人员的信息
        dutyPersonShowFmt() {
            const leadNamesArr = [];
            const viceLeadNamesArr = [];
            const memberNamesArr = [];
            const driverNamesArr = [];
            for (const item of this.dutyPersonShow || []) {
                if (item.dutyRole === `1`) {
                    // 正带班领导
                    leadNamesArr.push(item);
                } else if (item.dutyRole === `2`) {
                    // 值班人员
                    memberNamesArr.push(item);
                } else if (item.dutyRole === `3`) {
                    // 值班司机
                    driverNamesArr.push(item);
                } else if (item.dutyRole === `4`) {
                    // 副带班领导
                    viceLeadNamesArr.push(item);
                }
            }
            return {
                leadNamesArr,
                viceLeadNamesArr,
                memberNamesArr,
                driverNamesArr
            };
        },
        dutyScheduleLisFmt() {
            const [
                dutyScheduleListOne,
                dutyScheduleListTwo
            ] = this.DutyReportFormInfo;
            return {
                dutyScheduleListOne,
                dutyScheduleListTwo
            };
        }
    },
    mounted() {
        this.GetScheduleId();
    },
    methods: {
        handleSelect(item) {
            _log(item);
        },
        // 选中某天
        clickDay(data) {
            if (this.scheduleId) {
                this.scheduleDate = moment(data).format(`YYYY-MM-DD`);
                this.GetDutyReportForm();
            }
        },
        // 左右点击切换月份
        changeDate(data) {
            _log(data);
        },
        // 跳到了本月
        clickToday(data) {
            console.log(data);
        },
        // 请求日历下方的信息
        GetDutyPersonnelInfo() {
            this.isShow = false;
            this.$getData
                .GetDutyPersonnelInfo()
                .then(res => {
                    this.dutyPersonShow = res.data.personsInfo;
                })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 发送数据请求-scheduleId，如果有id就证明当日有值班请求，反之
        GetScheduleId() {
            this.$getData
                .GetScheduleId()
                .then(res => {
                    this.scheduleId = res.data.scheduleId;
                    if (this.scheduleId) {
                        if (this.scheduleId) {
                            this.isShow = false;
                        }
                        this.GetDutyPersonnel();
                        this.GetDutyTime(); // 获取头部时间
                        this.GetFloodSeasonTable(); // 值班报告里面的降雨情况等信息
                    }
                })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 发送数据请求 - 当日有值班人员，人员信息的请求
        GetDutyPersonnel() {
            this.$getData
                .GetDutyPersonnel({
                    scheduleId: this.scheduleId
                })
                .then(res => {
                    this.dutyPersonShow = res.data;
                })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 发送数据请求-头部的时间段 GetDutyTime
        GetDutyTime() {
            this.$getData
                .GetDutyTime({
                    scheduleId: this.scheduleId
                })
                .then(res => {
                    this.dutyTime = res.data;
                    this.scheduleDate = res.data.scheduleDate;
                    this.title = `值班日期:${res.data.scheduleStm}~${res.data.scheduleEtm}`;
                    this.GetDutyReportForm();
                })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 发送数据请求-值班报告底部折叠面板里的表格的数据信息
        GetDutyReportForm() {
            this.$getData
                .GetDutyReportForm({
                    scheduleId: this.scheduleId,
                    scheduleDate: this.scheduleDate
                })
                .then(res => {
                    this.DutyRecordListInfo = res.data.dutyRecordList;
                    this.DutyReportFormInfo = res.data.dutyScheduleList;
                })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 发送数据请求-保存排班安排记录的验证
        onSubmitDutyRecord(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.AddDutyRecord();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        // 发送数据请求-保存排班安排记录
        AddDutyRecord() {
            const info = {
                recordType: `1`,
                mangCd: ``,
                fileCd: ``,
                scheduleId: this.scheduleId,
                content: this.formTwo.contentInfo,
                main: `on`,
                mainfile: this.contentMainFile
            };
            this.$getData
                .AddDutyRecord(info)
                .then(() => {
                    this.formTwo.contentInfo = ``;
                    this.GetDutyReportForm();// 重新渲染值班登记底部折叠面板里的表格信
                    this.$refs.user_dt.paging.queryFun();
                })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 发送请求-值班报告里面的降雨情况等信息
        GetFloodSeasonTable() {
            this.$getData.GetFloodSeasonTable({
                scheduleId: this.scheduleId
            }).then(res => {
                this.dutyReporForm.rainInfo = res.data.rainInfo;
                this.dutyReporForm.waterInfo = res.data.waterInfo;
                this.dutyReporForm.reserviorInfo = res.data.reserviorInfo;
                this.dutyReporForm.dutyReportId = res.data.dutyReportId;
                this.loadingDutyReport = false;
                this.GetFloodSeasonTableInfo = res.data;
            })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 点击换班
        changeShifts() {
            this.$confirm(`确认换班`, `系统提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            })
                .then(() => {
                    this.isShow = true;
                })
                .catch(() => {
                    this.$message({
                        type: `info`,
                        message: `已取消`
                    });
                });
        },
        // 点击值班报告
        clickDutyReport() {
            this.contentIsShow = false;
        },
        // 点击值班报告页-保存-发送请求
        clickdutyReporPvn(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.GetReportReport();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        GetReportReport() {
            this.contentIsShow = true;
            this.elTabPane = `third`;
            this.dutyReporForm.scheduleId = this.scheduleId;
            this.$getData.GetReportReport(this.dutyReporForm).then(() => {
                this.GetDutyReportForm();
                this.$refs.dutyReport.paging.queryFun();
            })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 跳转之后一页面-内容-上传附件
        dutyRegistrationUpload() {
            this.dialogUploadVisibleContent = true;
        },
        // 跳转之后一页面-上传附件-导入用户成功，重新查询
        handleLoadSuccessContent(info) {
            this.contentMainFile = info.mainfile;
            this.$message({
                message: `上传成功`,
                type: `success`
            });
            this.dialogUploadVisibleContent = false;
        },
        // 跳转之后二页面-值班报告表-上传附件
        dutyReportUpload() {
            this.dialogUploadVisible = true;
        },
        // 跳转之后二页面--值班报告表-上传成功，重新查询
        handleLoadSuccessEnclosure(info) {
            this.dutyReporForm.mainfile = info.mainfile;
            this.$message({
                message: `上传成功`,
                type: `success`
            });
            this.dialogUploadVisible = false;
        },
        // 保存并导出
        saveAndExport() {
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/duty/schedule/explordutyrecord&shcheduleId=${this.shcheduleId}&inRecord=1`);
        },
        // 值班报告页-返回
        dutyReportReturn() {
            this.contentIsShow = true;
        },
        deleteSuccess(info) {
            if (info === true) {
                this.GetDutyReportForm();
            }
        },
        // 取消值班登记的第二跳转页面的
        resetFormTwo(formName) {
            this.$refs[formName].resetFields();
            this.dutyReporForm.rainInfo = ``;
            this.dutyReporForm.waterInfo = ``;
            this.dutyReporForm.reserviorInfo = ``;
            this.dutyReporForm.dutyReportId = ``;
        },
        handleChange() {
        }

    }
};
</script>

<style lang="scss">
		.content-duty-registration {
			position: relative;

			.elColIsShowDiv {
				position: relative;
				height: .85rem;
				margin-top: 1rem;
			}

			.el-form {
				margin-top: .5rem;
			}

			.elRowcontentIsShow {
				display: flex;
				height: 100%;
			}

			.el-collapse {
				border: 1px solid #eee;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

				.el-collapse-item__wrap {
					width: 100%;
				}
			}
			// 日历的样式
			.wh_content_all[data-v-22dd1b6a] {
				position: relative;
				background-color: #fff;
			}

			.wh_content {
				.wh_content_item {
					color: #303133;

					.wh_other_dayhide {
						color: #aaa;
					}
				}
			}

			.right-collapse {
				flex-grow: 1;
				background-color: #fff;

				.el-collapse-item__wrap {
					width: 100%;
					max-height: 20rem;
					overflow: auto;
				}
			}

			.wh_container {
				margin: 0;
				margin-bottom: .4rem;
				border: 1px solid #eee;

				.wh_content_all {
					.wh_top_changge {
						background-color: #409eff !important;
					}
				}
			}
			// 折叠面板样式
			.el-collapse-item__header {
				height: 56/20rem;
				padding-left: 18/20rem;
				font-weight: 700;
				font-size: 16/20rem;
				line-height: 56/20rem;

				[class*=" el-icon-"] {
					margin-top: .4rem;
					margin-right: 15/20rem;
					font-weight: 700;
					font-size: 1rem;
				}
			}
			// 值班人员样式
			[class^="icon-"],
			[class*=" icon-"] {
				display: inline-block;
				margin-top: .5rem;
				// margin-left: -.5rem;
				overflow: hidden;
				font-size: 1.5rem;
				color: #909399;
			}

			.el-collapse-item__content {
				.dutyInformation {
					margin: 0 .5rem!important;
					border-bottom: 1px solid #d3d4d6;
				}
				.dutyInfo {
					height: 3rem;

					.dutyInfoName {
						font-weight: 700;
						font-size: 16/20rem;
						color: #1f2022;

						span {
							font-weight: 400;
							color: #909399;
						}
					}

					.dutyInfoTitle {
						font-size: 14/20rem;
						color: #409eff;
					}
				}
			}


			// 页面头部
			.titleTime {
				height: 2.5rem;
				padding-left: 1rem;
				font-weight: 400;
				font-size: 1rem;
				line-height: 2.5rem;
				color: #fff;
				background-color: #888;
			}
			// 内容页面的tabs
			.el-tabs__content {
				min-height: 10rem;
				max-height: 17rem;
				overflow: auto;
			}
			// 值班报告页面
			.dutyReport {
				background-color: #fff;
			}
			// 跳转之后的页面的样式
			.elColIsShow {
				position: relative;
				display: flex;
				flex-direction: column;
				padding: .4rem;
				background: #fff;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

				.gridContentDiv1 {
					position: absolute;
					top: 1rem;
					left: 15/20rem;
				}

				.gridContentDiv2 {
					position: absolute;
					top: 1rem;
					right: .8rem;
				}

				.formTwo {
					height: 10rem;
					margin-top: 3.5rem;
					border-bottom: 1px solid #ccc;
				}
			}
			// 日历插件的样式
			.elColCalendar {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
			}
			// 值班报告右边的滚动条
			.gridContentRight {
				max-height: 35rem;
				overflow: auto;
			}
		}
</style>
