<template>
<div class="site-panel">
    <div :id="filterContainerId" class="site-panel-filter-container">
        <!-- 查询输入框 -->
        <SiteSearch @on-search="handleSearch" @on-change="handleChange" />
        <!-- 查询表单 -->
        <el-form ref="siteForm" :model="ruleForm" label-width="4.5rem" label-position="left" class="site-panel-form panel-form">
            <!-- 行政区划 -->
            <el-form-item>
                <b slot="label" class="form-label">行政区划:</b>
                <CascaderSegion v-model="ruleForm.adcd" :selected-options="selectedOptions" :change-on-select="true" :region-info="currentRegionInfo" size="mini" />
            </el-form-item>
        </el-form>
    </div>
    <!-- 测站列表 -->
    <div v-loading="siteListLoading" class="site-list panel-list">
      <el-table
        v-loadmore="loadMore"
        :data="tableDataList"
        :max-height="tableMaxH"
        class="hand realtime-monitor-table"
        stripe
        style="width: 100%;"
        @row-click="handelRowClick"
      >
        <el-table-column prop="stnm" label="站名">
          <template slot-scope="scope">
            <p :title="scope.row.stnm">{{ scope.row.stnm | _filterStr(4) }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="sttpCdObj" label="测站类型">
          <template slot-scope="scope">
            <p :title="scope.row.sttpCdObj.sttpCdNm" :style="{color:scope.row.sttpCdObj.sttpCdColor}">{{ scope.row.sttpCdObj.sttpCdNm}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="modelObj" label="模型分类">
            <template slot-scope="scope">
            <p :title="scope.row.modelObj.modelNm" :style="{color:scope.row.modelObj.modelColor}">{{ scope.row.modelObj.modelNm}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="statusObj" label="状态">
          <template slot-scope="scope">
            <p :title="scope.row.statusObj.statusNm" :style="{color:scope.row.statusObj.statusColor}">{{ scope.row.statusObj.statusNm}}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// 公用vuex
import * as _modulesType from "$src/constants/modulesType";
// 公用utils包
import RichWayWebUtils from "@rich/richwayweb-utils";
// 公用组件库
import RichWayWebComponents from "@rich/richwayweb-components";
// 公用过滤函数
import {
    _filterStr
} from "@rich/richwayweb-utils/lib/filter/filterStation";
// 搜索框组件
import SiteSearch from "../siteSearch/index";
// axios请求
import axios from "axios";
// 测站信息格式配置文件
import {
    sttpCdNmList,
    modelNmList,
    statusNmList
} from "$src/constants/realtimeMonitoring/siteConfigListType";
const { mapState,createNamespacedHelpers } = require(`vuex`);
const { mapMutations } = createNamespacedHelpers(_modulesType.MapMonitoring);
// 公用utils包里面的方法
const {
    guid,
    deepClone
} = RichWayWebUtils;
// 公用组件里面的三级区域联动
const {
    CascaderSegion
} = RichWayWebComponents;
// 合并组件
const components = Object.assign({
    SiteSearch,
    CascaderSegion
});
export default {
    name: `site`,
    components,
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
            filterContainerId:guid(),
            tableListId:guid(),
            setTimeOutId: null,
            ruleForm: {
                adcd: ``
            },
            selectedOptions: [],
            currentRegionInfo: {
                code: ``,
                name: ``
            },
            dealTypeList: [{
                    type: `sttpCd`,
                    otherTypeNm: `测站类型`
                },
                {
                    type: `model`,
                    otherTypeNm: `模型分类`
                },
                {
                    type: `status`,
                    otherTypeNm: `状态`
                }
            ],
            sttpCdNmList: sttpCdNmList,
            modelNmList: modelNmList,
            statusNmList: statusNmList,
            tableMaxH: 300,
            siteListLoading: false,
            sitenList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0,
            layerGroupMarker: null
        };
    },
    computed: {
        ...mapState([`rem`])
    },
    mounted() {
        this._log(`monitorGzshzh site has mounted`);
        this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};
        this.handleSearch();
    },
    // 面板打开
    activated() {
        this._log(`site: activated`);
        this.createSiteStationMarker();
        this.setTimeOutSearch();
    },
    // 面板关闭
    deactivated() {
        this._log(`site: deactivated`);
        this.cancelSearch();
        this.clearSiteStationMarker();
        clearTimeout(this.setTimeOutId);
    },
    methods: {
        ...mapMutations([`SET_BUSINESS_INFO`]),
        setTimeOutSearch() {
            // 3分钟一次轮询
            this.setTimeOutId = setTimeout(() => {
                this.handleSearch(true);
            }, 3 * 60 * 1000);
        },
        cancelSearch() {
            // 取消请求
            if (typeof (this.source || {}).cancel === `function`) {
                this.source.cancel();
            }
        },
        // 搜索框搜索
        handleSearch(bl) {
            this.cancelSearch();
            this.$nextTick(() => {
                const searchInfo = deepClone(this.ruleForm);
                searchInfo.siteName = this.filterInfo.siteName;

                this._log(`searchInfo is`, searchInfo);
                this.siteListLoading = !bl;
                this.siteList = [];
                this.filterDataList = [];
                this.tableDataList = [];

                const {
                    CancelToken
                } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData
                    .GetMonitorSiteList(searchInfo)
                    .then((res = {}) => {
                        this.siteList = res.data || [];
                    })
                    .always(() => {
                        this.siteListLoading = false;
                        this.filterDataListFun();
                        this.setTimeOutSearch();
                    });
            });
        },
        // 搜索框改变
        handleChange(siteName) {
            this.filterInfo.siteName = siteName;
            this.filterDataListFun();
        },
        // 表格行点击 弹框
        handelRowClick(row) {
            let businessInfo = {};
            businessInfo.showSiteDialog = true;
            businessInfo.siteData = row;
            this.SET_BUSINESS_INFO(businessInfo);
            this.map.flyTo([row.lttd, row.lgtd], 12);
        },
        // 过滤表格数据
        filterDataListFun() {
            this.filterDataList = [];
            for (const item of this.siteList) {
                if ((item.stnm || ``).indexOf(this.filterInfo.siteName) > -1 || !this.filterInfo.siteName) {
                    this.filterDataList.push(item);
                }
            }
            this.createSiteStationMarker();
            this.tablePage = 0;
            this.getTableDataList();
        },
        // 获取表格数据
        getTableDataList() {
            this.tablePage++;
            const start = 0;
            let end = this.tableRows * this.tablePage;
            if (end > this.filterDataList.length) {
                end = this.filterDataList.length;
            }

            this.tableDataList = this.filterDataList.slice(start, end);
            this.dealTableDataList();
            this.$nextTick(() => {
                this.getTableMaxH();
            });
        },
        // 处理表格数据
        dealTableDataList() {
            this.tableDataList = (this.tableDataList || []).map((item) => {
                (this.dealTypeList || []).map((item2) => {
                    item[item2.type + `Obj`] = this.getModelName(item, item2);
                    return item2;
                })
                return item;
            })
        },
        // 获取测站对应信息
        getModelName(data, dealData) {
            let {
                type
            } = dealData;
            let resObj = {};
            (this[type + `NmList`] || []).map((item) => {
                if (this.hasCurrentType(item, data[type])) {
                    resObj = this.dealResObjData(resObj, item, type, `Nm`);
                    resObj = this.dealResObjData(resObj, item, type, `Color`);
                }
                return item;
            })

            resObj[type + `Nm`] = (resObj[type + `Nm`] || []).length > 0 ?
                resObj[type + `Nm`].join(`+`) : `其他` + dealData.otherTypeNm;
            resObj[type + `Color`] = (resObj[type + `Color`] || []).length > 0 ? resObj[type + `Color`][0] : `#f00`;
            return resObj;
        },
        // 格式测站信息
        dealResObjData(resObj, item, type, str) {
            if (!resObj[type + str]) {
                resObj[type + str] = [];
                str === `Nm` ? resObj[type + str].push(item[str.toLowerCase()]) : resObj[type + str].push(item[str.toLowerCase()]);
            } else {
                resObj[type + str].push(item[str.toLowerCase()]);
            }
            return resObj;
        },
        // 判断测站信息匹配
        hasCurrentType(data, type) {
            return (Object.keys(data || {}) || []).some((item) => {
                return (type.split(`,`) || []).includes(data[item]);
            })
        },
        // 添加地图标注
        createSiteStationMarker() {
            this.clearSiteStationMarker();
            const arr = [];
            for (const item of this.filterDataList || []) {
                item.options = {
                    tips: {
                        top: item.stnm
                    }
                };
                arr.push(item);
            }
            this.$mapLayersFun.MapBusinessLayersSiteBroadcastFun(arr);
        },
        // 清除地图标注
        clearSiteStationMarker() {
            this.$mapLayersFun.MapBusinessLayersSiteBroadcastFun([]);
        },
        // 获取表格高度
        getTableMaxH() {
            const $filterDom = document.getElementById(this.filterContainerId);
            const pHeight = $filterDom.parentElement.clientHeight;
            const height = $filterDom.offsetHeight;
            const padding = $filterDom.offsetTop- $filterDom.parentElement.offsetTop;
            this.tableMaxH = pHeight - height - padding * 2;
        },
        // 滚动加载更多
        loadMore() {
            this.getTableDataList();
        }
    }
};
</script>

<style lang="scss">
.realtime-monitor-table tbody tr{
    cursor: pointer;
}
</style>
