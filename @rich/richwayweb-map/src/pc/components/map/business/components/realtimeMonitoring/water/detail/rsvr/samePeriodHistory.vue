<template>
	<ChartTablePanel
		v-loading="loading"
		v-model="showTable"
		:show-table="showTable"
	>
		<ChartRsvrHistory
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
				:width="170 * rem"
				prop="data1"
				label="时间" />
			<el-table-column
				prop="data2"
				label="2017" />
			<el-table-column
				prop="data3"
				label="2018" />
		</el-table>
	</ChartTablePanel>
</template>

<script type="text/ecmascript-6">
import RichWayWebChart from '@rich/richwayweb-chart';

const { mapState } = require(`vuex`);
const moment = require(`moment`);

const ChartTablePanel = r => require.ensure([], () => r(require(`../chartTablePanel`)), `components/map/business/realtimeMonitoring/index`);
const { ChartRsvrHistory } = RichWayWebChart;

export default {
    // 历史同期对其
    name: `samePeriodHistory`,
    components: {
        ChartRsvrHistory,
        ChartTablePanel
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
            showTable: true,
            tableData: [
                {
                    data1: `05-03 09:45`,
                    data2: 87655,
                    data3: 85423
                },
                {
                    data1: `05-03 09:45`,
                    data2: 84327,
                    data3: 80543
                },
                {
                    data1: `05-03 09:45`,
                    data2: 78765,
                    data3: 75443
                },
                {
                    data1: `05-03 09:45`,
                    data2: 76876,
                    data3: 69000
                },
                {
                    data1: `05-03 09:45`,
                    data2: 70986,
                    data3: 70000
                },
                {
                    data1: `05-03 09:45`,
                    data2: 59900,
                    data3: 38899
                },
                {
                    data1: `05-03 09:45`,
                    data2: 47899,
                    data3: 37890
                },
                {
                    data1: `05-03 09:45`,
                    data2: 28976,
                    data3: 19876
                },
                {
                    data1: `05-03 09:45`,
                    data2: 37654,
                    data3: 37908
                }, {
                    data1: `05-03 09:45`,
                    data2: 41344,
                    data3: 42345
                },
                {
                    data1: `05-03 09:45`,
                    data2: 53422,
                    data3: 51456
                },
                {
                    data1: `05-03 09:45`,
                    data2: 65432,
                    data3: 63456
                },
                {
                    data1: `05-03 09:45`,
                    data2: 79443,
                    data3: 68908
                },
                {
                    data1: `05-03 09:45`,
                    data2: 85222,
                    data3: 79865
                },
                {
                    data1: `05-03 09:45`,
                    data2: 98433,
                    data3: 89765
                }
            ]
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
                this.$getData.GetWaterDetailLineChartMonitor({
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
                    name: `2017`,
                    data: []
                },
                {
                    name: `2018`,
                    data: []
                }
            ];
            for (const item of this.tableData) {
                xAxisData.push(item.data1);
                yAxisData[0].data.push(item.data2);
                yAxisData[1].data.push(item.data3);
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
