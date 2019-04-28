<template>
	<el-form
		ref="roleForm"
		:model="roleForm"
		:rules="roleRules"
		label-position="right"
		status-icon
		label-width="5.25rem"
		class="richway-role-form">
		<el-form-item
			label="角色编码:"
			prop="roleCode"
			required>
			<el-input
				v-model="roleForm.roleCode"
				:readonly="type==='update'"
				type="type"
				auto-complete="off"
				maxlength="50"
				clearable />
		</el-form-item>
		<el-form-item
			label="角色名称:"
			prop="roleName"
			required>
			<el-input
				v-model="roleForm.roleName"
				type="type"
				auto-complete="off"
				maxlength="50"
				clearable />
		</el-form-item>
		<el-form-item
			label="角色描述:">
			<el-input
				v-model="roleForm.roleDesc"
				type="type"
				auto-complete="off"
				maxlength="11"
				clearable />
		</el-form-item>
		<el-form-item
			label="角色排序:"
            required>
			<el-input-number
				v-model="roleForm.roleOrder"
				:min="1"
				:max="1000" />
		</el-form-item>
		<el-form-item
			label-width="0px"
			class="richway-push-right">
			<el-button
				:loading="saveStatus.loading"
				type="primary"
				round
				@click="submitForm('roleForm')">{{ saveStatus.title }}
			</el-button>
			<el-button
				round
				@click="cancelForm()">取消
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
import validateInfo from '@rich/richwayweb-utils/lib/validator';
import Role from './role';

export default {
    name: `RoleInfoForm`,
    components: {},
    props: {
        roleInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            roleForm: new Role(),
            roleRules: {
                roleCode: [
                    { required: true, message: `请输入角色编号`, trigger: `blur` },
                    { validator: validateInfo.code, trigger: `blur` }
                ],
                roleName: [
                    { required: true, message: `请输入角色名称`, trigger: `blur` },
                    { validator: validateInfo.nameAll, trigger: `blur` }
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
            return this.roleInfo.roleId ? `update` : `add`;
        }
    },
    watch: {
        roleInfo: {
            deep:true,
            immediate: true,
            handler() {
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                if (typeof ((this.$refs.roleForm || {}).resetFields) === `function`) {
                    this.$refs.roleForm.resetFields();
                }

                this.roleForm = new Role(this.roleInfo);
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
            this.$getData.SaveRole(this.roleForm).then(res => {
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
    .richway-role-form {
        .el-input-number {
            width: 100%;
        }
    }
</style>
