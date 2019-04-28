<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"
		border
		style="width: 100%
">


		<el-table-column
			prop="VNAME"
			label="城（集）镇名称" />

		<el-table-column
			prop="BELE"
			label="基准点高程(m)" />
		<el-table-column
			prop="ADDRESS"
			label="地址（门牌号） " />
		<el-table-column
			prop="BCODE"
			label="楼房号 " />
		<el-table-column
			prop="HTCOUNT"
			label="户数(户)" />
		<el-table-column
			prop="PTCOUNT"
			label="总人数(人)" />

		<el-table-column
			prop="LTTD"
			label="宅基高程(m) " />
		<el-table-column
			prop="HELE"
			label="建筑面积（m²）" />
		<el-table-column
			prop="AREA"
			label="临水 " />
		<el-table-column
			prop="BWATER"
			label="切坡 " />
		<el-table-column
			prop="BHILL"
			label="建筑类型" />
		<el-table-column
			prop="BTYPE"
			label="结构形式" />
		<el-table-column
			prop="STYPE"
			label="填写人" />
		<el-table-column
			prop="SIGNER"
			label="姓名" />
		<el-table-column
			prop="AUDID"
			label="审核批次号" />
		<el-table-column
			prop="STATUS"
			label="审核状态" />
		<el-table-column
			prop="COMMENTS"
			label="备注" />
	</el-table>
</template>

<script type="text/ecmascript-6">
export default {
    name: `town`,
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
                    tableName: `IA_ECC_DTRESIDENT`,
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
