<template>
	<div class="effect-range-panel">
		<div class="effect-range-content">
			<div class="effect-range-item safe-transfer">
				<div class="item-title">避险转移</div>
				<ul class="item-total richway-clear">
					<li
						v-for="(item, index) in safeTransferInfo.totalData"
						:key="index">
						<span><em
							:style="item"
							class="count">{{ item.num }}</em>{{ item.unit }}</span>
						<span>{{ item.name }}</span>
					</li>
				</ul>
				<div
					v-loading="safeTransferInfo.loading"
					class="item-content">
					<el-table
						:data="safeTransferInfo.tableData"
						:max-height="tableMaxH"
						border
						style="width: 100%">
						<el-table-column
							prop="NAME"
							label="危险区名称">
							<template slot-scope="scope">
								<p :title="scope.row.NAME">{{ scope.row.NAME | _filterStlc(5) }}</p>
							</template>
						</el-table-column>
						<el-table-column
							:width="80 * rem"
							prop="PTCOUNT"
							label="人口(人)" />
						<el-table-column
							:width="80 * rem"
							prop="ETCOUNT"
							label="户数(户)" />
						<el-table-column
							prop="data4"
							label="责任人" />
						<el-table-column
							prop="data5"
							label="电话" />
						<el-table-column
							:width="60 * rem"
							label="操作">
							<template slot-scope="scope">
								<span
									class="detail"
									@click="handleMoreDetail(scope.row, {type:'safe_transfer', title: '【'+scope.row.NAME+'】详情信息' })">详情</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="effect-range-item monitoring-site">
				<div class="item-title">监测站点</div>
				<ul
					v-loading="monitoringSiteInfo.loading"
					class="item-content">
					<li
						v-for="(item, index) in monitoringSiteInfo.list"
						:key="index">
						<div>
							<span class="num">{{ item.num }}</span>
							<span>{{ item.name }}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="effect-range-item">
				<div class="item-title">
					<span>历史山洪灾害</span>
					<span
						class="more"
						@click="handleMoreDetail({ WSCD: wscd }, {type:'history_disaster', title: '历史山洪灾害'})">查看更多<i
							class="richway-icon icon-right" /></span>
				</div>
				<div
					v-loading="historyDisaster.loading"
					class="item-content">
					<el-table
						:data="historyDisaster.tableData"
						:max-height="tableMaxH"
						border
						style="width: 100%">
						<el-table-column
							prop="OTIME"
							label="时间" />
						<el-table-column
							prop="ADDRESS"
							label="地点">
							<template slot-scope="scope">
								<p :title="scope.row.ADDRESS">{{ scope.row.ADDRESS | _filterStlc(8) }}</p>
							</template>
						</el-table-column>
						<el-table-column
							prop="DPCOUNT"
							label="死亡人数(人)" />
						<el-table-column
							prop="MPCOUNT"
							label="失踪人数(人)" />
							<!--<el-table-column
                        :width="60 * rem"
                        label="操作">
                        <template slot-scope="scope">
                            <span
                                class="detail"
                                @click="handleMoreDetail(scope.row, {type:'history_disaster', title: '历史山洪灾害'})">详情</span>
                        </template>
                    </el-table-column>-->
					</el-table>
				</div>
			</div>
			<div class="effect-range-item">
				<div class="item-title">
					<span>需要治理的山洪沟</span>
					<span
						class="more"
						@click="handleMoreDetail({ WSCD: wscd }, {type:'mountain', title: '需要治理的山洪沟'})">查看更多<i
							class="richway-icon icon-right" /></span>
				</div>
				<div
					v-loading="mountainInfo.loading"
					class="item-content">
					<el-table
						:data="mountainInfo.tableData"
						:max-height="tableMaxH"
						border
						style="width: 100%">
						<el-table-column
							prop="NAME"
							label="山洪沟名称">
							<template slot-scope="scope">
								<p :title="scope.row.NAME">{{ scope.row.NAME | _filterStlc(8) }}</p>
							</template>
						</el-table-column>
						<el-table-column
							prop="TOWNS"
							label="影响乡镇(个)">
							<template slot-scope="scope">
								<p :title="scope.row.TOWNS">{{ scope.row.TOWNS }}</p>
							</template>
						</el-table-column>
						<el-table-column
							prop="FSTAND"
							label="现状防洪标准(年)" />
						<el-table-column
							prop="PCOUNT"
							label="影响人口(人)" />
							<!--<el-table-column
                        :width="60 * rem"
                        label="操作">
                        <template slot-scope="scope">
                            <span
                                class="detail"
                                @click="handleMoreDetail(scope.row, {type:'mountain', title: '需要治理的山洪沟'})">详情</span>
                        </template>
                    </el-table-column>-->
					</el-table>
				</div>
			</div>
			<div class="effect-range-item more-list">
				<div class="item-title">更多</div>
				<ul class="item-content richway-clear">
					<li
						v-for="(item, index) in moreList"
						:key="index">
						<span
							class="detail"
							@click="handleMoreDetail(item, {type:'more', title: '更多'})">{{ item.title }}</span>
					</li>
				</ul>
			</div>
		</div>
		<DetailDialog
			v-show="showDetail"
			:type="type"
			:title="title"
			:detail-info="detailInfo"
			:wscd="wscd"
			@on-hide="showDetail=false" />

		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogImgVisible"
			width="50rem"
			title="图片">
			<div class="images-content">
				<img :src="currentImgUrl">
			</div>
		</el-dialog>
	</div>
</template>s
<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import { _filterStlc } from '@rich/richwayweb-utils/lib/filter/filterStation';
import axios from 'axios';
import moreListData from './moreList';

const { mapState } = require(`vuex`);

const DetailDialog = () => import(/* webpackChunkName: "components/map/business/effectRange/index" */ `./detailDialog`);
const { latlngToLeaflet } = RichWayWebUtils;

export default {
    name: `effectRange`,
    components: {
        DetailDialog
    },
    filters: {
        _filterStlc
    },
    props: {
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
            source: null,
            stcd: ``,
            stm: ``,
            etm: ``,
            SpatialDataInfo: [],
            wscd: ``,
            showDetail: false,
            detailInfo: {},
            type: ``,
            title: ``,
            safeTransferInfo: {
                loading: false,
                totalDataNum: {},
                totalData: [
                    {
                        code: `danadCount`,
                        name: `危险区`,
                        num: `-`,
                        unit: `个`,
                        color: `rgb(255, 102, 51)`
                    },
                    {
                        code: `ptCount`,
                        name: `危险区内总人口`,
                        num: `-`,
                        unit: `人`,
                        color: `rgb(46, 227, 245)`
                    },
                    {
                        code: `etCount`,
                        name: `危险区内总户数`,
                        num: `-`,
                        unit: `户`,
                        color: `rgb(249, 233, 0)`
                    },
                    {
                        code: `transferCount`,
                        name: `转移路线`,
                        num: `-`,
                        unit: `条`,
                        color: `rgb(123, 213, 0)`
                    },
                    {
                        code: `placeCount`,
                        name: `安置点`,
                        num: `-`,
                        unit: `个`,
                        color: `rgb(255, 153, 51)`
                    }
                ],
                tableData: []
            },
            historyDisaster: {
                loading: false,
                tableData: []
            },
            mountainInfo: {
                loading: false,
                tableData: []
            },
            monitoringSiteInfo: {
                loading: false,
                list: [
                    {
                        code: `rainList`,
                        name: `雨量站`,
                        num: 0
                    },
                    {
                        code: `riverList`,
                        name: `河道站`,
                        num: 0
                    },
                    {
                        code: `rsvrList`,
                        name: `水库站`,
                        num: 0
                    },
                    {
                        code: `videoList`,
                        name: `视频站`,
                        num: 0
                    }
                ]
            },
            dangerMaps: {
                culvert: []
            },
            moreList: moreListData,
            imgBroadcastKey: `images11111`,
            dialogImgVisible: false,
            currentImgUrl: ``
        };
    },
    computed: {
        ...mapState([`rem`]),
        tableMaxH() {
            return this.rem * 200;
        },
        legendList() {
            return [
                // 危险区图层 （面）
                {
                    code: `DANAD`,
                    tableName: `DANAD`,
                    funName: this.$mapLayersFun.MapBusinessLayersDangerousAreaBroadcastFun,
                    style: {
                        color: `rgba(234,53,65,0.5)`,
                        fillColor: `rgba(234,53,65)`,
                        weight: `2`,
                        fillOpacity: 0.5
                    }
                },
                // 安置点图层 （点）
                {
                    code: `PLACEMENT`,
                    tableName: `PLACEMENT`,
                    funName: this.$mapLayersFun.MapBusinessLayersPlacementBroadcastFun
                },
                // 转移路线图层
                {
                    code: `TRANSFER`,
                    tableName: `TRANSFER`,
                    funName: this.$mapLayersFun.MapBusinessLayersTransferBroadcastFun,
                    style: {
                        color: `rgba(55,166,2)`,
                        weight: 2
                    }
                },
                // 企事业单位图层 （点）
                {
                    code: `BSNSSINFO`,
                    tableName: `BSNSSINFO`,
                    funName: this.$mapLayersFun.MapBusinessLayersBusinessBroadcastFun
                },
                // 历史山洪灾害图层 （点）
                {
                    code: `HSFWATER`,
                    tableName: `HSFWATER`,
                    funName: this.$mapLayersFun.MapBusinessLayersHsfwaterBroadcastFun
                },
                // 沿河村落居民户图层
                {
                    code: `FLRVVLG`,
                    tableName: `FLRVVLG`,
                    funName: this.$mapLayersFun.MapBusinessLayersVillageBroadcastFun
                },
                // 重要城（集）镇居民户图层 （点）
                {
                    code: `DTRESIDENT`,
                    tableName: `DTRESIDENT`,
                    funName: this.$mapLayersFun.MapBusinessLayersTownBroadcastFun
                },
                // 需防洪治理山洪沟图层
                {
                    code: `GULLY`,
                    tableName: `GULLY`,
                    funName: this.$mapLayersFun.MapBusinessLayersGullyBroadcastFun,
                    style: {
                        color: `rgba(231,155,32,0.5)`,
                        fillColor: `rgba(231,155,32)`,
                        weight: `5`,
                        fillOpacity: 0.5
                    }
                },
                // 塘（堰）坝工程图层
                {
                    code: `DAMINFO`,
                    tableName: `DAMINFO`,
                    funName: this.$mapLayersFun.MapBusinessLayersWeirBroadcastFun
                },
                // 路涵工程图层（点）
                {
                    code: `CULVERT`,
                    tableName: `CULVERT`,
                    funName: this.$mapLayersFun.MapBusinessLayersCulvertBroadcastFun
                },
                // 桥梁工程图层
                {
                    code: `BRIDGE`,
                    tableName: `BRIDGE`,
                    funName: this.$mapLayersFun.MapBusinessLayersBridgeBroadcastFun
                },
                // 堤防工程图层
                {
                    code: `DIKE`,
                    tableName: `DIKE`,
                    funName: this.$mapLayersFun.MapBusinessLayersDikeBroadcastFun,
                    style: {
                        color: `rgba(255,140,0,0.5)`,
                        fillColor: `rgba(255,140,0)`,
                        weight: `3`,
                        fillOpacity: 0.5
                    }
                }
            ];
        }
    },
    watch: {
        $route: {
            handler() {
                this.handleQuery();
            },
            // 深度观察监听
            deep: true
        }
    },
    mounted() {
        const { CancelToken } = axios;
        this.source = CancelToken.source();

        this.handleQuery();
        this.$mapLayersFun.MapBaseLayersBoundsListenFun(info => {
            const bourdaryArr = [];
            (info.bounds || []).forEach(bound => {
                bourdaryArr.push(bound[0]);
                bourdaryArr.push(`,`);
                bourdaryArr.push(bound[1]);
                bourdaryArr.push(`;`);
            });
            const bourdary = bourdaryArr.join(``);
            this.$getData.GetRainContour({
                bourdary,
                stm: this.stm,
                etm: this.etm
            }).then((res = {}) => {
                this.$mapLayersFun.MapBusinessLayersContourBroadcastFun({
                    type: `rain`,
                    data: res.data || {}
                });
            }).always(() => {

            });
            // this.handleQuery(info.bounds);
        });

        window._Subscribe.create(this.imgBroadcastKey).listen(`data`, url => {
            this.currentImgUrl = `${this.$base.path.nodeStaticResourcesHost}/images/map/${url}`;
            this.dialogImgVisible = true;
        });
    },
    destroyed() {
        this._log(`effectRange: destroyed`);
        this.clearWarnMarker();
        this.clearLegend();
        this.cancelSearch();
        window._RichWay.$map.businessLayers = {};
    },
    methods: {
        cancelSearch() {
            // 取消请求
            if (typeof ((this.source || {}).cancel) === `function`) {
                this.source.cancel();
            }
        },
        setAttr() {
            this.$mapLayersFun.MapAttrBroadcastFun({
                html: `<p style="font-size: 1rem;margin-bottom: .2rem"><b>山洪预警影响范围</b></p><p>${this.stm}-${this.etm}</p>`
            });
        },
        handleQuery(bounds) {
            this.stcd = this.$route.query.stcd || ``;
            this.stm = this.$route.query.stm || ``;
            this.etm = this.$route.query.etm || ``;
            this.setAttr();

            this.safeTransferInfo.loading = true;
            // 获取空间小流域数据
            if (this.stcd) {
                this.$getData.GetWatershedSpatialDataMonitor({
                    stcd: this.stcd,
                    bounds,
                    cancelToken: this.source.token
                }).then((res = {}) => {
                    this.SpatialDataInfo = res.data || [];
                    this.wscd = this.SpatialDataInfo[0].wscd;
                    this.handelQueryDetail();
                }).always(() => {
                    this.createWarnMarker();
                });
            }
        },
        handelQueryDetail() {
            // 避险转移的统计数据
            this.$getData.GetSafeTransferNum({
                wscd: this.wscd,
                cancelToken: this.source.token
            }).then((res = {}) => {
                // this.safeTransferInfo.totalDataNum = res.data;
                for (const item of this.safeTransferInfo.totalData) {
                    item.num = res.data[item.code];
                }
            }).always(() => {
                // this.safeTransferInfo.loading = false;
            });

            // 避险转移的列表
            this.safeTransferInfo.loading = true;
            this.$getData.GetSafeTransferList({
                tableName: `IA_ADC_DANAD`,
                wscd: this.wscd,
                cancelToken: this.source.token
            }).then((res = {}) => {
                this.safeTransferInfo.tableData = res.data;
            }).always(() => {
                this.safeTransferInfo.loading = false;
            });

            // 历史山洪灾害
            this.historyDisaster.loading = true;
            this.$getData.GetHisDisasterList({
                tableName: `IA_HSC_HSFWATER`,
                wscd: this.wscd,
                cancelToken: this.source.token
            }).then((res = {}) => {
                this.historyDisaster.tableData = res.data;
            }).always(() => {
                this.historyDisaster.loading = false;
            });

            // 需要治理的山洪沟
            this.mountainInfo.loading = true;
            this.$getData.GetMountainList({
                tableName: `IA_WRC_GULLY`,
                wscd: this.wscd,
                cancelToken: this.source.token
            }).then((res = {}) => {
                this.mountainInfo.tableData = res.data;
            }).always(() => {
                this.mountainInfo.loading = false;
            });

            this.monitoringSiteInfo.loading = true;
            this.$getData.GetMonitoringSiteInfo({
                wscd: this.wscd,
                cancelToken: this.source.token,
                stm: this.stm,
                etm: this.etm
            }).then((res = {}) => {
                if (res && res.data) {
                    res.data.videoList = [];
                    for (const item of this.monitoringSiteInfo.list) {
                        item.num = (res.data[item.code] || []).length;
                    }
                    for (const rainItem of (res.data.rainList || [])) {
                        rainItem.options = {
                            tips: {
                                top: rainItem.sumDrp
                            },
                            color: `rgba(20,146,67, 1)`
                            // 点击地图上面的标记的事件
                            // clickFun: (o = {}) => {}
                        };
                    }
                    for (const rsvrItem of (res.data.rsvrList || [])) {
                        rsvrItem.options = {
                            tips: {
                                top: rsvrItem.rz
                            },
                            color: `rgba(0,0,255, 1)`
                            // 点击地图上面的标记的事件
                            // clickFun: (o = {}) => {}
                        };
                    }
                    for (const riverItem of (res.data.riverList || [])) {
                        riverItem.options = {
                            tips: {
                                top: riverItem.z
                            },
                            color: `rgba(0,0,255, 1)`
                            // 点击地图上面的标记的事件
                            // clickFun: (o = {}) => {}
                        };
                    }
                    // this.$mapLayersFun.MapBusinessLayersRainfallSiteBroadcastFun(res.data.rainList || []);
                    // this.$mapLayersFun.MapBusinessLayersReservoirSiteBroadcastFun(res.data.rsvrList || []);
                    // this.$mapLayersFun.MapBusinessLayersRiverSiteBroadcastFun(res.data.riverList || []);
                }
            }).always(() => {
                this.monitoringSiteInfo.loading = false;
            });

            // 获取图例数据
            this.createLegend();
        },
        handleMoreDetail(item = {}, info = {}) {
            this.detailInfo = item;
            this.type = info.type;
            this.title = info.title;
            this.showDetail = true;
        },
        createWarnMarker() {
            this.clearWarnMarker();
            const arr = [];
            for (const item of (this.SpatialDataInfo || [])) {
                // 处理形状数据为JSON
                if (item.shape) {
                    let shape = null;
                    try {
                        shape = JSON.parse((item.shape || ``).replace(/'/g, `"`));
                    } catch (e) {
                        shape = {};
                    }
                    shape.bounds = latlngToLeaflet.latlngByBounds(JSON.parse(shape.rings) || []);
                    shape.color = `rgba(0,92,230,0.7)`;
                    shape.weight = 4;
                    // shape.fillOpacity = 0.5;
                    shape.fillColor = `rgba(255, 255, 255, .3)`;
                    delete shape.rings;

                    item.shape = shape;
                }
                arr.push(item);
            }

            this.$mapLayersFun.MapBusinessLayersBasinBroadcastFun(arr);

            // 缩放地图范围
            if (arr.length > 0 && arr[0].shape) {
                this.map.flyToBounds(arr[0].shape.bounds);
            }

            // 画危险区域的圆形边界
            // this._log(`33333`, this.$mapLayersFun.MapPluginsDangerZoneBroadcastFun);
            // this.$mapLayersFun.MapPluginsDangerZoneBroadcastFun({
            //     center: latlngToLeaflet.latlngByPoint(arr[0].centroid),
            //     bounds: arr[0].shape.bounds
            // });
        },
        clearWarnMarker() {
            this.$mapLayersFun.MapBusinessLayersBasinBroadcastFun([]);
        },
        createLegend() {
            this.clearLegend();
            for (const item of this.legendList) {
                this.$getData.GetSafeTransferList({
                    tableName: item.tableName,
                    wscd: this.wscd,
                    cancelToken: this.source.token
                }).then((res = {}) => {
                    this.dangerMaps.culvert = res.data;
                    item.funName(this.filterLegendData(res.data, item));
                }).always(() => {

                });
            }
        },
        clearLegend() {
            for (const item of this.legendList) {
                item.funName([]);
            }
        },
        filterLegendData(arr = [], typeItem) {
            const list = [];
            for (const item of arr) {
                const o = {};
                o.attr = item;
                const shape = JSON.parse(item.SHAPE) || {};
                if (shape.type === `Point`) {
                    o.lttd = shape.y;
                    o.lgtd = shape.x;
                } else if (shape.type === `Polygon` || shape.type === `Polyline`) {
                    let bounds = null;
                    try {
                        if (shape.type === `Polyline`) {
                            bounds = JSON.parse(shape.path);
                        } else {
                            bounds = JSON.parse(shape.rings);
                        }
                    } catch (e) {
                        bounds = [];
                    }
                    shape.bounds = latlngToLeaflet.latlngByBounds(bounds);
                    if (typeItem.style) {
                        shape.color = typeItem.style.color;
                        shape.weight = typeItem.style.weight;
                        shape.fillOpacity = typeItem.style.fillOpacity;
                        shape.fillColor = typeItem.style.fillColor;
                    }
                    delete shape.rings;
                    delete shape.x;
                    delete shape.y;
                    o.shape = shape;
                }
                o.options = {
                    bindPopup: !!((typeItem.code === `DANAD` || typeItem.code === `FLRVVLG`)),
                    // 点击地图上面的标记的事件
                    clickFun: (o = {}, popup) => {
                        if (typeItem.code === `DANAD`) {
                            this._log(`1111`, o, popup);
                            this.showDangerousAreaDetail(o, popup);
                        } else if (typeItem.code === `FLRVVLG`) {
                            this.showVillageDetail(o, popup);
                        }
                    }
                };
                list.push(o);
            }
            return list;
        },
        // 显示沿河村落居民户的详情
        showVillageDetail(info = {}, popup) {
            this.$getData.GetRangeDetail({
                tableName: `IA_ECC_FLRVVLG`,
                pid: info.attr.PID,
                wscd: info.attr.WSCD,
                adcd: info.attr.ADCD
            }).then((res = {}) => {
                let html = ``;
                const o = res.data || {};
                const htmlArr = [];
                if (typeof (o) === `object`) {
                    htmlArr.push(`<p>户主姓名：${o[0].NAME || `--`}</p>`);
                    htmlArr.push(`<p>宅基高程：${o[0].HELE || `--`} m</p>`);
                    htmlArr.push(`<p>人&emsp;&emsp;口：${o[0].PTCOUNT || `--`} 人</p>`);
                    htmlArr.push(`<p>淹没水深：${o[0].PTCOUNT || `--`}</p>`);

                    html = `<div class="village-detail-panel">${htmlArr.join(``)}</div>`;
                    popup.setContent(html);
                }
            });
        },
        // 显示危险区图层 （面）
        showDangerousAreaDetail(info = {}, popup) {
            this.$getData.GetMonitorMapDetail({
                pid: info.attr.PID
            }).then((res = {}) => {
                let html = ``;
                const danad = res.data || [];
                const htmlArr = [];
                this._log(`222`, danad);
                if (typeof (danad) === `object`) {
                    htmlArr.push(`<div class="panel-header">${danad.name || `--`}</div>`);
                    htmlArr.push(`<ul class="panel-content richway-clear">`);
                    htmlArr.push(`<li><div><span class="left">所属乡镇：</span><span class="right">${danad.name || `--`}</span></div><div><span class="left">所属小流域：</span><span class="right">效那马家小流域</span></div></li>`);
                    htmlArr.push(`<li><div><span class="left">影响户数(户)：</span><span class="right">${danad.etCount || `--`}</span></div><div><span class="left">影响人口(人)：</span><span class="right">${danad.ptCount || `--`}</span></div></li>`);
                    htmlArr.push(`<li><div><span class="left">防汛责任人：</span><span class="right">${danad.person[0].name || `--`}</span></div><div><span class="left">关联测站：</span><span class="right">乐望站</span></div></li>`);
                    htmlArr.push(`<li><div><span class="left">防洪能力：</span><span class="right">${danad.fhnl || `--`}</span></div><div><span class="left">成灾水位：</span><span class="right">${danad.ccz || `--`}m</span></div></li>`);
                    htmlArr.push(`<li><div class="footer"><span class="left">相关图集：</span><span class="right" onclick="window._Subscribe.create(\`${this.imgBroadcastKey}\`).trigger(\`data\`, \`${danad.fhxzPic || `1.jpg`}\`);">防洪现状图</span><span class="right" onclick="window._Subscribe.create(\`${this.imgBroadcastKey}\`).trigger(\`data\`, \`${danad.danadPic || `2.jpg`}\`);">危险区示意图</span></div></li>`);
                    htmlArr.push(`</ul>`);
                }

                html = `<div class="danad-detail-panel">${htmlArr.join(``)}</div>`;
                popup.setContent(html);
            });
        }
    }
};
</script>
<style lang="scss">
    .effect-range-panel {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 30rem;
        font-size: .9rem;
        background: #eee;
        transition: all .3s;
        pointer-events: auto;

        .detail {
            text-decoration: underline;
            color: #0099FF;
            cursor: pointer;
        }
    }

    .effect-range-content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: .5rem;
    }

    .effect-range-item {
        padding: .5rem;
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: .5rem;
        font-size: .7rem;

        .item-title {
            border-left: .2rem solid #4775ca;
            padding-left: .5rem;
            margin-bottom: .5rem;
            font-size: .9rem;

            .more {
                float: right;
                font-size: .6rem;
                text-decoration: underline;
                color: #0099FF;
                cursor: pointer;
            }
        }
        .item-content {
            min-height: 5rem;
        }
    }

    .safe-transfer {
        background-color: #666;
        .item-title {
            color: #fff;
        }
        .item-total {
            margin: .5rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-grow: 1;
            li {
                color: #fff;
                text-align: center;
                > span {
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                }
                .count {
                    font-size: 2rem;
                    font-weight: 600;
                }
            }
        }
    }

    .more-list {
        li {
            float: left;
            display: inline-block;
            margin-right: 1rem;
            margin-bottom: .5rem;
        }
    }

    .monitoring-site {
        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-grow: 1;
        }
        li {
            text-align: center;
            > div {
                position: relative;
                width: 5rem;
                height: 5rem;
                border-radius: 50%;
                border: 1px solid #999;
                cursor: pointer;
                > span {
                    display: block;
                    height: 2.5rem;
                    line-height: 2.5rem;
                }
                .num {
                    font-size: 2rem;
                    color: #4473CD;
                    font-weight: 600;
                    line-height: 3.5rem;
                }
                &:after {
                    content: " ";
                    display: inline-block;
                    position: absolute;
                    top: 60%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background-color: #999;
                }
                &:hover {
                    background-color: rgba(0, 0, 0, .1);
                }

            }
        }
    }


    .village-detail-panel{
        width: 10rem;
        >p{
            margin: .2rem 0;
        }
    }

    .danad-detail-panel {
        width: 25rem;
        .panel-header {
            text-align: left;
            margin-bottom: 1rem;
        }
        .panel-content {
            li {
                padding: .3rem 0;
                div,span{
                    display: inline-block;
                    width: 50%;
                }
                &:nth-child(odd){
                    background-color: #f5f5f5;
                }
            }
            .left{
                text-align: right;
            }
            .right {
                text-align: left;
            }
            .footer{
                width: 100%;
                .left,.right{
                    width: 25%;
                }
                .right{
                    text-decoration: underline;
                    color: blue;
                    cursor: pointer;
                }
            }
        }
    }
    .images-content{
        overflow: hidden;
        img{
            width:100%;
        }
    }
</style>
