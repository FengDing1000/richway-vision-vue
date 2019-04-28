<template>
	<div class="user-panel">
		<el-popover
			v-if="userInfo.userAccount"
			:width="120 * rem"
			placement="bottom"
			popper-class="user-info-panel"
			trigger="click">
			<ul>
				<li
					v-for="(item, index) in list"
					:key="index"
					@click.stop="handleChoose(item)"><i
						:class="[item.icon]"
						class="richway-icon" />{{ item.title }}
				</li>
			</ul>
			<div
				slot="reference"
				class="user-panel-content">
				<i class="richway-icon icon-login-after" />
				<template v-if="!collapse">
					<span>{{ userTitle | _filterUserNameElip }}</span>
				</template>
			</div>
		</el-popover>
		<div
			v-else
			class="login-btn"
			@click="handleLogin">
			<i class="richway-icon icon-sign-out" />登录
		</div>

		<el-dialog
			:append-to-body="!0"
			:modal-append-to-body="!1"
			:visible.sync="passwordDialogVisible"
			title="修改密码"
			width="20rem">
			<div class="content">
				<el-form
					ref="ruleForm"
					:rules="rules"
					:model="ruleForm"
					label-width="4rem">
					<el-form-item
						label="旧密码"
						prop="oldPassWord"
						required>
						<el-input
							v-model="ruleForm.oldPassWord"
							maxlength="50"
							auto-complete="off"
							type="password"
							clearable />
					</el-form-item>
					<el-form-item
						label="新密码"
						prop="passWord"
						required>
						<el-input
							v-model="ruleForm.passWord"
							maxlength="50"
							auto-complete="off"
							type="password"
							clearable />
					</el-form-item>
					<el-form-item
						label="确认密码"
						prop="passWord_confirm"
						required>
						<el-input
							v-model="ruleForm.passWord_confirm"
							maxlength="50"
							auto-complete="off"
							type="password"
							clearable />
					</el-form-item>
					<el-form-item class="richway-push-right">
						<el-button
							round
							@click="passwordDialogVisible=false;">取消</el-button>
						<el-button
							type="primary"
							round
							@click="submitForm('ruleForm')">确定</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import { _filterUserNameElip } from '@rich/richwayweb-utils/lib/filter/filterUser';
import validateInfo from '@rich/richwayweb-utils/lib/validator';

const { mapState, mapMutations } = require(`vuex`);

export default {
    name: `userPsnel`,
    components: {},
    filters: {
        _filterUserNameElip
    },
    data() {
        return {
            passwordDialogVisible: false,
            ruleForm: {
                oldPassWord: ``,
                passWord: ``,
                passWord_confirm: ``
            },
            rules: {
                oldPassWord: [
                    { validator: validateInfo.passWord, trigger: `blur` }
                ],
                passWord: [
                    { validator: validateInfo.passWord, trigger: `blur` }
                ],
                passWord_confirm: [
                    { validator: validateInfo.passWord, trigger: `blur` }
                ]
            },
            list: [
                // {
                //     type: `userInfo`,
                //     title: `个人中心`,
                //     icon: `icon-login-after`
                // },
                {
                    type: `password`,
                    title: `修改密码`,
                    icon: `icon-edit-1`
                },
                {
                    type: `signOut`,
                    title: `注销`,
                    icon: `icon-sign-out`
                }
            ]
        };
    },
    computed: {
        ...mapState([`hasLogin`, `settingInfo`, `userInfo`, `rem`]),
        collapse() {
            return this.settingInfo.headerTakeUp;
        },
        userTitle() {
            return `${(this.userInfo || {}).userName || `--`}`;
        }
    },
    mounted() {},
    methods: {
        ...mapMutations([`SET_SETTING_INFO`, `SET_FULL_LOADING`]),
        handleChoose(item) {
            if (item.type === `signOut`) {
                // 如果当前是必须登录的，则注销后，重定向到登录页面，否则停留在当前页面，只清除用户数据
                this.SET_FULL_LOADING({
                    show: true,
                    text: `正在注销账号，请稍后...`
                });
                this.$getData.SignOut().then(() => {
                    window.location.href = `/login`;
                });
            } else if (item.type === `userInfo`) {
                window.location.href = `/user_manage`;
            } else if (item.type === `password`) {
                this.passwordDialogVisible = true;
            }
        },
        handleLogin() {
            window.location.href = `/login`;
        },
        initForm() {
            this.ruleForm.oldPassWord = ``;
            this.ruleForm.passWord = ``;
            this.ruleForm.passWord_confirm = ``;
        },
        // 表单验证
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.handleUpdatePassword();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        handleUpdatePassword() {
            if (this.ruleForm.passWord !== this.ruleForm.passWord_confirm) {
                this.$message({
                    message: `新密码和确认密码必须一致!`,
                    type: `warning`
                });
                return false;
            }

            this.$getData.UpdatePassword(this.ruleForm).then(() => {
                this.initForm();
                this.passwordDialogVisible = false;
            });
        }
    }
};
</script>

<style lang="scss">
    .user-panel{
        .user-panel-content{
            display: flex;
            align-items: center;
        }
        .richway-icon{
            font-size: 1.3rem !important;
            margin-right: .4rem;
        }

        .login-btn{
            display: flex;
            align-items: center;
        }
    }
    .user-info-panel {
        position: relative;
        padding: .3rem;
        font-size: .8rem;
        li {
            padding: .3rem .8rem;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            &:last-child{
                border-bottom: none;
            }
            &:hover {
                background: #f9f9f9;
            }

            .richway-icon {
                margin-right: .5rem;
            }
        }
    }
</style>
