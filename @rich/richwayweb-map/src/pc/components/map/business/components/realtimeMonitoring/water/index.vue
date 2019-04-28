<template>
	<div class="water-panel">
		<!-- 查询输入框 -->
		<SiteSearch
			@on-search="handleSearch"
			@on-change="handleChange" />

		<!-- 查询表单 -->
		<el-form
			ref="waterForm"
			:model="ruleForm"
			label-width="4.5rem"
			label-position="left"
			class="water-panel-form panel-form">

			<!-- 检测类型 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">检测类型:</b>
				<el-radio-group v-model="ruleForm.detectionType">
					<el-radio
						v-for="(item, index) in detectionTypeList"
						:label="item.code"
						:key="index"
						@change="handelDetectionTypeChange">{{ item.title }}
					</el-radio>
				</el-radio-group>
			</el-form-item>

			<!-- 数据来源 -->
			<!--<el-form-item>-->
			<!--<b-->
			<!--slot="label"-->
			<!--class="form-label">数据来源:</b>-->
			<!--<el-checkbox-group v-model="ruleForm.dataSources">-->
			<!--<el-checkbox-->
			<!--v-for="(item, index) in dataSourcesList"-->
			<!--:label="item.code"-->
			<!--:key="index">{{ item.title }}-->
			<!--</el-checkbox>-->
			<!--</el-checkbox-group>-->
			<!--</el-form-item>-->

			<!-- 时段监视 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">时段监视:</b>
				<el-col :span="11">
					<el-date-picker
						v-model="ruleForm.stm"
						clear-icon
						size="mini"
						type="datetime"
						value-format="yyyy-MM-dd HH:mm"
						format="yyyy-MM-dd HH:mm"
						placeholder="选择日期"
						style="width: 100%;
"
						@change="handlePickerChange" />
				</el-col>
				<el-col
					:span="2"
					class="line">至
				</el-col>
				<el-col :span="11">
					<el-date-picker
						v-model="ruleForm.etm"
						clear-icon
						size="mini"
						type="datetime"
						value-format="yyyy-MM-dd HH:mm"
						format="yyyy-MM-dd HH:mm"
						placeholder="选择日期"
						style="width: 100%;
"
						@change="handlePickerChange" />
				</el-col>
			</el-form-item>

			<!-- 行政区划 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">行政区划:</b>
				<CascaderSegion
					v-model="ruleForm.addvcd"
					:selected-options="selectedOptions"
					:change-on-select="true"
					:region-info="currentRegionInfo"
					size="mini" />
			</el-form-item>

			<!-- 水库类型 -->
			<el-form-item v-show="ruleForm.detectionType === `rsvr`">
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

			<!-- 数据过滤项 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">过&ensp;滤&ensp;项:</b>
				<el-checkbox-group
					v-model="ruleForm.dataFilterItem"
					@change="handleCheckBoxChange">
					<el-checkbox
						v-for="(item, index) in dataFilterItemList"
						:label="item.code"
						:key="index">{{ item.title }}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>

		<div
			v-show="ruleForm.detectionType === `river`"
			class="rainfall-tips">
			<b>河道统计</b>
			<p>&nbsp;&nbsp;共有<span class="count">{{ rangeTotal._numWaterJie }}</span> 个河道站水位超警,其中<span class="count">超警戒</span>水位<span class="count">{{ rangeTotal._numWaterJie }}</span>
				个,<span class="count">超保证</span>水位<span class="count">{{ rangeTotal._numWaterzheng }}</span> 个，最大值为<span class="count">超警戒{{ rangeTotal._maxWaterJie }}</span>
				m (<span class="count">{{ rangeTotal._maxStnmJie }}</span>)。</p>
		</div>
		<div
			v-show="ruleForm.detectionType === `rsvr`"
			class="rainfall-tips">
			<b>水库统计</b>
			<p>&nbsp;&nbsp;共有<span class="count">{{ rangeTotal.total }}</span> 个水库站水位超警,其中<span class="count">超校核{{ rangeTotal._numHe }}</span>
				个,<span class="count">超设计{{ rangeTotal._numJi }}</span> 个，<span class="count">超汛限{{ rangeTotal._numXian }}</span> 个，最大值为<span class="count">超汛限{{ rangeTotal._bigJie }}</span>
				m (<span class="count">{{ rangeTotal._bigStnmJie }}</span>)。</p>
		</div>


		<!-- 水情列表 -->
		<div
			v-loading="waterListLoading"
			class="water-list panel-list">
			<span id="tablePrev" />
			<span
				class="water-list-detail"
				@click.stop="handleShowListDetail">{{ showListDetail ? '关闭详情' : '显示详情' }}</span>
			<el-table
				v-loadmore="loadMore"
				:data="tableDataList"
				:max-height="tableMaxH"
				:row-style="tableRowStyle"
				stripe
				style="width: 100%; cursor: pointer;"
				@row-click="handelRowClick">
				<template v-for="(item, index) in siteColumnList">
					<el-table-column
						v-if="typeof (item.renderFun) === 'function'"
						:prop="item.prop"
						:label="item.label"
						:width="item.width"
						:header-align="item.headerAlign"
						:align="item.align"
						:formatter="item.formatterFun"
						:key="index"
						fixed>
						<template slot-scope="scope">
							<div v-html="item.renderFun(scope.row)" />
						</template>
					</el-table-column>
					<el-table-column
						v-else
						:prop="item.prop"
						:label="item.label"
						:width="item.width"
						:header-align="item.headerAlign"
						:align="item.align"
						:formatter="item.formatterFun"
						:key="index"
						fixed />
				</template>
			</el-table>
		</div>

		<!-- 水情图例 -->
		<Legend
			:list="legendList"
			:column="4" />

		<!-- 水情详情弹窗 -->
		<WaterDetailDialog
			v-show="showWaterDetail"
			:type="ruleForm.detectionType"
			:detail-info="currentWaterInfo"
			@on-hide="showWaterDetail=false" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';
import { _filterFrgrd, _filterStlc, _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';
import MapLegendIcon from "../../../../icon";
import iconType from "../../../../../../../constants/iconType";
import axios from 'axios';
import { riverTypeListByColor, reservoirTypeListByColor, reservoirTypeListBySize } from "../type";

const moment = require(`moment`);
const { mapState } = require(`vuex`);

const WaterDetailDialog = r => require.ensure([], () => r(require(`./waterDetailDialog`)), `components/map/business/realtimeMonitoring/water/index`);
const Legend = r => require.ensure([], () => r(require(`../legend`)), `components/map/business/realtimeMonitoring/index`);
const SiteSearch = r => require.ensure([], () => r(require(`../siteSearch`)), `components/map/business/realtimeMonitoring/index`);
const { CascaderSegion } = RichWayWebComponents;
const { deepClone, offset } = RichWayWebUtils;
const { iconTypeInfo } = iconType;

export default {
    name: `water`,
    components: {
        SiteSearch,
        Legend,
        CascaderSegion,
        WaterDetailDialog
    },
    filters: {
        _filterFrgrd,
        _filterStlc,
        _filterNum
    },
    props: {
        map: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            setTimeOutId: null,
            source: null,
            tableMaxH: 300,
            showListDetail: false,
            waterListLoading: false,
            nowDate: new Date(),
            selectedOptions: [],
            currentRegionInfo: {
                code: ``,
                name: ``
            },
            ruleForm: {
                detectionType: `river`,
                dataSources: [`hydrology`, `mountain_torrents`],
                stm: (moment().format(`HH`) < 8 ? (moment().add(-1, `d`)) : moment()).hour(8).minute(0).second(0).format(`YYYY-MM-DD HH:mm`),
                etm: moment().format(`YYYY-MM-DD HH:mm`),
                reservoirType: [],
                dataFilterItem: [],
                addvcd: ``
            },
            detectionTypeList: [
                {
                    code: `river`,
                    title: `河道`
                },
                {
                    code: `rsvr`,
                    title: `水库`
                }
            ],
            dataSourcesList: [
                {
                    code: `hydrology`,
                    title: `水文`
                },
                {
                    code: `mountain_torrents`,
                    title: `山洪`
                }
            ],
            riverTypeListByColor,
            reservoirTypeListByColor,
            reservoirTypeListBySize,
            rangeTotal: {
                total: 0,
                _numWaterJie: 0,
                _numWaterzheng: 0,
                _maxWaterJie: 0,
                _maxStnmJie: `-`,
                _numHe: 0,
                _numJi: 0,
                _numXian: 0,
                _bigJie: 0,
                _bigStnmJie: `-`
            },
            waterList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0,
            layerGroupMarker: null,
            showWaterDetail: false,
            currentWaterInfo: {}
        };
    },
    computed: {
        ...mapState([`rem`]),
        dataFilterItemList() {
            const arr = [{
                code: `1`,
                title: `仅显示超警戒测站`
            }];
            if (this.ruleForm.detectionType === `rsvr`) {
                arr.push({
                    code: `3`,
                    title: `视频`
                });
            }
            arr.push({
                code: `2`,
                title: `显示测站名称`
            });
            return arr;
        },
        siteColumnList() {
            const arr = [];
            arr.push({
                prop: `stnm`,
                label: `站名`,
                renderFun: row => `<p title="${row.stnm}">${_filterStlc(row.stnm, 4)}</p>`
            });
            arr.push({
                prop: `stlc`,
                label: `测站地址`,
                width: 100 * this.rem,
                renderFun: row => `<p title="${row.stlc}">${_filterStlc(row.stlc, 4)}</p>`
            });
            arr.push({
                prop: `tm`,
                label: `时间`,
                width: 110 * this.rem,
                renderFun: row => `<p title="${row.tm}">${this._filterTm(row.tm)}</p>`
            });
            if (this.ruleForm.detectionType === `river`) {
                arr.push({
                    prop: `z`,
                    width: 80 * this.rem,
                    label: `水位(m)`,
                    headerAlign: `right`,
                    align: `right`,
                    formatterFun: row => _filterNum(row.z)
                });
                if (this.showListDetail) {
                    arr.push({
                        prop: `overWrz`,
                        width: 120 * this.rem,
                        label: `超警戒(m)`,
                        headerAlign: `right`,
                        align: `right`,
                        formatterFun: row => _filterNum(row.overWrz)
                    });
                    arr.push({
                        prop: `overGrz`,
                        width: 120 * this.rem,
                        label: `超保证(m)`,
                        headerAlign: `right`,
                        align: `right`,
                        formatterFun: row => _filterNum(row.overGrz)
                    });
                    arr.push({
                        prop: `q`,
                        width: 120 * this.rem,
                        label: `流量(m³/s)`,
                        headerAlign: `right`,
                        align: `right`,
                        formatterFun: row => _filterNum(row.q)
                    });
                    arr.push({
                        prop: `tm`,
                        width: 170 * this.rem,
                        label: `上报时间`,
                        formatterFun: row => {
                            if (row.tm === null) {
                                return `--`;
                            }
                            return moment(row.tm).format(`YYYY-MM-DD HH:mm`);
                        }
                    });
                    arr.push({ prop: `bsnm`, label: `水系`, width: `70` });
                    arr.push({ prop: `wptn`, label: `水势`, width: `70` });
                } else {
                    arr.push({
                        prop: `overWrz`,
                        width: 95 * this.rem,
                        label: `超警戒(m)`,
                        headerAlign: `right`,
                        align: `right`,
                        formatterFun: row => _filterNum(row.overWrz)
                    });
                }
            } else {
                arr.push({
                    prop: `rz`,
                    width: 80 * this.rem,
                    label: `水位(m)`,
                    headerAlign: `right`,
                    align: `right`,
                    formatterFun: row => _filterNum(row.rz)
                });
                arr.push({
                    prop: `overflz`,
                    label: `超汛限(m)`,
                    width: 95 * this.rem,
                    headerAlign: `right`,
                    align: `right`,
                    formatterFun: row => _filterNum(row.overflz)
                });
                if (this.showListDetail) {
                    arr.push({
                        prop: `ENG_GRAD`,
                        width: 60 * this.rem,
                        label: `类型`,
                        headerAlign: `right`,
                        align: `right`
                        // formatterFun: row => _filterEngGrad(row.ENG_GRAD)
                    });
                    arr.push({
                        prop: `overDsflz`,
                        label: `超设计(m)`,
                        width: 100 * this.rem,
                        headerAlign: `right`,
                        align: `right`,
                        formatterFun: row => _filterNum(row.overDsflz)
                    });
                    arr.push({
                        prop: `overCkflz`,
                        label: `超校核(m)`,
                        width: 100 * this.rem,
                        headerAlign: `right`,
                        align: `right`,
                        formatterFun: row => _filterNum(row.overCkflz)
                    });
                    arr.push({
                        prop: `q`,
                        width: 120 * this.rem,
                        label: `流量(m³/s)`,
                        headerAlign: `right`,
                        align: `right`,
                        formatterFun: row => _filterNum(row.q)
                    });
                    arr.push({
                        prop: `tm`,
                        width: 170 * this.rem,
                        label: `上报时间`,
                        formatterFun: row => {
                            if (row.tm === null) {
                                return `--`;
                            }
                            return moment(row.tm).format(`YYYY-MM-DD HH:mm`);
                        }
                    });
                    arr.push({ prop: `bsnm`, label: `水系`, width: 70 * this.rem });
                }
            }
            return arr;
        },
        legendList() {
            const arr = [];
            if (this.ruleForm.detectionType === `river`) {
                // const codeList = [`OVERGRZ`, `OVERWRZ`, `NORMAL`];
                for (const item of this.riverTypeListByColor) {
                    arr.push({
                        visibility: true,
                        icon: MapLegendIcon[iconTypeInfo.MapIconRiverSite]({
                            options: item
                        })
                    });
                }
            } else {
                // const codeList = [`OVERFLZ`, `OVERDSFLZ`, `OVERCKFLZ`, `NORMAL`];
                for (const item of this.reservoirTypeListByColor) {
                    arr.push({
                        visibility: true,
                        icon: MapLegendIcon[iconTypeInfo.MapIconReservoirSite]({
                            options: item
                        })
                    });
                }
            }
            return arr;
        }
    },
    mounted() {
        this._log(`monitorGzshzh water has mounted`);
        this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
        // this.handleSearch();
        this.setAttr();
    },
    activated() {
        this._log(`water: activated`);
        this.setAttr();
        this.createWaterSiteMarker();
        this.handleSearch();
    },
    deactivated() {
        this._log(`water: deactivated`);
        this.cancelSearch();
        this.clearWaterSiteMarker();
        this.createVideoStationMarker();
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
                this.waterListLoading = !bl;
                this.showWaterDetail = false;
                this.currentWaterInfo = {};
                this.waterList = [];
                this.filterDataList = [];
                this.tableDataList = [];
                let funName = `GetNewRiverWaterMonitor`;
                if (`rsvr` === this.ruleForm.detectionType) {
                    funName = `GetNewRsvrWaterMonitor`;
                }

                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData[funName](searchInfo).then((res = {}) => {
                    this.waterList = res.data || [];

                    // 统计
                    const arrLength = this.waterList.length;
                    let maxValue = 0;
                    if (arrLength > 0) {
                        const maxItem = this.waterList[0];
                        this.rangeTotal._maxStnmJie = maxItem.stnm;
                        maxValue = maxItem.overWrz;
                        // 河道统计
                        if (this.ruleForm.detectionType === `river`) {
                            for (let i = 0; i < arrLength; i++) {
                                const item = this.waterList[i];
                                if (item.overWrz > 0) {
                                    this.rangeTotal._numWaterJie++;
                                }
                                if (item.overGrz > 0) {
                                    this.rangeTotal._numWaterzheng++;
                                }
                            }
                        } else {
                            for (let i = 0; i < arrLength; i++) {
                                const item = this.waterList[i];
                                if (item.overCkflz > 0) {
                                    this.rangeTotal._numHe++;
                                }
                                if (item.overDsflz > 0) {
                                    this.rangeTotal._numJi++;
                                }
                                if (item.overflz > 0) {
                                    this.rangeTotal._numXian++;
                                }
                            }
                        }
                    }
                    this.rangeTotal._maxWaterJie = maxValue;
                }).always(() => {
                    this.waterListLoading = false;
                    this.filterDataListFun();

                    // 查询视频站的数据
                    this.handleSearchVideoData();
                    this.setTimeOutSearch();
                });
            });
        },
        handleChange(siteName) {
            this.filterInfo.siteName = siteName;
            this.filterDataListFun();
        },
        handleShowListDetail() {
            this.showListDetail = !this.showListDetail;
            this.$emit(`on-long`, this.showListDetail);
        },
        handelRowClick(row) {
            this.currentWaterInfo = row;
            this.showWaterDetail = true;
            // this.map.flyTo([row.lttd, row.lgtd], 12);
        },
        handlePickerChange() {
            this.setAttr();
        },
        handelDetectionTypeChange() {
            this.handleSearch();
            this.showWaterDetail = false;
            this.currentWaterInfo = {};
        },
        filterDataListFun() {
            this.filterDataList = [];
            for (const item of this.waterList) {
                if ((item.stnm || ``).indexOf(this.filterInfo.siteName) > -1 || !this.filterInfo.siteName) {
                    this.filterDataList.push(item);
                }
            }
            this.createWaterSiteMarker();
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
        getSiteType(code, type) {
            let arr = [];
            if (type === `river`) {
                arr = this.riverTypeListByColor;
            } else {
                arr = this.reservoirTypeListByColor;
            }
            return arr.find(item => (code || ``).toUpperCase() === item.code);
        },
        tableRowStyle({ row }) {
            if (this.ruleForm.detectionType === `river`) {
                if (row.overWrz > 0) {
                    if (row.overGrz > 0) {
                        return this.getSiteType(`overGrz`, `river`);
                    }
                    return this.getSiteType(`overWrz`, `river`);
                }
            } else if (row.overflz > 0) {
                if (row.overDsflz > 0) {
                    if (row.overCkflz > 0) {
                        return this.getSiteType(`overCkflz`, `rsvr`);
                    }
                    return this.getSiteType(`overDsflz`, `rsvr`);
                }
                return this.getSiteType(`overflz`, `rsvr`);
            }
            return {};
        },
        createWaterSiteMarker() {
            this.clearWaterSiteMarker();
            const arr = [];
            for (const item of this.filterDataList) {
                let info = ``;
                let bl = false;
                if (this.ruleForm.detectionType === `river`) {
                    if (item.overGrz > 0) {
                        info = this.getSiteType(`overGrz`, `river`);
                    } else if (item.overWrz > 0) {
                        info = this.getSiteType(`overGrz`, `river`);
                    } else {
                        info = this.getSiteType(`NORMAL`, `river`);
                    }
                    if (this.ruleForm.dataFilterItem.includes(`1`)) {
                        if (info.code === `OVERWRZ`) {
                            bl = true;
                        }
                    } else {
                        bl = true;
                    }
                } else {
                    if (item.overflz > 0) {
                        info = this.getSiteType(`overflz`, `rsvr`);
                    } else if (item.overDsflz > 0) {
                        info = this.getSiteType(`overDsflz`, `rsvr`);
                    } else if (item.overCkflz > 0) {
                        info = this.getSiteType(`overCkflz`, `rsvr`);
                    } else {
                        info = this.getSiteType(`NORMAL`, `rsvr`);
                    }
                    if (this.ruleForm.dataFilterItem.includes(`1`)) {
                        if (info.code === `OVERFLZ`) {
                            bl = true;
                        }
                    } else {
                        bl = true;
                    }
                }

                item.options = Object.assign({
                    tips: {
                        top: _filterNum(item.z || item.rz, 2)
                    },
                    // 点击地图上面的标记的事件
                    clickFun: (o = {}) => {
                        this.currentWaterInfo = o;
                        this.showWaterDetail = true;
                    }
                }, info);

                if (this.ruleForm.dataFilterItem.includes(`2`)) {
                    item.options.tips.bottom = item.stnm;
                }

                if (bl) {
                    arr.push(item);
                }
            }

            if (this.ruleForm.detectionType === `river`) {
                this.$mapLayersFun.MapBusinessLayersRiverSiteBroadcastFun(arr);
            } else {
                this.$mapLayersFun.MapBusinessLayersReservoirSiteBroadcastFun(arr);
            }
        },
        clearWaterSiteMarker() {
            this.$mapLayersFun.MapBusinessLayersRiverSiteBroadcastFun([]);
            this.$mapLayersFun.MapBusinessLayersReservoirSiteBroadcastFun([]);
        },
        handleCheckBoxChange() {
            if (this.ruleForm.dataFilterItem.includes(`1`) || this.ruleForm.dataFilterItem.includes(`2`)) {
                this.createWaterSiteMarker();
            }

            // 显示隐藏视频站
            this.handleSearchVideoData();
        },
        // 查询视频站数据
        handleSearchVideoData() {
            if (this.waterListLoading === true) {
                return false;
            }
            this.clearVideoStationMarker();
            if (this.ruleForm.detectionType === `rsvr` && this.ruleForm.dataFilterItem.includes(`3`)) {
                const searchInfo = {};
                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData.GetVideoStationListMonitor(searchInfo).then((res = {}) => {
                    this.videoList = res.data || [];
                    this.createVideoStationMarker();
                });
            }
        },
        // 显示视频站
        createVideoStationMarker() {
            this.clearVideoStationMarker();
            const arr = [];
            for (const item of (this.videoList || [])) {
                item.options = {
                    tips: {
                        top: item.stnm
                    }
                };
                arr.push(item);
            }
            this.$mapLayersFun.MapBusinessLayersVideoSiteBroadcastFun(arr);
        },
        // 清除视频站
        clearVideoStationMarker() {
            this.$mapLayersFun.MapBusinessLayersVideoSiteBroadcastFun([]);
        },
        getTableMaxH() {
            const tablePrevOffset = offset(document.getElementById(`tablePrev`));
            const clientH = document.body.clientHeight;
            const maxH = clientH - tablePrevOffset.top - 64 * this.rem;
            this.tableMaxH = maxH;
        },
        loadMore() {
            this.getTableDataList();
        },
        setAttr() {
            this.$mapLayersFun.MapAttrBroadcastFun({
                html: `<p style="font-size: 1rem;margin-bottom: .2rem"><b>山洪预警实时监视</b></p><p>${this.ruleForm.stm}-${this.ruleForm.etm}</p>`
            });
        },
        _filterTm(tm) {
            if (tm === null) {
                return `--`;
            }
            return moment(tm).format(`MM-DD HH:mm`);
        }
    }
};
</script>

<style lang="scss">
		.water-panel {
            user-select: none;
			.line {
				position: relative;
				top: .2rem;
				display: inline-block;
				text-align: center;
			}

			.water-list-detail {
				display: inline-block;
				padding: .5rem;
				text-decoration: underline;
				color: blue;
				background: rgba(0, 0, 0, .1);
				cursor: pointer;

				&:hover {
					background: rgba(0, 0, 0, .2);
				}
			}

			.rainfall-tips {
				margin: .5rem 0 1.5rem;

				> b {
					display: inline-block;
					padding: 0 .5rem;
					margin-bottom: .5rem;
					border-left: 4px solid #0fcadd;
					color: #000;
				}

				> p {
					line-height: 1.4;
				}

				.count {
					color: red;
				}
			}
		}

</style>
