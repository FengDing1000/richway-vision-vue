<template>
	<el-table
		v-loading="loading"
		:data="tableData1"
		:max-height="tableMaxHeight"
		:detail-info="detailInfo"
		border
		style="width: 100%
">
		<el-table-column
			prop="OTIME"
			width="100px"
			label="发生时间" />
		<el-table-column
			prop="ADDRESS"
			width="150px"
			label="灾害发生地点">
			<template slot-scope="scope">
				<p :title="scope.row.ADDRESS">{{ scope.row.ADDRESS | _filterStlc(5) }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="PFRAIN"
			width="100px"
			align="center"
			label="过程降雨量(mm)" />
		<el-table-column
			prop="DPCOUNT"
			width="100px"
			align="center"
			label="死亡人数(人)" />
		<el-table-column
			prop="MPCOUNT"
			width="100px"
			align="center"
			label="失踪人数(人)" />
		<el-table-column
			prop="CHCOUNT"
			width="100px"
			align="center"
			label="损毁房屋(间)" />
		<el-table-column
			prop="SPCOUNT"
			width="100px"
			align="center"
			label="转移人数(人)" />
		<el-table-column
			prop="ELOSE"
			width="100px"
			align="center"
			label="直接经济损失(万元)" />
		<el-table-column
			prop="DDSCRIB"
			label="灾害描述" />
	</el-table>
</template>

<script type="text/ecmascript-6">
import { _filterStlc } from '@rich/richwayweb-utils/lib/filter/filterStation';

export default {
    name: `disasterStatistics`,
    components: {},
    filters: {
        _filterStlc
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
            const { WSCD } = this.detailInfo;
            if (WSCD) {
                this.loading = true;
                this.$getData.GetRangeDetail({
                    tableName: `IA_HSC_HSFWATER`,
                    wscd: WSCD
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
