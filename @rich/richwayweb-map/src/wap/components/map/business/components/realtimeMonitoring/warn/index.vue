<template>
    <div class="warn-panel">
        <p>这里是warn</p>
    </div>
</template>

<script type="text/ecmascript-6">
    import RichWayWebUtils from '@rich/richwayweb-utils';
    import axios from 'axios';

    const { mapState } = require(`vuex`);
    const { latlngToLeaflet } = RichWayWebUtils;

    export default {
        name: `warn`,
        components: {},
        props: {
            map: {
                type: Object,
                default: () => {
                    return {
                        setTimeOutId: null,
                        source: null,
                        warnList: [],
                        filterInfo: {},
                        filterDataList: [],
                        tableDataList: [],
                        tableRows: 20,
                        tablePage: 0,
                    };
                }
            }
        },
        data() {
            return {};
        },
        computed: {
            ...mapState([`rem`])
        },
        mounted() {
            this._log(`monitorGzshzh warn has mounted`);
            this.handleSearch();
        },
        activated() {
            this._log(`warn: activated`);
            this.createWarnMarker();
            this.setTimeOutSearch();
        },
        deactivated() {
            this._log(`warn: deactivated`);
            this.cancelSearch();
            this.clearWarnMarker();
            clearTimeout(this.setTimeOutId);
        },
        methods: {
            setTimeOutSearch() {
                // 3分钟一次轮询
                this.setTimeOutId = setTimeout(() => {
                    this.handleSearch(true);
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
                    this.warnList = [];
                    this.filterDataList = [];
                    this.tableDataList = [];

                    const { CancelToken } = axios;
                    this.source = CancelToken.source();
                    searchInfo.cancelToken = this.source.token;
                    this.$getData.GetWarnAllMonitor().then(res => {
                        this.warnList = res.data || [];
                    }).always(() => {
                        this.filterDataListFun();
                        this.setTimeOutSearch();
                    });
                });
            },
            filterDataListFun() {
                this.filterDataList = [];
                for (const item of this.warnList) {
                    this.filterDataList.push(item);
                }
                this.createWarnMarker();
                this.tablePage = 0;
            },
            createWarnMarker() {
                this.clearWarnMarker();
                const arr = [];
                for (const item of (this.filterDataList || [])) {
                    if (item.centroid) {
                        [item.lttd, item.lgtd] = latlngToLeaflet.latlngByPoint(item.centroid);
                        item.options = {
                            tips: {
                                top: item.ptcount,
                                bottom: item.name
                            },
                            level: 2
                        };
                    }

                    // 处理形状数据为JSON
                    if (item.shape) {
                        let shape = null;
                        try {
                            shape = JSON.parse((item.shape || ``).replace(/'/g, `"`));
                        } catch (e) {
                            shape = {};
                        }
                        let bounds = null;
                        try {
                            bounds = JSON.parse(shape.rings);
                        } catch (e) {
                            bounds = [];
                        }
                        shape.bounds = latlngToLeaflet.latlngByBounds(bounds);
                        delete shape.rings;

                        item.shape = shape;
                    }

                    arr.push(item);
                }
                this.$mapLayersFun.MapBusinessLayersWarnBroadcastFun(arr);
            },
            clearWarnMarker() {
                this.$mapLayersFun.MapBusinessLayersWarnBroadcastFun([]);
            }
        }
    };
</script>

<style lang="scss">
    .warn-panel {
        >p{
            text-align: center;
            padding: .5rem;
        }
    }

</style>
