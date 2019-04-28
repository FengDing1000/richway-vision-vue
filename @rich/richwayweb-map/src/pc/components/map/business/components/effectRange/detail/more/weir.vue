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
			label="塘堰名称" />
		<el-table-column
			prop="WSCD"
			label="小流域代码" />

		<el-table-column
			prop="PICID"
			label="照片编号" />

		<el-table-column
			prop="XHST"
			label="容积(m³) " />
		<el-table-column
			prop="HEIGHT"
			label="坝高(m) " />
		<el-table-column
			prop="WIDTH"
			label="坝长(m)" />
		<el-table-column
			prop="MT"
			label="挡水主坝类型 " />
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `weir`,
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
                    tableName: `IA_EGC_DAMINFO`,
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
