<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"
		border
		style="width: 100%
">

		<el-table-column
			prop="NAME"
			label="户主名称" />

		<el-table-column
			prop="BELE"
			label="基准点高程(m) " />
		<el-table-column
			prop="PTCOUNT"
			label="家庭人口(人) " />
		<el-table-column
			prop="AREA"
			label="建筑面积(m²) " />
		<el-table-column
			prop="BTYPE"
			label="建筑类型">
			<template slot-scope="scope">
				<p>{{ scope.row.BTYPE | _filterBtype }}</p>
			</template>

		</el-table-column>
		<el-table-column
			prop="STYPE"
			label="结构形式 ">
			<template slot-scope="scope">
				<p>{{ scope.row.STYPE | _filterStruct }}</p>
			</template>

		</el-table-column>


		<el-table-column
			prop="BWATER"
			label="临水 " />
		<el-table-column
			prop="BHILL"
			label="切坡 " />
		<el-table-column
			prop="HCOUNT4"
			label="Ⅳ类房屋数 " />
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `riversideVillage`,
    components: {},
    filters: {
        _filterBtype: value => {
            if (value === `1`) return `1 层住宅`;
            if (value === `2`) return `2 层住宅`;
            if (value === `3`) return `3 层住宅`;
            if (value === `4`) return `3层以上住宅`;
            return value;
        },
        _filterStruct: value => {
            if (value === `1`) return `钢筋混凝土结构`;
            if (value === `2`) return `混合结构`;
            if (value === `3`) return `砖木结构`;
            if (value === `4`) return `其他结构`;
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
                    tableName: `IA_ECC_FLRVVLG`,
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
