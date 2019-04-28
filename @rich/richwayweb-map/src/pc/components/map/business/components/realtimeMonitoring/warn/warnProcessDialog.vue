<template>
	<Dialog
		title="督导提示"
		@on-hide="handleHide">
		<div
			slot="content"
			class="warn-dialog-content1">
			<div class="process_left">
				<div class="process-item">
					<h3 class="title">督导进度</h3>
					<div class="process-content process-level">
						<ul>
							<li>
								<span class="level">省</span>
								<span
									v-if="processState.province === 1"
									class="tips tips-1">已督导</span>
								<span
									v-else
									class="tips tips-3">未督导</span>
							</li>
							<li>
								<span class="level">市</span>
								<span
									v-if="processState.city == 1"
									class="tips tips-1">已督导</span>
								<span
									v-else
									class="tips tips-3">未督导</span>
							</li>
							<li>
								<span class="level">县</span>
								<span
									v-if="processState.county === 1"
									class="tips tips-1">已处置</span>
								<span
									v-else
									class="tips tips-3">未处置</span>
							</li>
						</ul>
					</div>
				</div>
				<div
					v-loading="loadingPeople"
					v-if="code.substring(4,6) === `00`"
					class="process-item"
				>
					<h3 class="title">联系人</h3>
					<div class="process-content">
						<el-table
							ref="multipleTable"
							:data="peopleList"
							:max-height="200 * rem"
							style="width: 100%"
							@selection-change="handleSelectChange">
							<el-table-column
								type="selection"
								width="55" />
							<el-table-column
								prop="data1"
								label="单位" />
							<el-table-column
								prop="position"
								label="职务" />
							<el-table-column
								prop="contactsName"
								label="负责人" />
							<el-table-column
								prop="mobile"
								label="电话" />
						</el-table>
					</div>
					<div class="process-footer">
						<el-button
							type="primary"
							round
							size="mini"
							@click="handleSubmitTips">立即提示</el-button>
					</div>
				</div>

				<div
					v-loading="loadingPeople"
					v-if="code.substring(4,6) !== `00`"
					class="process-item"
				>
					<h3 class="title">处置内容</h3>
					<div class="process-content">
						<el-input
							v-model="textContent"
							:rows="5"
							style="font-size: 1rem; text-indent: 2em"
							type="textarea" />
					</div>
					<div class="process-footer">
						<el-button
							type="primary"
							round
							size="mini"
							@click="immediateDisposal">立即处置</el-button>
					</div>
				</div>
			</div>
			<div class="process_right">
				<div class="process-item">
					<h3 class="title">督导流程</h3>
					<div class="process-content process-detail">
      <el-steps
							:active="newNum"
							direction="vertical"
							space="50px"
						>
							<el-step
								v-for="(item, index) in newProcessLogsArr"
								:key="index"
								:title="item.tm"
								:description="item.processInfor"
							/>
						</el-steps>
					</div>
				</div>
			</div>
		</div>
	</Dialog>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);

const Dialog = r => require.ensure([], () => r(require(`../../dialog`)), `components/map/business/index`);

export default {
    name: `warnProcessDialog`,
    components: {
        Dialog
    },
    props: {
        warnDetail: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            peopleList: [],
            selectedList: [],
            progressState: [],
            loadingPeople: false,
            processState: {},
            processLogsArr: [],
            textContent: ``,
            code: ``
        };
    },
    computed: {
        ...mapState([`rem`]),
        newProcessLogsArr() {
            let ProcessInfor = ``;
            const newArry = this.processLogsArr;
            for(const item of newArry) {
                ProcessInfor = `处置人:${item.userName}; 备注:${item.note} `;
                item.processInfor = ProcessInfor;
            }
            return newArry;
        },
        newNum() {
            let number = this.newProcessLogsArr.length;
            return number;
        }
    },
    watch: {
        warnDetail() {
            this.handleWorkDetail();
        }

    },
    mounted() {
        // TODO
        this.handleWorkDetail();
        this.getCode();
    },
    methods: {
        // 获取全局 code 从而判断当前是哪级用户 （window._RichWay.$map.currentRegionInfo）
        getCode() {
            this._log(`0000`, window._RichWay.$map.currentRegionInfo);
            this.code = window._RichWay.$map.currentRegionInfo.code;
        },
        handleWorkDetail() {
            if (this.warnDetail.warnId) {
                // this.handleQueryWarnDetailProcessPeople();
                // this.ProcessDispose();
                this.ProcessState();
            }
        },
        // 预警-督导-处置
        ProcessDispose() {
            this.loadingPeople = true;
            this._log(`000`, this.warnDetail.warnId);
           let list = JSON.stringify(this.selectedList);
            this.$getData.PostProcessTipsMonitor({
                warnId: this.warnDetail.warnId,
                contacts: list,
                note: this.textContent
            }).then((res = {}) => {
                this._log(`1111`, res.data);
                this.ProcessState();
            }).always(() => {
                this.loadingPeople = false;
            });
        },
        // 预警-督导-查询状态
        ProcessState() {
            this.loadingPeople = true;
            this.$getData.GetProcessTipsMonitor({
                warnId: this.warnDetail.warnId,
            }).then((res = {}) => {
                this.processState = res.data || {};
                this.processLogsArr = res.data.processLogs || [];
                this.peopleList = res.data.contacts;
                this._log(`22222`, this.peopleList);
            }).always(() => {
                this.loadingPeople = false;
            });
        },
        // 立即处置
        immediateDisposal() {
            this._log(`处置内容:`, this.textContent);
            this.ProcessDispose();
        },
        // handleQueryWarnDetailProcessPeople() {
        //     this.loadingPeople = true;
        //     this.$getData.GetWarnDetailProcessPeopleMonitor({
        //         warnCode: this.warnDetail.warnCode
        //     }).then((res = {}) => {
        //         this.peopleList = (res.data || {}.peopleList);
        //     }).always(() => {
        //         this.loadingPeople = false;
        //     });
        // },

        handleSelectChange(selection) {
            this.selectedList = selection;
        },
        handleSubmitTips() {
            if (this.selectedList.length) {
                this.loadingPeople = true;
                this.ProcessDispose();
                // this.sandNote();
                // this.ProcessState();
                // this.$getData.SetProcessTipsMonitor({
                //     peopleList: this.selectedList
                // }).then(() => {
                //     // this.ProcessDispose();
                // }).always(() => {
                //     this.loadingPeople = false;
                // });
            } else {
                this.$message({
                    message: `请至少选中一条数据！`,
                    type: `warning`
                });
            }
        },
        handleHide() {
            this.$emit(`on-hide`);
        }
    }
};
</script>

<style lang="scss" scoped>
    .warn-dialog-content1 {
        min-height: 20rem;
        max-height: 36rem;
        overflow: auto;
        display: flex;

        .process_left{
            width: 75%;
        }

        .process_right{
            width: 25%;
        }


        .process-item{
            border: 1px solid #eee;
            padding: .5rem;
            border-radius: 4px;
            margin-bottom: .5rem;

            .tips {
                display: inline-block;
                width: 4rem;
                color: #fff;
                margin-top: .6rem;
                padding: .1rem .5rem;
                border-radius: .7rem;
                font-size: .7rem;
                text-align: center;
            }

            .tips-1 {
                background-color: #7ed320
            }
            .tips-2 {
                background-color: #9b9b9b
            }
            .tips-3 {
                background-color: #ec4f3e
            }

            .title {
                color: #4775ca;
            }

            .process-level{
                text-align: center;
                li {
                    display: inline-block;
                    position: relative;
                    width: 5rem;
                    margin: 0 3rem;

                    &:after{
                        content: " ";
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        right: -8.5rem;
                        width: 10rem;
                        height: 0.1rem;
                        background-color: #79a7ff;
                        margin-top: -1rem;
                    }
                    &:last-child:after {
                        display: none;
                    }


                    .level{
                        display: inline-block;
                        width: 3.6rem;
                        height: 3.6rem;
                        border-radius: 50%;
                        background-color: #79a7ff;
                        line-height: 3.6rem;
                        text-align: center;
                        color: #fff;
                        font-size: 1.4rem;
                    }
                }
            }

            .process-detail {
                height: 20rem;
                overflow-y: scroll;

                .el-steps--vertical{
                    height: auto;
                }
            }

            /*.process-detail{
                position: relative;
                text-align: center;
                &:after{
                    content: " ";
                    display: inline-block;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    left: 0;
                    height: 0.1rem;
                    background-color: #79a7ff;
                }
                li {
                    display: inline-block;
                    position: relative;
                    width: 16rem;
                    margin: 0 1rem;
                    >div {
                        display: flex;
                        align-items:center;
                        justify-content:center;
                    }
                    &:after{
                        content: " ";
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0.8rem;
                        height: 0.8rem;
                        border-radius: 50%;
                        background-color: #79a7ff;
                        margin-top: -0.4rem;
                        margin-left: -.4rem;
                        border: 0.2rem solid #fff;
                        z-index: 1;
                    }
                }

                .process-detail-time{
                    margin-bottom: .5rem;
                }

                .left, .right {
                    display: inline-block;
                    width: 50%;
                }
                .left {
                    text-align: right;
                    margin-right: .5rem;
                }
                .right {
                    text-align: left;
                    margin-left: .5rem;
                }
            }*/

            .process-footer{
                text-align: center;
                padding-top: .5rem;
            }
        }
    }
</style>
