<template>
	<el-form
		ref="deptForm"
		:model="deptForm"
		:rules="deptRules"
		label-position="right"
		status-icon
		label-width="4.25rem"
		class="richway-dept-form">
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item
					label="分组名称:"
					prop="deptNm"
					required>
					<el-input
						v-model="deptForm.deptNm"
						:readonly="type==='update'"
						type="type"
						auto-complete="off"
						maxlength="50"
						clearable />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="父分组:">
					<el-select
						v-model="deptForm.deptParent"
						placeholder="请选择父分组">
						<el-option
							label="APP"
							value="app" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item
					label="机构:"
					prop="orgShnm">
					<el-input
						v-model="deptForm.orgShnm"
						type="type"
						auto-complete="off"
						maxlength="11"
						clearable />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					label="法人代表:"
					prop="lrNm">
					<el-input
						v-model="deptForm.lrNm"
						type="type"
						auto-complete="off"
						maxlength="50"
						clearable />
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="机构规格:">
					<el-select
						v-model="deptForm.orgScal"
						placeholder="请选择机构规格">
						<el-option
                            v-for="(item, index) of orgScalTypeList"
                            :key="index"
							:label="item.name"
							:value="item.code" />
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="隶属关系:">
					<el-select
						v-model="deptForm.menb"
						placeholder="请选择隶属关系">
						<el-option
                            v-for="(item, index) of menbTypeList"
                            :key="index"
                            :label="item.name"
                            :value="item.code" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item
					label="网址:"
					prop="web">
					<el-input
						v-model="deptForm.web"
						type="type"
						auto-complete="off"
						maxlength="50"
						clearable />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					label="邮箱:"
					prop="eMail">
					<el-input
						v-model="deptForm.eMail"
						type="type"
						auto-complete="off"
						maxlength="20"
						clearable />
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item
					label="邮编:"
					prop="zip">
					<el-input
						v-model="deptForm.zip"
						type="type"
						auto-complete="off"
						maxlength="20"
						clearable />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					label="办公电话:"
					prop="tel">
					<el-input
						v-model="deptForm.tel"
						type="type"
						auto-complete="off"
						maxlength="50"
						clearable />
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item
					label="传真电话:"
					prop="fax">
					<el-input
						v-model="deptForm.fax"
						type="type"
						auto-complete="off"
						maxlength="100"
						clearable />
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="24">
				<el-form-item
					label-width="0px"
					class="richway-push-right">
					<el-button
						:loading="saveStatus.loading"
						type="primary"
						round
						@click="submitForm('deptForm')">{{ saveStatus.title }}
					</el-button>
					<el-button
						round
						@click="cancelForm()">取消
					</el-button>
				</el-form-item>
			</el-col>
		</el-row>

	</el-form>
</template>

<script type="text/ecmascript-6">
import validateInfo from '@rich/richwayweb-utils/lib/validator';
import Dept from './dept';
import orgScalType from './orgScalType';
import menbType from './menbType';

export default {
    name: `DeptInfoForm`,
    props: {
        deptInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            orgScalTypeList: orgScalType.orgScalTypeList,
            menbTypeList: menbType.menbTypeList,
            deptForm: new Dept(),
            deptRules: {
                deptNm: [
                    { required: true, message: `请输入分组名称`, trigger: `blur` },
                    { validator: validateInfo.nameAll, trigger: `blur` }
                ],
                eMail: [
                    { validator: validateInfo.email, trigger: `blur` }
                ],
                fax: [
                    { validator: validateInfo.fax, trigger: `blur` }
                ]
            },
            saveStatus: {
                loading: false,
                title: `保存`
            }
        };
    },
    computed: {
        type() {
            return this.deptInfo.deptCd ? `update` : `add`;
        }
    },
    watch: {
        deptInfo: {
            deep:true,
            immediate: true,
            handler() {
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                if (typeof ((this.$refs.deptForm || {}).resetFields) === `function`) {
                    this.$refs.deptForm.resetFields();
                }

                this.deptForm = new Dept(this.deptInfo);
            }
        }
    },
    mounted() {
        this._log(`deptInfoForm has mounted`);
    },
    methods: {
        // 取消
        cancelForm() {
            this.$emit(`on-cancel`);
        },
        // 表单验证
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.saveStatus.loading = true;
                    this.saveStatus.title = `保存中`;
                    this.saveFun();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        // 保存
        saveFun() {
            if (this.type === `add`) {
                this.deptForm.flat = `add`;
            } else if (this.type === `update`) {
                this.deptForm.flat = `update`;
            }

            this.$getData.SaveDept(this.deptForm).then(res => {
                if (res.success === true) {
                    this.$emit(`on-success`, res);
                }
            }).catch(err => {
                this.$emit(`on-failed`, err);
            }).always(() => {
                this.saveStatus.loading = false;
                this.saveStatus.title = `保存`;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .richway-dept-form {
        .el-select,
        .el-cascader {
            width: 100%;
        }
    }
</style>
