<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"
		border
		style="width: 100%
">

		<el-table-column
			prop="PTCOUNT"
			label="总人口" />
		<el-table-column
			prop="LDAREA"
			label="土地面积" />
		<el-table-column
			prop="PLAREA"
			label="耕地面积" />
		<el-table-column
			prop="ETCOUNT"
			label="总户数" />
		<el-table-column
			prop="ECOUNT1"
			label="Ⅰ类经济户数 " />
		<el-table-column
			prop="ECOUNT2"
			label="Ⅱ类经济户数 " />
		<el-table-column
			prop="ECOUNT3"
			label="Ⅲ类经济户数 " />
		<el-table-column
			prop="ECOUNT4"
			label="Ⅳ类经济户数 " />
		<el-table-column
			prop="HTCOUNT"
			label="总房屋数" />
		<el-table-column
			prop="HCOUNT1"
			label="Ⅰ类房屋数 " />
		<el-table-column
			prop="HCOUNT2"
			label="Ⅱ类房屋数 " />
		<el-table-column
			prop="HCOUNT3"
			label="Ⅲ类房屋数 " />
		<el-table-column
			prop="HCOUNT4"
			label="Ⅳ类房屋数 " />
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `preventionArea`,
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
                    tableName: `IA_ADC_PREVAD`,
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
