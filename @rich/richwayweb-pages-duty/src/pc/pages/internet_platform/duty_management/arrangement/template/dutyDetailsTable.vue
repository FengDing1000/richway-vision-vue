<template>
	<div class="duty-details-table">
		<el-table
			:data="dutyDetails"
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
		<el-button
			type="primary"
			class="elButtonClose"
			@click="closeWindow()">关闭
		</el-button>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `DutyDetailsTable`,
    props: {
        dutyDetailsCurrent: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        dutyDetails() {
            return [
                {
                    left: `值班日期:`,
                    right: this.dutyDetailsCurrent.scheduleDate
                },
                {
                    left: `值班开始时间：`,
                    right: this.dutyDetailsCurrent.scheduleStm
                },
                {
                    left: `值班结束时间：`,
                    right: this.dutyDetailsCurrent.scheduleEtm
                },
                {
                    left: `正带班领导：`,
                    right: this.dutyDetailsCurrent.realLeadNames
                },
                {
                    left: `副带班领导：`,
                    right: this.dutyDetailsCurrent.realViceLeadNames
                },
                {
                    left: `值班人员：`,
                    right: this.dutyDetailsCurrent.realMemberNames
                },
                {
                    left: `司机：`,
                    right: this.dutyDetailsCurrent.realDriverNames
                },
                {
                    left: `换班原因：`,
                    right: this.dutyDetailsCurrent.changeReason // 随便写得一个值
                }
            ];
        }
    },
    methods: {
        // 关闭
        closeWindow() {
            this.$emit(`on-close`);
        }
    }
};
</script>

<style lang="scss" scoped>
		.duty-details-table {
			.el-select,
			.el-cascader {
				width: 100%;
			}

			.elButtonClose {
				margin-top: .5rem;
				margin-left: 90%;
			}
		}
</style>
