<template>
	<div class="content-express-add">
		<el-row class="form-panel">
			<el-col
				:span="13"
				class="panel-left richway-shadow">
				<div class="panel-title">值班编辑</div>
				<el-form
					ref="reportForm"
					:rules="formRules"
					:model="reportForm"
					class="panel-content"
					label-width="100px">
					<el-row :gutter="10">
						<el-col :span="10">
							<el-form-item
								label="报表名称：">
								<el-input
									v-model="reportNm"
									@change="onChange()" />
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item
								label-width="0">
								<span>第</span>
								<el-input
									v-model="reportForm.phase"
									style="width:60%;"
									@change="onChange()" />
								<span>期</span>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item
								label="填报单位：">
								<el-input
									v-model="company"
									@change="onChange()" />
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item label="带班领导：">
						<el-input
							v-model="reportForm.dutyLeader"
							@change="onChange()" />
					</el-form-item>
					<el-form-item
						label="值班人员："
						prop="dutyPerson">
						<el-input
							v-model="reportForm.dutyPerson"
							@change="onChange()" />
					</el-form-item>
					<el-form-item>
						<div
							v-loading="loading"
							style="min-height:5rem;">
							<RichTextEditor
								ref="textEditor"
								:defaultMsg="defaultMsg"
								:config="config"
								@on-load="loading=false;"
								@on-change="onChange" />
						</div>
					</el-form-item>
					<el-form-item style="text-align: right">
						<el-button
							type="success"
							@click="onSubmitReport('reportForm')">仅保存
						</el-button>
						<el-button
							type="primary"
							@click="handleSaveReport(`reportForm`)">保存并上报
						</el-button>
						<el-button
							@click="handleCancel()">取消/返回
						</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col
				:span="11"
				class="panel-right richway-shadow">
				<div class="panel-title">预览效果</div>
				<div
					class="panel-content"
					v-html="previewInfo" />
			</el-col>
		</el-row>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';

const moment = require(`moment`);

const { RichTextEditor } = RichWayWebComponents;
const _log = RichWayWebUtils.console.log;

export default {
    components: {
        RichTextEditor
    },
    props: {
        currentInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            formRules: {
                dutyPerson: [{
                    required: true,
                    message: `值班人员必须填写`,
                    trigger: `blur`
                }]
            },
            reportForm: {
                fastReportId: ``,
                reportNm: `防汛值班快报`,
                company: `省防汛抗旱指挥部办公室`,
                phase: ``,
                rainInfo: ``,
                waterInfo: ``,
                disasterInfo: ``,
                otherInfo: `无`,
                reportTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
                dutyLeader: `李志伟`,
                dutyPerson: `胡思艳 方小军`
            },
            dialogUploadVisible: false,
            defaultMsg: `<p style="margin-top: 5px; text-align: center;"><span style="font-size: 24px;"></span></p><p style="margin-bottom: 20px; text-align: center; line-height: 153px;"><span style="position: absolute; z-index: 1; left: 0px; margin-left: 605.667px; width: 132px; height: 52px; text-align: center;"><span style="font-family: 方正小标宋_GBK; font-size: 29px; text-indent: 11px;">&nbsp;</span></span></p><p style="text-indent: 43px; line-height: 40px; text-align: left;">据监测，9月17日7时至17日17时，受台风“山竹”外围云系影响，我省出现大范围降雨天气，雨量主要为小到中雨，大雨以上降雨主要出现在省的中部、南部和北<span style="text-indent: 0em;">部局部地，荔波县预警信息28万余条。同时，省防指派出3个工作赴望谟、龙里、册亨等地督促指导防汛工作。</span></p><p style="text-indent: 43px; line-height: 40px; text-align: right;"><span style="font-family: 仿宋_GB2312; font-size: 21px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${moment().format(`YYYY-MM-DD HH时mm分`)}&nbsp;&nbsp;</span></p><p style="text-indent: 299px; line-height: 40px; text-align: center;"><span style=";font-family:仿宋_GB2312;font-size:21px">&nbsp;</span></p><p style="text-indent: 43px; line-height: 40px; text-align: center;"><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">报：</span> <span style="font-family:仿宋_GB2312">孙志刚省委书记，谌贻琴省长，</span> <span style="font-family:仿宋_GB2312">李再勇常务副省长，</span></span></p><p style="text-indent: 43px; line-height: 40px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family: 仿宋_GB2312; font-size: 21px;">吴强副省长,</span></p><p style="text-indent: 43px; line-height: 40px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family: 仿宋_GB2312; font-size: 21px; text-align: center;">张平秘书长、项长权副秘书长。</span></p><p style="text-indent: 43px; line-height: 40px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family: 仿宋_GB2312; font-size: 21px; text-align: center; text-indent: 43px;">省委办公厅、省政府办公厅</span></p><p style="margin-top: 5px; text-align: center;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/></p>`,
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            },
            defaultPreviewInfo: `<p style="box-sizing: border-box; padding: 0px; margin-top: 0px; margin-bottom: 20px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: Arial, &quot;Microsoft YaHei&quot;, 黑体, 宋体, sans-serif; white-space: normal; color: rgb(96, 98, 102); font-size: 14px; background-color: rgb(255, 255, 255); text-align: center; line-height: 153px;"><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 长城大标宋体; color: rgb(255, 0, 0); letter-spacing: 1px; font-size: 69px;"><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">{fang}</span></span></p><p style="box-sizing: border-box; padding: 0px; margin-top: 0px; margin-bottom: 20px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: Arial, &quot;Microsoft YaHei&quot;, 黑体, 宋体, sans-serif; white-space: normal; color: rgb(96, 98, 102); font-size: 14px; background-color: rgb(255, 255, 255); line-height: normal; text-align: center;"><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 黑体; font-size: 21px;">&nbsp;第{0}166</span><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 黑体; font-size: 21px;"></span><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 黑体; font-size: 21px;">期</span></p><p style="box-sizing: border-box; padding: 0px; margin-top: 20px; margin-bottom: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: Arial, &quot;Microsoft YaHei&quot;, 黑体, 宋体, sans-serif; white-space: normal; color: rgb(96, 98, 102); font-size: 14px; background-color: rgb(255, 255, 255); text-indent: 11px; line-height: 27px;"><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 黑体; font-size: 21px;"><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">{4}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 黑体; font-size: 21px;">${moment().format(`YYYY年MM月DD日`)}</span><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 黑体; font-size: 21px;"></span><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); font-family: 黑体; font-size: 21px;"><span style="box-sizing: border-box; padding: 0px; margin: 0px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></span></span></p><hr/>{1}<br/></p><p style="margin-bottom:20px;text-align:center;line-height:153px"><span style="position:absolute;z-index:1;left:0px;margin-left:605.6667px;width:132.0000px;height:52.0000px"><img width="132" height="52" src="http://192.168.0.106:3003/assets/js/ue/themes/default/images/spacer.gif"/></span><span style="position:absolute;z-index:1;left:0px;margin-left:7.5833px;margin-top:359.5833px;width:727.0000px;height:3.0000px"><img width="727" height="3" src="/assets/js/ue/themes/default/images/spacer.gif"/></span></p><p><hr/><span style="position:absolute;z-index:1;margin-left:0.0000px;margin-top:7.7500px;width:739.0000px;height:2.0000px"><img width="739" height="2" src="http://192.168.0.106:3003/assets/js/ue/themes/default/images/spacer.gif"/><br/></span><span style=";font-family:仿宋_GB2312;font-size:21px"><span style="font-family:仿宋_GB2312">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编辑：</span> &nbsp;<span style="font-family:仿宋_GB2312">{2}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family:仿宋_GB2312">审核：</span> &nbsp;</span><span style=";font-family:宋体;font-size:21px"><span style="font-family:宋体">{3}</span></span><span style=";font-family:仿宋_GB2312;font-size:21px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-family:仿宋_GB2312">共印</span>1份</span></p><p>&nbsp;&nbsp;&nbsp;&nbsp;<br/></p>`,
            previewInfo: ``,
            isReport: ``,
            loading: true
        };
    },
    computed: {
        reportNm() {
            let reportNm = `防汛值班快报`
            let reportNm1 = window._RichWay.$map.currentRegionInfo.name;
            reportNm = `${reportNm1}-防汛值班快报`
            return reportNm
        },
        company() {
            let company = `省防汛抗旱指挥部办公室`
            let company1 = window._RichWay.$map.currentRegionInfo.name;
            company = `${company1}防汛值班快报`
            return company
        }

    },
    watch: {
        currentInfo: {
            immediate: true,
            handler() {
                for (const key in this.reportForm) {
                    if (Object.hasOwnProperty.call(this.reportForm, key)) {
                        this.reportForm[key] = this.currentInfo[key];
                    }
                }
            }
        }
    },
    mounted() {
        _log(`express has mounted`);
    },
    methods: {
        // 上传附件
        showUploadDialog() {
            this.dialogUploadVisible = true;
        },
        // 上传成功回调方法
        handleLoadSuccessContent(info) {
            this._log(info);
        },
        // 提交，向服务器发送数据
        onSubmitReport(formName) {
            // const content = this.$refs.textEditor.getUEContent();
            this.isReport = `0`;
            // this.$notify({
            //     title: `获取成功，可在控制台查看！`,
            //     message: content,
            //     type: `success`
            // });
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 验证成功调用ajax提交
                    this.ReportSave();
                } else {
                    this._log(`error submit!!`);
                    return false;
                }
            });
        },
        // 保存并上传
        handleSaveReport(formName) {
            this.isReport = `1`;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 验证成功调用ajax提交
                    this.ReportSave();
                } else {
                    this._log(`error submit!!`);
                    return false;
                }
            });
        },
        // 点击取消按钮
        handleCancel() {
            this.$emit(`on-failed`);
        },
        ReportSave() {
            const info = {
                isReport: ``,
                fastReportId: this.reportForm.fastReportId,
                reportNm: this.reportNm,
                reportDesc: this.$refs.textEditor.getUEContent(),
                reportInfo: this.previewInfo,
                company: this.reportForm.company,
                phase: this.reportForm.phase,
                otherInfo: this.reportForm.otherInfo,
                reportTime: this.reportForm.reportTime,
                dutyLeader: this.reportForm.dutyLeader,
                dutyPerson: this.reportForm.dutyPerson
            };
            if (this.isReport === `0`) {
                info.isReport = `0`;
            } else {
                info.isReport = `1`;
            }
            this.$getData
                .ReportSave(info)
                .then(() => {
                    this.$emit(`on-success`, this.previewInfo);
                })
                .catch(err => {
                    this.$emit(`on-failed`, err);
                });
        },
        onChange(html) {
            const defalutHtml = html || this.defaultMsg;
            if (this.reportForm.phase !== ``) {
                this.previewInfo = this.defaultPreviewInfo.replace(`166`, ``).replace(`{0}`, this.reportForm.phase).replace(`{2}`, this.reportForm.dutyLeader).replace(`{3}`, this.reportForm.dutyPerson).replace(`{fang}`,this.reportNm)
                    .replace(`{4}`, this.company)
                    .replace(`{1}`, defalutHtml);
            } else {
                this.previewInfo = this.defaultPreviewInfo.replace(`{0}`, this.reportForm.phase).replace(`{2}`, this.reportForm.dutyLeader).replace(`{3}`, this.reportForm.dutyPerson).replace(`{4}`, this.reportForm.company).replace(`{fang}`,this.reportNm)
                    .replace(`{1}`, defalutHtml);
            }
        }
    }

};
</script>

<style lang="scss" scoped>
    .content-express-add {
        position: relative;
        overflow-y: auto;
        height:100%;

        .form-panel {
            display: flex;
            margin: 0;
        }

        .panel-left, .panel-right{
            background-color: #fff;
        }
        .panel-right {
            margin-left: 1rem;
        }
        .panel-title {
            padding: .6rem .4rem;
            background-color: #eee;
        }
        .panel-content{
            background-color: #fff;
            padding: .5rem;
        }
    }
</style>
