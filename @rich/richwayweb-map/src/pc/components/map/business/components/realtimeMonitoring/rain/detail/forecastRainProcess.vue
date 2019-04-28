<template>
	<!--<div-->
	<!--v-loading="loading"-->
	<!--class="rain-chart-table-panel">-->
	<!--<div class="rain-chart-panel">-->
	<!--<ChartForecastRainProcess-->
	<!--:width="chartW"-->
	<!--:height="chartH"-->
	<!--:sub-title="subTitle"-->
	<!--:x-axis-data="xAxisData"-->
	<!--:y-axis-data="yAxisData" />-->
	<!--</div>-->
	<!--</div>-->
	<ChartTablePanel
		v-loading="loading"
		v-model="showTable"
		:show-table="showTable"
	>
		<ChartForecastRainProcess
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
				:width="109 * rem"
				prop="datetime"
				label="时间">
				<template slot-scope="scope">
					<p :title="scope.row.datetime">{{ moment(scope.row.datetime).format(`MM-DD HH:mm`) }}</p>
				</template>
			</el-table-column>
			<el-table-column
				prop="value"
				align="right"
				label="降雨强度(mm/min)">
				<template slot-scope="scope">
					<p :title="scope.row.value">{{ scope.row.value | _filterNum(1) }}</p>
				</template>
			</el-table-column>
			<el-table-column
				:width="120 * rem"
				align="right"
				prop="addNum"
				label="累计(mm/min)">
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
const { ChartForecastRainProcess } = RichWayWebChart;

export default {
    // 未来48小时降雨过程
    name: `forecastRainProcess`,
    components: {
        ChartForecastRainProcess,
        ChartTablePanel
    },
    filters: {
        _filterNum
    },
    props: {
        detailInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            showTable: false,
            loading: false,
            title: ``,
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
        subTitle() {
            return this.title;
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
                addnumber += item.value;
                item.addNum = addnumber;
            }
            return Table;
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
            if (this.detailInfo.lgtd && this.$getData) {
                this.loading = true;
                this.$getData.FutureRainLineMonitor({
                    lgtd: this.detailInfo.lgtd,
                    lttd: this.detailInfo.lttd
                }).then((res = {}) => {
                    this.title = res.data.result.forecast_keypoint;
                    this.tableData = res.data.result.hourly.precipitation || [];
                }).catch(err => {
                    this._log(`err is666`, err);
                }).always(() => {
                    this.loading = false;
                });
            }
        },
        getAxisData() {
            const xAxisData = [];
            const yAxisData = [
                {
                    name: `降雨强度`,
                    data: []
                }
            ];
            for (const item of this.tableData) {
                xAxisData.push(moment(item.datetime).format(`MM-DD HH:mm`));
                yAxisData[0].data.push(_filterNum(item.value, 2));
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
