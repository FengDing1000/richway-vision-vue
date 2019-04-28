<template>
	<div class="content content-login">
		<div class="login-bg" />
		<div class="login-form">
			<el-row :gutter="20">
				<el-col
					:span="6"
					:offset="16">
					<div class="login-form-panel">
						<div class="title">
							<img :src="logoSrc">
							<span>瑞智云</span>
						</div>
						<span class="sub-title">云平台登陆11111</span>

						<el-form
							ref="ruleForm"
							:model="ruleForm"
							:rules="rules"
							label-position="left"
							status-icon
							label-width="2.5rem"
							class="richway-login-panel">
							<el-form-item
								label="账号"
								prop="userName"
								required>
								<el-input
									v-model="ruleForm.userName"
									type="type"
									auto-complete="off"
									maxlength="50"
									clearable />
							</el-form-item>
							<el-form-item
								label="密码"
								prop="passWord"
								required>
								<el-input
									v-model="ruleForm.passWord"
									type="password"
									auto-complete="off"
									maxlength="50"
									clearable />
							</el-form-item>
							<el-form-item label-width="0px">
								<div class="register-forget-tips">
									<span>没有账号？</span>
									<a
										href="/register"
										class="register-tips">立即注册</a>
									<a
										href="/forget"
										class="forget-tips">忘记密码?</a>
								</div>
								<el-button
									:loading="loginStatus.loading"
									type="primary"
									round
									class="richway-right"
									@click="submitForm('ruleForm')">{{ loginStatus.title }}
								</el-button>
							</el-form-item>
						</el-form>

						<span class="tips">出于安全考虑，一旦您访问过那些需要您提供凭证信息的应用时，请操作完成之后关闭浏览器。</span>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import validateInfo from '@rich/richwayweb-utils/lib/validator';

const { mapMutations } = require(`vuex`);
const { getRequest } = RichWayWebUtils;
const { compile } = RichWayWebUtils.compile;
const imgLogo = require(`../../../../images/richway_logo.png`);

export default {
    props: {
        successUrl: {
            type: String,
            default: `/`
        }
    },
    data() {
        return {
            logoSrc: imgLogo,
            ruleForm: {
                userName: ``,
                passWord: ``
            },
            rules: {
                userName: [
                    { validator: validateInfo.userName, trigger: `blur` }
                ],
                passWord: [
                    { validator: validateInfo.passWord, trigger: `blur` }
                ]
            },
            loginStatus: {
                loading: false,
                title: `登录`
            }
        };
    },
    mounted() {
        this._log(`login has mounted`);
    },
    methods: {
        ...mapMutations([`SET_USER_INFO`]),
        // 表单验证
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loginStatus.loading = true;
                    this.loginStatus.title = `登陆中`;

                    this.loginFun();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        // 登录
        loginFun() {
            this.$getData.Login({
                userName: this.ruleForm.userName,
                passWord: compile(this.ruleForm.passWord)
            }).then(res => {
                this._log(`login`, res);
                if (res.success === true) {
                    this.SET_USER_INFO(res.data);

                    window.location.href = getRequest().service || this.successUrl;
                }
            }).catch(err => {
                this.$emit(`on-failed`, err);
            }).always(() => {
                this.loginStatus.loading = false;
                this.loginStatus.title = `登陆`;
            });
        }
    }

};
</script>

<style lang="scss">
	.container-login {
		height: 100%;

		.richway-main {
			top: 0 !important;
			height: 100%;
			margin-top: 0 !important;
			margin-left: 0 !important;
		}

		.content-login {
			position: relative;
			display: block;
			width: 100%;
			height: 100%;
			padding: 0 !important;

			.login-bg {
				height: calc(100% - 0);
				overflow-y: auto;
				background: url(./../../../../images/login/login_bg.png);
				background-size: cover;
			}

			.login-form {
				position: absolute;
				top: 5rem;
				display: inline-block;
				width: 100%;
			}
		}

		.richway-footer {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}

	.login-form-panel {
		padding: .5rem 2rem 1.5rem;
		background: #fff;

		.title {
			padding: 0;
			margin: .5rem 0 3rem;

			> img {
				display: inline-block;
				max-width: 100%;
				height: auto;
				max-height: 2.25rem;
				margin-top: .15rem;
			}

			> span {
				height: 2.5rem;
				padding: .75rem;
				font-size: .9rem;
				line-height: 1rem;
				color: #257bb2;
			}
		}

		.sub-title {
			display: inline-block;
			margin-bottom: 3.4rem;
			font-weight: normal;
			font-size: .8rem;
			text-align: left;
			color: #0d467b;
		}

		.tips {
			font-size: .6rem;
			color: #ccc;
		}

		.close-btn {
			position: absolute;
			top: .5rem;
			right: .5rem;
			display: inline-block;
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			font-size: 1rem;
			line-height: 1.5rem;
			text-align: center;
			color: #fff;
			background: #409eff;
			cursor: pointer;
		}

		.register-forget-tips {
			display: inline-block;
			height: 2.1rem;
			font-size: .6rem;
			line-height: 2.1rem;
		}

		.register-tips {
			margin: .5rem;
			text-decoration: none;
			color: #4056f2;
		}

		.forget-tips {
			text-decoration: none;
			color: #d7d7d7;
		}

		@media only screen and (max-width: 768px) {
			.richway-login-panel {
				button {
					width: 100%;
				}
			}
		}
	}
</style>
