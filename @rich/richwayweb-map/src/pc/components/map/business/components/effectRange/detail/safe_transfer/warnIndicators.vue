<template>
	<el-table
		:data="tableData1"
		:max-height="tableMaxHeight"
		:detail-info="detailInfo"
		align="center"
		border
		style="width: 100%
">
		<el-table-column
			prop="WARNGRADEID"
			align="center"
			label="预警等级">
			<template slot-scope="scope">
				<p :title="scope.row.WARNGRADEID">{{ scope.row.WARNGRADEID | _filterWarnGrade() }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="LWATER"
			align="center"
			label="土壤含水量(mm)" />
		<el-table-column
			prop="STDT"
			align="center"
			label="阈值历时(小时)" />
		<el-table-column
			prop="DRPT"
			align="center"
			label="雨量阈值(mm)" />
		<el-table-column
			prop="CALMATH"
			align="center"
			label="分析方法" />
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `warnIndicators`,
    components: {},
    filters: {
        _filterWarnGrade: value => {
            if (value === 30) return `准备转移`;
            if (value === 31) return `立即转移`;
            return value;
        }
    },
    props: {
        tableMaxHeight: {
            type: Number,
            default: 500
        },
        detailInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            tableData1: []
        };
    },
    watch: {
        detailInfo: {
            handler() {
                this.handleQuery();
            },
            deep: true,
            immediate: false
        }
    },
    mounted() {
        this.handleQuery();
    },
    methods: {
        handleQuery() {
            const { ADCD, WSCD } = this.detailInfo;
            if (ADCD && WSCD) {
                this.loading = true;
                this.$getData.GetRangeDetail({
                    tableName: `IA_A_DFWRULE`,
                    wscd: WSCD,
                    adcd: ADCD
                }).then((res = {}) => {
                    this.tableData1 = res.data || [];
                    this.tableData1 = this.tableData1.sort((a, b) => parseFloat(`${a.STDT}`) - parseFloat(`${b.STDT}`));
                }).always(() => {
                    this.loading = false;
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
