<template>
	<div
		class="on-line-num"
		@click="onLineDialogVisible=true;">
		<div class="count-top">
			<span
				v-for="(num, index) in onlineNumList"
				:class="[num===0?'is-zero':'']"
				:key="index">{{ num }}</span>
		</div>
		<div class="count-bottom">在线用户</div>

		<el-dialog
			:append-to-body="!0"
			:modal-append-to-body="!1"
			:visible.sync="onLineDialogVisible"
			custom-class="online-dialog"
			title="在线人员统计"
			width="60rem">
			<div class="content">
				<el-tabs
					v-model="activeName"
					@tab-click="handleTablsClick">
					<el-tab-pane
						label="在线率统计"
						name="first">
						<ChartOnLine
							:xAxisData="onlineChartInfo.xAxisData"
							:yAxisData="onlineChartInfo.yAxisData"
							width="60rem"
							height="24rem" />
					</el-tab-pane>
					<el-tab-pane
						label="在线时长统计报表"
						name="second">
						<el-form
							ref="form"
							:model="form"
							label-width="3rem"
							label-position="left">
							<el-row :gutter="20">
								<el-col :span="10">
									<el-row :gutter="20">
										<el-col :span="12">
											<el-form-item label="政区">
												<CascaderSegion
													v-model="form.adcd"
													:change-on-select="true" />
											</el-form-item>
										</el-col>
										<el-col :span="12">
											<el-form-item label="姓名">
												<el-input v-model="form.userName" />
											</el-form-item>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="8">
									<el-form-item label="时间段">
										<el-date-picker
											v-model="form.dateRange"
											type="datetimerange"
											value-format="timestamp"
											range-separator="至"
											start-placeholder="开始日期"
											end-placeholder="结束日期" />
									</el-form-item>
								</el-col>
								<el-col
									:span="6"
									class="richway-push-right">
									<span><i class="el-icon-question" />使用说明</span>
									<el-button
										type="primary"
										round
										@click="handleQuery">查询</el-button>
								</el-col>
							</el-row>
						</el-form>

						<el-table
							:data="filterTableData"
							:max-height="400 * rem"
							border
							style="width: 100%">
							<el-table-column
								:width="50 * rem"
								type="index" />
							<el-table-column
								prop="userAccount"
								label="用户名" />
							<el-table-column
								prop="userName"
								label="姓名" />
							<el-table-column
								prop="adnm"
								label="政区" />
							<el-table-column
								prop="state"
								label="状态">
								<template slot-scope="scope">
									<p :title="scope.row.stlc">{{ scope.row.isOnline | _filterOnlineType() }}</p>
								</template>
							</el-table-column>
							<el-table-column
								prop="loginTime"
								label="在线时长">
								<template slot-scope="scope">
									<p :title="scope.row.stlc">{{ scope.row.loginTime | _filterDurationTime() }}</p>
								</template>
							</el-table-column>
							<el-table-column
								prop="lastTime"
								label="最后一次登录时间">
								<template slot-scope="scope">
									<p :title="scope.row.stlc">{{ scope.row.loginTime | _filterTime() }}</p>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebChart from '@rich/richwayweb-chart';
import { _filterCity } from '@rich/richwayweb-utils/lib/filter/filterRegion';

const { mapState } = require(`vuex`);
const moment = require(`moment`);
const { ChartOnLine } = RichWayWebChart;
const CascaderSegion = r => require.ensure([], () => r(require(`./region/cascaderSegion`)), `richway_components`);

export default {
    // 在线人数统计
    name: `onLineNum`,
    filters: {
        _filterDurationTime(time) {
            if (time) {
                const duration = (new Date()).getTime() - time;
                const h = moment.duration(duration).get(`hours`);
                const m = moment.duration(duration).get(`minutes`);
                return `${h}小时${m}分钟`;
            }
            return `0分钟`;
        },
        _filterTime(time) {
            return moment(time).format(`YYYY-MM-DD HH:mm:ss`);
        },
        _filterOnlineType(type) {
            return type ? `在线` : `离线`;
        }
    },
    components: {
        ChartOnLine,
        CascaderSegion
    },
    data() {
        return {
            onlineNum: 0,
            activeName: `first`,
            onLineDialogVisible: false,
            regionData: [],
            onlineChartInfo: {
                xAxisData: [],
                yAxisData: []
            },
            chooseRegionInfo: {},
            form: {
                adcd: ``,
                userName: ``,
                dateRange: []
            },
            onLineTableData: [],
            filterTableData: []
        };
    },
    sockets: {
        connect() {
            // 与socket.io连接后回调
            this._log(`socket connect...`);
        },
        disconnect() {
            // 与socket.io断开连接后回调
            this._log(`socket disconnect...`);
        },
        online(data) {
            this._log(`socket online...`, data);
            this.onlineNum = data.total || 0;
            this.onLineTableData = data.data;
            this.filterAdcd();
            this.handleQuery();
        }
    },
    computed: {
        ...mapState([`userInfo`, `rem`]),
        onlineNumList() {
            const num = `${this.onlineNum}`;
            const len = num.length;
            const numList = [];

            numList[0] = len < 4 ? 0 : num.substr(len - 4, 1);
            numList[1] = len < 3 ? 0 : num.substr(len - 3, 1);
            numList[2] = len < 2 ? 0 : num.substr(len - 2, 1);
            numList[3] = len < 1 ? 0 : num.substr(len - 1, 1);
            return numList;
        },
        selectedOptions() {
            return [];
        }
    },
    mounted() {
        this.$socket.emit(`online`, {
            userAccount: this.userInfo.userAccount
        });

        this.$getData.GetRegionData({
            adcd: 520000000000000,
            depth: 2
        }).then((res = {}) => {
            this.regionData = res.data[0].children;
            this.filterAdcd();
        });
    },
    methods: {
        handleTablsClick() {

        },
        // 查询
        handleQuery() {
            this.filterTableData = [];
            for (const item of this.onLineTableData) {
                let bl1 = false;
                if ((item.adcd || ``).indexOf(this.form.adcd) > -1 || !this.form.adcd) {
                    bl1 = true;
                }
                let bl2 = false;
                if ((item.userName || ``).indexOf(this.form.userName) > -1 || !this.form.userName) {
                    bl2 = true;
                }
                let bl3 = false;
                const [startTime, endTime] = this.form.dateRange;
                if ((startTime && item.loginTime >= startTime && item.loginTime <= endTime) || !startTime) {
                    bl3 = true;
                }
                if (bl1 && bl2 && bl3) {
                    this.filterTableData.push(item);
                }
            }
        },
        filterAdcd() {
            this.onlineChartInfo.xAxisData = [];
            this.onlineChartInfo.yAxisData = [
                {
                    name: `县区数量`,
                    data: []
                },
                {
                    name: `有登录账号的县区数量`,
                    data: []
                }
            ];
            for (const item of this.regionData) {
                this.onlineChartInfo.xAxisData.push(item.adnm);
                this.onlineChartInfo.yAxisData[0].data.push((item.children || []).length);

                let count = 0;
                for (const o of this.onLineTableData) {
                    if (_filterCity(o.adcd, `all`) === _filterCity(item.adcd, `all`)) {
                        count++;
                    }
                }
                this.onlineChartInfo.yAxisData[1].data.push(count);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    $h: 4rem;
    .on-line-num {
        margin: 0 -1rem;
        width: 5rem;
        background-color: rgb(14, 37, 97);
        .count-top {
            position: relative;
            height: $h/2;
            border-bottom: 1px solid #aaa;

            > span {
                float: left;
                display: inline-block;
                box-sizing: border-box;
                width: 25%;
                height: 100%;
                font-weight: 600;
                font-size: 1.3rem;
                line-height: $h/2;
                text-align: center;
                border-right: 1px solid #aaa;

                &:last-child {
                    border-right: none;
                }
            }

            .is-zero {
                color: #aaa;
            }
        }

        .count-bottom {
            width: 100%;
            height: $h/2;
            border-bottom: 2px solid #fff;
            line-height: $h/2;
            text-align: center;
        }
    }

    .online-dialog{
        .content{
            height: 26rem;
        }
    }
</style>
