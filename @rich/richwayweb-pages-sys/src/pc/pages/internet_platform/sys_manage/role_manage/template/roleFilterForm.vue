<template>
    <el-form
        ref="roleFilterForm"
        :model="roleForm"
        :rules="roleRules"
        label-position="right"
        status-icon
        label-width="4.25rem"
        class="richway-role-filter">
        <el-form-item
            label="角色编码:"
            prop="roleCode">
            <el-input
                v-model="roleForm.roleCode"
                readonly
                type="type"
                auto-complete="off"
                maxlength="50"
                clearable />
        </el-form-item>
        <el-form-item
            label="角色名称:">
            <el-input
                v-model="roleForm.roleName"
                readonly
                type="type"
                auto-complete="off"
                maxlength="50"
                clearable />
        </el-form-item>
        <el-form-item
            label="行政区划:">
            <CascaderSegion
                :selected-options="selectedOptions"
                :change-on-select="true"
                :region-info="{code: '', name: '' }"
                @on-change="handleChangeSegion"/>
        </el-form-item>
        <el-form-item
            label="测站类型:">
            <el-checkbox-group v-model="sttpIds" class="sttp-list">
                <el-checkbox
                    v-for="(item, index) in stationTypeList"
                    :label="item.code"
                    :key="index">{{ item.name }}
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item
            label-width="0px"
            class="richway-push-right">
            <el-button
                :loading="saveStatus.loading"
                type="primary"
                round
                @click="submitForm('roleFilterForm')">{{ saveStatus.title }}
            </el-button>
            <el-button
                round
                @click="cancelForm()">取消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/ecmascript-6">
    import validateInfo from '@rich/richwayweb-utils/lib/validator';
    import Role from './role';
    import RichWayWebComponents from '@rich/richwayweb-components';
    import stationTypeList from './stationTypeList';

    const { CascaderSegion } = RichWayWebComponents;

    export default {
        name: `RoleFilterForm`,
        components: {
            CascaderSegion
        },
        props: {
            roleInfo: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                roleForm: new Role(),
                roleCode: [
                    { required: true, message: `请输入角色编号`, trigger: `blur` },
                    { validator: validateInfo.code, trigger: `blur` }
                ],
                adCd: ``,
                sttpIds: [],
                stationTypeList,
                saveStatus: {
                    loading: false,
                    title: `保存`
                },
                selectedOptions: []
            };
        },
        watch: {
            roleInfo: {
                deep:true,
                immediate: true,
                handler() {
                    // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                    if (typeof ((this.$refs.roleForm || {}).resetFields) === `function`) {
                        this.$refs.roleForm.resetFields();
                    }

                    this.selectedOptions = [];
                    this.sttpIds = [];
                    this.adCd = ``;

                    this.roleForm = new Role(this.roleInfo);

                    this.getRoleFilter();
                }
            }
        },
        methods: {
            getRoleFilter() {
                if ((this.$getData || {}).GetRoleFilter) {
                    this.$getData.GetRoleFilter(this.roleForm).then(res => {
                        this.adCd = res.data.adcd;
                        this.sttpIds = (res.data.sttp || ``).replace(/[\\)\\(\\']*/g, ``).split(`,`);
                    });
                }
            },
            // 取消
            cancelForm() {
                this.$emit(`on-cancel`);
            },
            // 表单验证
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.saveStatus.loading = true;
                        this.saveStatus.title = `保存中`;
                        this.saveFun();
                    } else {
                        console.log(`error submit!!`);
                        return false;
                    }
                });
            },
            // 保存
            saveFun() {
                this.roleForm.adCd = this.adCd;
                this.roleForm.sttpIds = this.sttpIds;
                this.roleForm.dataRuleType = `ff`;
                this.roleForm.busiValue = ``;

                this.$getData.SetRoleFilter(this.roleForm).then(res => {
                    if (res.success === true) {
                        this.$emit(`on-success`, res);
                    }
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                }).always(() => {
                    this.saveStatus.loading = false;
                    this.saveStatus.title = `保存`;
                });
            },
            // 选择行政区
            handleChangeSegion(value = {}) {
                const adCdList = value.adCdList || [];
                const adCdListLen = adCdList.length;

                this.adCd = adCdList[adCdListLen - 1];
            }
        }
    };
</script>

<style lang="scss" scoped>
    .richway-role-filter {
        .el-select {
            width: 100%;
        }

        .sttp-list{
            display: flex;
            flex-wrap: wrap ;
            .el-checkbox{
                display: inline-block;
                width: 25%;
                margin-right: 0 !important;
            }
        }
    }
</style>
