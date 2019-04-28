<template>
	<ChartTablePanel
		v-loading="loading"
		v-model="showTable"
		:show-table="showTable"
	>
		<ChartRsvrProcess
			slot="chart"
			:width="chartW"
			:height="chartH"
			:x-axis-data="xAxisData"
			:y-axis-data="yAxisData" />
		<el-table
			slot="table"
			:data="tableData"
			:max-height="380 * rem"
			stripe
			style="width: 100%;
">
			<el-table-column
				:width="170 * rem"
				prop="data1"
				label="时间" />
			<el-table-column
				prop="data2"
				label="水位(m)" />
			<el-table-column
				prop="data3"
				label="入库流量" />
			<el-table-column
				prop="data4"
				label="出库流量" />
		</el-table>
	</ChartTablePanel>
</template>

<script type="text/ecmascript-6">
import RichWayWebChart from '@rich/richwayweb-chart';

const { mapState } = require(`vuex`);
const moment = require(`moment`);

const ChartTablePanel = r => require.ensure([], () => r(require(`../chartTablePanel`)), `components/map/business/realtimeMonitoring/index`);
const { ChartRsvrProcess } = RichWayWebChart;

export default {
    // 水位流量过程线
    name: `stageDischargeHydrograph`,
    components: {
        ChartRsvrProcess,
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
            showTable: false,
            tableData: []
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
                this.$getData.RsvrFlowLineMonitor({
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
                    name: `水位`,
                    data: []
                },
                {
                    name: `入库流量`,
                    data: []
                },
                {
                    name: `出库流量`,
                    data: []
                }
            ];
            for (const item of this.tableData) {
                xAxisData.push(item.tm);
                yAxisData.push(item.z || 0);
                yAxisData.push(item.inq || 0);
                yAxisData.push(item.otq || 0);
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
