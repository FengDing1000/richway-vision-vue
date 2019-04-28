<template>
	<div class="rain-panel">
		<!-- 查询输入框 -->
		<SiteSearch
			@on-search="handleSearch"
			@on-change="handleChange" />
		<!-- 查询表单s -->
		<el-form
			ref="waterForm"
			:model="ruleForm"
			label-width="4.5rem"
			label-position="left"
			class="rain-panel-form panel-form">

			<!-- 数据来源 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">数据来源:</b>
				<el-checkbox-group v-model="ruleForm.frgrdlist">
					<el-checkbox
						v-for="(item, index) in dataSourcesList"
						:label="item.code"
						:key="index">{{ item.title }}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>

			<!-- 时段监视 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">时段监视:</b>
				<!--<ul class="time-type-list">
					<li
						v-for="(item, index) in timeTypeList"
						:key="index">
						<span
							:class="[ruleForm.timeTyp === item.code ? 'active' : '']"
							class="time-type-item"
							@click.stop="handleTimeType(item)">{{ item.title }}</span>
					</li>
				</ul>-->
				<el-row class="time-value">
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
				</el-row>
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

		<!-- 降雨统计 -->
		<div class="rainfall-tips">
			<b>降雨统计</b>
			<p>&nbsp;&nbsp;共有<span class="count">{{ rangeTotal.total }}</span> 个站下雨,大于100mm <span class="count">{{ rangeTotal._max100 }}</span>
				个,大于50mm <span class="count">{{ rangeTotal._max50 }}</span> 个,大于25mm <span class="count">{{ rangeTotal._max25 }}</span>
				个,大于10mm <span class="count">{{ rangeTotal._max10 }}</span> 个，最大值为 <span class="count">{{ rangeTotal._max }}</span>
				mm (<span class="count">{{ rangeTotal._maxStnm }}</span>)。</p>
		</div>

		<!-- 雨情列表 -->
		<div
			v-loading="rainListLoading"
			class="rain-list panel-list">
			<span id="tablePrev" />
			<el-table
				v-loadmore="loadMore"
				:data="tableDataList"
				:max-height="tableMaxH"
				class="hand"
				stripe
				style="width: 100%;
"
				@row-click="handelRowClick">
				<el-table-column
					prop="stnm"
					label="站名">
					<template slot-scope="scope">
						<p :title="scope.row.stnm">{{ scope.row.stnm | _filterStr(4) }}</p>
					</template>
				</el-table-column>
				<el-table-column
					label="测站地址">
					<template slot-scope="scope">
						<p :title="scope.row.stlc">{{ scope.row.stlc | _filterStr(4) }}</p>
					</template>
				</el-table-column>
				<el-table-column
					:width="90 * rem"
					prop="drp"
					header-align="right"
					align="right"
					label="降雨(mm)">
					<template slot-scope="scope">
						<span>{{ scope.row.drp | _filterNum(1) }}</span>
					</template>
				</el-table-column>
				<el-table-column
					:width="90 * rem"
					label="来源">
					<template slot-scope="scope">
						<span>{{ scope.row | _filterFrgrd }}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 雨情图例 -->
		<Legend
			:list="legendList"
			:column="4" />

		<!-- 雨情测站详情弹窗 -->
		<RainSiteDetailDialog
			v-show="showRainSiteDetail"
			:detail-info="currentRainSite"
			:stm="ruleForm.stm"
			:etm="ruleForm.etm"
			@on-hide="showRainSiteDetail=false" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';
import { _filterStr, _filterNum } from '@rich/richwayweb-utils/lib/filter/filterStation';
import MapLegendIcon from "../../../../icon";
import iconType from "../../../../../../../constants/iconType";
import axios from 'axios';
import { rainTypeListByColor } from "../type";

const moment = require(`moment`);
const { mapState } = require(`vuex`);

const RainSiteDetailDialog = r => require.ensure([], () => r(require(`./rainSiteDetailDialog`)), `components/map/business/realtimeMonitoring/rain/index`);
const Legend = r => require.ensure([], () => r(require(`../legend`)), `components/map/business/realtimeMonitoring/index`);
const SiteSearch = r => require.ensure([], () => r(require(`../siteSearch`)), `components/map/business/realtimeMonitoring/index`);
const { CascaderSegion } = RichWayWebComponents;
const { deepClone, offset } = RichWayWebUtils;
const { iconTypeInfo } = iconType;

export default {
    name: `rain`,
    components: {
        SiteSearch,
        RainSiteDetailDialog,
        CascaderSegion,
        Legend
    },
    filters: {
        _filterStr, _filterNum,
        _filterFrgrd: (station = {}) => {
            if (station.frgrd === `2`) {
                return `指挥系统`;
            }
            if (station.frgrd === `5`) {
                return `气象`;
            }
            if (station.frgrd === `3`) {
                return `山洪`;
            }
            // if ((station.stcd || ``).length === 5) {
            //     return `气象`;
            // }
            return `水文`;
        }
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
            rainListLoading: false,
            nowDate: new Date(),
            selectedOptions: [],
            currentRegionInfo: {
                code: ``,
                name: ``
            },
            ruleForm: {
                frgrdlist: [],
                timeTyp: 8,
                stm: (moment().format(`HH`) < 8 ? (moment().add(-1, `d`)) : moment()).hour(8).minute(0).second(0).format(`YYYY-MM-DD HH:mm`),
                etm: moment().format(`YYYY-MM-DD HH:mm`),
                addvcd: ``,
                rainfall: {
                    stage: [],
                    threshold: 56,
                    show: []
                },
                dataFilterItem: []
            },
            dataSourcesList: [
                {
                    code: `1`,
                    title: `水文`
                },
                {
                    code: `5`,
                    title: `气象`
                },
                {
                    code: `3`,
                    title: `山洪`
                },
                {
                    code: `2`,
                    title: `指挥系统`
                }
            ],
            timeTypeList: [
                {
                    code: 1,
                    title: `1小时`
                },
                {
                    code: 3,
                    title: `3小时`
                },
                {
                    code: 8,
                    title: `8小时`
                }, {
                    code: 24,
                    title: `24小时`
                }
            ],
            rangeTotal: {
                total: 0,
                _max100: 0,
                _max50: 0,
                _max25: 0,
                _max10: 0,
                _max: 0,
                _maxStnm: `-`
            },
            dataFilterItemList: [
                {
                    code: `1`,
                    title: `显示降雨区域分布图`
                },
                {
                    code: `2`,
                    title: `显示测站名称`
                }
            ],
            rainTypeListByColor,
            rainList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0,
            layerGroupMarker: null,
            currentRainSite: {},
            showRainSiteDetail: false
        };
    },
    computed: {
        ...mapState([`userInfo`, `rem`]),
        legendList() {
            const arr = [];
            for (const item of this.rainTypeListByColor) {
                arr.push({
                    visibility: true,
                    icon: MapLegendIcon[iconTypeInfo.MapIconRain]({
                        options: item
                    })
                });
            }
            return arr;
        }
    },
    mounted() {
        this._log(`monitorGzshzh rain has mounted`);
        this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
        // this.handleSearch();
        this.setAttr();
    },
    activated() {
        this._log(`rain: activated`);
        this.setAttr();
        this.createRainSiteMarker();
        this.handleSearch();
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
                searchInfo.minDrp = 0.1;
                searchInfo.stm = this.ruleForm.stm;
                searchInfo.etm = this.ruleForm.etm;
                if (searchInfo.frgrdlist.length === 0) {
                    delete searchInfo.frgrdlist;
                }
                this._log(`searchInfo is`, searchInfo);
                this.rainListLoading = !bl;
                this.showRainSiteDetail = false;
                this.currentRainSite = {};
                this.rainList = [];
                this.filterDataList = [];
                this.tableDataList = [];

                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData.GetRainAllMointor(searchInfo).then((res = {}) => {
                    this.rainList = res.data || [];

                    let maxValue = 0;
                    if (this.rainList.length > 0) {
                        // 最大值
                        const maxItem = this.rainList[0];
                        this.rangeTotal._maxStnm = maxItem.stnm;
                        maxValue = maxItem.drp;
                        this.rangeTotal.total = this.rainList.length;
                        for (let i = 0; i < this.rainList.length; i++) {
                            const item = this.rainList[i];
                            if (item.drp >= 100) {
                                this.rangeTotal._max100++;
                            }
                            if (item.drp >= 50) {
                                this.rangeTotal._max50++;
                            }
                            if (item.drp >= 25) {
                                this.rangeTotal._max25++;
                            }
                            if (item.drp >= 10) {
                                this.rangeTotal._max10++;
                            }
                        }
                    }
                    this.ruleForm.rainfall.threshold = maxValue;
                    this.rangeTotal._max = maxValue;
                }).always(() => {
                    this.rainListLoading = false;
                    this.filterDataListFun();
                    this.setTimeOutSearch();
                });
            });
        },
        handleChange(siteName) {
            this.filterInfo.siteName = siteName;
            this.filterDataListFun();
        },
        handleTimeType(item) {
            this.ruleForm.stm = moment(this.nowDate).hour(-item.code).format(`YYYY-MM-DD HH:mm`);
            this.ruleForm.timeTyp = item.code;
        },
        handlePickerChange() {
            this.setAttr();
        },
        handelRowClick(row) {
            this.currentRainSite = row;
            this.showRainSiteDetail = true;
            // this.map.flyTo([row.lttd, row.lgtd], 12);
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
                if (this.ruleForm.dataFilterItem.includes(`2`)) {
                    item.options.tips.bottom = item.stnm;
                }
                arr.push(item);
            }
            this.$mapLayersFun.MapBusinessLayersRainBroadcastFun(arr);
        },
        clearRainSiteMarker() {
            this.$mapLayersFun.MapBusinessLayersRainBroadcastFun([]);
        },
        handleCheckBoxChange(val) {
            // 是否显示测站
            this.createRainSiteMarker();

            // 获取等值线数据并广播
            if (val.includes(`1`)) {
                this.$getData.GetContourList().then((res = {}) => {
                    this.$mapLayersFun.MapBusinessLayersContourBroadcastFun({
                        type: `rain`,
                        data: res
                    });
                });
            } else {
                this.$mapLayersFun.MapBusinessLayersContourBroadcastFun();
            }
        },
        getTableMaxH() {
            const tablePrevOffset = offset(document.getElementById(`tablePrev`));
            const clientH = document.body.clientHeight;
            const maxH = clientH - tablePrevOffset.top - 24 * this.rem;
            this.tableMaxH = maxH;
        },
        setAttr() {
            this.$mapLayersFun.MapAttrBroadcastFun({
                html: `<p style="font-size: 1rem;margin-bottom: .2rem"><b>山洪预警实时监视</b></p><p>${this.ruleForm.stm}-${this.ruleForm.etm}</p>`
            });
        },
        loadMore() {
            this.getTableDataList();
        }
    }
};
</script>

<style lang="scss">
		.rain-panel {
            user-select: none;
			.time-type-list {
				display: flex;
				justify-content: space-between;

				.time-type-item {
					display: inline-block;
					width: 4rem;
					height: 1rem;
					border-radius: 2px;
					font-size: .6rem;
					line-height: 1rem;
					text-align: center;
					color: #fff;
					background: #4776cb;
					cursor: pointer;

					&:hover {
						background: rgba(0, 0, 0, .7);
					}

					&.active {
						background-color: rgba(0, 0, 0, .5);
					}
				}
			}

			.line {
				position: relative;
				top: .2rem;
				display: inline-block;
				text-align: center;
			}

			.count {
				color: red;
			}

			.rainfall-stage-list {
				li {
					float: left;
					display: inline-block;
					width: 33.3%;
				}

				.rainfall-stage-item {
					position: relative;
					top: .05rem;
					display: inline-block;
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
			}

			.hand {
				cursor: pointer;
			}
		}

</style>
