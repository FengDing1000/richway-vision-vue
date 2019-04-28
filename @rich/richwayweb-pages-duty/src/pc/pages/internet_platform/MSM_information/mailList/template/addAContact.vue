<template>
	<div>
		<!-- <div>{{cascaderInfo.pop()}}</div> -->
		<el-form
			ref="form"
			:model="form"
			:rules="rules"
			label-width="80px">
			<el-form-item label="联系组">
				<el-cascader
					:disabled="disabled"
					:placeholder="placeholder"
					:show-all-levels="false"
					:props="defaultProps"
					:options="dataList"
					v-model="newselectedOptions"
					style="width:100%;"
					change-on-select
					filterable
					@change="cascaderChange" />
			</el-form-item>
			<el-form-item
				label="姓名"
				prop="contactsName">
				<el-input
					v-model="form.contactsName"
					maxlength="4"
					placeholder="请输入姓名" />
			</el-form-item>
			<el-form-item
				label="手机号"
				prop="mobile">
				<el-input
					v-model="form.mobile"
					maxlength="11"
					placeholder="请输入手机号" />
			</el-form-item>
			<el-form-item
				label="电子邮箱"
				prop="email">
				<el-input
					v-model="form.email"
					placeholder="请输入电子邮箱" />
			</el-form-item>
			<el-form-item
				label="地址"
				prop="address">
				<el-input
					v-model="form.address"
					type="textarea"
					placeholder="请输入地址" />
			</el-form-item>
			<el-form-item
				label="职位"
				prop="position">
				<el-input
					v-model="form.position"
					placeholder="请输入职位" />
			</el-form-item>
			<el-form-item
				label="排序号"
				prop="orderSort">
				<el-input
					v-model="form.orderSort"
					maxlength="50"
					placeholder="请输入排序号" />
			</el-form-item>
			<el-form-item
				label="备注"
				prop="nt">
				<el-input
					v-model="form.nt"
					type="textarea"
					maxlength="200"
					placeholder="请输入备注" />
			</el-form-item>
			<el-form-item>
				<div class="elFormItemBtn">
					<el-button
						type="primary"
						@click="handleSucces('form')">确定
					</el-button>
					<el-button @click="handleCancel('form')">取消</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/ecmascript-6">

export default {
    name: `addAContact`,
    props: {
        userInfo: {
            type: Object,
            default: () => {
            }
        },
        dataList: {
            type: Array,
            default: () => []
        },
        cascaderInfo: {
            type: Object,
            default: () => {}
        },
        isAddEdit: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            form: {
                deptCd: ``, // 部门编码
                deptParentNm: ``,
                contactsName: ``,
                contactsId: ``, // 人员id
                mobile: ``,
                email: ``,
                address: ``,
                position: ``,
                orderSort: ``,
                nt: ``,
                adCd: ``, // 政区编码
                contactGroup: ``
            },
            defaultProps: {
                value: `deptCd`,
                label: `deptNm`,
                children: `children`
            },
            rules: {
                contactGroup: [
                    { required: true, message: `请选择联系组`, trigger: `blur` }
                ],
                contactsName: [
                    { required: true, message: `请输入姓名`, trigger: `change` },
                    { min: 2, max: 4, message: `长度在 2 到 4个字符`, trigger: `blur` }
                ],
                mobile: [
                    { required: true, message: `请输入手机号`, trigger: `change` },
                    { min: 7, max: 11, message: `长度在 7 到 11 个字符`, trigger: `blur` }
                ],
                email: [
                    { type: `email`, message: `请输入正确的邮箱地址`, trigger: `change` }
                ],
                address: [
                    { message: `请输入住址`, trigger: `change` },
                    { min: 0, max: 50, message: `长度在 0 到 50 个字符`, trigger: `blur` }
                ],
                position: [
                    { message: `请输入职位`, trigger: `change` },
                    { min: 0, max: 50, message: `长度在 0 到 50 个字符`, trigger: `blur` }
                ],
                orderSort: [
                    { message: `请输入排序`, trigger: `change` }
                ],
                nt: [
                    { message: `请输入备注`, trigger: `change` },
                    { min: 0, max: 200, message: `长度在 0 到 200 个字符`, trigger: `blur` }
                ]
            },
            disabled: false,
            placeholder: `请选择联系组`
        };
    },
    computed: {
        newselectedOptions() {
            return this.cascaderInfo;
        }
    },
    watch: {
        userInfo: {
            immediate: true,
            deep: true,
            handler() {
                if (Object !== {}) {
                    this.newselectedOptions = [];
                }
                for (const key in this.form) {
                    if (Object.hasOwnProperty.call(this.form, key)) {
                        this.form[key] = this.userInfo[key] || ``;
                    }
                }
                Object.keys(this.userInfo).length === 0 ? this.disabled = false : this.disabled = true;
            }

        },
        // cascaderInfo: {
        //     immediate: true,
        //     deep: true,
        //     handler(val) {
        //         console.log(444444444444, val);
        //     }
        // },
        data(val) {
            this.options = val;
        },
        isAddEdit(val) {
            if (!val) {
                this.newselectedOptions = [];
            }
        }
    },
    mounted() {},
    methods: {
        // 分级添加——点击确定
        handleSucces(form) {
            this.$refs[form].validate(valid => {
                if (!this.form.deptCd) {
                    const len = this.cascaderInfo.length;
                    this.form.deptCd = this.cascaderInfo[len - 1];
                    this.form.deptParentNm = this.cascaderInfo[len - 1];
                }
                if (valid) {
                    this.$getData.AddEditContact(this.form).then(() => {
                        this.$emit(`handleSure`, true);
                    }).catch(err => {
                        this.$emit(`on-failed`, err);
                    });
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },
        // cascader的选项发生改变
        cascaderChange(item) {
            this._log(555555, item);
            const lastdeptCd = item[item.length - 1];
            this.form.deptCd = lastdeptCd;
            this.form.deptParentNm = lastdeptCd;
        },
        // 取消
        handleCancel(form) {
            this.$emit(`handleCancel`);
            this.$refs[form].resetFields();
        }
    }
};
</script>

<style lang="scss">
.elFormItemBtn {
    float: right;
}

</style>
