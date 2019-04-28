<template>
	<div class="content content-login">
		<div class="login-header">
			<span @click="handleClick">
				<span class="login-header-logo" />
				<span class="login-header-title">物联网云平台管理系统</span>
			</span>
			<ul class="richway-right">
				<li>推荐浏览器下载</li>
				<li><i class="el-icon-question" />常见问题</li>
				<li><i class="el-icon-upload2" />版本更新</li>
			</ul>
		</div>
		<div class="login-main">
			<div
				:style="{backgroundImage: loginBg}"
				class="login-bg" />
			<div class="login-content">
				<div class="pc-code">
					<span
						v-if="pcCode==='pc'"
						class="content-img content-code-img"
						@click="handleClickPcCode('code')" />
					<span
						v-else
						class="content-img content-pc-img"
						@click="handleClickPcCode('pc')" />
				</div>

				<div
					v-if="pcCode==='pc'"
					class="pc">
					<p class="sub-title">用户名登录</p>
					<div class="content-item content-user">
						<el-form
							ref="ruleForm"
							:model="ruleForm"
							:rules="rules"
							inline
							label-position="left"
							status-icon>
							<el-form-item
								class="form-item-input"
								label-width="2rem"
								prop="userName"
								required>
								<i
									slot="label"
									class="richway-icon icon-login-before" />
								<el-input
									v-model="ruleForm.userName"
									placeholder="用户名" />
							</el-form-item>
							<el-form-item
								class="form-item-input"
								label-width="2rem"
								prop="passWord"
								required>
								<i
									slot="label"
									class="richway-icon icon-eye-close" />
								<el-input
									v-model="ruleForm.passWord"
									placeholder="密码"
									type="password" />
							</el-form-item>
							<!--<el-form-item-->
								<!--class="form-item-input"-->
								<!--label-width="2rem"-->
								<!--prop="phone"-->
								<!--required>-->
								<!--<i-->
									<!--slot="label"-->
									<!--class="richway-icon icon-phone" />-->
								<!--<el-input-->
									<!--v-model="ruleForm.phone"-->
									<!--placeholder="手机"-->
									<!--maxlength="11">-->
									<!--<el-button-->
										<!--slot="append">-->
										<!--<span-->
											<!--v-if="flag"-->
											<!--@click="handleSendCode">发送验证码</span>-->
										<!--<span v-if="!flag">剩余{{ second }}s</span>-->
									<!--</el-button>-->
								<!--</el-input>-->
							<!--</el-form-item>-->
							<!--<el-form-item-->
								<!--class="form-item-input"-->
								<!--label-width="2rem"-->
								<!--prop="verCode"-->
								<!--required>-->
								<!--<i-->
									<!--slot="label"-->
									<!--class="richway-icon icon-email" />-->
								<!--<el-input-->
									<!--v-model="ruleForm.verCode"-->
									<!--placeholder="验证码" />-->
							<!--</el-form-item>-->
							<!--<el-form-item-->
							<!--prop="verificationCode"-->
							<!--required>-->
							<!--<div-->
							<!--class="login-group">-->
							<!--<i class="richway-icon icon-eamil"></i>-->
							<!--<input-->
							<!--v-model="ruleForm.verificationCode"-->
							<!--class="verification-code-input"-->
							<!--placeholder="验证码"-->
							<!--type="text">-->
							<!--<span-->
							<!--class="code">-->
							<!--<img-->
							<!--:src="imgSrc"-->
							<!--title="看不清，点击刷新"-->
							<!--class="img-responsive"-->
							<!--@click="reloadVerifyCode">-->
							<!--</span>-->
							<!--</div>-->
							<!--</el-form-item>-->
							<el-form-item
								label-width="0px"
								class="form-item-password">
								<el-checkbox
									v-model="ruleForm.remember"
									true-label="Y"
									false-label="N">记住密码
								</el-checkbox>
								<span class="richway-right forget">忘记密码?</span>
							</el-form-item>
							<el-form-item
								label-width="0px"
								class="form-item-btn">
								<el-button
									:loading="loginStatus.loading"
									type="primary"
									round
									style="width: 100%;"
									@click="submitForm('ruleForm')">{{ loginStatus.title }}
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div
					v-else
					class="code">
					<p style="margin-bottom: .4rem">扫码登录</p>
					<div class="content-item content-code">
						<vue-qr
							:bgSrc="codeInfo.logo"
							:text="codeInfo.value"
							:size="260"
							:margin="0" />
					</div>
				</div>

				<div class="content-wap">
					<p class="sub-title">手机APP下载</p>
					<ul>
						<li>
							<span class="img android" />
							<span>安卓系统</span>
						</li>
						<li>
							<span class="img ios" />
							<span>IOS系统</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="login-footer">
			<span>技术支持@江河瑞通(北京)技术有限公司</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import _moment from 'moment';
import GetData from '$pc/service/getData';
import validateInfo from '@rich/richwayweb-utils/lib/validator';
import RichWayWebUtils from '@rich/richwayweb-utils';
import VueQr from 'vue-qr';

const { mapMutations } = require(`vuex`);
const { getRequest, compile } = RichWayWebUtils;

export default {
    components: { VueQr },
    props: {
        successUrl: {
            type: String,
            default: `/`
        }
    },
    data() {
        return {
            count: 0,
            pcCode: `pc`,
            // android: ``,
            // ios: ``,
            // imgSrc: ``,
            loginBg: ``,
            numberCode: ``,
            ruleForm: {
                userName: ``,
                passWord: ``,
                phone: ``,
                verCode: ``,
                verificationCode: ``,
                remember: `N`
            },
            second: 60,
            flag: true,
            timer: null, // 该变量是用来记录定时器的,防止点击的时候触发多个setInterval
            rules: {
                userName: [
                    {required: true, message: '请填写用户名',trigger: `blur`},
                    { validator: validateInfo.userAccount, trigger: `blur` }
                ],
                passWord: [
                    {required: true, message: '请填写密码',trigger: `blur`},
                    { validator: validateInfo.passWord, trigger: `blur` }
                ],
                verificationCode: [
                    {required: true, message: '请填写验证码',trigger: `blur`},
                    { validator: validateInfo.verificationCode, trigger: `blur` }
                ],
                phone: [
                    {required: true, message: '请填写手机号',trigger: `blur`},
                    { validator: validateInfo.mobile, trigger: `blur` }
                ],
                verCode: [
                    {required: true, message: '请填写验证码',trigger: `blur`},
                    { validator: validateInfo.verificationCode, trigger: `blur` }
                ]
            },
            loginStatus: {
                loading: false,
                title: `登录`
            },
            codeInfo: {
                value: `www.baidu.com`,
                logo: require(`../images/logo.jpg`)
            }
        };
    },
    computed: {
        welcome() {
            const hour = _moment().hour();
            if (hour <= 12 && hour >= 0) {
                return `上午好`;
            }
            if (hour > 12 && hour < 18) {
                return `下午好`;
            }
            return `晚上好`;
        }
    },
    mounted() {
        this._log(`login has mounted`);

        // this.android = `url(../images/login/android.png)`;
        // this.ios = `url(../images/login/ios.png)`;
        // this.imgSrc = `http://testsh.rtongcloud.com:6688/shzh/base/api/login/getVerifyCodeImage?time=${_moment()}`;
        this.loginBg = `url(${this.$base.path.nodeStaticResourcesHost}/images/login/login_bg_1.png)`;

        setInterval(() => {
            this.loginBg = `url(${this.$base.path.nodeStaticResourcesHost}/images/login/login_bg_${(this.count % 2) + 1}.png)`;
            this.count++;
        }, 6000);
    },
    methods: {
        ...mapMutations([`SET_USER_INFO`]),
        handleClick() {
            this.$router.push(`/`);
        },
        handleClickPcCode(type) {
            this.pcCode = type;
        },
        // reloadVerifyCode() {
        //     this.imgSrc = `http://testsh.rtongcloud.com:6688/shzh/base/api/login/getVerifyCodeImage?time=${_moment()}`;
        // },
        handleSendCode() {
            // this.$refs[this.ruleForm.phone].validate(valid => {
            //     if (valid) {
            //         this.$message({
            //             showClose: true,
            //             message: `发送验证码`
            //         });
            //         this.downTime()
            //     } else {
            //         this.$message({
            //             showClose: true,
            //             message: `请输入手机号码`
            //         });
            //     }
            // });
            if ((/^1[34578]\d{9}$/.test(this.ruleForm.phone)) ||  (/^0([1-9]\d{1,2}\\{0,1}\d{7,8})$/.test(this.ruleForm.phone))) {
                this.sendPhone();
                this.$message({
                    showClose: true,
                    message: `发送验证码`
                });
                this.downTime();
            } else {
                this.$message({
                    showClose: true,
                    message: `请输入正确手机号码`
                });
                // this.$getData.
            }
        },
        //发送手机号
        sendPhone() {
            this.$getData.SendNote({
                phone: this.ruleForm.phone
            }).then((res)=> {
                this._log(`res is:`,res)
                // this.$message({
                //     showClose: true,
                //     message: res.message
                // });
            })
        },
        // 倒计时
        downTime() {
            const that = this;
            if (that.flag) {
                that.flag = false;
                const interval = window.setInterval(() => {
                    // that.setStorage(that.second);
                    if (that.second-- <= 0) {
                        that.second = 60;
                        that.flag = true;
                        window.clearInterval(interval);
                    }
                }, 1000);
            }
        },
        // 表单验证
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // this.$getData.GetNoteCode({
                    //     code: this.ruleForm.verCode,
                    //     phone: this.ruleForm.phone
                    // }).then((res)=> {
                    //     if (res.success === true) {
                    //         this.$message({
                    //             showClose: true,
                    //             message: res.message
                    //         })
                    //     }else {
                    //         this.$message({
                    //             showClose: true,
                    //             message: res.message
                    //         });
                    //     }
                    // })
                    this.loginStatus.loading = true;
                    this.loginStatus.title = `登陆中`;

                    this.loginFun();
                } else {
                    return false;
                }
            });
        },
        // 登录
        loginFun() {
            GetData.Login({
                userName: this.ruleForm.userName,
                passWord: compile.compile(this.ruleForm.passWord),
                verificationCode: compile.compile(this.ruleForm.verificationCode),
                remember: this.ruleForm.remember
            }).then(res => {
                this._log(`login`, res);
                if (res.success === true) {
                    this.SET_USER_INFO(res.data);
                }
                window.location.href = getRequest().service || this.successUrl;
            }).catch(err => {
                this._log(`login...`, err);
            }).always(() => {
                this.loginStatus.loading = false;
                this.loginStatus.title = `登陆`;
            });
        }
    }

};
</script>

<style lang="scss">
    /*.richway-content {*/
        /*max-height: 100rem !important;*/
    /*}*/

    .content-login {
        position: relative;
        height: 100%;
        padding: 0 !important;

        .login-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5rem;
            padding: 0 4.5rem;
            line-height: 5rem;
            background-color: #fff;
            z-index: 3;

            .login-header-logo {
                position: relative;
                top: .65rem;
                width: 3rem;
                height: 3rem;
                display: inline-block;
                background-size: 3rem 3rem;
                background-repeat: no-repeat;
                background-image: url('../images/logo.jpg');
                cursor: pointer;
            }
            .login-header-title {
                font-weight: 700;
                font-size: 2.4rem;
                color: #666666;
                margin-left: 1rem;
                cursor: pointer;
            }

            ul {
                li {
                    display: inline-block;
                    margin: 0 .4rem;
                    color: #6699FF;
                }
            }
        }

        .login-main {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            padding: 0 !important;
            z-index: 2;
            user-select: none;

            .login-bg {
                height: calc(100% - 0);
                overflow-y: auto;
                background-size: cover;
                transition: opacity .3s;
            }

            .login-content {
                position: absolute;
                padding: 1rem;
                width: 20rem;
                height: auto;
                right: 5rem;
                top: 50%;
                background: white;
                border-radius: 8px;
                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.24),
                0px 0px 12px rgba(0, 0, 0, 0.24),
                0px 2px 4px rgba(0, 0, 0, 0.18);
                transform: translate(0, -50%);

                .sub-title {
                    margin: 1rem 0 0.4rem;
                    font-weight: 600;
                    color: #333;
                }

                .content-tab {
                    margin-bottom: 1rem;
                    li {
                        float: left;
                        display: inline-block;
                        width: 50%;
                        cursor: pointer;
                        padding: .2rem .5rem;
                        text-align: center;
                        &:hover {
                            background-color: rgba(0, 0, 0, .1);
                        }
                    }
                    .active {
                        background-color: rgba(0, 0, 0, .1);
                    }
                }

                .pc-code {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    right: -4rem;
                    width: 10rem;
                    height: 2rem;
                    transform: rotate(45deg);
                    overflow: hidden;
                    text-align: center;
                }
                .content-img {
                    display: inline-block;
                    width: 3rem;
                    height: 3rem;
                    background-size: 3rem 3rem;
                    background-repeat: no-repeat;
                    cursor: pointer;
                    transform: rotate(-45deg);
                }
                .content-code-img {
                    background-image: url('../images/code.png');
                }
                .content-pc-img {
                    background-image: url('../images/pc.png');
                }

                .content-item {
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    min-height: 14rem;
                    padding-bottom: 0;

                    .icon-login-before, .icon-eye-close, .icon-phone, .icon-email {
                        font-size: 1rem;
                    }
                }

                .content-code {
                    text-align: center;
                }

                .el-form-item {
                    width: 100%;
                }
                .form-item-input {
                    .el-form-item__content {
                        width: 13.7rem;
                    }
                }

                .form-item-password, .form-item-btn {
                    .el-form-item__content {
                        width: 100%;
                    }
                }

                .content-wap {
                    ul {
                        display: flex;
                        justify-content: space-between;
                    }
                    li {
                        display: inline-block;
                        text-align: center;
                        > span {
                            display: block;
                        }
                        .img {
                            display: inline-block;
                            width: 7rem;
                            height: 7rem;
                            display: inline-block;
                            background-size: 7rem 7rem;
                            background-repeat: no-repeat;
                        }

                        .ios{
                            background-image: url('../images/ios.png');
                        }

                        .android{
                            background-image: url('../images/android.png');
                        }
                    }
                }
            }
        }

        .login-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3.25rem;
            background-color: #108ee9;
            text-align: center;
            line-height: 3.25rem;
            z-index: 3;
            color: #fff;
        }
    }
</style>
