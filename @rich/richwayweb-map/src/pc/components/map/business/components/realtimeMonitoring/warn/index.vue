<template>
	<div
		v-loadmore="loadMore"
		class="warn-panel">
		<!-- 查询输入框 -->
		<SiteSearch
			placeholder="请输入危险区名称"
			@on-search="handleSearch"
			@on-change="handleChange" />

		<!-- 查询表单 -->
		<el-form
			:model="ruleForm"
			label-width="4.5rem"
			label-position="left"
			class="warn-panel-form panel-form">
			<el-form-item>
				<b
					slot="label"
					class="form-label">时段监视:</b>
				<el-col :span="11">
					<el-date-picker
						v-model="ruleForm.stm"
						size="mini"
						type="datetime"
						placeholder="选择日期"
						value-format="yyyy-MM-dd HH:mm"
						format="yyyy-MM-dd HH:mm"
						style="width: 100%"
						@change="handlePickerChange" />
				</el-col>
				<el-col
					:span="2"
					class="line">至
				</el-col>
				<el-col :span="11">
					<el-date-picker
						v-model="ruleForm.etm"
						size="mini"
						type="datetime"
						placeholder="选择日期"
						value-format="yyyy-MM-dd HH:mm"
						format="yyyy-MM-dd HH:mm"
						style="width: 100%;"
						@change="handlePickerChange" />
				</el-col>
			</el-form-item>
			<el-form-item>
				<b
					slot="label"
					class="form-label">显示方式:</b>
				<el-radio-group
					v-model="ruleForm.showModel"
					size="mini">
					<el-radio-button label="single">逐条</el-radio-button>
					<el-radio-button label="group">聚合</el-radio-button>
				</el-radio-group>
			</el-form-item>
		</el-form>

		<!-- 预警列表 -->
		<div
			v-loading="warnListLoading"
			class="warn-list panel-list load-more-panel">
			<ul v-if="tableDataList.length">
				<li
					v-for="(item, index) in tableDataList"
					:key="index"
					class="warn-item"
					@click.stop="handelRowClick(item)">
					<h3 class="warn-item-title">{{ item.name }}</h3>
					<div class="warn-item-content">
						<p><span>预警时间：{{ item.stm }}</span></p>
						<!--<p><span>预警信息：{{ item.warnNm }}</span></p>-->
						<p><span>预警描述：<span class="special">{{ item.warnDesc }}</span></span></p>
						<!--<p><span>位置：{{ item.address }}</span></p>-->
						<!--<p><span>行政责任人：{{ item.adminName }}&nbsp;{{ item.adminPhone }}</span></p>-->
						<!--<p><span>危险区责任人：{{ item.danadName }}&nbsp;{{ item.danadPhone }}</span></p>-->
						<!--<p><span>影响人口：{{ item.ptcount }}人</span></p>-->
						<p><span
							class="process"
							@click.stop="handleWarnProcess(item)">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：&nbsp;<span
								class="tai"
								style="text-decoration:underline">{{ item.warnStatusId | filterWarnStatus }}</span></span></p>
						<p><span
							class="detail"
							@click.stop="handleWarnDetail(item)">详情</span></p>
					</div>
					<div
						:class="[`warnGradeId-${item.warnGradeId}`]"
						class="warn-item-warnGradeId"><span>{{ item.warnGradeId | filterWarnState }}</span></div>
				</li>
			</ul>
			<p v-else>暂时没有预警信息</p>
		</div>

		<!-- 预警详情弹窗 -->
		<WarnProcessDialog
			v-show="showWarnProcess"
			:warn-detail="currentWarnDetail"
			@on-hide="showWarnProcess=false" />

		<!--  -->
		<WarnSiteDetailDialog
			v-show="showWarnSiteDetail"
			:detail-info="currentRainSite"
			:on-off="onOff"
			:stm="ruleForm.stm"
			:etm="ruleForm.etm"
			type="warn"
			@on-hide="showWarnSiteDetail=false" />
	</div>
</template>
<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import axios from 'axios';

const moment = require(`moment`);

const WarnProcessDialog = r => require.ensure([], () => r(require(`./warnProcessDialog`)), `components/map/business/realtimeMonitoring/warn/index`);
const WarnSiteDetailDialog = r => require.ensure([], () => r(require(`./warnSiteDetailDialog`)), `components/map/business/realtimeMonitoring/warn/index`);
const SiteSearch = r => require.ensure([], () => r(require(`../siteSearch`)), `components/map/business/realtimeMonitoring/index`);
const { latlngToLeaflet } = RichWayWebUtils;

export default {
    components: {
        WarnProcessDialog,
        SiteSearch,
        WarnSiteDetailDialog
    },
    filters: {
        filterWarnState(warnGradeId) {
            if (warnGradeId === 6) {
                return `立即转移`;
            } if (warnGradeId === 7) {
                return `准备转移`;
            } if (warnGradeId === 3) {
                return `关闭`;
            }
        },
        filterWarnStatus(warnStatusId) {
            // 待审批--1 新产生-0 已内部告警-10 已外部告警-20
            if (warnStatusId === 1) {
                return `待审批`;
            } if (warnStatusId === 0) {
                return `新产生`;
            } if (warnStatusId === 10) {
                return `已内部告警`;
            } if (warnStatusId === 20) {
                return `已外部告警`;
            }
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
            onOff: true,
            showWarnProcess: false,
            currentWarnDetail: {},
            nowDate: new Date(),
            ruleForm: {
                stm: (moment().format(`HH`) < 8 ? (moment().add(-1, `d`)) : moment()).hour(8).minute(0).second(0).format(`YYYY-MM-DD HH:mm`),
                etm: moment().format(`YYYY-MM-DD HH:mm`),
                showModel: `single`
            },
            warnListLoading: false,
            warnList: [],
            filterInfo: {},
            filterDataList: [],
            tableDataList: [],
            tableRows: 20,
            tablePage: 0,
            currentRainSite: {},
            showWarnSiteDetail: false
        };
    },
    mounted() {
        this._log(`monitorGzshzh warn has mounted`);
        // this.handleSearch();
        this.setAttr();
    },
    activated() {
        this._log(`warn: activated`);
        this.setAttr();
        this.createWarnMarker();
        this.handleSearch();
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
        handleSearch(bl) {
            this.cancelSearch();
            this.$nextTick(() => {
                const searchInfo = {
                    stm: this.ruleForm.stm,
                    etm: this.ruleForm.etm
                };
                // searchInfo.stm = this.ruleForm.stm;
                // searchInfo.etm = this.ruleForm.etm;
                this.warnListLoading = !bl;
                this.warnList = [];
                this.filterDataList = [];
                this.tableDataList = [];

                const { CancelToken } = axios;
                this.source = CancelToken.source();
                searchInfo.cancelToken = this.source.token;
                this.$getData.GetWarnAllMonitor().then(res => {
                    this.warnList = res.data || [];
                }).always(() => {
                    this.warnListLoading = false;
                    this.filterDataListFun();
                    this.setTimeOutSearch();
                });
            });
        },
        handleChange(siteName) {
            this.filterInfo.siteName = siteName;
            this.filterDataListFun();
        },
        handleWarnProcess(item) {
            this.showWarnProcess = true;
            this.currentWarnDetail = item;
        },
        handleWarnDetail(item) {
            this.$router.push({
                path: `/gzshzh/effect_range`,
                query: {
                    stcd: item.stcd,
                    stm: this.ruleForm.stm,
                    etm: this.ruleForm.etm
                }
            });
        },
        handlePickerChange() {
            this.setAttr();
        },
        handelRowClick(item) {
            this.map.flyTo([item.lttd, item.lgtd], 10);
            // this.map.flyTo(latlngToLeaflet.latlngByPoint(row.centroid), 12);
        },
        filterDataListFun() {
            this.filterDataList = [];
            for (const item of this.warnList) {
                if ((item.name || ``).indexOf(this.filterInfo.siteName) > -1 || !this.filterInfo.siteName) {
                    this.filterDataList.push(item);
                }
            }
            this.createWarnMarker();
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
                        level: 2,
                        // 点击地图上面的标记的事件
                        clickFun: (o = {}) => {
                            this.currentRainSite = o;
                            this.showWarnSiteDetail = true;
                        }
                    };
                }

                // 处理形状数据为JSON
                if (item.shape) {
                    let shape = null;
                    try {
                        shape = JSON.parse((item.shape || ``).replace(/'/g, `"`));
                    } catch (e) {
                        (e);
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
        },
        loadMore() {
            this.getTableDataList();
        },
        setAttr() {
            this.$mapLayersFun.MapAttrBroadcastFun({
                html: `<p style="font-size: 1rem;margin-bottom: .2rem"><b>山洪预警实时监视</b></p><p>${this.ruleForm.stm}-${this.ruleForm.etm}</p>`
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .warn-panel{
        .line {
            display: inline-block;
            text-align: center;
            position: relative;
            top: .2rem;
        }

        .warn-list{
            >p{
                padding: 1rem 0;
                text-align: center;
            }
            .warn-item{
                position: relative;
                padding: .5rem;
                &:hover{
                    background-color: rgba(0,0,0,.1);
                }

                .warn-item-title{
                    padding: .2rem 0;
                    color: #4776CB;
                    font-weight: 600;
                }

                .warn-item-content{
                    width:80%;
                    font-size: .7rem;
                    .process{
                        color: #666;
                        cursor: pointer;
                    }
                    .detail{
                        text-decoration: underline;
                        color: #0099FF;
                        cursor: pointer;
                        &:hover{
                            background-color: rgba(0,0,0,.1);
                        }
                    }
                    p{
                        line-height: 1.4;
                    }
                    .tai{
                        color:#ff9900;
                    }
                }

                .special{
                    margin-left:0.5rem;margin-top:-0.9rem
                }

                /*.warn-item-warnGradeId{
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: inline-block;
                    width:4rem;
                    height:4rem;
                    border-radius: 50%;
                    border: .2rem solid red;
                    text-align: center;
                    padding: .5rem;
                    font-size: 1rem;
                }*/
                .warn-item-warnGradeId{
                    position: absolute;
                    left:18rem;
                    top: 50%;
                    transform: translateY(-50%);
                    display: inline-block;
                    height:0;
                    width:0;
                    border-right:2.4rem solid transparent;
                    border-left:2.4rem solid transparent;
                    z-index:0;
                }

                .warn-item-warnGradeId span{
                    z-index:1;
                    position: absolute;
                    right:-1.25rem;
                    top:0.75rem;
                    font-size:0.8rem;
                    width:2rem;
                    display:inline-block;
                }

                .warn-item-warnGradeId:after{
                    content: '';
                    position: absolute;
                    bottom:-3rem;
                    right:-2.2rem;
                    border-right:2.2rem solid transparent;
                    border-left:2.2rem solid transparent;
                    border-bottom:2.75rem solid #fff;
                    z-index:0;
                }

                .warnGradeId-6{
                    border-bottom:3.1rem solid red;
                    color:red;
                }
                .warnGradeId-7{
                    border-bottom:3.1rem solid #FFCC66;
                    color: #FFCC66;
                }
                .warnGradeId-3{
                    border-bottom:3.1rem solid #999;
                    color: #999;
                }
            }
        }
    }


</style>
