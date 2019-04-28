<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"
		:detail-info="detailInfo"
		border
		style="width: 100%
">

		<el-table-column
			prop="NAME"
			label="桥梁名称" />


		<el-table-column
			prop="LENGTH"
			label="桥长(m) " />
		<el-table-column
			prop="WIDTH"
			label="桥宽(m) " />
		<el-table-column
			prop="HEIGHT"
			label="桥高(m)" />
		<el-table-column
			prop="TYPE"
			label="类型 ">
			<template slot-scope="scope">
				<p>{{ scope.row.TYPE | _filterBridge }}</p>
			</template>

		</el-table-column>

	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `bridge`,
    components: {},
    // 1：梁桥；2：浮桥；3：索桥；4：拱桥
    filters: {
        _filterBridge: value => {
            if (value === `1`) return `梁桥`;
            if (value === `2`) return `浮桥`;
            if (value === `3`) return `索桥`;
            if (value === `4`) return `拱桥`;
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
                    tableName: `IA_EGC_BRIDGE`,
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
