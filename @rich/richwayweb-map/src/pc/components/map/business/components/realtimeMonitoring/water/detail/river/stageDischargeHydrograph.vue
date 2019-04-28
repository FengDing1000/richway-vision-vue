<template>
	<div
		v-loading="loading"
		class="water-chart-table-panel">
		<div class="water-chart-panel">
			<div class="water-time-change">
				<el-button
					type="info"
					round
					size="mini"
					@click="timeQuery(sevenTime.stm, sevenTime.etm)">七天内</el-button>
				<el-button
					class="halfMonth"
					type="info"
					round
					size="mini"
					@click="timeQuery(monthsTime.stm, monthsTime.etm)">半月内</el-button>
			</div>
			<div class="water-chart-query">
				<el-date-picker
					v-model="ruleForm.stm"
					class="sizeWidth"
					size="mini"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm"
					format="yyyy-MM-dd HH:mm"
					placeholder="选择日期" />
				<span>至</span>
				<el-date-picker
					v-model="ruleForm.etm"
					class="sizeWidth"
					size="mini"
					type="datetime"
					value-format="yyyy-MM-dd HH:mm"
					format="yyyy-MM-dd HH:mm"
					placeholder="选择日期" />
				<el-button
					type="primary"
					round
					size="mini"
					@click="handleQuery">查询</el-button>
			</div>

			<ChartRiverProcess
				:width="chartW"
				:height="chartH"
				:x-axis-data="xAxisData"
				:y-axis-data="yAxisData" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebChart from '@rich/richwayweb-chart';
import { _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';

const { mapState } = require(`vuex`);
const moment = require(`moment`);

const { ChartRiverProcess } = RichWayWebChart;
export default {
    // 水位流量过程线
    name: `stageDischargeHydrograph`,
    components: {
        ChartRiverProcess
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
            ruleForm: {
                stm: (moment().format(`HH`) < 8 ? (moment().add(-1, `d`)) : moment()).hour(8).minute(0).second(0).format(`YYYY-MM-DD HH:mm`),
                etm: moment().format(`YYYY-MM-DD HH:mm`)
            },
            sevenTime: {
                stm: moment().subtract(1, `weeks`).hour(8).minute(0)
                    .second(0)
                    .format(`YYYY-MM-DD HH:mm`),
                etm: moment().format(`YYYY-MM-DD HH:mm`)
            },
            monthsTime: {
                stm: moment().subtract(2, `weeks`).hour(8).minute(0)
                    .second(0)
                    .format(`YYYY-MM-DD HH:mm`),
                etm: moment().format(`YYYY-MM-DD HH:mm`)
            },
            tableData: []
        };
    },
    computed: {
        ...mapState([`rem`]),
        chartW() {
            return `57rem`;
        },
        chartH() {
            return `18.5rem`;
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
                this.$getData.RiverflowLineMonitor({
                    stcd: this.detailInfo.stcd,
                    stm: this.ruleForm.stm,
                    etm: this.ruleForm.etm
                }).then((res = {}) => {
                    this.tableData = res.data || [];
                }).always(() => {
                    this.loading = false;
                });
            }
        },
        timeQuery(stm, etm) {
            this._log(`2222`, stm, etm);
            if (this.detailInfo.stcd && this.$getData) {
                this.loading = true;
                this.$getData.RiverflowLineMonitor({
                    stcd: this.detailInfo.stcd,
                    stm,
                    etm
                }).then((res = {}) => {
                    this.tableData = res.data || [];
                }).always(() => {
                    this.loading = false;
                });
            }
        },
        getAxisData() {
            // const maxMin = {'min':undefined, 'max':100};
            const xAxisData = [];
            const yAxisData = [
                {
                    name: `水位`,
                    data: []
                },
                {
                    name: `警戒水位`,
                    data: []
                },
                {
                    name: `保证水位`,
                    data: []
                },
                {
                    name: `流量`,
                    data: []
                },
                {
                    name: `	警戒流量`,
                    data: []
                }

            ];
            for (const item of this.tableData) {
                xAxisData.push(moment(item.tm).format(`MM-DD HH:mm`));
                yAxisData[0].data.push(item.zvalue);
                yAxisData[1].data.push(item.wrz);
                yAxisData[2].data.push(item.grz);
                yAxisData[3].data.push(_filterNum(item.qvalue, 3));
                yAxisData[4].data.push(_filterNum(item.wrq, 3));
            }
            // const maxMin = {'min':undefined, 'max':100};
            // for(let i =0; i<yAxisData.length; i++) {
            //     yAxisData[i].min = (maxMin.min!==undefined && (maxMin.min - 10) >0) ? (maxMin.min - 10) : 0;
            //     yAxisData[i].max = 100;
            // }
            return {
                xAxisData,
                yAxisData
            };
        }
    }
};
</script>

<style lang="scss" scoped>
		.water-chart-table-panel{
			position: relative;

			.water-time-change {
				position: absolute;
				z-index: 999999;
				left: 42rem;

				.halfMonth {
					margin-left: 5rem;
				}
			}

			.water-chart-query{
				position: absolute;
				z-index: 999999;
				top: 2rem;
				left: 38rem;

				/*margin-bottom: 1rem;*/
				.sizeWidth {
					width: 8rem;
				}
			}
		}
</style>
