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
			label="单位名称" />


		<el-table-column
			prop="TYPE"
			label="单位类别 " />
		<el-table-column
			prop="ADDRESS"
			label="地址" />
		<el-table-column
			prop="AREA"
			label="占地面积 " />
		<el-table-column
			prop="PCOUNT"
			label="在岗人数 " />
		<el-table-column
			prop="HCOUNT"
			label="房屋数量 " />
		<el-table-column
			prop="AVALUE"
			label="固定资产 " />
		<el-table-column
			prop="OVALUE"
			label="年产值 " />
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `village`,
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
                    tableName: `IA_ECC_BSNSSINFO`,
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
