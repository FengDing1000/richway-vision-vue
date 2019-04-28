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
			label="路涵名称" />


		<el-table-column
			prop="HEIGHT"
			label="涵洞高(m) " />
		<el-table-column
			prop="LENGHT"
			label="涵洞长(m) " />
		<el-table-column
			prop="WIDTH"
			label="涵洞宽(m)" />
		<el-table-column
			prop="TYPE"
			label="类型 ">
			<template slot-scope="scope">
				<p>{{ scope.row.TYPE | _filterBtype }}</p>
			</template>

		</el-table-column>
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `culvert`,
    components: {},

    filters: {
        _filterBtype: value => {
            if (value === `1`) return `圆管涵`;
            if (value === `2`) return `拱涵`;
            if (value === `3`) return `盖板涵`;
            if (value === `4`) return `箱涵`;
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
                    tableName: `IA_EGC_CULVERT`,
                    wscd: this.wscd,
                    page: 1,
                    rows: 10
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
