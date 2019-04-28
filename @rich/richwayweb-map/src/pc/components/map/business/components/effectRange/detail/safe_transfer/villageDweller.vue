<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"
		:detail-info="detailInfo"
		align="center"
		border
		style="width: 100%
">
		<el-table-column
			prop="NAME"
			align="center"
			label="户主名称" />
		<el-table-column
			prop="PTCOUNT"
			align="center"
			label="家庭人口(人)" />
		<el-table-column
			prop="AREA"
			align="center"
			label="建筑面积(m²)" />
		<el-table-column
			prop="BTYPE"
			align="center"
			label="建筑类型">
			<template slot-scope="scope">
				<p>{{ scope.row.BTYPE | _filterBtype }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="BWATER"
			align="center"
			label="临水">
			<template slot-scope="scope">
				<p>{{ scope.row.BWATER | _filterIs }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="BHILL"
			align="center"
			label="切坡">
			<template slot-scope="scope">
				<p>{{ scope.row.BHILL | _filterIs }}</p>
			</template>
		</el-table-column>
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `baseInformation`,
    components: {},
    filters: {
        _filterBtype: value => {
            if (value === `1`) return `一层住宅`;
            if (value === `2`) return `二层住宅`;
            if (value === `3`) return `三层住宅`;
            if (value === `4`) return `三层以上住宅`;
            return value;
        },
        _filterIs: value => {
            if (value === 0) return `是`;
            if (value === 1) return `否`;
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
            loading: false,
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
            const { ADCD } = this.detailInfo;
            const { WSCD } = this.detailInfo;
            if (ADCD && WSCD) {
                this.loading = true;
                this.$getData.GetRangeDetail({
                    tableName: `IA_ECC_FLRVVLG`,
                    wscd: WSCD,
                    adcd: ADCD
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
