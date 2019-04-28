<template>
	<div
		v-loading="loading"
		class="content content-dutyExpressStatistics ">
		<div class="statistics richway-shadow">
			<div class="statisticsTop">
				<div class="statisticsTopDiv">今日报送情况</div>
				<div class="statisticsTopDivDes">今日上传市州防办值班快报 <span class="upload">{{ reportNumber }}</span> 份，未上传 <span class="notUpload">{{ notReportNumber }}</span> 份</div>
				<div class="statisticsTopSpan">
					<span
						v-for="item in listInfo"
						:key="item"
						:class="[item.isReport===`1`?`Report`:`notReport`]">{{ item.adnm }}</span>
					<div
						v-if="isShow"
						class="isShow">暂无数据!</div>
				</div>
			</div>
			<div class="statisticsMiddle">
				<div class="statisticsMiddleDiv" @click="isShowStatistics()"> {{isShowContent}}</div>
                <transition name="el-fade-in-linear">
                    <div v-if="isStatisticsShow">
                        <StatisticsChart :listInfo="listInfo" />
                        <div
                            v-if="isShow"
                            class="isShow">暂无数据!</div>
                    </div>
                </transition>

			</div>
			<div class="statisticsBottom">
				<div class="statisticsBottomDiv">本月报送报表</div>
				<div>
					<div
						v-if="!isShow"
						class="divFather">
						<div class="divChidrenOne">行政区</div>
						<div class="divChidrenTwo">
							<span
								v-for="item in days"
								:key="item"
								class="spanDay">{{ item }}</span>
						</div>
					</div>
					<div
						v-if="isShow"
						class="isShow">暂无数据!</div>
					<div
						v-for="item in listInfo"
						:key="item"
						class="divFather">
						<span class="divChidrenOne">{{ item.adnm }}</span>
						<span class="divChidrenTwo">
							<span
								v-for="item1 in item.children"
								:key="item1"
								:class="[parseInt(item1.day)>=currentDate?`futureDate`:item1.isReport===`1` ? `upload` : item1.isReport===``?`notUpload`:``,`spanDay`]"
								class="spanDay"
								@click="alertDetails(item1)" />
						</span>

					</div>
				</div>
			</div>
		</div>
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogVisible"
			title="提示"
			width="40%"
		>
			<span v-html="details.reportInfo"></span>
			<span
				slot="footer"
				class="dialog-footer">
				<el-button
					type="success"
					@click="handleDownload(details.fastReportId)">下 载</el-button>
				<el-button
					type="primary"
					@click="dialogVisible = false">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

const StatisticsChart = r => require.ensure([], () => r(require(`./statisticsChart`)), `components/pagesDuty/dutyExpressStatistics`);
// import statisticsChart from './statisticsChart';
const moment = require(`moment`);

const _log = RichWayWebUtils.console.log;
const { downloadFile } = RichWayWebUtils;

export default {
    components: {
        StatisticsChart
    },
    props: {
        currentInfo: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            currentDate: moment().add(`days`, 1).format(`DD`),
            listInfo: [],
            loading: true,
            reportNumber: ``,
            notReportNumber: ``,
            isShow: false,
            dialogVisible: false,
            details: {},
            isStatisticsShow: false,
            isShowContent: `显示本月报表统计`,
        };
    },
    computed: {
        days(){
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let d = new Date(year, month, 0);
            return d.getDate();
        }
    },
    mounted() {
        this.GetReportEchartInfo();
        _log(`express has mounted`);
    },
    methods: {
        // 点击查看详情
        alertDetails(info) {
            if (info.day >= this.currentDate) {
                return;
            }
            if (info.isReport === ``) {
                this.dialogVisible = false;
                this.$message({
                    message: `警告，当前无值班快报详情！`,
                    type: `warning`
                });
                return;
            }
            this.dialogVisible = true;
            this.GetFastReport(info.fastReportId);
        },
        // 发送请求
        GetFastReport(info) {
            this.$getData.GetFastReport({ fastReportId: info }).then(res => {
                [this.details] = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击下载
        handleDownload(info) {
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/zhyj/busi/download&fastReportId=${info || ``}`);
        },
        GetReportEchartInfo() {
            const info = {
                adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                flag: `parent`,
                isadnmall: `false`
            };
            this.$getData.GetReportEchartInfo(info).then(res => {
                this.listInfo = res.data;
                if (res.data.length === 0) {
                    this.isShow = true;
                }
                // 处理今日送报情况的参数
                let report = 0;
                let notReport = 0;
                for (const item of res.data) {
                    if (item.isReport === `1`) {
                        report++;
                    } else {
                        notReport++;
                    }
                }
                this.loading = false;
                this.reportNumber = report;
                this.notReportNumber = notReport;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击本月报率统计是否显示饼状图
        isShowStatistics () {
            // console.log(2525252366,`dianjil`)
            this.isStatisticsShow = !this.isStatisticsShow;
            if(this.isStatisticsShow) {
                this.isShowContent = `隐藏本月报表统计`;
            } else if(!this.isStatisticsShow) {
                this.isShowContent = `显示本月报表统计`;
            }
        },

    }
};
</script>

<style lang="scss" >
.content-dutyExpressStatistics {
    overflow: auto!important;
}
    .statistics {
        padding-left: 10px;
        background-color: #fff;
        .bgc {
            background-color: #fff;
        }
        .statisticsTop {
            .statisticsTopDiv {
                display: inline-block;
                height: 45px;
                line-height: 45px;
                padding: 0 5px;
                font-size: 18px;
                background-color: #0066cc;
                border-radius: 3px;
                color: #fff;
                margin: 10px 0;
            }
            .statisticsTopDivDes {
                height: 45px;
                line-height: 45px;
                font-size: 18px;
                .upload {
                    color: #33cc33;
                    font-size: 24px;
                }
                .notUpload {
                    // background: #cc0000;
                    color: #cc0000;
                    font-size: 24px;
                }
            }
            .statisticsTopSpan {
                span {
                    font-size: 18px;
                    margin-right: 20px;
                    font-weight: 700;
                    color: #A2A2A2;
                }
                .Report {
                    color: #33cc33;
                }
                .notReport {
                    color: #A6A6A6;
                }
            }
        }
        .statisticsMiddle {
            .statisticsMiddleDiv {
                a {
                    color: #fff;
                    text-decoration: none;
                }
                cursor: pointer;
                margin: 20px 0;
                height: 45px;
                line-height: 45px;
                display: inline-block;
                padding: 0 5px;
                font-size: 18px;
                background-color: #0066cc;
                border-radius: 3px;
                color: #fff;
            }
        }
        .statisticsBottom {
           padding: 20px 0;
            .statisticsBottomDiv {
                margin-bottom: 10px;
                height: 35px;
                line-height: 35px;
                display: inline-block;
                padding: 0 5px;
                font-size: 18px;
                background-color: #0066cc;
                border-radius: 3px;
                color: #fff;
            }
        }

        .divFather {
            width: 100%;
            height: 35px;
            line-height: 35px;
            box-sizing: border-box;
            .divChidrenOne {
                float:left;
                width:15%;
                height: 100%;
                text-align:center;
                border-left: 2px solid #5B5B5B;
                border-top: 1px solid #5B5B5B;
                  border-bottom: 1px solid #5B5B5B;
                :last-child {
                    border-right: 2px solid #5B5B5B;
                }
            }
            .divChidrenTwo {
                float:left;
                width:85%;
                height: 100%;
                text-align:center;
                .spanDay {
                    float: left;
                    width: 3.22%;
                    height: 100%;
                    text-align: center;
                    border-left: 2px solid #5B5B5B;
                    border-top: 1px solid #5B5B5B;
                    border-bottom: 1px solid #5B5B5B;

                }
                .upload {
                    background: #009900;
                }
                 .notUpload {
                    background: #B3B3B3;

                }
                .futureDate {
                    background: #fff;
                }
                :last-child {
                    border-right: 2px solid #5B5B5B;
                }
            }

        }
        .span {
            // display: inline-block;
            float: left;
            width: 50px;
            height: 50px;
            background-color: #009900!important;
        }
        .isShow {
            width: 100%;
            height: 100px;
            font-size: 16px;
            margin-left: 20px;
            margin-top: 5px;
        }
    }
</style>
