<template>
	<el-form
		ref="userForm"
		:model="userForm"
		:rules="userRules"
		label-position="right"
		status-icon
		label-width="4.25rem"
		class="richway-user-form">
		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item
					label="用户账号:"
					prop="userAccount"
					required>
					<el-input
						v-model="userForm.userAccount"
						:readonly="type==='update'"
						type="type"
						auto-complete="off"
						maxlength="50"
						clearable />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					label="姓名:"
					prop="userName">
					<el-input
						v-model="userForm.userName"
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
					label="手机号:"
					prop="mobileNo"
					required>
					<el-input
						v-model="userForm.mobileNo"
						type="type"
						auto-complete="off"
						maxlength="11"
						clearable />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					label="邮箱:"
					prop="email">
					<el-input
						v-model="userForm.email"
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
					label="行政区划:"
					prop="adCd">
                    <CascaderSegion
                        :selected-options="selectedOptions"
                        :change-on-select="true"
                        :region-info="{code: '', name: '' }"
                        :default-value="userForm.adCdNm"
                        @on-change="handleChangeSegion"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="布局样式:">
					<el-select
						v-model="userForm.layout"
						placeholder="请选择布局样式">
						<el-option
							label="APP"
							value="app" />
						<el-option
							label="BOX"
							value="box" />
						<el-option
							label="MAIN"
							value="main" />
						<el-option
							label="MASTER"
							value="master" />
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="性别:">
					<el-switch
						v-model="userForm.sex"
						active-text="男"
						active-value="1"
						inactive-text="女"
						inactive-value="0" />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					v-if="type==='update'"
					label="是否激活:">
					<el-switch
						v-model="userForm.isActive"
						active-text="激活"
						active-value="1"
						inactive-text="未激活"
						inactive-value="0" />
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item
					label="传真:"
					prop="fax">
					<el-input
						v-model="userForm.fax"
						type="type"
						auto-complete="off"
						maxlength="50"
						clearable />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					label="QQ:"
					prop="qq">
					<el-input
						v-model="userForm.qq"
						type="type"
						auto-complete="off"
						maxlength="20"
						clearable />
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="12">
				<el-form-item label="生日:">
					<el-date-picker
						v-model="userForm.birthday"
						type="date"
						placeholder="选择出生日期"
						value-format="yyyy-MM-dd"
						style="width: 100%;
" />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item
					label="地址:"
					prop="address">
					<el-input
						v-model="userForm.address"
						type="type"
						auto-complete="off"
						maxlength="50"
						clearable />
				</el-form-item>
			</el-col>
		</el-row>

		<el-row :gutter="30">
			<el-col :span="24">
				<el-form-item
					label="备注:"
					prop="nt">
					<el-input
						v-model="userForm.nt"
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
						@click="submitForm('userForm')">{{ saveStatus.title }}
					</el-button>
					<el-button
						round
						@click="cancelForm()">取消</el-button>
				</el-form-item>
			</el-col>
		</el-row>

	</el-form>
</template>

<script type="text/ecmascript-6">
import validateInfo from '@rich/richwayweb-utils/lib/validator';
import RichWayWebComponents from '@rich/richwayweb-components';
import User from './user';

const { CascaderSegion } = RichWayWebComponents;

export default {
    name: `UserInfoForm`,
    components: {
        CascaderSegion
    },
    props: {
        userInfo: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            userForm: new User(),
            userRules: {
                userAccount: [
                    { required: true, message: `请输入用户账号`, trigger: `blur` },
                    { validator: validateInfo.userAccount, trigger: `blur` }
                ],
                userName: [
                    { validator: validateInfo.userName, trigger: `blur` }
                ],
                mobileNo: [
                    { required: true, message: `请输入手机号码`, trigger: `blur` },
                    { validator: validateInfo.mobile, trigger: `blur` }
                ],
                email: [
                    { validator: validateInfo.email, trigger: `blur` }
                ],
                qq: [
                    { validator: validateInfo.qq, trigger: `blur` }
                ],
                address: [
                    { validator: validateInfo.address, trigger: `blur` }
                ],
                fax: [
                    { validator: validateInfo.fax, trigger: `blur` }
                ]
            },
            saveStatus: {
                loading: false,
                title: `保存`
            },
            selectedOptions: []
        };
    },
    computed: {
        type() {
            return this.userInfo.userAccount ? `update` : `add`;
        }
    },
    watch: {
        userInfo: {
            deep:true,
            immediate: true,
            handler() {
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                if (typeof ((this.$refs.userForm || {}).resetFields) === `function`) {
                    this.$refs.userForm.resetFields();
                }
                this.selectedOptions = [];

                this.userForm = new User(this.userInfo);
            }
        }
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
                this.userForm.flat = `add`;
                this.userForm.isUser = ``;
            } else if (this.type === `update`) {
                this.userForm.flat = `update`;
                this.userForm.isUser = 1;
            }

            this.$getData.SaveUser(this.userForm).then(res => {
                if (res.success === true) {
                    this.$emit(`on-success`, res);
                }
            }).catch(err => {
                this.$emit(`on-failed`, err);
            }).always(() => {
                this.saveStatus.loading = false;
                this.saveStatus.title = `保存`;
            });
        },
        // 选择行政区
        handleChangeSegion(value = {}) {
            const adCdList = value.adCdList || [];
            const adCdListLen = adCdList.length;
            const adNmList = value.adNmList || [];

            this.userForm.adCd = adCdList[adCdListLen - 1];
            this.userForm.adCdNm = adNmList.join(`/`);
        }
    }
};
</script>

<style lang="scss">
		.richway-user-form {
			.el-select,
			.el-cascader {
				width: 100%;
			}
		}
</style>
