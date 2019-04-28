<template>
	<el-table
		:data="DutyRegister"
		:show-header="false"
		stripe="true"
		style="width:100%;
">
		<el-table-column
			prop="left"
			width="300" />
		<el-table-column
			prop="right" />
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `DutyRegisterTable`,
    props: {
        dutyRegisterTableInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        DutyRegister() {
            return [
                {
                    left: `降雨情况`,
                    right: this.dutyRegisterTableInfo.rainInfo
                },
                {
                    left: `江河水情`,
                    right: this.dutyRegisterTableInfo.waterInfo
                },
                {
                    left: `水库运行`,
                    right: this.dutyRegisterTableInfo.reserviorInfo
                },
                {
                    left: `对下一值班建议`,
                    right: this.dutyRegisterTableInfo.dutySuggest
                }
            ];
        }
    },
    mounted() {

    },
    methods: {}
};
</script>

<style lang="scss" scoped>
</style>
