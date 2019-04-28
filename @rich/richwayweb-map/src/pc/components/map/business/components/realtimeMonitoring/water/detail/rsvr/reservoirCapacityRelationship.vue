<template>
	<ChartTablePanel
		v-loading="loading"
		v-model="showTable"
		:show-table="showTable"
	>
		<ChartRsvrStorage
			slot="chart"
			:width="chartW"
			:height="chartH"
			:x-axis-data="xAxisData"
			:y-axis-data="yAxisData" />
		<el-table
			slot="table"
			:data="tableData"
			:max-height="300 * rem"
			stripe
			style="width: 100%;
">
			<el-table-column
				:width="110 * rem"
				prop="tm"
				label="时间">
				<template slot-scope="scope">
					<p :title="scope.row.tm">{{ moment(scope.row.tm).format(`MM-DD HH:mm`) }}</p>
				</template>
			</el-table-column>
			<el-table-column
				align="right"
				prop="rz"
				label="水位(m)">
				<template slot-scope="scope">
					<p :title="scope.row.rz">{{ scope.row.rz |_filterNum() }}</p>
				</template>
			</el-table-column>
			<el-table-column
				align="right"
				prop="w"
				label="库容(百万m³)" />
		</el-table>
	</ChartTablePanel>
</template>

<script type="text/ecmascript-6">
import RichWayWebChart from '@rich/richwayweb-chart';
import { _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';

const { mapState } = require(`vuex`);

const moment = require(`moment`);

const ChartTablePanel = r => require.ensure([], () => r(require(`../chartTablePanel`)), `components/map/business/realtimeMonitoring/index`);
const { ChartRsvrStorage } = RichWayWebChart;

export default {
    // 水库库容关系
    name: `reservoirCapacityRelationship`,
    components: {
        ChartRsvrStorage,
        ChartTablePanel
    },
    filters: {
        _filterNum
    },
    props: {
        detailInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            loading: false,
            showTable: false,
            tableData: [],
            moment
        };
    },
    computed: {
        ...mapState([`rem`]),
        chartW() {
            return this.showTable ? `38rem` : `57rem`;
        },
        chartH() {
            return `20rem`;
        },
        xAxisData() {
            return this.getAxisData().xAxisData;
        },
        yAxisData() {
            return this.getAxisData().yAxisData;
        }
    },
    watch: {
        detailInfo: {
            immediate: true,
            deep: true,
            handler() {
                this.handleQuery();
            }
        }
    },
    mounted() {
        this.handleQuery();
    },
    methods: {
        handleQuery() {
            if (this.detailInfo.stcd && this.$getData) {
                this.loading = true;
                this.$getData.RsvrCapacityLineMonitor({
                    stcd: this.detailInfo.stcd,
                    stm: (moment().format(`HH`) < 8 ? (moment().add(-1, `d`)) : moment()).hour(8).minute(0).second(0).format(`YYYY-MM-DD HH:mm`),
                    etm: moment().format(`YYYY-MM-DD HH:mm:ss`)
                }).then((res = {}) => {
                    this.tableData = res.data || [];
                }).always(() => {
                    this.loading = false;
                });
            }
        },
        getAxisData() {
            const xAxisData = [];
            const yAxisData = [
                {
                    name: `库容`,
                    data: []
                }
                // {
                //     name: `入库流量`,
                //     data: []
                // },
                // {
                //     name: `出库流量`,
                //     data: []
                // }
            ];
            for (const item of this.tableData) {
                xAxisData.push(item.w);
                yAxisData.push(item.rz);
            }
            return {
                xAxisData,
                yAxisData
            };
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
