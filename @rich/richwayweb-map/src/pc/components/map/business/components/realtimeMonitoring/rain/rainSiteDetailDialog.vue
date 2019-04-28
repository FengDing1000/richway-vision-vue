<template>
	<Dialog
		:title="detailInfo.stnm"
		@on-hide="handleHide">
		<div
			v-loading="loading"
			slot="content"
			class="rain-dialog-content">
			<div class="rain-info-panel">
				<div class="title">
					<span>基础信息:</span>
					<ul>
						<li><span>行政区:</span>{{ (detailRainInfo.station || {}).stnm || `--` }}</li>
						<li><span>经度:</span>{{ detailRainInfo.station.lgtd || `--` }}</li>
						<li><span>纬度:</span>{{ detailRainInfo.station.lttd || `--` }}</li>
						<li
							:title="detailRainInfo.station.stlc"
							class="longSpan"><span>站址:</span>{{ detailRainInfo.station.stlc | _filterStlc }}</li>
					</ul>
				</div>
				<div class="title">
					<span>调查评价:</span>
					<ul>
						<li><span>负责人:</span>李小曼(15767676767)</li>
						<li><span>影响人口:</span>{{ getEtPt }}</li>
						<li><span>所属小流域:</span>{{ detailRainInfo.station.rvnm || `--` }}</li>
						<li class="longSpan"><span>关联危险区:</span>红岩村锁定锁定所多所</li>
					</ul>
				</div>
				<div class="state">运行状态:<span>正常</span></div>
				<div
					v-if="onOff"
					class="btn-warn"
					@click="publishWarning(detailInfo)">发布预警</div>
				<div
					class="btn-detail"
					@click="handleLookDetail(detailInfo)">影响范围</div>
			</div>
			<div class="rain-chart-tabs">
				<el-tabs
					v-model="activeName">
					<el-tab-pane
						v-for="(item, index) in tabs"
						:key="index"
						:label="item.name"
						:name="item.code"
						lazy>
						<keep-alive>
							<component
								:stcd="detailInfo.stcd"
								:is="item.componentName"
								:detail-info="detailInfo"
								:etm="etm"
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
    name: `rainDetailDialog`,
    components,
    filters: {
        _filterEngGrad,
        _filterStlc,
        _filterNum
    },
    props: {
        detailInfo: {
            type: Object,
            default: () => {}
        },
        onOff: {
            type: Boolean,
            default: () => {}
        },
        stm: {
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
            loading: false,
            detailRainInfo: {
                station: {},
                danad: []
            },
            tabs: [
                {
                    name: `近7日降雨过程线`,
                    componentName: `IntervalRainProcess`
                },
                {
                    name: `时段降雨过程`,
                    componentName: `AccumulativeRainProcess`
                },

                {
                    name: `未来48小时降雨过程`,
                    componentName: `ForecastRainProcess`
                }
            ]
        };
    },
    computed: {
        // 获取 影响住户和 人数
        getEtPt() {
            let Et = 0;
            let Pt = 0;
            if (this.detailRainInfo.danad) {
                for (const item of this.detailRainInfo.danad) {
                    Et += item.etcount;
                    Pt += item.ptcount;
                }
                return `${Et}户${Pt}人`;
            }
            return `--户--人`;
        },
        activeName: {
            get() {
                return (this.tabs[0] || {}).code;
            },
            set() {

            }
        }
    },
    watch: {
        detailInfo() {
            this.handleRainDetail();
        }
    },
    methods: {
        handleRainDetail() {
            if (this.detailInfo.stcd) {
                this.$getData.GetDetailRainInforMonitor({
                    stcd: this.detailInfo.stcd
                }).then((res = {}) => {
                    this.detailRainInfo = res.data || {};
                }).always(() => {

                });
            }
        },
        handleLookDetail(item) {
            this.$router.push({
                path: `/gzshzh/effect_range`,
                query: {
                    stcd: item.stcd,
                    stm: this.stm,
                    etm: this.etm
                }
            });
        },
        publishWarning(item) {
            this._log(item);
        },
        handleHide() {
            this.$emit(`on-hide`);
        }
    }
};
</script>

<style lang="scss" scoped>
		.rain-dialog-content {
			position: relative;
			height: 29rem;

			>div {
				padding: .5rem;
				border: 1px solid #eee;
				border-radius: 4px;
				background-color: #fbfbfb;
			}

			.rain-info-panel{
				position: relative;

				.title{
					display: flex;
					padding: .3rem 0;

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
						cursor: pointer;

						>span {
							margin-right: .2rem;
							color: blue;
						}
					}
				}

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

				.btn-warn{
					position: absolute;
					top: 2.5rem;
					right: .5rem;
					display: inline-block;
					width:4rem;
					height: 1.4rem;
					border-radius: 4px;
					line-height: 1.4rem;
					text-align: center;
					color: #fff;
					background-color: #e6a23c;
					cursor: pointer;

					&:hover{
						background-color: #e6a23c;
					}
				}

				.btn-detail{
					position: absolute;
					top: .5rem;
					right: .5rem;
					display: inline-block;
					width:4rem;
					height: 1.4rem;
					border-radius: 4px;
					line-height: 1.4rem;
					text-align: center;
					color: #fff;
					background-color: #4776cb;
					cursor: pointer;

					&:hover{
						background-color: #286ce6;
					}
				}
			}

			.rain-chart-tabs{
				margin-top: .5rem;
			}
		}
</style>
