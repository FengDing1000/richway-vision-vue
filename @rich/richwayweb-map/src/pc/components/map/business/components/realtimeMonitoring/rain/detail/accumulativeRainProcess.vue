<template>
	<!--<div-->
	<!--v-loading="loading"-->
	<!--class="rain-chart-table-panel">-->
	<!--<div class="rain-chart-panel">-->
	<!--<ChartAccumulativeRainProcess-->
	<!--:width="chartW"-->
	<!--:height="chartH"-->
	<!--:x-axis-data="xAxisData"-->
	<!--:y-axis-data="yAxisData" />-->
	<!--</div>-->
	<!--</div>-->
	<ChartTablePanel
		v-loading="loading"
		v-model="showTable"
		:show-table="showTable"
	>
		<ChartAccumulativeRainProcess
			slot="chart"
			:width="chartW"
			:height="chartH"
			:x-axis-data="xAxisData"
			:y-axis-data="yAxisData" />
		<el-table
			slot="table"
			:data="dataTable1"
			:max-height="380 * rem"
			stripe
			style="width: 100%;
">
			<el-table-column
				:width="120 * rem"
				prop="tm"
				label="时间">
				<template slot-scope="scope">
					<p :title="scope.row.tm">{{ moment(scope.row.tm).format(`MM-DD HH:mm`) }}</p>
				</template>
			</el-table-column>
			<el-table-column
				prop="drp"
				align="right"
				label="日降雨量(mm)" />
			<el-table-column
				align="right"
				prop="addNum"
				label="累计(mm)">
				<template slot-scope="scope">
					<p :title="scope.row.addNum">{{ scope.row.addNum | _filterNum(1) }}</p>
				</template>
			</el-table-column>
		</el-table>
	</ChartTablePanel>
</template>

<script type="text/ecmascript-6">
import RichWayWebChart from '@rich/richwayweb-chart';
import { _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';

const { mapState } = require(`vuex`);
const moment = require(`moment`);

const ChartTablePanel = r => require.ensure([], () => r(require(`../../water/detail/chartTablePanel`)), `components/map/business/realtimeMonitoring/index`);
const { ChartAccumulativeRainProcess } = RichWayWebChart;

export default {
    // 累计降雨过程
    name: `accumulativeRainProcess`,
    components: {
        ChartAccumulativeRainProcess,
        ChartTablePanel
    },
    filters: {
        _filterNum
    },
    props: {
        stcd: {
            type: String,
            default: ``
        },
        etm: {
            type: String,
            default: ``
        }

    },
    data() {
        return {
            showTable: false,
            loading: false,
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
            return `18.5rem`;
        },
        xAxisData() {
            return this.getAxisData().xAxisData;
        },
        yAxisData() {
            return this.getAxisData().yAxisData;
        },
        dataTable1() {
            let addnumber = 0;
            const Table = this.tableData;
            for (const item of Table) {
                addnumber += item.drp;
                item.addNum = addnumber;
            }
            return Table;
        }
    },
    watch: {
        stcd() {
            this.handleQuery();
        }
    },
    mounted() {
        this.handleQuery();
    },
    methods: {
        handleQuery() {
            this.loading = true;
            if (this.stcd && this.$getData) {
                this.$getData.TimeRainLineMonitor({
                    stcd: this.stcd,
                    etm: this.etm
                }).then((res = {}) => {
                    this.tableData = res.data || [];
                }).always(() => {
                    this.loading = false;
                });
            }
        },
        getAxisData() {
            let rainAdd = 0;
            const xAxisData = [];
            const yAxisData = [
                {
                    name: `时段降雨量`,
                    data: []
                },
                {
                    name: `累计`,
                    data: []
                }
            ];
            for (const item of this.tableData) {
                rainAdd += item.drp;
                xAxisData.push(moment(item.tm).format(`MM-DD HH:mm`));
                yAxisData[0].data.push(item.drp);
                yAxisData[1].data.push(rainAdd);
                // rainAdd = 0;
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
		.rain-chart-table-panel{

		}
</style>
