<template>
    <div class="add_page_container">
        <!--<div class="add_page_aside">-->
            <!--<div class="add_page_select">-->
                <!--<div class="add_page_select_right">-->
                    <!--<div class="add_page_flex_row">-->
                        <!--<span style="width: 2.5rem">政区：</span>-->
                        <!--<el-select-->
                            <!--v-model="form.adcd"-->
                            <!--placeholder="请选择">-->
                            <!--<el-option-->
                                <!--v-for="item in adcdArr"-->
                                <!--:key="item.adcd"-->
                                <!--:label="item.adnm"-->
                                <!--:value="item.adcd"/>-->
                        <!--</el-select>-->
                    <!--</div>-->
                    <!--<div class="add_page_flex_row">-->
                        <!--<span style="width: 2.5rem">站类：</span>-->
                        <!--<el-checkbox-group-->
                            <!--v-model="form.stationType">-->
                            <!--<el-checkbox label="气象"/>-->
                            <!--<el-checkbox label="山洪"/>-->
                            <!--<el-checkbox label="水文"/>-->
                        <!--</el-checkbox-group>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<el-button @click="query">查询-->
                <!--</el-button>-->
            <!--</div>-->
            <!--<div class="add_page_query_list">-->
                <!--<div-->
                    <!--v-for="(item,index) in rainStationList"-->
                    <!--:key="item.stcd"-->
                    <!--:style="{backgroundColor:item.check?'#ddd':'#fff',borderColor:item.check?'#fff':'#ddd'}"-->
                    <!--@click="selectArea(item,index)">-->
                    <!--<span>{{ item.stnm }}</span>-->
                    <!--<span>{{ rainType(item.stcdtype) }}</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="add_page_main">-->
            <!--<table>-->
                <!--<tr-->
                    <!--bgcolor="#f7f7f7"-->
                    <!--class="tr_title_text_color">-->
                    <!--<th>准备转移</th>-->
                    <!--<th-->
                        <!--v-for="(item) in prepare"-->
                        <!--:key="item.stdt">{{ item.label }}-->
                    <!--</th>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<th>添加设置</th>-->
                    <!--<th-->
                        <!--v-for="(item) in prepare"-->
                        <!--:key="item.stdt">-->
                        <!--<input-->
                            <!--v-model="item.stthreshold"-->
                            <!--type="number">-->
                    <!--</th>-->
                <!--</tr>-->
            <!--</table>-->
            <!--<table>-->
                <!--<tr-->
                    <!--bgcolor="#f7f7f7"-->
                    <!--class="tr_title_text_color">-->
                    <!--<th>立即转移</th>-->
                    <!--<th-->
                        <!--v-for="(item) in immediately"-->
                        <!--:key="item.stdt">{{ item.label }}-->
                    <!--</th>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<th>添加设置</th>-->
                    <!--<th-->
                        <!--v-for="(item) in immediately"-->
                        <!--:key="item.stdt">-->
                        <!--<input-->
                            <!--v-model="item.stthreshold"-->
                            <!--type="number">-->
                    <!--</th>-->
                <!--</tr>-->
            <!--</table>-->
        <!--</div>-->
    </div>
</template>
<script>
    export default {
        name: `add-page`,
        props: {
            areaid: {
                type: String,
                default: ``
            },
            timeRanger: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                form: {
                    adcd: ``,
                    stationType: [`气象`, `山洪`, `水文`]
                },
                adcdArr: [],
                selectObj: [],
                rainStationList: [],
                prepare: [],
                immediately: []
            };
        },
        watch: {
            timeRanger: {
                immediate: true,
                deep: true,
                handler() {
                    this.initParams();
                }
            }
        },
        mounted() {
            this.$getData.GetAdcdCity({
                // adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                flag: `parent`
            }).then(res => {
                this.adcdArr = res.data;
            });
            const types = this.getType();
            this.$getData.GetAllStations({
                adcd: this.form.adcd,
                sttp: `PP,RQ,ZQ`,
                types: types.join()
            }).then(res => {
                this.rainStationList = res.data;
            });
            // 初始化参数
            // this.initParams();
        },
        methods: {
            initParams() {
                this.prepare = this.timeRanger.map(item => ({
                    label: item.label,
                    stdt: Number(item.key.slice(12)),
                    stthreshold: ``
                }));
                this.immediately = this.timeRanger.map(item => ({
                    label: item.label,
                    stdt: Number(item.key.slice(12)),
                    stthreshold: ``
                }));
            },
            openDialog() {
                this.dialogVisible = true;
            },
            selectArea(item, index) {
                const arr = this.selectObj;
                let isHad = false;
                arr.forEach((obj, index) => {
                    if (obj.stcd === item.stcd) {
                        arr.splice(index, 1);
                        isHad = true;
                    }
                });
                if (!isHad) {
                    arr.push(item);
                }
                item.check = !item.check;
                this.$set(this.rainStationList, index, item);
                this.selectObj = arr;
                this.$emit(`headCallBack`, arr);
            },
            rainType(type) {
                if (String(type) === `3`) {
                    return `气象`;
                }
                if (String(type) === `2`) {
                    return `山洪`;
                }
                if (String(type) === `1`) {
                    return `水文`;
                }
                return `--`;
            },
            getType() {
                const arr = this.form.stationType.map(item => {
                    if (item === `气象`) {
                        return 3;
                    }
                    if (item === `山洪`) {
                        return 2;
                    }
                    return 1;
                });
                return arr;
            },
            query() {
                const types = this.getType();
                if (this.form.adcd === ``) {
                    this.$getData.GetAllStations({
                        adcd: this.form.adcd,
                        sttp: `PP,RQ,ZQ`,
                        types: types.join()
                    }).then(res => {
                        this.rainStationList = res.data;
                    });
                } else {
                    this.$getData.GetStationAdcd({
                        adcd: this.form.adcd,
                        sttp: `PP,RQ,ZQ`,
                        types: types.join()
                    }).then(res => {
                        this.rainStationList = res.data;
                    });
                }
            },
            upLoad() {
                const arr = [];
                if (this.selectObj.length === 0) {
                    this.$message({message: `请选择测站`, type: `warning`});
                    return;
                }
                const stcdArr = this.selectObj.map(item => item.stcd);
                const stcdStr = stcdArr.join();
                this.prepare.forEach(item => {
                    arr.push({
                        app_id: `96c79dd7f08f46e3a1f5458809a330b6`,
                        areaid: this.areaid,
                        areatype: 1,
                        stcd: stcdStr,
                        stdt: item.stdt,
                        stindex: `R`,
                        stindexunit: `mm`,
                        stthreshold: item.stthreshold,
                        warngradeid: 6,
                        warntypeid: 9
                    });
                });
                this.immediately.forEach(item => {
                    arr.push({
                        app_id: `96c79dd7f08f46e3a1f5458809a330b6`,
                        areaid: this.areaid,
                        areatype: 1,
                        stcd: stcdStr,
                        stdt: item.stdt,
                        stindex: `R`,
                        stindexunit: `mm`,
                        stthreshold: item.stthreshold,
                        warngradeid: 7,
                        warntypeid: 9
                    });
                });
                const _this = this.$getData;
                return new Promise((resolve, reject) => {
                    _this.ChangeDangerArea({list: arr}).then(res => {
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    });
                });
            },
            callback() {
                return this.prepare;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .add_page_container {
        display: flex;
        flex: 1;
        flex-direction: row;
        height: 25rem;

        .add_page_aside {
            display: flex;
            flex-direction: column;
            width: 20rem;
            margin-right: .75rem;

            .add_page_select {
                display: flex;
                align-items: center;
                height: 5rem;
                padding: .5rem;
                margin-bottom: 1rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                overflow-x: hidden;

                .add_page_select_right {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    margin-right: .5rem;
                }

                .el-button {
                    border-width: 0;
                    color: #fff;
                    background-color: #5fb760;
                }
            }

            .add_page_query_list {
                flex: 1;
                border: 1px solid #ddd;
                border-radius: 5px;
                overflow-y: scroll;

                div {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    height: 2rem;
                    padding: 0 .5rem;
                    border-bottom: 1px solid #ddd;
                }
            }
        }

        .add_page_main {
            width: 100%;
            padding: .5rem;
            border: 1px solid #ddd;
            border-radius: 3px;
            overflow-x: scroll !important;

            table {
                border-collapse: collapse;
                width: 100%;
                margin-top: 1rem;
                border: 1px solid #ddd;

                tr {
                    th {
                        min-width: 4rem;
                        height: 2.25rem;
                        border: 1px solid #ddd;
                        line-height: 2.25rem;

                        input {
                            width: 3rem;
                            height: 1.5rem;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            line-height: 1.9rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }

    .add_page_flex_row {
        display: flex;
        flex-direction: row;
        align-items: center;

        .el-checkbox-group {
            display: flex;
            justify-content: space-between
        }
    }

    .tr_title_text_color {
        th {
            color: #0d47a1;
        }
    }
</style>
