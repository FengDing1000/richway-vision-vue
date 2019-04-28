<template>
	<div class="work-panel">
		<!-- 查询输入框 -->
		<SiteSearch
			placeholder="请输入工程名称"
			@on-search="handleSearch"
			@on-change="handleChange" />

		<!-- 查询表单 -->
		<el-form
			v-loading="workTypeListLoading"
			ref="workForm"
			:model="ruleForm"
			label-width="4.5rem"
			label-position="left"
			class="work-panel-form panel-form">
			<!--<el-form-item>-->
			<!--<ul class="work-type-list">-->
			<!--<li-->
			<!--v-for="(item, index) in workTypeList"-->
			<!--:key="index">-->
			<!--<el-checkbox-->
			<!--v-model="ruleForm.workType"-->
			<!--:label="item.code">-->
			<!--<span class="work-type-item">{{ item.name + '(' + item.count + ')' }}<span class="work-type-detail">详细</span></span>-->
			<!--</el-checkbox>-->
			<!--</li>-->
			<!--</ul>-->
			<!--</el-form-item>-->

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
			<el-form-item>
				<b
					slot="label"
					class="form-label">水库类型:</b>
				<el-checkbox-group v-model="ruleForm.reservoirType">
					<el-checkbox
						v-for="(item, index) in reservoirTypeListBySize"
						:label="item.code"
						:key="index">{{ item.title }}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>

		<!-- 工情列表 -->
		<div
			v-loading="workListLoading"
			class="work-list panel-list">
			<span id="tablePrev" />
			<el-table
				v-loadmore="loadMore"
				:data="tableDataList"
				:max-height="tableMaxH"
				stripe
				style="width: 100%;
"
				class="hand"
				@row-click="handelRowClick">
				<el-table-column
					prop="RES_NAME"
					label="工程名称">
					<template slot-scope="scope">
						<p :title="scope.row.RES_NAME">{{ scope.row.RES_NAME | _filterStlc(8) }}</p>
					</template>
				</el-table-column>
				<el-table-column
					:width="140 * rem"
					prop="ENG_GRAD"
					label="工程等级">
					<template slot-scope="scope">
					<p>{{ scope.row.ENG_GRAD | _filterEngGrad(scope.row.ENG_GRAD) }}</p></template>
				</el-table-column>
				<el-table-column
					:width="140 * rem"
					prop="TOT_CAP"
					header-align="right"
					align="right"
					label="总库容(万m³)">
					<template slot-scope="scope">
						<span class="richway-right">{{ scope.row.TOT_CAP | _filterNum(3) }}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 工情详情弹窗 -->
		<WorkDetailDialog
			v-show="showWorkDetail"
			:work-info="currentWork"
			@on-hide="showWorkDetail=false" />

		<!-- 工情图例 -->
		<Legend
			:list="legendList"
			:column="4" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';
import MapLegendIcon from "../../../../icon";
import iconType from "../../../../../../../constants/iconType";
import { _filterEngGrad, _filterStlc, _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';
import axios from 'axios';
import { reservoirTypeListByColor, reservoirTypeListBySize } from "../type";

const { mapState } = require(`vuex`);

const WorkDetailDialog = r => require.ensure([], () => r(require(`./workDetailDialog`)), `components/map/business/realtimeMonitoring/work/index`);
const Legend = r => require.ensure([], () => r(require(`../legend`)), `components/map/business/realtimeMonitoring/index`);
const SiteSearch = r => require.ensure([], () => r(require(`../siteSearch`)), `components/map/business/realtimeMonitoring/index`);
const { CascaderSegion } = RichWayWebComponents;
const { deepClone, offset } = RichWayWebUtils;
const { iconTypeInfo } = iconType;

export default {
    name: `work`,
    components: {
        SiteSearch,
        WorkDetailDialog,
        Legend,
        CascaderSegion
    },
    filters: {
        _filterEngGrad,
        _filterStlc,
        _filterNum
    },
    props: {
        map: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            setTimeOutId: null,
            source: null,
            tableMaxH: 300,
            workTypeListLoading: false,
            workListLoading: false,
            selectedOptions: [],
            currentRegionInfo: {
                code: ``,
                name: ``
            },
            ruleForm: {
                detectionType: `reservoir`,
                workType: [`reservoir`],
                listadmin: [],
                adcd: ``,
                reservoirType: []
            },
            reservoirTypeListByColor,
            reservoirTypeListBySize,
            workTypeList: [],
            workList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0,
            currentWork: {},
            showWorkDetail: false
        };
    },
    computed: {
        ...mapState([`rem`]),
        legendList() {
            const arr = [];
            for (const item of this.reservoirTypeListBySize) {
                arr.push({
                    visibility: true,
                    icon: MapLegendIcon[iconTypeInfo.MapIconReservoirSite]({
                        options: item
                    })
                });
            }
            // arr.push({
            //     visibility: true,
            //     icon: MapLegendIcon[iconTypeInfo.MapIconSluiceSite]()
            // });
            // arr.push({
            //     visibility: true,
            //     icon: MapLegendIcon[iconTypeInfo.MapIconHydropowerStation]()
            // });
            return arr;
        }
    },
    mounted() {
        this._log(`monitorGzshzh work has mounted`);
        this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
        // this.handleSearch();
        // this.getWorkTypeList();
    },
    activated() {
        this._log(`work: activated`);
        this.createWorkSiteMarker();
        this.handleSearch();
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
                // tbnm=DANAD&pid=5223012012000032m06R
                const searchInfo = deepClone(this.ruleForm);
                searchInfo.tbnm = `ATT_RES_BASE`;
                // searchInfo.resCode = `522226026000008`;
                searchInfo.siteName = this.filterInfo.siteName;
                this._log(`searchInfo is`, searchInfo, this.$getData);
                this.workListLoading = !bl;
                this.showWorkDetail = false;
                this.currentWork = {};
                this.workList = [];
                this.filterDataList = [];
                this.tableDataList = [];

                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData.GetWorkAllMonitor(searchInfo).then((res = {}) => {
                    this.workList = res.data || [];
                }).always(() => {
                    this.workListLoading = false;
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
            this._log(`current work is`, this.currentWork);
            this.currentWork = row;
            this.showWorkDetail = true;
            // this.map.flyTo([row.lttd, row.lgtd], 12);
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
        getWorkTypeList() {
            this.workTypeListLoading = true;
            this.$getData.GetWorkTypeAllMonitor().then((res = {}) => {
                this.workTypeList = res.data || [];
            }).always(() => {
                this.workTypeListLoading = false;
            });
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
                        this.currentWork = o;
                        this.showWorkDetail = true;
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
		.work-panel{
            user-select: none;
			.work-type-list {
				li {
					float: left;
					display: inline-block;
					width: 50%;
				}

				.work-type-detail {
					padding-left: .2rem;
					text-decoration: underline;
					color: blue;
					cursor: pointer;
				}
			}

			.work-list {
				.work-detail-btn {
					text-decoration: underline;
					color: blue;
					cursor: pointer;
				}
			}
		}

		.hand {
			cursor: pointer;
		}
</style>
