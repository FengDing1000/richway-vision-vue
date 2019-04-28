<template>
    <div class="worker-panel">
        <p>这里是worker</p>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import { reservoirTypeListByColor } from "../type";

    const { mapState } = require(`vuex`);

    export default {
        name: `worker`,
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
                ruleForm: {
                    detectionType: `reservoir`
                },
                reservoirTypeListByColor,
                workTypeList: [],
                workList: [],
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
            this._log(`monitorGzshzh work has mounted`);
            this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
            this.handleSearch();
        },
        activated() {
            this._log(`work: activated`);
            this.createWorkSiteMarker();
            this.setTimeOutSearch();
        },
        deactivated() {
            this._log(`work: deactivated`);
            this.cancelSearch();
            this.clearWorkSiteMarker();
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

                    this.workList = [];
                    this.filterDataList = [];
                    this.tableDataList = [];

                    const { CancelToken } = axios;
                    this.source = CancelToken.source();
                    searchInfo.cancelToken = this.source.token;
                    this.$getData.GetWorkAllMonitor(searchInfo).then((res = {}) => {
                        this.workList = res.data || [];
                    }).always(() => {
                        this.filterDataListFun();
                        this.setTimeOutSearch();
                    });
                });
            },
            filterDataListFun() {
                this.filterDataList = [];
                for (const item of this.workList) {
                    if ((item.RES_NAME || ``).indexOf(this.filterInfo.siteName) > -1 || !this.filterInfo.siteName) {
                        this.filterDataList.push(item);
                    }
                }
                this.createWorkSiteMarker();
                this.tablePage = 0;
            },
            getSiteType(code) {
                return this.reservoirTypeListByColor.find(item => (code || ``).toUpperCase() === item.code);
            },
            createWorkSiteMarker() {
                this.clearWorkSiteMarker();
                const reservoirArr = [];
                for (const item of this.filterDataList) {
                    let info = ``;
                    if (this.ruleForm.detectionType === `reservoir`) {
                        // 水库
                        if (item.overGrz > 0) {
                            info = this.getSiteType(`overGrz`);
                        } else if (item.overWrz > 0) {
                            info = this.getSiteType(`overWrz`);
                        } else {
                            info = this.getSiteType(`NORMAL`);
                        }
                    }
                    item.options = Object.assign({
                        // 点击地图上面的标记的事件
                        clickFun: (o = {}) => {
                            this._log(66666, o);
                        }
                    }, info);
                    item.lttd = item.LOW_LEFT_LAT;
                    item.lgtd = item.LOW_LEFT_LONG;
                    reservoirArr.push(item);
                }

                this.$mapLayersFun.MapBusinessLayersReservoirSiteBroadcastFun(reservoirArr);
            },
            clearWorkSiteMarker() {
                this.$mapLayersFun.MapBusinessLayersReservoirSiteBroadcastFun([]);
            }
        }
    };
</script>

<style lang="scss">
    .worker-panel {
        >p{
            text-align: center;
            padding: .5rem;
        }
    }

</style>
