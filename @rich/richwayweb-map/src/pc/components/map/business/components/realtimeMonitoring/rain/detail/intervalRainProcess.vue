<template>
	<!--<div class="rain-chart-table-panel" v-loading="loading">-->
	<!--<div class="rain-chart-panel">-->
	<!--<ChartIntervalRainProcess-->
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
		<ChartIntervalRainProcess
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
			style="width: 100%
">
			<el-table-column
				:width="105 * rem"
				prop="tm"
				label="时间">
				<template slot-scope="scope">
					<p :title="scope.row.tm">{{ moment(scope.row.tm).format(`MM-DD HH:mm`) }}</p>
				</template>
			</el-table-column>
			<el-table-column
				prop="dyp"
				align="right"
				label="日时段降雨(mm)">
				<template slot-scope="scope">
					<p :title="scope.row.dyp">{{ scope.row.dyp |_filterNum(1) }}</p>
				</template>
			</el-table-column>
			<el-table-column
				align="right"
				prop="addNum"
				label="累计(mm)">
				<template slot-scope="scope">
					<p :title="scope.row.addNum">{{ scope.row.addNum |_filterNum(1) }}</p>
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
const { ChartIntervalRainProcess } = RichWayWebChart;

export default {
    // 近7日降雨过程线
    name: `intervalRainProcess`,
    components: {
        ChartIntervalRainProcess,
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
                addnumber += item.dyp;
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
            if (this.stcd && this.$getData) {
                this.loading = true;
                this.$getData.DaysRainLineMonitor({
                    stcd: this.stcd,
                    etm: this.etm
                }).then((res = {}) => {
                    this.tableData = res.data || [];
                    // let addNumber =0
                    // for(const item of this.tableData) {
                    //     addNumber += item.dyp
                    //     this.tableData.push({
                    //         number: addNumber
                    //     })
                    // }
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
                    name: `日降雨`,
                    data: []
                },
                {
                    name: `累计`,
                    data: []
                }
            ];
            for (const item of this.tableData) {
                rainAdd += item.dyp;
                xAxisData.push(moment(item.tm).format(`MM-DD HH:mm`));
                yAxisData[0].data.push(item.dyp);
                yAxisData[1].data.push(rainAdd.toFixed(1));
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
