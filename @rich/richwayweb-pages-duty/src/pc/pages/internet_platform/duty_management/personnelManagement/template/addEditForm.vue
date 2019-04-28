<template>
	<div class="richway-user-panel">
		<el-row>
			<el-col :span="15">
				<div class="grid-content bg-purple">
					<el-form
						ref="form"
						:model="form"
						:rules="rules"
						label-width="6rem">
						<el-form-item
							label="值班人员姓名"
							prop="personName">
							<el-input
								v-model="form.personName"
								placeholder="请输入值班人员姓名"
								style="width:70%;
" />
						</el-form-item>
						<el-form-item
							label="值班角色"
							prop="dutyRole">
							<el-select
								v-model="form.dutyRole"
								placeholder="请选择值班角色"
								style="width:70%;
">
								<el-option
									v-for="item in dutyRoleOption"
									:key="item.value"
									:label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
						<el-form-item
							label="手机号码"
							prop="mobile">
							<el-input
								v-model="form.mobile"
								placeholder="请输入手机号"
								maxlength="11"
								style="width:70%;
" />
						</el-form-item>
						<el-form-item
							label="性别"
							prop="sex">
							<el-select
								v-model="form.sex"
								placeholder="请选择性别"
								style="width:70%;
">
								<el-option
									v-for="item in sexOption"
									:key="item.value"
									:label="item.label"
									:value="item.value" />
							</el-select>
						</el-form-item>
						<el-form-item
							style="text-align:center;
">
							<el-button
								type="primary"
								@click="submitForm('form')">确定
							</el-button>
							<el-button @click="cancelForm('form')">取消</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
			<el-col :span="9">
				<div class="grid-content bg-purple-light">
					<el-upload
						:action="action"
						:show-file-list="false"
						:on-success="handleAvatarSuccess"
						class="avatar-uploader">
						<img
							v-if="imageUrl"
							:src="imageUrl"
							class="avatar">
						<i
							v-else
							class="el-icon-plus avatar-uploader-icon" />
					</el-upload>
				</div>
			</el-col>
		</el-row>

	</div>
</template>
<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { UpLoad } = RichWayWebComponents;
export default {
    name: `AddEditForm`,
    components: {
        UpLoad
    },
    props: {
        userInfoCurrent: {
            type: Object,
            default: () => {
            }
        }
        // loading:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data() {
        return {
            imageUrl: ``,
            form: {
                personName: ``,
                dutyRole: ``,
                mobile: ``,
                sex: ``,
                personId: ``,
                crtDt: ``
            },
            rules: {
                personName: [
                    { required: true, message: `请输入值班人员姓名`, trigger: `blur` },
                    { min: 2, max: 4, message: `长度在 2 到 4 个字符`, trigger: `blur` }
                ],
                dutyRole: [
                    { required: true, message: `请选择值班角色`, trigger: `blur` }
                ],
                mobile: [
                    { required: true, message: `请输入手机号`, trigger: `change` },
                    { min: 7, max: 11, message: `长度在 7 到 11 个字符`, trigger: `blur` }
                ]
            },
            dutyRoleOption: [
                {
                    value: `1`,
                    label: `正带班领导`
                }, {
                    value: `2`,
                    label: `值班人员`
                }, {
                    value: `3`,
                    label: `值班司机`
                }, {
                    value: `4`,
                    label: `副带班领导`
                }],
            sexOption: [
                {
                    value: `1`,
                    label: `男`
                }, {
                    value: `0`,
                    label: `女`
                }]
        };
    },
    computed: {
        action() {
            return `${this.$base.path.nodeServiceHost}/api/base/upLoad`;
        }
    },
    watch: {
        userInfoCurrent: {
            immediate: true,
            handler() {
                for (const key in this.form) {
                    if (Object.hasOwnProperty.call(this.form, key)) {
                        this.form[key] = this.userInfoCurrent[key] || ``;
                    }
                }
            }
        }
    },
    mounted() {

    },
    methods: {
        // 点击确定-表单验证
        submitForm(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    this.ExpressSubmitInfo();
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        // 发送数据请求-新增弹框的确定
        ExpressSubmitInfo() {
            this.$getData.ExpressSubmitInfo(this.form).then(res => {
                this.$emit(`on-success`, res);
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击取消
        cancelForm() {
            this.$emit(`on-cancel`);
        },
        // 图片上传的方法
        handleAvatarSuccess(res, file) {
            console.log(333333, res);
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(33333323, this.imageUrl);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === `image/jpeg`;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error(`上传头像图片只能是 JPG 格式!`);
            }
            if (!isLt2M) {
                this.$message.error(`上传头像图片大小不能超过 2MB!`);
            }
            return isJPG && isLt2M;
        }
    }


};
</script>

<style lang="scss">
		.richway-user-panel {
			.el-select,
			.el-cascader {
				width: 100%;
			}

			.avatar-uploader {
				// line-height: 260px;
				width: 70%;
				// background: pink;
				height: 13rem;
				// text-align: center;
				// border: 1px solid #ccc;
			}

			.avatar-uploader .el-upload {
				position: relative;
				border: 1px dashed #d9d9d9;
				border-radius: 6/20rem;
				overflow: hidden;
				cursor: pointer;
			}

			.avatar-uploader .el-upload:hover {
				border-color: #409eff;
			}

			.avatar-uploader-icon {
				width: 10rem;
				height: 13rem;
				font-size: 28/20rem;
				line-height: 13rem;
				text-align: center;
				color: #8c939d;
			}

			.avatar {
				display: block;
				width: 178/20rem;
				height: 178/20rem;
			}

			.addPhoto {
				width: 60%;
				height: 260px;
				border: 1px dashed #ccc;
				border-radius: 4px;
				line-height: 260px;
				text-align: center;

				i {
					font-size: 26px;
				}
			}
		}
</style>
