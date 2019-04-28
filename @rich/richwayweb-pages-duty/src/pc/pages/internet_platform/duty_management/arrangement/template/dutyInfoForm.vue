<template>
	<div>
		<el-form
			ref="dutyForm"
			:model="dutyForm"
			:rules="rules"
			label-width="6rem"
			class="demo-dutyForm">
			<el-form-item
				label="值班日期"
				prop="scheduleDate">
				<el-date-picker
					:disabled="isDisabled"
					v-model="dutyForm.scheduleDate"
					value-format="yyyy-MM-dd"
					style="width: 100%;
"
					type="date"
					placeholder="选择日期" />
			</el-form-item>
			<el-form-item
				label="时段"
				prop="tm">
				<el-select
					:disabled="isDisabled"
					v-model="dutyForm.tm"
					style="width: 100%;
"
					placeholder="请选择时段"
					@change="timeChange">
					<el-option
						v-for="item in timeIntervalFmt "
						:key="item.periodId"
						:label="item.timeInterval"
						:value="item.periodId" />
				</el-select>
			</el-form-item>
			<el-form-item
				label="值班开始时间"
				prop="scheduleStm">
				<el-date-picker
					:disabled="isDisabled"
					v-model="dutyForm.scheduleStm"
					style="width: 100%;
"
					value-format="yyyy-MM-dd HH:mm:ss"
					type="datetime"
					placeholder="选择日期时间" />
			</el-form-item>
			<el-form-item
				label="值班结束时间"
				prop="scheduleEtm">
				<el-date-picker
					:disabled="isDisabled"
					v-model="dutyForm.scheduleEtm"
					value-format="yyyy-MM-dd HH:mm:ss"
					style="width: 100%;
"
					type="datetime"
					placeholder="选择日期时间" />
			</el-form-item>
			<el-form-item label="正带班领导">
				<el-select
					v-model="dutyForm.lead"
					style="width: 100%;
"
					multiple
					filterable
					allow-create
					default-first-option
					placeholder="请选择...">
					<el-option
						v-for="item in allPersonArrFmt.leadNamesArr"
						:key="item.personId"
						:label="item.personName"
						:value="item.personId" />
				</el-select>
			</el-form-item>
			<el-form-item label="副带班领导">
				<el-select
					v-model="dutyForm.viceLead"
					style="width: 100%;
"
					multiple
					filterable
					allow-create
					default-first-option
					placeholder="请选择...">
					<el-option
						v-for="item in allPersonArrFmt.viceLeadNamesArr"
						:key="item.personId"
						:label="item.personName"
						:value="item.personId" />
				</el-select>
			</el-form-item>
			<el-form-item label="值班人员">
				<el-select
					v-model="dutyForm.member"
					style="width: 100%;
"
					multiple
					filterable
					allow-create
					default-first-option
					placeholder="请选择...">
					<el-option
						v-for="item in allPersonArrFmt.memberNamesArr"
						:key="item.personId"
						:label="item.personName"
						:value="item.personId" />
				</el-select>
			</el-form-item>
			<el-form-item label="司机">
				<el-select
					v-model="dutyForm.driver"
					style="width: 100%;
"
					multiple
					filterable
					allow-create
					default-first-option
					placeholder="请选择...">
					<el-option
						v-for="item in allPersonArrFmt.driverNamesArr"
						:key="item.personId"
						:label="item.personName"
						:value="item.personId" />
				</el-select>
			</el-form-item>

			<el-form-item
				style="text-align:center;
">
				<div class="richway-right">
					<el-button
						type="primary"
						@click="submitForm('dutyForm')">确定
					</el-button>
					<el-button @click="cancelForm()">取消</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/ecmascript-6">
// const moment = require('moment');
export default {
    name: `DutyInfoForm`,
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        dutyInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            dutyForm: {
                scheduleId: ``,
                periodNm: ``, // 班别名称
                periodId: ``, // 班别id
                scheduleDate: ``, // 值班日期
                scheduleStm: ``, // 值班开始时间 moment().format('YYYY-MM-DD')
                scheduleEtm: ``, // 值班结束时间
                lead: [], // 正带班领导
                viceLead: [], // 副带班领导
                member: [], // 值班人员Id
                driver: [], // 值班司机
                tm: ``// 时段（不用穿）
            },
            rules: {
                scheduleDate: [
                    { required: true, message: `请输入值班日期`, trigger: `blur` }
                ],
                tm: [
                    { required: true, message: `请输入时段`, trigger: `blur` }
                ],
                scheduleStm: [
                    { required: true, message: `请输入值班开始时间`, trigger: `blur` }
                ],
                scheduleEtm: [
                    { required: true, message: `请输入值班结束时间`, trigger: `blur` }
                ],
                planLeadNames: [
                    { required: true, message: `请输入正带班领导`, trigger: `blur` }
                ]
            },
            tm: [1, 2, 3],
            allPersonArr: [],
            timeInterval: [],
            // scheduleId: ``,
            editPerson: []
        };
    },
    computed: {
        isDisabled() {
            return !!this.dutyInfo.scheduleId;
        },
        type() {
            return this.dutyInfo.scheduleId ? `update` : `add`;
        },
        // 过滤值班人员
        allPersonArrFmt() {
            const leadNamesArr = [];
            const viceLeadNamesArr = [];
            const memberNamesArr = [];
            const driverNamesArr = [];
            for (const item of (this.allPersonArr || [])) {
                if (item.dutyRole === `1`) { // 正带班领导
                    leadNamesArr.push(item);
                } else if (item.dutyRole === `2`) { // 值班人员
                    memberNamesArr.push(item);
                } else if (item.dutyRole === `3`) { // 值班司机
                    driverNamesArr.push(item);
                } else if (item.dutyRole === `4`) { // 副带班领导
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
        // 过滤编辑里面的默认值班人员
        editPersonFmt() {
            const leadNamesArr = [];
            const viceLeadNamesArr = [];
            const memberNamesArr = [];
            const driverNamesArr = [];
            for (const item of (this.editPerson || [])) {
                if (item.dutyRole === `1`) { // 正带班领导
                    leadNamesArr.push(item.personName);
                } else if (item.dutyRole === `2`) { // 值班人员
                    memberNamesArr.push(item.personName);
                } else if (item.dutyRole === `3`) { // 值班司机
                    driverNamesArr.push(item.personName);
                } else if (item.dutyRole === `4`) { // 副带班领导
                    viceLeadNamesArr.push(item.personName);
                }
            }
            return {
                leadNamesArr,
                viceLeadNamesArr,
                memberNamesArr,
                driverNamesArr
            };
        },
        // 时段过滤
        timeIntervalFmt() {
            const tm = [];
            for (const item of (this.timeInterval || [])) {
                const every = `${item.periodNm} (${item.beginTime}-${item.endTime})`;
                tm.push({ timeInterval: every, periodId: item.id, periodNm: item.periodNm });
            }
            return tm;
        }
    },
    watch: {
        dutyInfo: {
            immediate: true,
            handler() {
                this.GetDutyManagementPerson();
                for (const key in this.dutyForm) {
                    if (Object.hasOwnProperty.call(this.dutyForm, key)) {
                        let defaultV = ``;
                        if (key === `lead` || key === `viceLead` || key === `member` || key === `driver`) {
                            defaultV = [];
                        }
                        this.dutyForm[key] = this.dutyInfo[key] || defaultV;
                    }
                }
            }
        }
    },
    mounted() {
        this.GetDutyManagePersonRole();
        this.GetTimeInterval();
    },
    methods: {
        // 时段发生改变时候去获取periodId、periodNm两个参数
        timeChange() {
            this.dutyForm.periodId = this.dutyForm.tm;
            for (const item of (this.timeInterval || [])) {
                if (item.id === this.dutyForm.periodId) {
                    this.dutyForm.periodNm = item.periodNm;
                }
            }
        },
        // 取消
        cancelForm() {
            this.$emit(`on-cancel`);
            if (this.type === `add`) {
                this.dutyForm.lead = [];
                this.dutyForm.viceLead = [];
                this.dutyForm.member = [];
                this.dutyForm.driver = [];
                // this.clearFrom();
            } else if (this.type === `update`) {
                this.dutyForm.lead = this.editPersonFmt.leadNamesArr;
                this.dutyForm.viceLead = this.editPersonFmt.viceLeadNamesArr;
                this.dutyForm.member = this.editPersonFmt.memberNamesArr;
                this.dutyForm.driver = this.editPersonFmt.driverNamesArr;
            }
        },

        // 表单验证
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.saveFun();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        // 确定
        saveFun() {
            this.$getData.AddDuty(this.dutyForm).then(res => {
                if (res.success === true) {
                    this.$emit(`on-success`, true);
                    if (this.type === `add`) {
                        // this.clearFrom();
                    }
                }
            }).catch(err => {
                this.$emit(`on-failed`, err);
            }).always(() => {
                this.saveStatus.loading = false;
                this.saveStatus.title = `确定`;
            });
        },
        // 点击确定或取消，清空表格信息
        // clearFrom () {
        //     this.dutyForm.lead = [];
        //     this.dutyForm.viceLead = [];
        //     this.dutyForm.member = [];
        //     this.dutyForm.driver = [];
        //     // this.dutyForm ={
        //     //     scheduleDate:``, // 值班日期
        //     //     scheduleStm: ``, // 值班开始时间
        //     //     scheduleEtm: `` ,// 值班结束时间
        //     //     planLeadNames: ``,// 计划正带班领导
        //     //     tm:``, // 时段
        //     //     lead:[],// 正带班领导
        //     //     viceLead:[], // 副带班领导
        //     //     member:[],// 值班人员Id
        //     //     driver:[],// 值班司机
        //     // }
        // },
        // 值班人员请求  GetDutyManagePersonRole
        GetDutyManagePersonRole() {
            this.$getData.GetAllPerson().then(res => {
                this.allPersonArr = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 时段的数据请求
        GetTimeInterval() {
            this.$getData.GetTimeInterval().then(res => {
                this.timeInterval = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 编辑窗口里面的值班人员首次渲染信息
        GetDutyManagementPerson() {
            if (this.type === `update`) {
                this.$root.$getData.GetDutyManagementPerson({ scheduleId: this.dutyInfo.scheduleId }).then(res => {
                    this.editPerson = res.data;
                    this.dutyForm.lead = this.editPersonFmt.leadNamesArr;
                    this.dutyForm.viceLead = this.editPersonFmt.viceLeadNamesArr;
                    this.dutyForm.member = this.editPersonFmt.memberNamesArr;
                    this.dutyForm.driver = this.editPersonFmt.driverNamesArr;
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            }
        }

    }
};
</script>

<style lang="scss" scoped>
		.richway-user-panel {
			.el-select,
			.el-cascader {
				width: 100%;
			}
		}
</style>
