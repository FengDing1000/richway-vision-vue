<template>
	<div class="el-dialog-content">
		<el-form
			ref="ruleForm"
			:label-position="labelPosition"
			:rules="rules"
			:model="objComputed"
			label-width="6rem">
			<el-form-item
				v-for="(item,index) in menuData"
				v-if="!item.show"
				:key="index"
				:label="item.label"
				:prop="item.key">
				<el-select
					v-if="item.options"
					v-model="objComputed[item.key]"
					style="width: 100%;
">
					<el-option
						v-for="(item,index) in item.options"
						:key="index"
						:label="item.label"
						:value="item.value" />
				</el-select>
				<el-input
					v-else
					:placeholder="placeholderValue(item)"
					:type="inputType(item)"
					v-model="objComputed[item.key]"
					maxlength="50" />

			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
    name: `AddInput`,
    props: {
        menuData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            objComputed: {},
            rules: {
                stcd: [
                    { required: true, message: `请输入测站编码`, trigger: `blur` },
                    { min: 8, max: 8, message: `长度在8个字符`, trigger: `blur` }
                ],
                stnm: [
                    { required: true, message: `请输入测站名称`, trigger: `blur` }
                ]
            }
        };
    },
    watch: {
        menuData: {
            handler(curVal) {
                this.reset(curVal);
            },
            deep: true
        }
    },
    beforeMount() {
        this.reset(this.menuData);
    },
    // computed: {
    //     objComputed() {
    //         const inputObj = {};
    //         this.menuData.forEach(item => {
    //             if (item.options && (item.value === undefined || item.value === null)) {
    //                 inputObj[item.key] = item.options[0].value;
    //             } else {
    //                 inputObj[item.key] = item.value || ``;
    //             }
    //         });
    //         return inputObj;
    //     }
    // },
    methods: {
        placeholderValue(item) {
            return item.important ? `请填写${item.label}` : ``;
        },
        inputType(item) {
            if (item.key === `lgtd` || item.key === `lttd`) {
                return `number`;
            }
            if (item.key === `telephone`) {
                return `tel`;
            }
            return `text`;
        },
        reset(data) {
            const inputObj = {};
            data.forEach(item => {
                if (item.options && (item.value === undefined || item.value === null)) {
                    inputObj[item.key] = item.options[0].value;
                } else {
                    inputObj[item.key] = item.value || ``;
                }
            });
            this.objComputed = inputObj;
        },
        // 解决关闭后  页面不重新渲染
        resetDom() {
            this.$refs.ruleForm.resetFields();
        },
        checkValidate() {
            let bool;
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    bool = true;
                } else {
                    bool = false;
                }
            });
            return bool;
        }
    }
};
</script>

<style scoped>
    .el-dialog-content {
        height: 500px;
        padding: 15px 50px;
        overflow-y: scroll;
        text-align: center;
    }
</style>
