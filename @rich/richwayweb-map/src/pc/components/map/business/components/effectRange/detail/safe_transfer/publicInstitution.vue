<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:detail-info="detailInfo"
		:data="tableData1"
		border
		style="width: 100%
">
		<el-table-column
			align="center"
			prop="NAME"
			label="单位名称" />
		<el-table-column
			align="center"
			prop="OCODE"
			label="组织机构代码" />
		<el-table-column
			align="center"
			prop="ADDRESS"
			label="地址" />
		<el-table-column
			align="center"
			prop="ADCD"
			label="驻地的行政区划代码" />

	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `baseInformation`,
    components: {},
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
                    tableName: `IA_ECC_BSNSSINFO`,
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
