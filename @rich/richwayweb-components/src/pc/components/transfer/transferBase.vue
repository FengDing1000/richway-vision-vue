<template>
    <div class="transfer-base-panel" v-loading="loading">
        <div class="search-panel">
            <el-form ref="form" :model="searchInfo" label-width="3rem" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-form-item label="关键字">
                            <el-input v-model="searchInfo.keywords"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" class="richway-push-right">
                        <el-button type="primary" round @click="handleSearch">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="transfer-panel">
            <el-transfer
                @change="handleChange"
                filterable
                :props="defaultProps"
                :filter-method="filterMethod"
                :filter-placeholder="filterPlaceholder"
                v-model="rightData"
                :titles="titles"
                :data="leftData">
            </el-transfer>
        </div>
        <div class="btn-panel">
            <el-button round @click="handleCancel">取消</el-button>
            <el-button type="primary" round @click="handleSure">确定</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: `TransferBasePanel`,
        components: {},
        props: {
            config: {
                type: Object,
                default: () => ({})
            },
            detailInfo: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                loading: false,
                filterMethod(query, item) {
                    return item.roleName.indexOf(query) > -1;
                },
                leftData: [],
                rightData: []
            };
        },
        computed: {
            searchInfo() {
                const info = {};
                for (const item of this.config.search.fieldList) {
                    info[item.key] = item.value;
                }
                return info;
            },
            defaultProps() {
                return this.config.defaultProps || {key: `roleCode`, label: `roleName`};
            },
            titles() {
                return this.config.titles || [`待选数据`, `已选数据`];
            },
            filterPlaceholder() {
                return this.config.filterPlaceholder || ``
            }
        },
        watch: {
            detailInfo: {
                deep:true,
                immediate: true,
                handler() {
                    if (this.$getData) {
                        this.getLeftData();
                        this.getRightData();
                    }
                }
            }
        },
        mounted() {
            this.getLeftData();
            this.getRightData();
        },
        methods: {
            // 查询
            handleSearch() {
                this.getLeftData();
            },
            // 取消
            handleCancel() {
                this.$emit(`on-close`);
            },
            // 确定
            handleSure() {
                this.$emit(`on-choose`, this.rightData);
            },
            // 获取右侧列表数据
            getLeftData() {
                this.loading = true;
                this.$getData[this.config.getLeftDataFun](this.searchInfo).then((res = {}) => {
                    this.leftData = res.data || [];
                }).always(() => {
                    this.loading = false;
                });
            },
            // 获取左侧列表数据
            getRightData() {
                this.$getData[this.config.getRightDataFun](this.detailInfo).then((res = {}) => {
                    this.rightData = [];
                    for (const item of (res.data || [])) {
                        this.rightData.push(item[this.defaultProps.key]);
                    }
                });
            },
            handleChange(value, direction, movedKeys) {
                this._log(11111111, value, direction, movedKeys);
            }
        }
    };
</script>

<style lang="scss">
    .transfer-base-panel {
        .search-panel, .transfer-panel{
            margin-bottom: 1rem;
            border: 1px solid #e9e9e9;
            padding: .5rem;
        }
        .search-panel{
            .el-form-item{
                margin-bottom: 0;
            }
        }
        .btn-panel{
            text-align: right;
        }
    }
</style>
