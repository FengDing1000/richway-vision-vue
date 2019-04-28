<template>
	<Dialog
		:title="detailInfo.stnm"
		@on-hide="handleHide">
		<div
			v-loading="loading"
			slot="content"
			class="water-dialog-content">
			<div class="water-info-panel">
				<template v-if="type === 'rsvr'">
					<div class="title">
						<span>当前水位:</span>
						<ul>
							<li>
								<span class="span-2">{{ detailInfo.rz ||`--` }}</span>
							</li>
							<li>
								<span class="span-3">超汛限7.00m</span>
							</li>
						</ul>
					</div>
					<div class="title">
						<span>基础信息:</span>
						<ul>
							<li><b>蓄水量：</b>{{ detailInfo.w || `--` }}百万m³</li>
							<li><b>总库容：</b>{{ detailInfo.ttcp || `--` }}百万m³</li>
							<li><b>行政区：</b>{{ detailInfo.ADDVNM || `--` }}</li>
							<li><b>所在河流：</b>{{ detailInfo.bsnm || `--` }}</li>
							<!--<li><b>管理单位：</b>XXXXXXX公司</li>-->
						</ul>
					</div>
				</template>
				<template v-else>
					<div class="title">
						<span>基础信息:</span>
						<ul>
							<li><span>行政区:</span>{{ detailInfo.stnm || `--` }}</li>
							<li><span>经度:</span>{{ detailInfo.lgtd || `` }}</li>
							<li><span>纬度:</span>{{ detailInfo.lttd || `` }}</li>
							<li
								:title="detailInfo.stlc"
								class="longSpan"><span>站址:</span>{{ detailInfo.stlc | _filterStlc(7) || `--` }}</li>
						</ul>
					</div>
					<div class="title">
						<span>调查评价:</span>
						<ul>
							<li><span>负责人:</span>李小曼(15767676767)</li>
							<li><span>影响人口:</span>5户14人</li>
							<li><span>所属小流域:</span>郊纳马家小流域</li>
							<li><span>关联危险区:</span>红岩村锁定锁定所多所</li>
						</ul>
					</div>
				</template>
				<div class="state">运行状态:<span>正常</span></div>
			</div>
			<div class="water-chart-tabs">
				<el-tabs
					v-model="activeName">
					<el-tab-pane
						v-for="(item, index) in tabsInfo[type]"
						:key="index"
						:label="item.name"
						:name="item.code"
						lazy>
						<keep-alive>
							<component
								:is="item.componentName"
								:detail-info="detailInfo"
							/>
						</keep-alive>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</Dialog>
</template>

<script type="text/ecmascript-6">
import { _filterEngGrad, _filterStlc, _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';
import DetailComponents from './detail';

const Dialog = r => require.ensure([], () => r(require(`../../dialog`)), `components/map/business/index`);
const components = Object.assign({ Dialog }, DetailComponents);

export default {
    name: `waterDetailDialog`,
    components,
    filters: {
        _filterEngGrad,
        _filterStlc,
        _filterNum
    },
    props: {
        type: {
            type: String,
            default: `rsvr`
        },
        detailInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            loading: false,
            listInfo: [],
            tabsInfo: {
                rsvr: [
                    {
                        code: `rsvr_stageDischargeHydrograph`,
                        name: `水位流量过程线`,
                        componentName: `RsvrStageDischargeHydrograph`
                    },
                    {
                        code: `rsvr_samePeriodHistory`,
                        name: `历史同期对期`,
                        componentName: `RsvrSamePeriodHistory`
                    },
                    {
                        code: `rsvr_reservoirCapacityRelationship`,
                        name: `水库库容关系`,
                        componentName: `RsvrReservoirCapacityRelationship`
                    }
                ],
                river: [
                    {
                        code: `river_stageDischargeHydrograph`,
                        name: `水位流量过程线`,
                        componentName: `RiverStageDischargeHydrograph`
                    }
                ]
            }
        };
    },
    computed: {
        activeName: {
            get() {
                return this.tabsInfo[this.type][0].code;
            },
            set() {

            }
        }
    },
    watch: {
        detailInfo() {
            this.handlewaterDetail();
        }

    },
    mounted() {
        this._log(`waterDetailDialog has mounted`);
        this.handlewaterDetail();
    },
    methods: {
        handlewaterDetail() {
            if (this.detailInfo.stcd) {
                this.$getData.WaterDetailMonitor({
                    stcd: this.detailInfo.stcd,
                    sttp: this.detailInfo.sttp
                }).then(res => {
                    this.listInfo = res.data || [];
                });
            }
        },
        handleHide() {
            this.$emit(`on-hide`);
        }
    }
};
</script>

<style lang="scss" scoped>
		.water-dialog-content {
			height: 29rem;

			>div {
				padding: .5rem;
				border: 1px solid #eee;
				border-radius: 4px;
				background-color: #fbfbfb;
			}

			.water-info-panel{
				position: relative;

				.state{
					position: absolute;
					top: .5rem;
					right: 5.5rem;
					display: inline-block;
					width: auto;
					height: 1.4rem;
					padding: 0 1rem;
					border-radius: 4px;
					line-height: 1.4rem;
					text-align: center;

					>span {
						padding: .2rem .4rem;
						margin-left: .5rem;
						border-radius: 4px;
						color: #fff;
						background-color: green;
					}
				}

				.title{
					display: flex;
					padding: .3rem 0;

					.span-2{
						color: #fc3;
					}

					.span-3{
						color: red;
					}

					>span {
						width: 8rem;
						font-weight: 600;
					}

					ul{
						width: 100%;
					}

					li {
						display: inline-block;
						margin-right: .5rem;

						>span {
							margin-right: .2rem;
							color: blue;
						}
					}
				}
			}

			.water-chart-tabs{
				margin-top: .5rem;
			}
		}
</style>
