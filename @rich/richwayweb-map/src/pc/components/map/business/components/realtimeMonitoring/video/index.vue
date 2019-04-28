<template>
	<div class="video-panel">
		<!-- 查询输入框 -->
		<SiteSearch
			@on-search="handleSearch"
			@on-change="handleChange" />

		<!-- 查询表单 -->
		<el-form
			ref="videoForm"
			:model="ruleForm"
			label-width="4.5rem"
			label-position="left"
			class="video-panel-form panel-form">

			<!-- 行政区划 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">行政区划:</b>
				<CascaderSegion
					v-model="ruleForm.adcd"
					:selected-options="selectedOptions"
					:change-on-select="true"
					:region-info="currentRegionInfo"
					size="mini" />
			</el-form-item>
		</el-form>

		<!-- 视频列表 -->
		<div
			v-loading="videoListLoading"
			class="video-list panel-list">
			<span id="tablePrev" />
			<el-table
				v-loadmore="loadMore"
				:data="tableDataList"
				:max-height="tableMaxH"
				class="hand"
				stripe
				style="width: 100%;"
				@row-click="handelRowClick">
				<el-table-column
					prop="stnm"
					label="站名">
					<template slot-scope="scope">
						<p :title="scope.row.stnm">{{ scope.row.stnm | _filterStr(4) }}</p>
					</template>
				</el-table-column>
				<el-table-column
					label="视频站地址">
					<template slot-scope="scope">
						<p :title="scope.row.stlc">{{ scope.row.stlc | _filterStr(4) }}</p>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';
import { _filterStr } from '@rich/richwayweb-utils/lib/filter/filterStation';
import axios from 'axios';

const { mapState } = require(`vuex`);

const SiteSearch = () => import(/* webpackChunkName: "components/map/business/realtimeMonitoring/index" */ `../siteSearch`);
const { deepClone, offset } = RichWayWebUtils;
const { CascaderSegion } = RichWayWebComponents;

export default {
    name: `video`,
    components: {
        SiteSearch,
        CascaderSegion
    },
    filters: {
        _filterStr
    },
    props: {
        map: {
            type: Object,
            default: () => ({})
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            setTimeOutId: null,
            ruleForm: {
                adcd: ``
            },
            selectedOptions: [],
            currentRegionInfo: {
                code: ``,
                name: ``
            },
            tableMaxH: 300,
            videoListLoading: false,
            videonList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0,
            layerGroupMarker: null,
            currentRainSite: {}
        };
    },
    computed: {
        ...mapState([`rem`])
    },
    mounted() {
        this._log(`monitorGzshzh video has mounted`);
        this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
        this.handleSearch();
    },
    activated() {
        this._log(`video: activated`);
        this.createVideoStationMarker();
        this.setTimeOutSearch();
    },
    deactivated() {
        this._log(`video: deactivated`);
        this.cancelSearch();
        this.clearVideoStationMarker();
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
        handleSearch(bl) {
            this.cancelSearch();
            this.$nextTick(() => {
                const searchInfo = deepClone(this.ruleForm);
                searchInfo.siteName = this.filterInfo.siteName;

                this._log(`searchInfo is`, searchInfo);
                this.videoListLoading = !bl;
                this.videoList = [];
                this.filterDataList = [];
                this.tableDataList = [];

                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData.GetVideoStationListMonitor(searchInfo).then((res = {}) => {
                    this.videoList = res.data || [];
                }).always(() => {
                    this.videoListLoading = false;
                    this.filterDataListFun();
                    this.setTimeOutSearch();
                });
            });
        },
        handleChange(siteName) {
            this.filterInfo.siteName = siteName;
            this.filterDataListFun();
        },
        handelRowClick(row) {
            this.currentRainSite = row;
            this.map.flyTo([row.lttd, row.lgtd], 12);
        },
        filterDataListFun() {
            this.filterDataList = [];
            for (const item of this.videoList) {
                if ((item.stnm || ``).indexOf(this.filterInfo.siteName) > -1 || !this.filterInfo.siteName) {
                    this.filterDataList.push(item);
                }
            }
            this.createVideoStationMarker();
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
        createVideoStationMarker() {
            this.clearVideoStationMarker();
            const arr = [];
            for (const item of (this.filterDataList || [])) {
                item.options = {
                    tips: {
                        top: item.stnm
                    }
                };
                arr.push(item);
            }
            this.$mapLayersFun.MapBusinessLayersVideoSiteBroadcastFun(arr);
        },
        clearVideoStationMarker() {
            this.$mapLayersFun.MapBusinessLayersVideoSiteBroadcastFun([]);
        },
        getTableMaxH() {
            const tablePrevOffset = offset(document.getElementById(`tablePrev`));
            const clientH = document.body.clientHeight;
            const maxH = clientH - tablePrevOffset.top - 24 * this.rem;
            this.tableMaxH = maxH;
        },
        loadMore() {
            this.getTableDataList();
        }
    }
};
</script>

<style lang="scss" scoped>
    .video-panel {
        user-select: none;

        .hand {
            cursor: pointer;
        }
    }
</style>
