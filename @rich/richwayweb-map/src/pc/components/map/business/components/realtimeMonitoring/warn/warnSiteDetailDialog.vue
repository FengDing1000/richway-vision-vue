<template>
	<Dialog
		:title="detailInfo.name"
		width="35rem"
		@on-hide="handleHide">
		<div
			v-loading="loading"
			slot="content"
			class="warn-dialog-content">
			<div class="warn-info-panel">
				<div class="title">
					<ul>
						<li><span>预警时间:</span>&nbsp;{{ detailInfo.stm || `--` }}</li>
						<li><span>预警信息:</span>&nbsp;<em v-html="_changeColor(detailInfo.warnNm)" /></li>
						<li><span>预警描述:</span>&nbsp;<p
							class="special"
							v-html="_changeColor(detailInfo.warnDesc)" /></li>
						<li><span>预警位置:</span>&nbsp;{{ detailInfo.address || `--` }}</li>
						<li
							style="color: #f90;text-decoration:underline
"><span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</span>{{ detailInfo.warnStatusId | filterWarnStatus }}</li>
					</ul>
					<div
						v-if="onOff"
						class="btn-warn"
						@click="publishWarning(detailInfo)">发布预警</div>
					<h1>调查评价</h1>
				</div>
				<hr>
				<div class="eva">
					<!--<li-->
						<!--v-for="(item, index) in detailInfo.inCharge"-->
						<!--:key="index">-->
						<!--<span>{{ item.chargePosition }}:</span>-->
						<!--<span>{{ item.inchargeName || `&#45;&#45;` }}({{ item.inchargeMobile || '&#45;&#45;' }})</span>-->
					<!--</li>-->
					<li><span>危险区负责人:</span><span>{{exclusivePeople1 ||  `--`}}</span></li>
					<li><span>监测巡查责任人:</span><span>{{exclusivePeople2 || `--`}}</span></li>
					<li><span>行政负责人:</span><span>{{exclusivePeople3 ||  `--`}}</span></li>
					<li><span>预警转移责任人:</span>&nbsp;<span class="people">{{ detailInfo.etcount || `--` }}</span>&nbsp;户 | &nbsp;<span class="people">{{ detailInfo.ptcount || `--` }}</span>&nbsp;人</li>
                </div>
				<br>
				<div
					class="btn-detail"
					@click="handleLookDetail(detailInfo)">进入影响范围 >
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script type="text/ecmascript-6">
const Dialog = r => require.ensure([], () => r(require(`../../dialog`)), `components/map/business/index`);

export default {
    name: `rainDetailDialog`,
    components: {
        Dialog
    },
    filters: {
        filterWarnStatus(warnStatusId) {
            // 待审批--1 新产生-0 已内部告警-10 已外部告警-20
            if (warnStatusId === 1) {
                return `待审批`;
            } if (warnStatusId === 0) {
                return `新产生`;
            } if (warnStatusId === 10) {
                return `已内部告警`;
            } if (warnStatusId === 20) {
                return `已外部告警`;
            }
        }
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
                danad: {}
            }
        };
    },
    computed: {
        activeName: {
            get() {
                return (this.tabs[0] || {}).code;
            },
            set() {

            }
        },
        exclusivePeople1() {
            let textStr = `--`;
            let newPeople = this.detailInfo.inCharge;
            if(newPeople) {
                for (const item of newPeople) {
                    if(item.chargePosition === `行政责任人`) {
                        textStr += `${item.inchargeName} (${item.inchargeMobile});`;
                    }
                }
            }
            return textStr

        },
        exclusivePeople2() {
            let textStr = `--`;
            let newPeople = this.detailInfo.inCharge;
            if(newPeople) {
                for (const item of newPeople) {
                    if(item.chargePosition === `监测巡查责任人`) {
                        textStr += `${item.inchargeName} (${item.inchargeMobile});`;
                    }
                }
            }
            return textStr

        },
        exclusivePeople3() {
            let textStr = `--`;
            let newPeople = this.detailInfo.inCharge;
            if(newPeople) {
                for (const item of newPeople) {
                    if(item.chargePosition === `预警转移责任人`) {
                        textStr += `${item.inchargeName} (${item.inchargeMobile});`;
                    }
                }
            }
            return textStr

        }
    },
    watch: {
        detailInfo() {
            this.handleRainDetail();
        }
    },
    mounted() {

    },
    methods: {
        handleRainDetail() {
            this._log(`detailInfo.inCharge=====`, this.detailInfo.inCharge);
            if (this.detailInfo.stcd) {
                this.$getData.GetDetailRainInforMonitor({
                    stcd: this.detailInfo.stcd
                }).then((res = {}) => {
                    this.detailRainInfo = res.data || {};
                    console.log(666, this.detailRainInfo);
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
            console.log(item);
            this.$router.push({
                path: `/gzshzh/warning_forecast/warn_publish/send_sms`,
                query: {
                    stcd: item.stcd,
                    stm: this.stm,
                    etm: this.etm,
                    warnDesc: item.warnDesc
                }
            });
        },
        handleHide() {
            this.$emit(`on-hide`);
        },
        _changeColor(str) {
            if (str) {
                return str.replace(/立即转移/g, `<font style="color:red; font-size: 1rem;font-weight:bold">立即转移</font>`).replace(/准备转移/g, `<font style="color:#FFCC66; font-size: 1rem;font-weight:bold">准备转移</font>`).replace(/关闭/g, `<font font style="color:#999; font-size: 1rem;font-weight:bold">关闭</font>`);
            }
            return `--`;
        }
    }
};
</script>

<style lang="scss" scoped>
		.warn-dialog-content {
			position: relative;
			height: 20rem;

			.warn-info-panel{
				position: relative;

				.title{
					padding: .1rem 0;

					ul{
						width: 100%;
					}

					li {
						line-height: 1.5rem;
						cursor: pointer;

						>span {
							display: inline-block;
							width: 3.5rem;
							margin-right: .2rem;
							font-weight: 700;
							color: #000;
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
						color:blue;
						background-color: green;
					}
				}

				.btn-warn{
					position:absolute;top:0;right:0;
					display: inline-block;
					width:4rem;
					height: 1.4rem;
					margin-left: 21%;
					line-height: 1.4rem;
					text-align: center;
					color: #fff;
					background-color: green;
					cursor: pointer;
				}

				.btn-detail{
					position:absolute;
					bottom:0;
					right:25px;
					display: inline-block;
					height: 1.4rem;
					line-height: 1.4rem;
					color: blue;
					cursor: pointer;
				}
			}

			.warn-chart-tabs{
				margin-top: .5rem;
			}

			.eva{
				position:relative;
				width:95%;
				margin-bottom:.5rem;

				>li{
					margin-top:.5rem
				}
			}
			.people{font-weight:bold;color:#69f}

			.special{margin-top:-1.5rem;
				margin-left:3.8rem
			}

			h1{display:block;width:4rem;height:1rem;
				margin-top:.5rem;;margin-bottom:-.5rem;border:.1rem solid #fff;border-bottom-color:blue;line-height:.5rem;color:#000;
			}
		}
</style>
