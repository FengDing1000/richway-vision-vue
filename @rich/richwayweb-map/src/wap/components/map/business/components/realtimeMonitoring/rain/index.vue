<template>
	<div class="rain-panel">
		<p>这里是rain</p>
	</div>
</template>

<script type="text/ecmascript-6">
    import { _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';
    import axios from 'axios';
    import { rainTypeListByColor } from "../type";

    const { mapState } = require(`vuex`);

export default {
    name: `rain`,
    components: {},
    props: {
        map: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            setTimeOutId: null,
            source: null,
            rainTypeListByColor,
            rainList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0
        };
    },
    computed: {
        ...mapState([`rem`])
    },
    mounted() {
        this._log(`monitorGzshzh rain has mounted`);
        this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
        this.handleSearch();
    },
    activated() {
        this._log(`rain: activated`);
        this.createRainSiteMarker();
        this.setTimeOutSearch();
    },
    deactivated() {
        this._log(`rain: deactivated`);
        this.cancelSearch();
        this.clearRainSiteMarker();
        clearTimeout(this.setTimeOutId);
    },
    methods: {
        setTimeOutSearch() {
            // 3分钟一次轮询
            this.setTimeOutId = setTimeout(() => {
                this.handleSearch();
            }, 3 * 60 * 1000);
        },
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
                this.rainList = [];
                this.filterDataList = [];
                this.tableDataList = [];

                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData.GetRainAllMointor(searchInfo).then((res = {}) => {
                    this.rainList = res.data || [];
                }).always(() => {
                    this.filterDataListFun();
                    this.setTimeOutSearch();
                });
            });
        },
        filterDataListFun() {
            this.filterDataList = [];
            for (const item of this.rainList) {
                if ((item.stnm || ``).indexOf(this.filterInfo.siteName) > -1 || !this.filterInfo.siteName) {
                    this.filterDataList.push(item);
                }
            }
            this.createRainSiteMarker();
            this.tablePage = 0;
        },
        findColor(item) {
            let o = {};
            const currentV = parseFloat(`${item.drp}`);
            if (currentV === 0) {
                return ((this.rainTypeListByColor || [])[0] || {}).color || ``;
            }
            for (const item of this.rainTypeListByColor) {
                const arr = item.code.split(`_`);
                const len = arr.length;
                if (len === 2) {
                    if (currentV >= parseFloat(`${arr[0]}`) && currentV < parseFloat(`${arr[1]}`)) {
                        o = item;
                        break;
                    }
                } else if (len === 1) {
                    const currentCode = parseFloat(`${item.code}`);
                    if (currentCode <= currentV) {
                        o = item;
                    }
                }
            }

            return o.color || ``;
        },
        createRainSiteMarker() {
            this.clearRainSiteMarker();
            const arr = [];
            for (const item of (this.filterDataList || [])) {
                item.options = {
                    tips: {
                        top: _filterNum(item.drp, 1)
                    },
                    color: this.findColor(item),
                    // 点击地图上面的标记的事件
                    clickFun: (o = {}) => {
                        this.currentRainSite = o;
                        this.showRainSiteDetail = true;
                    }
                };
                arr.push(item);
            }
            this.$mapLayersFun.MapBusinessLayersRainBroadcastFun(arr);
        },
        clearRainSiteMarker() {
            this.$mapLayersFun.MapBusinessLayersRainBroadcastFun([]);
        }
    }
};
</script>

<style lang="scss">
    .rain-panel {
        >p{
            text-align: center;
            padding: .5rem;
        }
    }

</style>
