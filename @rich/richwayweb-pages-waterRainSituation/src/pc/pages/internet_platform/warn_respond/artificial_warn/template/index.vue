<template>
    <div class="content content-artificial-warn">
        <div class="richway-shadow warn_respond">
            <el-form
                ref="ruleForm"
                :rules="rules"
                :model="formData"
                label-width="6rem">
                <el-form-item
                    label="预警名称"
                    prop="warnnm">
                    <el-input
                        v-model="formData.warnnm"
                        maxlength="50"
                        placeholder="请输入预警名称"
                    />
                </el-form-item>
                <el-form-item
                    label="预警说明"
                    prop="warndesc">
                    <el-input
                        v-model="formData.warndesc"
                        :rows="4"
                        maxlength="200"
                        type="textarea"
                        placeholder="请输入预警说明"
                    />
                </el-form-item>
                <el-form-item
                    label="预警行政区划"
                    prop="adcd">
                    <el-select
                        v-model="formData.adcd"
                        class="right-item-width"
                        placeholder="请选择预警行政区划"
                    >
                        <el-option
                            v-for="item in adcdArr"
                            :key="item.adcd"
                            :label="item.adnm"
                            :value="item.adcd"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="预警类型"
                    prop="warntypeid">
                    <el-select
                        v-model="formData.warntypeid"
                        class="right-item-width"
                        placeholder="请选择预警类型"
                    >
                        <el-option
                            v-for="item in warntypeidArr"
                            :key="item.warnTypeId"
                            :label="item.warnTypeNm"
                            :value="item.warnTypeId"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="预警等级"
                    prop="warngradeid">
                    <el-select
                        v-model="formData.warngradeid"
                        class="right-item-width"
                        placeholder="请选择预警等级"
                    >
                        <el-option
                            v-for="item in warngradeArr"
                            :key="item.warnGradeId"
                            :label="item.warnGradeNm"
                            :value="item.warnGradeId"/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="启动时间"
                    prop="warnstm">
                    <el-date-picker
                        v-model="formData.warnstm"
                        :clearable="false"
                        :editable="false"
                        class="right-item-width"
                        type="datetime"
                        format="yyyy-MM-dd hh:mm"
                        value-format="yyyy-MM-dd hh:mm"
                        placeholder="选择启动时间"/>
                </el-form-item>
                <el-form-item label="事件备注">
                    <el-input
                        v-model="formData.remark"
                        :rows="4"
                        maxlength="200"
                        type="textarea"
                        placeholder="请输事件备注"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submitForm('ruleForm')">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import _moment from 'moment';

    export default {
        components: {},
        props: {
            path: {
                type: String,
                default: ``
            }
        },
        data() {
            return {
                formData: {
                    warnnm: ``,
                    warndesc: ``,
                    adcd: ``,
                    warntypeid: ``,
                    warngradeid: ``,
                    warnstm: _moment().format(`YYYY-MM-DD hh:mm`),
                    remark: ``,
                    dandList: ``
                },
                adcdArr: [],
                warntypeidArr: [],
                warngradeArr: [],
                rules: {
                    warnnm: [
                        {required: true, message: ` 请输入预警名称`, trigger: `blur`},
                        {max: 100, message: `不超过100个字符`, trigger: `blur`}
                    ],
                    warndesc: [
                        {required: true, message: ` 请输入预警说明`, trigger: `blur`}
                    ],
                    adcd: [
                        {required: true, message: `请选择预警行政区划`, trigger: `blur`}
                    ],
                    warntypeid: [
                        {required: true, message: `请选择预警类型`, trigger: `blur`}
                    ],
                    warngradeid: [
                        {required: true, message: `请选择预警等级`, trigger: `blur`}
                    ],
                    warnstm: [
                        {required: true, message: `选择启动时间`, trigger: `blur`}
                    ]
                }
            };
        },
        computed: {},
        mounted() {
            this._log(`323`, window._RichWay.$map.currentRegionInfo);
            this.$getData.GetAdcdCity({
                // adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                flag: `parent`
            }).then(res => {
                if (res.data.length > 0) {
                    const obj = res.data[0];
                    obj.adcd = `000000`;
                    res.data.splice(0, 1, obj);
                    this.adcdArr = res.data;
                }
            });
            this.$getData.GetWarnGrades().then(res => {
                this.warngradeArr = res.data;
            });
            this.$getData.GetWarnTypes().then(res => {
                this.warntypeidArr = res.data;
            });
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$confirm(`您确认要保存吗?`, `提示`, {
                            confirmButtonText: `确定`,
                            cancelButtonText: `取消`,
                            type: `warning`
                        }).then(() => {
                            this.upload();
                        });
                    } else {
                        return false;
                    }
                });
            },
            upload() {
                this.$getData.GetWarnRecords(this.formData).then(() => {
                    this.$refs.ruleForm.resetFields();
                    this.formData.remark = ``;
                    this.$router.push({
                        path: this.path || `/internet_platform/warn_respond/history_warn`
                    });
                }).catch(() => {
                    this.$message.error(`录入出错`);
                });
            }
        }

    };
</script>

<style lang="scss" scoped>
    .content-artificial-warn {
        position: relative;
    }

    .right-item-width {
        width: 100% !important;
    }

    .warn_respond {
        padding: 12px 24px;
        background-color: #fff;
    }

    .el-form {
        width: 35rem;
    }
</style>
