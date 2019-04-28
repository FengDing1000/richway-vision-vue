<template>
    <div class="content content-threshold-setting">
        <el-container>
            <el-aside
                class="richway-shadow"
            >
                <div class="list-title-danger">
                    危险区列表
                </div>
                <el-menu
                    ref="menu"
                    class="el-menu-vertical-demo"
                    style="overflow-x: hidden;"
                >
                    <template v-if="dangerList.length>0">
                        <el-submenu
                            v-for="(item,index) in dangerList"
                            :key="index"
                            :index="index+1+''">
                            <span slot="title">{{ item.name }}</span>
                            <el-menu-item-group
                                v-for="(o,i) in item.children"
                                :key="i">
                                <el-menu-item
                                    :index="index+1+'-'+(i+1)"
                                    @click="clickItem(o,item)"
                                >{{ o.name }}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                    <el-menu-item
                        v-for="(item,index) in singleSelect"
                        v-else
                        :key="index"
                        :index="'singleSelect'+index"
                        @click="clickItem(item,{})"
                    >
                        {{ item.name }}
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <div class="right-main-list">
                    <div
                        v-if="breadcrumb.length!==0"
                        class="list-title-danger">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item
                                v-for="(item,index) in breadcrumb"
                                :key="index">{{ item }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <el-tabs
                        v-model="activeName2"
                        @tab-click="handleClick">
                        <el-tab-pane
                            label="危险区雨量站"
                            name="first">
                            <TableRain
                                ref="TableRain"
                                :adcd="adcdObjs"
                            />
                        </el-tab-pane>
                        <el-tab-pane
                            label="危险区水位站"
                            name="second">
                            <TableWater
                                ref="TableWater"
                                :adcd="adcdObjs"
                            />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-container>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
    const TableRain = r => require.ensure([], () => r(require(`./rain/TableRain`)), `components/pagesWaterRain/thresholdSetting`);
    const TableWater = r => require.ensure([], () => r(require(`./water/TableWater`)), `components/pagesWaterRain/thresholdSetting`);

    export default {
        components: {
            TableRain,
            TableWater
        },
        data() {
            return {
                isCollapse: true,
                dangerList: [],
                singleSelect: [],
                activeName2: `first`,
                breadcrumb: [],
                adcdObjs: []
            };
        },
        computed: {},
        mounted() {
            this.$getData.DangerTree({
                adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6)
            }).then(res => {
                let childArr = [];
                const arr = [];
                res.data.forEach(item => {
                    if (item.isParent) {
                        item.children = childArr;
                        arr.push(item);
                        childArr = [];
                    } else {
                        childArr.push(item);
                    }
                });
                if (childArr.length > 0 && arr.length === 0) {
                    this.singleSelect = childArr;
                }
                this.dangerList = arr;
            });
        },
        methods: {
            handleClick() {
                if (this.breadcrumb.length === 0) {
                    this.$notify({
                        title: `警告`,
                        message: `请先选择危险区`,
                        type: `warning`
                    });
                }
            },
            clickItem(child, parent) {
                const arr = [];
                if (parent.name) {
                    arr.push(parent.name);
                    arr.push(child.name);
                } else {
                    arr.push(child.name);
                }
                const objs = [parent, child];
                this.adcdObjs = objs;
                this.breadcrumb = arr;
                this.$refs.TableRain.query({dandId: child.id});
                this.$refs.TableWater.query({dandId: child.id});
            }
        }

    };
</script>

<style lang="scss" scoped>
    .content-threshold-setting {
        position: relative;

        .el-container {
            height: 100%;

            .el-container {
                display: flex;

                .right-main-list {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    padding: 0 20px 20px;

                    .el-breadcrumb {
                        display: flex;
                        align-items: center;
                        height: 50px;
                    }
                }
            }

            .el-aside {
                display: flex;
                flex-direction: column;
                width: 200px !important;
                margin-right: 20px;
                background-color: #fff;

                .list-title-danger {
                    height: 50px;
                    padding-left: 20px;
                    border-bottom: 1px dashed #ccc;
                    font-weight: 600;
                    font-size: .8rem;
                    line-height: 50px;
                }

                .el-menu-vertical-demo:not(.el-menu--collapse) {
                    width: 100%;
                    overflow-y: scroll;
                }
            }
        }
    }
</style>
