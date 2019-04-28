<template>
	<div class="weather-panel">
		<!-- 查询表单 -->
		<el-form
			ref="workForm"
			:model="ruleForm"
			label-width="4.5rem"
			label-position="left"
			class="weather-panel-form panel-form">

			<!-- 检测类型 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">数据类型:</b>
				<el-radio-group v-model="ruleForm.cid">
					<el-radio
						v-for="(item, index) in detectionTypeList"
						:label="item.code"
						:key="index"
						@change="handelDetectionTypeChange(item.code)">{{ item.title }}
					</el-radio>
				</el-radio-group>

				<el-button
					class="richway-right"
					type="primary"
					size="mini"
					@click="handleQuery">查询</el-button>
			</el-form-item>

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
" />
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
" />
				</el-col>
			</el-form-item>

			<!-- 功能 -->
			<el-form-item>
				<b
					slot="label"
					class="form-label">功能按钮:</b>
				<el-button-group>
					<el-button
						type="primary"
						size="mini"
						@click="handlePlay">播放</el-button>
					<el-button
						:disabled="playInfo.state === 'stop'"
						type="primary"
						size="mini"
						@click="handleStop">停止</el-button>
				</el-button-group>
			</el-form-item>
			<el-form-item>
				<b
					slot="label"
					class="form-label">播放速度:</b>
				<el-slider
					v-model="playInfo.sliderValue"
					:min="0.3"
					:max="3"
					:step="0.1" />
			</el-form-item>
		</el-form>

		<!-- 气象列表 -->
		<div
			v-loading="weatherListLoading"
			class="weather-list panel-list">
			<ul v-if="playInfo.dataList.length">
				<li
					v-for="(item, index) in playInfo.dataList"
					:key="index"
					:class="[playInfo.curIndex === index ? 'active' : '']"
					@click="handleRowClick(index)">
					<span class="num">{{ index+1 }}</span>
					<span>{{ item.tm | time }}</span>
				</li>
			</ul>
			<p v-else>暂时没有数据</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
const moment = require(`moment`);

export default {
    name: `weather`,
    components: {},
    filters: {
        time(tm) {
            return moment(tm).format(`YYYY-MM-DD HH:mm`);
        }
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
            ruleForm: {
                cid: ``,
                stm: (moment().format(`HH`) < 8 ? (moment().add(-1, `d`)) : moment()).hour(8).minute(0).second(0).format(`YYYY-MM-DD HH:mm`),
                etm: moment().format(`YYYY-MM-DD HH:mm`)
            },
            weatherListLoading: false,
            playInfo: {
                dataList: [],
                curIndex: ``,
                sliderValue: 1,
                isPlaying: true,
                setTimeoutId: null,
                state: `stop`
            }
        };
    },
    computed: {
        detectionTypeList() {
            const arr = [];
            const dataTypeList = this.config.dataTypeList || [];
            for (const item of dataTypeList) {
                if (item === `cloud`) {
                    arr.push({
                        code: `11`,
                        title: `云图`
                    });
                } else if (item === `radar`) {
                    arr.push({
                        code: `6`,
                        title: `雷达`
                    });
                }
            }
            return arr;
        }
    },
    mounted() {
        this._log(`monitorGzshzh weather has mounted`);
        this.ruleForm.cid = (this.detectionTypeList[0] || {}).code;
    },
    activated() {
        this._log(`water: activated`);
        this.handleQuery();
    },
    deactivated() {
        this._log(`weather: deactivated`);
        this.handleStop();
        this.toggleCloudLayer(false);
    },
    methods: {
        handleQuery() {
            this.handleStop();
            if (this.ruleForm.cid) {
                this.weatherListLoading = true;
                this.$getData.GetCloudList(this.ruleForm).then(res => {
                    this.playInfo.dataList = res.data || [];
                    this.playInfo.curIndex = this.playInfo.dataList.length - 1;
                }).always(() => {
                    this.weatherListLoading = false;
                });
            }
        },
        handelDetectionTypeChange() {
            this.handleStop();
            this.handleQuery();
        },
        handleRowClick(index) {
            this.playInfo.curIndex = index;
            this.toggleCloudLayer(true);
            this.changeImage();
        },
        handlePlay() {
            this.playInfo.state = `play`;
            this.playInfo.isPlaying = true;
            this.toggleCloudLayer(true);
            this.play();
        },
        handleStop() {
            this.playInfo.state = `stop`;
            this.playInfo.isPlaying = false;
            this.stop();
            this.toggleCloudLayer(false);
        },
        toggleCloudLayer(bl) {
            const CloudLayer = ((window._RichWay.$map.businessLayers || {}).Cloud || {}).layer || {};
            if (bl) {
                if (CloudLayer && typeof (CloudLayer.createGraphics) === `function`) {
                    CloudLayer.createGraphics();
                }
            } else if (CloudLayer && typeof (CloudLayer.clearGraphics) === `function`) {
                CloudLayer.clearGraphics();
            }
        },
        // 播放
        play() {
            if (this.playInfo.curIndex >= this.playInfo.dataList.length || this.playInfo.curIndex < 0) {
                this.handleStop();
                this.playInfo.curIndex = this.playInfo.dataList.length - 1;
                return false;
            }

            if (this.playInfo.isPlaying) {
                this.changeImage(true);
            }
        },
        // 暂停
        stop() {
            clearTimeout(this.playInfo.setTimeoutId);
        },
        // 切换图片
        changeImage(bl) {
            const cloudInfo = this.playInfo.dataList[this.playInfo.curIndex];
            // const imageUrl = `${this.$base.path.downloadServiceHost}/base/api/file/target/pic/${cloudInfo.filename}`;
            const imageUrl = `http://testsh.rtongcloud.com:5001/staticRes/${cloudInfo.filename}`;
            this.$mapLayersFun.MapBusinessLayersCloudBroadcastFun({
                imageUrl
            });

            if (bl) {
                this.playInfo.setTimeoutId = setTimeout(() => {
                    this.playInfo.curIndex--;
                    this.play();
                }, this.playInfo.sliderValue * 1000);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
		.weather-panel{
            user-select: none;
			display: flex;
			flex-direction: column;

			.weather-list{
				>p{
					padding: 1rem 0;
					text-align: center;
				}

				li{
					display: flex;
					align-items:center;
					padding: .4rem .5rem;
					cursor: pointer;

					&:hover{
						background-color: rgba(0,0,0,.1);
					}

					.num {
						display: inline-block;
						width: 1.2rem;
						height: 1.2rem ;
						margin-right: .4rem;
						border-radius: 50%;
						line-height: 1.2rem;
						text-align: center;
						color: #fff;
						background-color: #4775ca;
					}
				}

				.active {
					background-color: rgba(0,0,0,.1);
				}
			}
		}
</style>
