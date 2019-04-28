<template>
	<el-form
		ref="dutyRegisterForm"
		:model="dutyRegisterForm"
		:rules="rules"
		label-width="7rem">
		<el-form-item
			label="正带班领导"
			prop="leadNames">
			<el-select
				v-model="dutyRegisterForm.leadNames"
				style="width: 98%;
"
				multiple
				filterable
				allow-create
				default-first-option
				placeholder="请选择...">
				<el-option
					v-for="item in dutyRegisterInfoFmt.leadNamesArr"
					:key="item.personId"
					:label="item.personName"
					:value="item.personId" />
			</el-select>
		</el-form-item>
		<el-form-item
			label="副带班领导"
			prop="viceLeadNames">
			<el-select
				v-model="dutyRegisterForm.viceLeadNames"
				style="width: 98%;
"
				multiple
				filterable
				allow-create
				default-first-option
				placeholder="请选择...">
				<el-option
					v-for="item in dutyRegisterInfoFmt.viceLeadNamesArr"
					:key="item.personId"
					:label="item.personName"
					:value="item.personId" />
			</el-select>
		</el-form-item>
		<el-form-item
			label="值班人员"
			prop="memberNames">
			<el-select
				v-model="dutyRegisterForm.memberNames"
				style="width: 98%;
"
				multiple
				filterable
				allow-create
				default-first-option
				placeholder="请选择..."
				@change="memberNamesChange">
				<el-option
					v-for="item in dutyRegisterInfoFmt.memberNamesArr"
					:key="item.personId"
					:label="item.personName"
					:value="item.personId" />
			</el-select>
		</el-form-item>
		<el-form-item label="值班司机">
			<el-select
				v-model="dutyRegisterForm.driverNames"
				style="width: 98%;
"
				multiple
				filterable
				allow-create
				default-first-option
				placeholder="请选择...">
				<el-option
					v-for="item in dutyRegisterInfoFmt.driverNamesArr"
					:key="item.personId"
					:label="item.personName"
					:value="item.personId" />
			</el-select>
		</el-form-item>
		<el-form-item label="换班原因">
			<el-input
				:autosize="{ minRows: 4, maxRows: 4}"
				v-model="dutyRegisterForm.changeShifts"
				style="width: 98%;
"
				type="textarea"
				maxlength="200"
				placeholder="请输入内容" />
		</el-form-item>
		<el-form-item
			style="text-align:center;
">
			<el-button
				:loading="saveStatus.loading"
				type="primary"
				round
				@click="submitForm('dutyRegisterForm')">{{ saveStatus.title }}
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
export default {
    name: `DutyRegisterForm`,
    props: {
        dutyRegisterInfoProp: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            dutyRegisterInfo: [],
            scheduleId: ``,
            dutyPersonShow: {},
            memberNamesPersonId: [], // 值班人员的id
            dutyRegisterForm: {
                leadNames: [], // 正带班领导
                viceLeadNames: [], // 副带班领导
                memberNames: [], // 值班人员
                memberNamesId: [],
                memberNameIdArr: [],
                driverNames: [], // 值班司机
                changeShifts: ``// 换班原因

            },
            rules: {
                leadNames: [
                    { required: true, message: `请输入正带班领导`, trigger: `blur` }
                ],
                viceLeadNames: [
                    { required: true, message: `请输入副带班领导`, trigger: `blur` }
                ],
                memberNames: [
                    { required: true, message: `请输入值班人员`, trigger: `blur` }
                ]

            },
            saveStatus: {
                title: `提交`
            }
        };
    },
    computed: {
        dutyRegisterInfoFmt() {
            const leadNamesArr = [];
            const viceLeadNamesArr = [];
            const memberNamesArr = [];
            const driverNamesArr = [];
            for (const item of (this.dutyRegisterInfo || [])) {
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
        // 格式化当日值班人员的信息
        dutyPersonShowFmt() {
            const leadNamesArr = [];
            const viceLeadNamesArr = [];
            const memberNamesArr = [];
            const driverNamesArr = [];
            for (const item of (this.dutyPersonShow || [])) {
                if (item.dutyRole === `1`) { // 正带班领导
                    leadNamesArr.push(item.personId);
                } else if (item.dutyRole === `2`) { // 值班人员
                    // memberNamesArr.push(item.personName);
                    memberNamesArr.push(item.personId);
                } else if (item.dutyRole === `3`) { // 值班司机
                    driverNamesArr.push(item.personId);
                } else if (item.dutyRole === `4`) { // 副带班领导
                    viceLeadNamesArr.push(item.personId);
                }
            }
            return {
                leadNamesArr,
                viceLeadNamesArr,
                memberNamesArr,
                driverNamesArr
            };
        }
    },
    mounted() {
        this.GetAllPerson();
        this.GetScheduleId();
    },
    methods: {
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                // console.log(1212121236363636,formName);
                if (valid) {
                    this.saveFun();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        // 保存
        saveFun() {
            const method = `AddRegister`;
            let schedulePersons = [];
            schedulePersons = schedulePersons.concat(this.dutyRegisterForm.leadNames, this.dutyRegisterForm.viceLeadNames, this.dutyRegisterForm.memberNames, this.dutyRegisterForm.driverNames);
            const info = {
                schedulePersons,
                scheduleId: this.scheduleId,
                changeReason: this.dutyRegisterForm.changeShifts
            };
            this.$getData[method](info).then(res => {
                if (res.success === true) {
                    this.$emit(`on-success`, res);
                    this.dutyRegisterForm.leadNames = [];
                    this.dutyRegisterForm.viceLeadNames = [];
                    this.dutyRegisterForm.memberNames = [];
                    this.dutyRegisterForm.driverNames = [];
                    this.dutyRegisterForm.changeShifts = ``;
                }
            }).catch(err => {
                this.$emit(`on-failed`, err);
            }).always(() => {
            });
        },
        // 判断是否有scheduleId，有的话，就是当日已经有了值班人员的信息，就让信息显示在列表框里面
        isscheduleId() {
            if (this.scheduleId) {
                this.dutyRegisterForm.leadNames = this.dutyPersonShowFmt.leadNamesArr;
                this.dutyRegisterForm.viceLeadNames = this.dutyPersonShowFmt.viceLeadNamesArr;
                this.dutyRegisterForm.memberNames = this.dutyPersonShowFmt.memberNamesArr;
                this.dutyRegisterForm.driverNames = this.dutyPersonShowFmt.driverNamesArr;
            }
        },
        // 发送数据请求-所有值班人员信息
        GetAllPerson() {
            this.$getData.GetAllPerson().then(res => {
                this.dutyRegisterInfo = res.data;
                this.isscheduleId();
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求-scheduleId
        GetScheduleId() {
            this.$getData.GetScheduleId().then(res => {
                this.scheduleId = res.data.scheduleId;
                this.GetDutyPersonnel();
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求 - 当日有值班人员，人员信息的请求
        GetDutyPersonnel() {
            this.$getData.GetDutyPersonnel({ scheduleId: this.scheduleId }).then(res => {
                this.dutyPersonShow = res.data;
                this.isscheduleId();
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
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
