<template>
	<div>
		<!-- <div>{{fatherInfo}}</div> -->
		<!-- <div>{{treeDateInfo}}</div> -->
		<el-form
			:model="form"
			:rules="rules"
			size="mini">
			<!-- <el-form-item label="父级分组">
            <el-input v-model="fatherDeptNm" placeholder="请输入父级分组" :disabled=newAdd></el-input>
            <el-cascader
                :show-all-levels="false"
                :props="defaultProps"
                :options="dataTree"
                change-on-select
                @change="handleChange"
                ></el-cascader>
        </el-form-item> -->
			<el-form-item
				label="分组名称"
				label-width="4rem"
				prop="name2">
				<el-input
					v-model="form.name2"
					placeholder="请输入分组名称"
					style="width:90%;
" />
			</el-form-item>
			<el-form-item>
				<div class="richway-right">
					<el-button
						type="primary"
						@click="handleSucces()">确定
					</el-button>
					<el-button @click="handleCancel()">取消</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/ecmascript-6">

export default {
    name: `newAddDialog`,
    props: {
        treeDateInfo: {
            type: Object,
            default: () => {
            }
        },
        dataTree: {
            type: Object,
            default: () => {
            }
        },
        deptNm: {
            type: String,
            default: ``
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        isAdd: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                name2: this.deptNm || ``
            },
            data: {},
            defaultProps: {
                value: `deptCd`,
                label: `deptNm`, //
                children: `children`,
                appId: `appId`
            },
            selectedOptions3: [],
            rules: {
                name2: [
                    { required: true, message: `请输入分组`, trigger: `blur` },
                    { min: 1, max: 50, message: `长度在 0 到 50个字符`, trigger: `blur` }
                ]
            }
        };
    },
    computed: {
        isEditFmt() {
            let addr = ``;
            let deptcd = ``;
            if (this.isEdit) {
                addr = `1`;
                deptcd = this.treeDateInfo.deptCd;
            } else {
                addr = ``;
                deptcd = ``;
            }
            return {
                addr,
                deptcd
            };
        }
    },
    watch: {
        deptNm(val) {
            this.form.name2 = val;
        }
    },
    mounted() {
    },
    methods: {
        // 选择父级
        handleChange(data) {
            const deptCd = data.pop();
            this.deptCd = deptCd;
        },
        // 分级添加——点击确定
        handleSucces() {
            this.$emit(`handleSuccess`);
            let info = {};
            const add = {
                deptParentNm: this.treeDateInfo.deptCd,
                deptParent: this.treeDateInfo.deptCd,
                deptNm: this.form.name2,
                deptCd: this.isEditFmt.deptcd,
                appId: this.treeDateInfo.appId,
                adlCd: this.treeDateInfo.adlCd,
                addr: this.isEditFmt.addr,
                nt: this.treeDateInfo.nt
            };
            const edit = {
                deptParentNm: this.treeDateInfo.deptParent || ``,
                deptParent: this.treeDateInfo.deptParent || ``,
                deptNm: this.form.name2,
                deptCd: this.isEditFmt.deptcd || ``,
                appId: this.treeDateInfo.appId || ``,
                adlCd: this.treeDateInfo.adlCd || ``,
                addr: this.isEditFmt.addr || ``,
                nt: this.treeDateInfo.nt || ``
            };
            this.isAdd ? info = add : info = edit;
            if (!this.form.name2) {
                this.$message({
                    message: `警告，请输入分组名称`,
                    type: `warning`
                });
                return;
            }
            this.$getData.AddAContact(info).then(() => {
                this.$getData.GetContactList().then(res => {
                    this.data = res.data;
                    this.form.name1 = ``;
                    this.$emit(`sendContact`, this.data);
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 取消
        handleCancel() {
            this.$emit(`handleCancel`);
            this.form.name1 = ``;
            this.form.name2 = ``;
        }
    }
};
</script>

<style lang="scss">


</style>
