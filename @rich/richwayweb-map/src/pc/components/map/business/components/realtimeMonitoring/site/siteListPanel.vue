<template>
	<div
		v-loadmore="loadMore"
		:class="['site-' + type]"
		class="site-panel">

		<!-- 查询输入框 -->
		<SiteSearch
			@on-search="handleSearch"
			@on-change="handleChange" />

		<div
			v-loading="siteListLoading"
			:style="{maxHeight: tableMaxH+ 'px'}"
			class="site-list panel-list load-more-panel">
			<span id="tablePrev" />
			<ul	v-if="tableDataList.length">
				<li
					v-for="(item, index) in tableDataList"
					:key="index"
					class="site-item"
					@click.stop="handleLocation(item)">
					<span class="site-type">{{ getAbbCodeByCode(item.sttp) }}</span>
					<div class="site-info">
						<p class="site-name">{{ item.nm }}</p>
						<p>{{ item.measNm }}:{{ item.VAL }}</p>
					</div>
					<i
						:class="{'el-icon-star-on':item.fav,'el-icon-star-off':!item.fav}"
						@click.stop="handleCollection(item)" />
				</li>
			</ul>
			<p v-else>暂时没有测站信息</p>
		</div>

		<!--<div class="monitor-chart-panel">-->
		<!--<keep-alive>-->
		<!--<component-->
		<!--v-for="(item, index) in subComponents"-->
		<!--:is="item.componentName"-->
		<!--:key="index"-->
		<!--:data-info="chartData[item.componentName]"-->
		<!--class="monitor-chart-item" />-->
		<!--</keep-alive>-->
		<!--</div>-->
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
// import ChartComponents from '@rich/richwayweb-chart';
import axios from 'axios';
import siteType from "../../../../../../../constants/siteType";

const { mapState } = require(`vuex`);
const SiteSearch = r => require.ensure([], () => r(require(`../siteSearch.vue`)), `components/map/business/realtimeMonitoring`);
const { offset } = RichWayWebUtils;

export default {
    name: `SiteListPanel`,
    components: {
        SiteSearch
    },
    props: {
        type: {
            type: String,
            default: ``
        },
        currentType: {
            type: String,
            default: ``
        },
        map: {
            type: Object,
            default: () => {
            }
        },
        subComponents: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            tableMaxH: 300,
            siteListLoading: false,
            siteList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0,
            currentRainSite: {}
        };
    },
    computed: {
        ...mapState([`rem`])
    },
    mounted() {
        this.handleSearch();
        this._log(`siteListPanel subComponents is`, this.subComponents);
    },
    activated() {
        this._log(`siteListPanel: activated`);
        this.createSiteMarker();
    },
    deactivated() {
        this._log(`siteListPanel: deactivated`);
        this.cancelSearch();
        this.clearSiteMarker();
    },
    methods: {
        cancelSearch() {
            // 取消请求
            if (typeof ((this.source || {}).cancel) === `function`) {
                this.source.cancel();
            }
        },
        handleSearch() {
            this.cancelSearch();
            this.$nextTick(() => {
                const searchInfo = {};
                if (this.type === `all`) {
                    searchInfo.status = [`0`, `1`];
                } else if (this.type === `abnormal`) {
                    searchInfo.status = [`1`];
                } else if (this.type === `collection`) {
                    searchInfo.status = [`0`, `1`];
                    searchInfo.fav = true;
                }
                if (this.filterInfo.siteName) {
                    searchInfo.nm = this.filterInfo.siteName;
                }

                this.siteListLoading = true;
                this.siteList = [];
                this.filterDataList = [];
                this.tableDataList = [];

                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData.GetSiteListMonitor(searchInfo).then(res => {
                    this.siteList = res.data || [];
                }).always(() => {
                    this.siteListLoading = false;
                    this.filterDataListFun();
                });
            });
        },
        handleChange(siteName) {
            this.filterInfo.siteName = siteName;
            this.filterDataListFun();
        },
        handleLocation(item) {
            this._log(`location`, item);
            this.map.flyTo([item.lttd, item.lgtd], 15);
        },
        handleCollection(item) {
            this._log(`collection`, item);
        },
        filterDataListFun() {
            this.filterDataList = [];
            for (const item of this.siteList) {
                if ((item.nm || ``).indexOf(this.filterInfo.siteName) > -1 || !this.filterInfo.siteName) {
                    this.filterDataList.push(item);
                }
            }
            this.createSiteMarker();
            this.tablePage = 0;
            this.getTableDataList();
        },
        getTableDataList() {
            this.tablePage++;
            const start = 0;
            let end = this.tableRows * this.tablePage;
            if (end > this.filterDataList.length) {
                end = this.filterDataList.length;
            }

            this.tableDataList = this.filterDataList.slice(start, end);

            this.$nextTick(() => {
                this.getTableMaxH();
            });
        },
        createSiteMarker() {
            this.clearSiteMarker();
            const arr = [];
            for (const item of (this.filterDataList || [])) {
                item.options = {
                    tips: {
                        middle: this.getAbbCodeByCode(item.sttp)
                    },
                    createPopContent: layer => {
                        this._log(1111111, layer);
                        return `<span>内容11111111</span>`;
                    }
                };
                arr.push(item);
            }
            this.$mapLayersFun.MapBusinessLayersSiteBroadcastFun(arr);
        },
        clearSiteMarker() {
            this.$mapLayersFun.MapBusinessLayersSiteBroadcastFun();
        },
        getTableMaxH() {
            const tablePrevOffset = offset(document.getElementById(`tablePrev`));
            const clientH = document.body.clientHeight;
            const maxH = clientH - tablePrevOffset.top - 20 * this.rem;
            this.tableMaxH = maxH;
        },
        loadMore() {
            this.getTableDataList();
        },
        getAbbCodeByCode(code) {
            return siteType.getAbbCodeByCode(code);
        }
    }
};
</script>

<style lang="scss">
	.site-panel {
        .site-list {
            margin-top: .6rem;
            overflow: scroll;

            >p{
                padding: 1rem 0;
                text-align: center;
            }

            ul {
                margin-bottom: 2rem;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                background: #fff;
                box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
            }

            .site-item {
                position: relative;
                padding: .3rem .75rem;
                border-bottom: 1px solid #e3e3e3;
                cursor: pointer;

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    border-left: 4px solid #4058aa;
                    background-color: rgba(0, 0, 0, .1);
                }

                .site-type {
                    position: absolute;
                    top: 50%;
                    left: .5rem;
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    border: 1px solid red;
                    border-radius: 50%;
                    font-weight: 600;
                    font-size: .6rem;
                    line-height: 1rem;
                    text-align: center;
                    color: red;
                    transform: translate(0, -50%);
                }

                .site-info {
                    padding: 0 1.5rem;
                }

                > i {
                    position: absolute;
                    top: 50%;
                    right: .5rem;
                    display: inline-block;
                    width: 1.2rem;
                    height: 1.2rem;
                    font-size: 1rem;
                    line-height: 1.2rem;
                    transform: translate(0, -50%);
                }

                .site-name {
                    padding: .1rem 0;
                    color: #23c6c8;
                }
            }
        }
	}

	.site-marker-spot {
		position: absolute;
		display: inline-block;
		width: 1.5rem;
		height: 1.5rem;
		border: 2px solid red;
		border-radius: 50%;
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.5rem;
		text-align: center;
		color: red;
		background: #fff;

		&:hover {
			border-color: #b55656;
			color: #b55656;
			box-shadow: 0 0 .75em #777;
		}
	}

	.site-marker-panel {
		position: absolute;
		display: inline-block;
		border-radius: 5px;
		box-shadow: 0 0 .75em #777;

		> div {
			height: 100%;
		}
	}

	.site-panel-info {
		position: relative;
		z-index: 2;
		height: 100%;
		max-height: 15rem;
		padding: .5rem .3rem .3rem .5rem;
		overflow: hidden;
		color: #333;
		background-color: #f7f7f7;
		cursor: default;

		.panel-content {
			height: 9.5rem;
		}

		.panel-footer {
			display: flex;
			padding-top: .8rem;
			border-top: 1px solid #ccc;

			.panel-footer-item {
				flex-grow: 1;
				text-align: center;
			}
		}

		.status-warp {
			position: absolute;
			z-index: 250;
			top: -.2rem;
			right: -.1rem;
			width: 5rem;
			height: 5rem;
			overflow: hidden;

			> i {
				position: absolute;
				top: .2rem;
				right: .2rem;
				display: inline-block;
				width: 1rem;
				height: 1rem;
				font-size: .9rem;
				line-height: 1rem;
				text-align: center;
				cursor: pointer;
			}

			> div {
				position: relative;
				top: 1.25rem;
				left: -.25rem;
				display: block;
				width: 7rem;
				padding: .35rem 0;
				font-weight: 600;
				font-size: .65rem;
				line-height: 1rem;
				text-align: center;
				text-decoration: none;
				color: #fff;
				background-color: #797979;
				transform: rotate(45deg);
				cursor: pointer;

				&::before,
				&::after {
					position: absolute;
					bottom: -.1rem;
					border-top: 2px solid #797979;
					border-left: 2px solid rgba(0, 0, 0, 0);
					content: "";
					border-right: 2px solid rgba(0, 0, 0, 0);
				}
			}

			.success {
				background-color: #8cc152 !important;

				&::before,
				&::after {
					border-top: 2px solid #8cc152 !important;
				}
			}

			.warn {
				background-color: red !important;

				&::before,
				&::after {
					border-top: 2px solid red !important;
				}
			}
		}
	}

	.outerPointer {
		position: absolute;
		z-index: 1;
		top: 50%;
		left: -.4rem;
		display: block;
		width: .8rem;
		height: .8rem;
		margin-top: -.4rem;
		background: #f7f7f7;
		box-shadow: 0 0 .75em #777;
		transform: rotate(45deg);
	}

	.monitor-chart-panel {
		position: fixed;
		bottom: 3.25rem;
		right: 3rem;
		display: inline-block;

		.monitor-chart-item {
			float: right;
			display: inline-block;
			box-sizing: content-box;
			width: 15rem;
			height: 10rem;
			padding: .5rem;
			margin-left: .5rem;
			border: 1px solid #ebeef5;
			border-radius: 4px;
			background: #fff;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		}
	}
</style>
