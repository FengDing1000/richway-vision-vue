<template>
	<div class="content content-editShortMessage">
		<ContentLeftRight>
			<template slot="left">
				<div
					v-loading="loading"
					class="grid-content bg-purple ESMLeft">
					<div class="contacts">联系人</div>
					<el-tabs
						v-model="activeName"
						type="card"
						@tab-click="handleClick">
						<el-tab-pane
							label="常用联系人"
							name="first">
							<el-tree
								:data="topContacts"
								:props="topContactsProps"
								@node-click="handleNodeClick" />
						</el-tab-pane>
						<el-tab-pane
							label="防汛联系人"
							name="second">
							<el-tree
								:data="floodPrevention"
								:props="floodPreventiontProps"
								@node-click="handleNodeClickeee" />
						</el-tab-pane>
					</el-tabs>
				</div>
			</template>
			<template slot="right">
				<div class="grid-content bg-purple-light EMSRight">
					<div class="messageRouting">信息发送</div>
					<div class="signatureMethod">
						<span>签名方式：</span>
						<el-radio
							v-for="(item,index) of type"
							v-model="radio"
							:label="index"
							:key="item.key">{{ item.value }}
						</el-radio>
					</div>
					<div
						style="text-align:center;">
						<transfer
							:userInfo="userInfo"
							@sendOutRightInfo="sendOutRightInfo" />
					</div>
					<div class="RightTextarea">
						<el-form
							ref="ruleForm"
							:model="ruleForm"
							:rules="rules">
							<el-form-item
								label="请输入内容"
								prop="textare">
								<el-input
									:autosize="{ minRows: 4, maxRows: 4}"
									v-model="ruleForm.textare"
									class="textareIput"
									type="textarea"
									maxlength="200"
									placeholder="请填写内容(注:短信模式将只发送内容区信息)" />
							</el-form-item>
							<el-form-item>
								<div class="richway-right">
									<el-button
										type="primary"
										@click="Reset('ruleForm')">重置
									</el-button>
									<el-button
										type="primary"
										@click="SendOut('ruleForm')">发送
									</el-button>
								</div>
							</el-form-item>
						</el-form>
						<!-- <div class="textareLable">请输入内容</div> -->

					</div>
				</div>
			</template>

		</ContentLeftRight>


	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from "@rich/richwayweb-components";

const transfer = r => require.ensure([], () => r(require(`./transfer.vue`)), `components/pagesDuty/mSMEditShortMessage`);
const { ContentLeftRight } = RichWayWebComponents;

export default {
    components: {
        ContentLeftRight,
        transfer
    },
    data() {
        return {
            activeName: `first`,
            topContacts: [],
            floodPrevention: [],
            topContactsProps: {
                children: `children`,
                label: `deptNm`
            },
            floodPreventiontProps: {
                children: `children`,
                label: `text`
            },
            radio: 0,
            contextType: ``,
            value3: [1],
            type: [],
            ruleForm: {
                textare: ``
            },
            rules: {
                textare: [
                    { required: true, message: `请输入内容`, trigger: `blur` },
                    { min: 0, max: 200, message: `长度在 0 到 200 个字符`, trigger: `blur` }
                ]
            },
            desc: ``,
            deptId: ``,
            selectedContacts: [],
            valueKey: ``,
            userInfo: {},
            adcd: ``,
            chargeType: ``,
            isParent: false,
            loading: true
        };
    },
    computed: {},
    watch: {
        $route() {
            this.changeTextare();
        }
    },
    mounted() {
        this._log(`editShortMessage has mounted`);
        this.GetContactList();
        this.PersonIncharge();
        this.Gettypes();
        this.changeTextare();
    },
    methods: {
        // 发送数据请求-左侧常用联系人列表
        GetContactList() {
            this.$getData.GetContactList().then(res => {
                this.topContacts = res.data;
                this.loading = false;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求-左侧防汛联系人列表
        PersonIncharge() {
            let info = {
                adcd:window._RichWay.$map.currentRegionInfo.code.substr(0, 6)
            }
            this.$getData.PersonIncharge(info).then(res => {
                this.floodPrevention = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击tree的项目
        handleNodeClick(data) {
            this.deptId = data.deptCd;
            this.GetcontactsList();
        },
        handleNodeClickeee(data) {
            this.isParent = data.isParent;
            this.adcd = data.id;
            this.chargeType = data.parentId;
            this.PersonInchargeGroup();
        },
        // 发送数据请求-点击tree，发送请求穿梭框里面的数据
        GetcontactsList() {
            this.$getData.GetcontactsList({ deptId: this.deptId }).then(res => {
                this.userInfo = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求-点击防汛通讯录，发送请求穿梭框里面的数据
        PersonInchargeGroup() {
            const info = {
                adcd: this.isParent ? `null` : this.adcd,
                chargeType: this.isParent ? this.adcd : this.chargeType
            };
            this.$getData.PersonInchargeGroup(info).then(res => {
                this.userInfo = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 发送数据请求-右侧信息发送签名方式
        Gettypes() {
            this.$getData.Gettypes().then(res => {
                this.type = res.data;
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 获取已选中的联系人
        sendOutRightInfo(info) {
            this.selectedContacts = info;
            console.log(125252363625252536, info);
        },
        // 重置
        Reset(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
        // 发送请求-点击确定按钮
        SendOut(ruleForm) {
            if (this.selectedContacts === undefined || this.selectedContacts.length === 0) {
                this.$message({
                    message: `警告哦，请选择发送人`,
                    type: `warning`
                });
                return;
            }
            switch (this.radio) {
            case 0:
                this.contextType = `防汛办`;
                break;
            case 1:
                this.contextType = `防汛预警中心`;
                break;
            case 2:
                this.contextType = `自定义`;
                break;
            default:
                this.contextType = `防汛办`;
            }
            let valueKey = ``;
            for (const item of this.selectedContacts) {
                valueKey += `${item.contactsName}_${item.mobile},`;
            }
            const content = `${this.ruleForm.textare}【${this.contextType}】`;
            this.valueKey = valueKey;
            const info = {
                contextType: this.contextType,
                type: `0`,
                contentTitle: ``,
                mangId: ``,
                mangTp: ``,
                content,
                receiveList: this.valueKey
            };
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    this.$confirm(`您确认要发送吗?`, `提示`, {
                        confirmButtonText: `确定`,
                        cancelButtonText: `取消`,
                        type: `warning`
                    }).then(() => {
                        this.$getData.SendOut(info).then(() => {
                            this.$refs[ruleForm].resetFields();
                        }).catch(err => {
                            this.$emit(`on-failed`, err);
                        });
                    });
                } else {
                    console.log(`error submit!!`);
                    return false;
                }
            });
        },

        // 从其他地方所传过来的textare内容
        changeTextare() {
            this.ruleForm.textare = this.$route.query.warnDesc || ``;
        }


    }
};
</script>

<style lang="scss">
		.content-editShortMessage {
			position: relative;

			.ESMLeft {
				padding: 10px;

				.contacts {
					height: 40px;
					margin-bottom: 10px;
					border-bottom: 1px solid #ebebeb;
					line-height: 40px;
				}

				.el-tree-node__content {
					height: 45px;
				}
			}

			.content-left {
				border: 1px solid #ebebeb;
				background-color: #fff;
			}

			.content-right {
				border: 1px solid #ebebeb;
				background-color: #fff;
			}

			.EMSRight {
				padding: 10px;
				background-color: #fff;

				.messageRouting {
					height: 35px;
					margin-bottom: 10px;
					border-bottom: 1px solid #ebebeb;
					line-height: 35px;
				}

				.signatureMethod { // 签名方式
					height: 40px;
					line-height: 40px;

					span {
						margin-right: 5px;
					}
				}

				.el-transfer-panel {
					width: 40%;
				}

				.RightTextarea {
					padding: 10px;
					margin-top: 20px;
					border-top: 1px solid #ebebeb;

					.textareLable {
						margin-bottom: 10px;
						font-size: 18px;
					}

					.textareIput {
						font-size: 16px;
					}
				}
			}
		}
</style>
