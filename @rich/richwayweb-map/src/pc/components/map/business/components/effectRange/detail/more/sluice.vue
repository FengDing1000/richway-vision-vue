<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"
		border
		style="width: 100%
">
		<el-table-column
			prop="SPCD"
			label="水闸索引" />
		<el-table-column
			prop="GATE_CODE"
			label="水闸编码" />
		<el-table-column
			prop="GATE_NAME"
			label="水闸名称" />
		<el-table-column
			prop="RV_CODE"
			label="河流（湖、库、渠、
海堤）编码" />
		<el-table-column
			prop="ADCD"
			label="行政区划代码" />
		<el-table-column
			prop="WSCD"
			label="小流域代码" />
		<el-table-column
			prop="GATE_TYPE"
			label="水闸类型 " />
		<el-table-column
			prop="HOLE_NUM"
			label="闸孔数量(孔) " />
		<el-table-column
			prop="HOLE_WID"
			label="闸孔总净宽(m)" />
		<el-table-column
			prop="FL_GATE_FLOW"
			label="过闸流量(m³/s)" />
		<el-table-column
			prop="RUB_DAM_HIG"
			label="橡胶坝坝高(m) " />
		<el-table-column
			prop="RUB_DAM_LEN"
			label="橡胶坝坝长(m) " />

	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `sluice`,
    components: {},
    props: {
        tableMaxHeight: {
            type: Number,
            default: 500
        },
        detailInfo: {
            type: Object,
            default: () => {
            }
        },
        wscd: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            loading: false,
            tableData1: []
        };
    },
    watch: {
        wscd() {
            this.handleQuery();
        }
    },
    mounted() {
        this.handleQuery();
    },
    methods: {
        handleQuery() {
            if (this.wscd) {
                this.loading = true;
                this.$getData.GetRangeDetail({
                    tableName: `IA_EGC_SLUICE`,
                    wscd: this.wscd
                }).then((res = {}) => {
                    this.tableData1 = res.data || [];
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
