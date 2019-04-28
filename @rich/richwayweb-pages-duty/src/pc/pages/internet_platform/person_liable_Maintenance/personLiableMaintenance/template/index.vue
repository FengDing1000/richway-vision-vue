<template>
	<div class="content content-personLiableMaintenance">
		<el-tabs
			v-model="activeName"
			type="card"
			@tab-click="handleClick">
			<el-tab-pane
				label="危险区责任人"
				name="first">
				<ContentLeftRight>
					<template slot="left">
						<div class="leftTop">
							<el-button
								type="primary"
								@click="handleExport()"> <i class="el-icon-upload2" /> 导出</el-button>
							<el-button
								type="success"
								@click="handleImport()"> <i class="el-icon-download" /> 导入</el-button>
						</div>
						<div
							class="leftBottom"
							style="padding-top: 3rem;">
							<el-menu
								ref="user_dt"
								default-active="2"
								class="el-menu-vertical-demo">
								<el-menu-item
									v-for="(item,index) in adcdInfo"
									:index="index"
									:key="item"
									@click="click(item)">
									<span slot="title">{{ item.adnm }}({{ item.setNum||0 }}/{{ item.totalNum }})</span>
								</el-menu-item>
							</el-menu>
						</div>
					</template>
					<template slot="right">
						<div class="right">
							<div class="rightTop">
								<div class="rightTopTitle">{{ adcdInfoItem.adnm }}</div>
								<el-button
									class="rightTopBtn"
									type="success"
									@click="handleSave(1)"> 保存</el-button>
							</div>
							<div
								v-for="(item,index) in personList"
								:key="item"
								class="rightBottom">
								<el-row>
									<el-col :span="3">
										<div class="grid-content">
											{{ item.areaNm }}
										</div>
									</el-col>
									<el-col :span="21">
										<div
											v-for="(item1,index1) in item.chargeList || []"
											:key="item1"
											class="rightBottomInput">
											<!-- <el-form  :model="item1" :rules="rules"  :inline="true" >
                                                <el-form-item>
                                                    <el-button
                                                         style="width:30%"
                                                        class="el-icon-minus"
                                                        @click="deletePersonal(index,index1)" />
                                                </el-form-item>
                                                <el-form-item>
                                                    <el-input
                                                        v-model="item1.inchargeName"
                                                        style="width:30%"
                                                        placeholder="姓名（不超过十个字）" />
                                                </el-form-item>
                                                <el-form-item  prop="inchargeMobile">
                                                    <el-input
                                                        v-model.number="item1.inchargeMobile"
                                                        maxlength = "11"
                                                        style="width:30%"
                                                        placeholder="手机号（11位）" />
                                                </el-form-item>
                                                <el-form-item >
                                                    <el-checkbox-group
                                                        v-model="item1.inchargePosition"
                                                        style="width:50%;float:right">
                                                        <el-checkbox label="1">行政责任人</el-checkbox>
                                                        <el-checkbox label="2">监测巡查责任人</el-checkbox>
                                                        <el-checkbox label="3">预警转移责任人</el-checkbox>
                                                    </el-checkbox-group>
                                                </el-form-item>
                                            </el-form> -->
											<el-button
												class="el-icon-minus"
												@click="deletePersonal(index,index1)" />
											<el-input
												v-model="item1.inchargeName"
												style="width:20%"
												placeholder="姓名（不超过十个字）"
												@change="isEmptyValue($event)" />
											<el-input
												v-model.number="item1.inchargeMobile"
												prop="tel"
												maxlength = "11"
												style="width:20%"
												placeholder="手机号（11位）"
												@change="isEmptyValue($event)" />
											<el-checkbox-group
												v-model="item1.inchargePosition"
												style="width:50%;float:right"
												@change="isEmptyValue($event)">
												<el-checkbox label="1">行政责任人</el-checkbox>
												<el-checkbox label="2">监测巡查责任人</el-checkbox>
												<el-checkbox label="3">预警转移责任人</el-checkbox>
											</el-checkbox-group>
										</div>
										<el-button
											type="primary"
											class="rightBottomBtn el-icon-plus"
											@click="addPersonal(index,item.areaNm)"> 添加人员</el-button>
									</el-col>
								</el-row>
							</div>
						</div>
					</template>
				</ContentLeftRight>
			</el-tab-pane>
			<el-tab-pane
				label="防汛责任人"
				name="second">
				<ContentLeftRight>
					<template slot="left">
						<div class="leftBottom  richway-shadow">
							<el-menu
								default-active="2"
								class="el-menu-vertical-demo">
								<el-menu-item
									v-for="(item,index) in floodPreventionInfo"
									:index="index"
									:key="item"
									@click="floodPreventionClick(item)">
									<span slot="title">{{ item.adnm }}({{ item.setNum||0 }}/{{ item.totalNum }})</span>
								</el-menu-item>
							</el-menu>
						</div>
					</template>
					<template slot="right">
						<div class="right richway-shadow">
							<div class="rightTop">
								<div class="rightTopTitle">{{ floodPreventionItem.adnm }}</div>
								<el-button
									class="rightTopBtn"
									type="success"
									@click="handleSave(2)"> 保存</el-button>
							</div>
							<div
								v-for="(item,index) in floodPreventionList"
								:key="item"
								class="rightBottom">
								<el-row>
									<el-col :span="3">
										<div class="grid-content">
											{{ item.areaNm }}
										</div>
									</el-col>
									<el-col :span="21">
										<div
											v-for="(item1,index1) in item.chargeList"
											:key="item1"
											class="rightBottomInput">
											<el-button
												class="el-icon-minus"
												@click="deleteInfo(index,index1)" />
											<el-input
												v-model="item1.inchargeName"
												style="width:20%"
												placeholder="姓名（不超过十个字）"
												@change="isEmptyValue($event)" />

											<el-input
												v-model="item1.inchargeMobile"
												style="width:20%"
												maxlength = "11"
												placeholder="手机号（11位）"
												@change="isEmptyValue($event)" />
											<el-input
												v-model="item1.inchargePosition"
												style="width:20%"
												placeholder="职位"
												@change="isEmptyValue($event)" />
										</div>
										<el-button
											type="primary"
											class="rightBottomBtn el-icon-plus"
											@click="addFloodPrevention(index)"> 添加人员</el-button>
									</el-col>
								</el-row>
							</div>
						</div>
					</template>
				</ContentLeftRight>
			</el-tab-pane>
			<el-tab-pane
				label="自动预警人员"
				name="third">
				<div class="right">
					<div class="rightTop">
						<el-button
							class="rightTopBtn"
							type="success"
							@click="handleSave(3)"> 保存</el-button>
					</div>
					<div
						class="rightBottom">
						<el-row>
							<el-col :span="24">
								<div
									v-for="(item,index) in AutomaticWarningList"
									:key="item"
									class="rightBottomInput">
									<el-button
										class="el-icon-minus"
										@click="deleteAEWarning(index)" />
									<el-input
										v-model="item.inchargeName"
										style="width:20%"
										placeholder="姓名（不超过十个字）"
										@change="isEmptyValue($event)" />

									<el-input
										v-model="item.inchargeMobile"
										style="width:20%"
										maxlength = "11"
										placeholder="手机号（11位）"
										@change="isEmptyValue($event)" />
									<el-input
										v-model="item.inchargePosition"
										style="width:20%"
										placeholder="职位"
										@change="isEmptyValue($event)" />
								</div>
								<el-button
									type="primary"
									class="rightBottomBtn el-icon-plus"
									@click="addAEWarning()"> 添加人员</el-button>
							</el-col>
						</el-row>
					</div>
				</div>

			</el-tab-pane>
		</el-tabs>
		<el-dialog
            :fullscreen="true"
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisible"
			width="20rem"
			title="导入用户信息">
			<UpLoad
				@on-load-success="handleImportSuccess" />
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

import RichWayWebComponents from '@rich/richwayweb-components';
import { setTimeout } from 'timers';

const { ContentLeftRight, UpLoad } = RichWayWebComponents;
const { deepClone, downloadFile } = RichWayWebUtils;

export default {
    components: {
        ContentLeftRight,
        UpLoad
    },
    data() {
        return {
            adcdInfo: [],
            personList: [],
            adcdInfoItem: {},
            isHasChange: false,
            floodPreventionItem: {},
            floodPreventionInfo: {},
            floodPreventionList: [],
            AutomaticWarningList: [{
                inchargeName: ``,
                inchargeMobile: ``,
                inchargePosition: ``
            }],
            AEWarning: [{
                inchargeName: ``,
                inchargeMobile: ``,
                position: ``
            }],
            dialogUploadVisible: false,
            activeName: `first`,
            rules: {
                inchargeMobile: [
                    { type: `number`, message: `请输入正确手机号格式`, trigger: `change` }
                ]
            }
        };
    },
    computed: {

    },
    mounted() {
        this._log(`personLiableMaintenance has mounted`);
        this.GetDangerAdcddAnadTree();
        this.GetFloodPreventionTree();
        this.GetAutomaticWarningTree();
    },
    methods: {
        isEmptyValue(value) {
            if (value === `` || value.length === 0) {
                this.isHasChange = false;
            } else {
                this.isHasChange = true;
            }
        },
        // 危险责任区-增加联系人
        addPersonal(index) {
            this.personList[index].chargeList.push({
                inchargeAdcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6) || `511823100000000`,
                inchargeId: ``,
                inchargeMobile: ``,
                inchargeName: ``,
                inchargePosition: [],
                inchargeType: `1`,
                tagNm: this.personList[index].areaNm,
                townNm: this.adcdInfoItem.adnm
            });
        },
        // 防汛责任人-增加联系人
        addFloodPrevention(index) {
            this.floodPreventionList[index].chargeList.push({
                inchargeAdcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6) || `511823100000000`,
                inchargeAreaId: this.floodPreventionList[index].areaId,
                inchargeId: ``,
                inchargeMobile: ``,
                inchargeName: ``,
                inchargePosition: ``,
                inchargeType: `2`,
                tagNm: this.floodPreventionList[index].areaNm,
                townNm: this.floodPreventionItem.adnm
            });
        },
        // 自动预警 -添加联系人
        addAEWarning() {
            this.AutomaticWarningList.push({
                inchargeName: ``,
                inchargeMobile: ``,
                position: ``
            });
        },
        // 危险责任人-删除联系人
        deletePersonal(index, index1) {
            if (this.personList[index].chargeList.length === 1) {
                this.$message({
                    message: `至少有一个人员`,
                    type: `warning`
                });
                return;
            }
            this.personList[index].chargeList.splice(index1, 1);
        },
        //  防汛责任人-删除联系人
        deleteInfo(index, index1) {
            if (this.floodPreventionList[index].chargeList.length === 1) {
                this.$message({
                    message: `至少有一个人员`,
                    type: `warning`
                });
                return;
            }
            this.floodPreventionList[index].chargeList.splice(index1, 1);
        },
        // 自动预警 - 删除联系人
        deleteAEWarning(index) {
            if (this.AutomaticWarningList.length === 1) {
                this.$message({
                    message: `至少有一个人员`,
                    type: `warning`
                });
                return;
            }
            this.AutomaticWarningList.splice(index, 1);
        },
        // 保存之前的验证
        handleSave(type) {
            if (!this.isHasChange) {
                this.$notify({
                    title: `提示`,
                    message: `数据未更改，修改数据后提交`,
                    type: `warning`
                });
                return;
            }

            let message = [];
            if (type === 1) {
                const personListCopy = deepClone(this.personList);
                message = this.checkInfoComplete(personListCopy);
            } else if (type === 2) {
                const floodPreventionListCopy = deepClone(this.floodPreventionList);
                message = this.checkInfoComplete(floodPreventionListCopy);
            } else if (type === 3) {
                const automaticWarningList = deepClone(this.AutomaticWarningList);
                let complete = false;
                for (const item1 of (automaticWarningList || [])) {
                    if (item1.inchargeName || item1.inchargeMobile) {
                        if ((!item1.inchargeName || !item1.inchargeMobile) || item1.inchargeName === `` || item1.inchargeMobile === ``) {
                            complete = true;
                        }
                    }
                    if (complete) {
                        message.push(`人员信息不完整！`);
                        break;
                    }
                }
            }
            if (message.length > 0) {
                message.map(item => {
                    setTimeout(() => {
                        this.$notify({
                            title: `警告`,
                            message: item,
                            type: `warning`
                        });
                    }, 0);
                    return item;
                });
                return;
            }
            this.GetSaveConfirm(type);
        },
        // 保存之前是否提交保存信息的提示信息框
        GetSaveConfirm(tpye) {
            this.$confirm(`更新责任人会同时更新通讯录，您确认要保存吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                this.handleSure(tpye);
            }).catch(() => {
                this.$message({
                    type: `info`,
                    message: `已取消`
                });
            });
        },
        // 点击保存确定按钮
        handleSure(tpye) {
            // 危险区责任人参数处理
            const arrOne = [];
            const personListCopy = deepClone(this.personList);
            for (const item of personListCopy) {
                for (const item1 of item.chargeList || []) {
                    if (item1.inchargePosition) {
                        item1.inchargePosition = item1.inchargePosition.join(`,`);
                    } else {
                        item1.inchargePosition = ``;
                    }
                    item1.inchargeMobile = item1.inchargeMobile || ``;
                    item1.inchargeName = item1.inchargeName || ``;
                    item1.townNm = this.adcdInfoItem.adnm;
                    item1.inchargeType = `1`;
                    item1.areaNm = item.areaNm;
                    item1.inchargeAdcd = `${item.areaId.substr(0, 9)}000000`;
                    item1.inchargeAreaId = item.areaId;
                    item1.inchargeId = item1.inchargeId || ``;
                    if (item1.inchargeName !== ``) {
                        arrOne.push(item1);
                    }
                }
            }
            // 防汛责任人参数处理
            const arrTwo = [];
            const floodPreventionListCopy = deepClone(this.floodPreventionList);
            for (const item of floodPreventionListCopy) {
                for (const item1 of item.chargeList || []) {
                    if ((typeof item1.inchargePosition) === `object`) {
                        item1.inchargePosition = item1.inchargePosition.join(`,`);
                    } else {
                        item1.inchargePosition = item1.inchargePosition || ``;
                    }
                    // item1.inchargePosition = item1.inchargePosition ||``;
                    item1.inchargeMobile = item1.inchargeMobile || ``;
                    item1.inchargeName = item1.inchargeName || ``;
                    item1.townNm = this.adcdInfoItem.adnm;
                    item1.inchargeType = `2`;
                    item1.areaNm = item.areaNm;
                    item1.inchargeAdcd = `${item.areaId.substr(0, 9)}000000`;
                    // item1.inchargeAdcd = window._RichWay.$map.currentRegionInfo.code || `511823100000000`; //.substr(0, 6)
                    item1.inchargeAreaId = item.areaId || ``;
                    item1.inchargeId = item1.inchargeId || ``;
                    if (item1.inchargeName !== ``) {
                        arrTwo.push(item1);
                        console.log(25253636, item1.inchargePosition);
                    }
                }
            }
            // 自动预警人员参数处理
            const arrThree = [];
            const AutomaticWarningListCopy = deepClone(this.AutomaticWarningList);
            for (const item of AutomaticWarningListCopy) {
                item.inchargeAreaId = window._RichWay.$map.currentRegionInfo.code;
                item.inchargeType = `3`;
                arrThree.push(item);
            }
            let arr = [];
            if (tpye === 1) {
                arr = arrOne;
            } else if (tpye === 2) {
                arr = arrTwo;
            } else {
                this.$getData.GetnotifiedPersonsSave({
                    list: arrThree
                }).then(() => {
                    this.GetAutomaticWarningTree();
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            }
            // 发送数据请求
            if (tpye === 1 || tpye === 2) {
                this.$getData.GetDangerPersonsSave({
                    list: arr
                }).then(() => {
                    if (tpye === 1) {
                        this.GetDangerAdcddAnadTree();
                        this.GetDangerPersonList();
                    } else if (tpye === 2) {
                        this.GetFloodPreventionTree();
                        this.floodPreventionClick(this.floodPreventionItem);
                    }
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            }
        },
        checkInfoComplete(data) {
            let complete = false;
            const message = [];
            for (const item of data) {
                complete = false;
                let oType = `1`;
                for (const item1 of item.chargeList || []) {
                    if (item1.inchargeName || item1.inchargeMobile) {
                        if ((!item1.inchargeName || !item1.inchargeMobile) || item1.inchargeName === `` || item1.inchargeMobile === ``) {
                            oType = `1`;
                            complete = true;
                            break;
                        }
                        if (item1.inchargePosition && typeof item1.inchargePosition !== `string` && item1.inchargePosition.length === 0) {
                            oType = `2`;
                            complete = true;
                            break;
                        }
                    } else if (item1.inchargePosition && typeof item1.inchargePosition !== `string` && item1.inchargePosition.length > 0) {
                        oType = `1`;
                        complete = true;
                        break;
                    }
                }

                if (complete) {
                    if (oType === `1`) {
                        message.push(`${item.areaNm}人员信息不完整！`);
                    } else {
                        message.push(`${item.areaNm}存在未选择人员职位，请选择职位！`);
                    }
                }
            }
            return message;
        },
        //  危险区责任人-点击左侧，显示右边详情
        click(info) {
            this.isHasChange = false;
            this.adcdInfoItem = info;
            this.GetDangerPersonList();
        },
        //  防汛责任人-点击左侧，显示右边详情
        floodPreventionClick(info) {
            this.isHasChange = false;
            this.floodPreventionItem = info;
            const adcdInfo = info.adcd;
            this.$getData.GetDangerPersonList({ adcd: adcdInfo, number: `2` }).then(res => {
                this.floodPreventionList = res.data;
                for (const item of this.floodPreventionList) {
                    if (item.chargeList === ``) {
                        item.chargeList = [{}];
                    } else {
                        for (const item1 of item.chargeList) {
                            item1.inchargePosition = item1.inchargePosition.split(`,`);
                        }
                    }
                }
                // console.log(2223335656, this.floodPreventionList);
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求-危险责任区-左测信息
        GetDangerAdcddAnadTree() {
            const adcd = window._RichWay.$map.currentRegionInfo.code.substr(0, 6) || `511823`;
            this.$getData.GetDangerAdcddAnadTree({ adcd }).then(res => {
                this.adcdInfo = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求-防汛责任区-左测信息
        GetFloodPreventionTree() {
            const adcd = window._RichWay.$map.currentRegionInfo.code.substr(0, 6) || `511823`;
            this.$getData.GetFloodPreventionTree({ adcd }).then(res => {
                this.floodPreventionInfo = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求-危险责任区-点击左测菜单栏，显示右边的信息
        GetDangerPersonList() {
            this.$getData.GetDangerPersonList({ adcd: this.adcdInfoItem.adcd, number: `1` }).then(res => {
                this.personList = res.data;
                for (const item of this.personList) {
                    if (item.chargeList === ``) {
                        item.chargeList = [{ inchargePosition: [] }];
                    } else {
                        for (const item1 of item.chargeList) {
                            item1.inchargePosition = item1.inchargePosition.split(`,`);
                        }
                    }
                }
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 自动预警列表的数据请求
        GetAutomaticWarningTree() {
            const adcd = window._RichWay.$map.currentRegionInfo.code || `511823000000000`;
            this.$getData.GetAutomaticWarningTree({ adcd, number: `3` }).then(res => {
                this.AutomaticWarningList = res.data[0].chargeList;
                if (this.AutomaticWarningList.length === 0) {
                    this.AutomaticWarningList = [{
                        inchargeName: ``,
                        inchargeMobile: ``,
                        inchargePosition: ``
                    }];
                }
                // console.log(11112363625,this.AutomaticWarningList[0].chargeList);
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击导出
        handleExport() {
            const adcd = window._RichWay.$map.currentRegionInfo.code.substr(0, 6) || `511823`;
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/shzh/warning/personIncharge/explorpersonincharge&adcd=${adcd || ``}`);
        },
        // 点击导入
        handleImport() {
            this.dialogUploadVisible = true;
        },
        // 导入用户成功，发送上传文件的请求
        handleImportSuccess(info) {
            this.$getData.ImportImpperson(info).then(() => {
                this.dialogUploadVisible = false;
                this.GetDangerAdcddAnadTree();
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击tab切换页面的事件
        handleClick() {
            this.isHasChange = false;
        }
    }

};
</script>

<style lang="scss">
    .content-personLiableMaintenance{
      position: relative;
    //   background-color: #fff;

    .leftTop{
        position: absolute;
    top: 0;
    padding: .5rem;
    z-index: 11;
    background-color: #fff;
    }
        .leftBottom {
            height: 100%;
            // height: 500px;
            overflow-y:auto;
        }
        .right {
            padding: 1rem;
            background: #fff;
            .rightTop {
                height: 55px;
                line-height: 55px;
                padding: 5px;
                font-size: 18px;
                box-shadow: 1px 1px 1px rgba(0,0,0,.2);
                margin-bottom: 10px;
                .rightTopTitle {
                    float: left;
                }
                .rightTopBtn {
                    float: right
                }
            }
            .rightBottom {
                // height: 500px;
                // overflow-y: auto;
                padding: .5rem 0;
                border-bottom: 1px solid #ccc;
                &:last-child{
                    border-bottom: none;
                }
                .rightBottomInput {
                    height: 50px;
                    line-height: 45px;
                }
                .rightBottomBtn {
                    // width: 100%;
                        position: absolute;
                        bottom: .3rem;
                        right: 0;

                }
                .el-table_1_column_1   {
                    .cell {
                        padding: 0 !important;
                    }
                }

            }
        }
            .el-tabs{
                display: flex;
                flex-direction: column;
                height: 100%;
                .el-tabs__content,.tab{
                    height: 100%;
                }
            }
            .content-left{
                position: relative;
                overflow: hidden !important;
            }
            .content-right{
                overflow-y: auto;
            }
            .el-tab-pane{
                height: 100%
            }

    }
</style>
