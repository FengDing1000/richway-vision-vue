<template>
	<Dialog
		:title="workInfo.RES_NAME"
		@on-hide="handleHide">
		<div
			slot="content"
			class="worker-dialog-content">
			<div class="dialog-left">
				<ul>
					<li
						v-for="(item, index) in workDetailLists"
						:class="[currentWorkerItem.code === item.code ? 'active' : '']"
						:key="index"
						@click.stop="showDetail(item)">{{ item.title }}</li>
				</ul>
			</div>
			<div
				v-loading="loading"
				class="dialog-right">
				<h3>{{ currentWorkerItem.title }}</h3>
				<div class="work-detail-panel">
					<table
						style="width:100%;
"
						class="work-detail-table">
						<tr
							v-for="(item, index) in currentWorkDetail"
							:key="index">
							<template v-for="(subItem, subIndex) in item">
								<td
									:key="subIndex"
									class="t-th">{{ subItem.name }}<span class="colon">:</span></td>
								<td
									:key="subIndex"
									class="t-td">{{ subItem.value || `` }}</td>
							</template>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script type="text/ecmascript-6">
const Dialog = r => require.ensure([], () => r(require(`../../dialog`)), `components/map/business/index`);

export default {
    name: `workDetailDialog`,
    components: {
        Dialog
    },
    props: {
        workInfo: {
            type: Object,
            default: () => {

            }
        }
    },
    data() {
        return {
            loading: false,
            worktitle: ``,
            workDetailArr: {},
            workDetailLists: [
                {
                    code: `ATT_RES_BASE`,
                    title: `水库一般信息`,
                    componentName: `ATT_RES_BASE`
                },
                {
                    id: 1,
                    code: `FHGC_RSHYPR`,
                    title: `水库水文特征值`,
                    componentName: `FHGC_RSHYPR`
                },
                {
                    code: `FHGC_DSFLCLPR`,
                    title: `水库洪水计算成果`,
                    componentName: `FHGC_DSFLCLPR`
                },
                {
                    code: `FHGC_ENRSRV`,
                    title: `水库入库河流信息`,
                    componentName: `FHGC_ENRSRV`
                },
                {
                    code: `FHGC_GORSRV`,
                    title: `水库出库河流信息`,
                    componentName: `FHGC_GORSRV`
                },
                {
                    code: `FHGC_RSPP`,
                    title: `水库特征值信息`,
                    componentName: `FHGC_RSPP`
                },
                {
                    code: `FHGC_RWACDR`,
                    title: `水库水位面积、库容、泄量关系`,
                    componentName: `FHGC_RWACDR`
                },
                {
                    code: `FHGC_RPBIT`,
                    title: `水库主要效益指标`,
                    componentName: `FHGC_RPBIT`
                },
                {
                    code: `FHGC_SBLSEPOL`,
                    title: `淹没损失及工程永久占地信息`,
                    componentName: `FHGC_SBLSEPOL`
                },
                {
                    code: `FHGC_DSCN`,
                    title: `泄水建筑物`,
                    componentName: `FHGC_DSCN`
                },
                {
                    code: `FHGC_SHWLDRL`,
                    title: `单孔水位泄量关系`,
                    componentName: `FHGC_SHWLDRL`
                },
                {
                    code: `FHGC_RSATPR`,
                    title: `水库防洪调度`,
                    componentName: `FHGC_RSATPR`
                },
                {
                    code: `FHGC_RRHNT`,
                    title: `水库运行历史记录`,
                    componentName: `FHGC_RRHNT`
                },
                {
                    code: `FHGC_RSDNYRNT`,
                    title: `水库出险年度记录`,
                    componentName: `FHGC_RSDNYRNT`
                },
                {
                    code: `FHGC_RFKWLV`,
                    title: `水库汛期运用主要特征值`,
                    componentName: `FHGC_RFKWLV`
                }
            ],
            currentWorkerItem: {},
            currentWorkDetail: []
        };
    },
    watch: {
        workInfo: {
            immediate: true,
            deep: true,
            handler() {
                this.showDetail(this.workDetailLists[0]);
            }
        }
    },
    mounted() {
        this._log(`workDetailDialog has mounted`);
        this.showDetail(this.workDetailLists[0]);
    },
    methods: {
        showDetail(item) {
            this.currentWorkerItem = item;
            const resCode = this.workInfo.RES_CODE;
            if (resCode) {
                this.currentWorkDetail = [];
                this.loading = true;

                this.$getData.GetWorkDetailMonitor({
                    resCode: resCode.trim(),
                    tbnm: item.code
                }).then((res = {}) => {
                    let index = 0;
                    for (const item of res.data) {
                        if (item.name && item.name !== `null`) {
                            const seq = Math.floor(index / 2);
                            if (!this.currentWorkDetail[seq]) {
                                this.currentWorkDetail[seq] = [];
                            }
                            this.currentWorkDetail[seq].push(item);
                            index++;
                        }
                    }
                }).always(() => {
                    this.loading = false;
                });
            }
        },

        handleHide() {
            this.$emit(`on-hide`);
        }
    }
};
</script>

<style lang="scss">
		.worker-dialog-content {
			display: flex;
			min-height: 20rem;
			max-height: 30rem;
			background-color: #fff;

			.dialog-left {
				width: 30%;
				overflow: auto;
				border-right: 1px solid #eee;

				li {
					height: 2rem;
					padding: 0 .3rem;
					line-height: 2rem;
					color: #3266cd;
					cursor: pointer;

					&:hover {
						border-left: 5px solid rgba(78, 220, 251, 1);
						background: rgba(0,0,0,.1);
					}
				}

				.active {
					border-left: 5px solid rgba(78, 220, 251, 1);
					background: rgba(0,0,0,.1);
				}
			}

			.dialog-right {
				width: 70%;
				padding-top: 5px;
				padding-left: 10px;

				h3 {
					padding-left: .5rem;
					margin-bottom: .5rem;
					font-weight: bold;
					color: #019aff;
				}

				.work-detail-panel{
					margin: .5rem 0;
				}

				.work-detail-table {
					tr {
						&:nth-child(even){
							background: #f7f7fd;
						}
					}

					td{
						padding: .3rem .5rem;
					}

					.t-th {
						width: 25%;
					}

					.t-td {
						width: 25%;
					}
				}
			}
		}
</style>
