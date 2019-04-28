<template>
    <div class="content content-accumulative-rainfall">
        <DataTableStandard
            :config="userListDataTable"
            @on-query="handleQuery"
            @on-query-change="handleQueryChange"/>
        <el-dialog
            :modal-append-to-body="false"
            :visible.sync="dialogFormVisible"
            title="图表-柱状图">
            <ChartSiteRainOne
                :title="barInfo.title"
                :x-axis-data="barInfo.xAxisData"
                :series-name="barInfo.seriesName"
                :series-data="barInfo.seriesData"/>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import RichWayWebComponents from '@rich/richwayweb-components';
    import ChartComponents from '@rich/richwayweb-chart';
    const moment = require('moment');
    import dateSpaceUtil from "../../../../../../../common/dateSpaceUtil";

    const {DataTableStandard} = RichWayWebComponents;
    const {ChartSiteRainOne} = ChartComponents;

    export default {
        components: {
            DataTableStandard, ChartSiteRainOne
        },
        data() {
            return {
                dialogFormVisible: false,
                barInfo: {
                    title: ``,
                    xAxisData: [],
                    seriesName: ``,
                    seriesData: []
                },
                userListDataTable: {
                    query: {
                        hiddenInfo: {
                            isZero: `H`
                        },
                        fieldList: [
                            [
                                {
                                    key: `stnm`,
                                    label: `测&ensp;&ensp;&ensp;&ensp;站`,
                                    value: ``,
                                    type: `input`
                                },
                                {
                                    key: `tph`,
                                    label: `时间间隔`,
                                    value: `1`,
                                    type: `select`,
                                    options: [{
                                        label: `1小时`,
                                        value: `1`
                                    }, {
                                        label: `3小时`,
                                        value: `3`
                                    }, {
                                        label: `6小时`,
                                        value: `6`
                                    }, {
                                        label: `12小时`,
                                        value: `12`
                                    }, {
                                        label: `24小时`,
                                        value: `24`
                                    }, {
                                        label: `日`,
                                        value: `d`
                                    }, {
                                        label: `旬`,
                                        value: `x`
                                    }, {
                                        label: `月`,
                                        value: `m`
                                    }]
                                },
                                {
                                    key: `dateRange`,
                                    label: `时间范围`,
                                    value: dateSpaceUtil.dateMonitor(),
                                    type: `date`,
                                    pickerType: `datetimerange`,
                                    format: `yyyy-MM-dd HH`,
                                    valueFormat: `yyyy-MM-dd HH`,
                                    fieldKeys: [`stm`, `etm`]
                                }
                            ]
                        ]
                    },
                    table: {
                        fieldList: []
                    },
                    getDataFun: `QueryRainMonitor`
                }
            };
        },
        mounted() {
            this._log(`user_manage has mounted`, dateSpaceUtil.dateMonitor());
        },
        methods: {
            handleQuery({dataList, queryInfo}) {
                const [row] = dataList;
                const tableColumns = [];
                this._log(`sss`, queryInfo);
                tableColumns.push({
                    key: `STCD`,
                    label: `测站编码`,
                    fixed: `left`
                });
                tableColumns.push({
                    key: `STNM`,
                    label: `测站名称`,
                    fixed: `left`
                });
                // 用来存储列表的横坐标
                const chartArr = [];
                for (const key in row) {
                    if (Object.hasOwnProperty.call(row, key)) {
                        if (key.indexOf(`DRP`) === 0) {
                            // 处理不同时间段的展示
                            let label;
                            const sub = Number(key.substr(-1));
                            const arr = [`上旬`, `中旬`, `下旬`];
                            if (queryInfo.tph === `d`) {
                                const start = moment(queryInfo.dateRange[0]).add(sub, `day`).format(`YYYY-MM-DD`);
                                label = start;
                            } else if (queryInfo.tph === `m`) {
                                const start = moment(queryInfo.dateRange[0]).add(sub, `month`).format(`YYYY-MM`);
                                label = start;
                            } else if (queryInfo.tph === `x`) {
                                const start = moment(queryInfo.dateRange[0]).date();
                                let startNum;
                                // 判断初始日期是什么旬
                                if (start <= 10 && start > 0) {
                                    startNum = 1;
                                } else if (start >= 10 && start < 21) {
                                    startNum = 2;
                                } else {
                                    startNum = 3;
                                }
                                const indexArr = (startNum + sub - 1) % 3;
                                // 小于或等于3直接取0
                                const addParams = (startNum + sub) / 3.2;
                                const addNum = Math.floor(addParams);
                                label = `${moment(queryInfo.dateRange[0]).add(addNum, `month`).format(`YYYY-MM`)} ${arr[indexArr]}`;
                            } else {
                                const endNum = sub + Number(queryInfo.tph);
                                const start = moment(queryInfo.dateRange[0]).add(sub, `hour`).minute(0).format(`HH:mm`);
                                const end = moment(queryInfo.dateRange[0]).add(endNum, `hour`).minute(0).format(`HH:mm`);
                                label = `${start}-${end}`;
                            }
                            chartArr.push(label);
                            // 在这里直接赋值X坐标
                            this.barInfo.xAxisData = chartArr;
                            tableColumns.push({
                                key,
                                label
                            });
                        }
                    }
                }
                tableColumns.push({
                    key: `AVG`,
                    label: `平均`
                });
                tableColumns.push({
                    key: `COUNTDRP`,
                    label: `累计`
                });
                tableColumns.push({
                    label: `操作`,
                    width: `80`,
                    fixed: `right`,
                    render: {
                        type: `btn`,
                        list: [
                            {
                                label: `图表`,
                                btnType: `primary`,
                                icon: `icon-bar`,
                                handleClick: this.handleChart
                            }
                        ]
                    }
                });
                this.$set(this.userListDataTable.table, `fieldList`, tableColumns);
            },
            handleQueryChange(info) {
                if (info.field.key === `tph`) {
                    let obj;
                    if (info.queryInfo.tph === `d` || info.queryInfo.tph === `x`) {
                        obj = {
                            key: `dateRange`,
                            label: `时间范围`,
                            value: dateSpaceUtil.dateMonitor(info.queryInfo.tph),
                            type: `date`,
                            pickerType: `datetimerange`,
                            format: `yyyy-MM-dd`,
                            valueFormat: `yyyy-MM-dd`,
                            fieldKeys: [`stm`, `etm`]
                        };
                    } else if (info.queryInfo.tph === `m`) {
                        obj = {
                            key: `dateRange`,
                            label: `时间范围`,
                            value: dateSpaceUtil.dateMonitor(info.queryInfo.tph),
                            type: `date`,
                            pickerType: `datetimerange`,
                            format: `yyyy-MM`,
                            valueFormat: `yyyy-MM`,
                            fieldKeys: [`stm`, `etm`]
                        };
                    } else {
                        obj = {
                            key: `dateRange`,
                            label: `时间范围`,
                            value: dateSpaceUtil.dateMonitor(info.queryInfo.tph),
                            type: `date`,
                            pickerType: `datetimerange`,
                            format: `yyyy-MM-dd HH`,
                            valueFormat: `yyyy-MM-dd HH`,
                            fieldKeys: [`stm`, `etm`]
                        };
                    }
                    this.$set(this.userListDataTable.query.fieldList[0], 2, obj);
                }
            },
            handleChart(index, row) {
                this.updateBarInfo(row);
                this.dialogFormVisible = true;
            },
            updateBarInfo(row) {
                const seriesData = [];
                for (const key in row) {
                    if (Object.hasOwnProperty.call(row, key)) {
                        if (key.indexOf(`DRP`) === 0) {
                            // xAxisData.push(key);
                            seriesData[parseInt(key.replace(`DRP`, ``), 10)] = row[key];
                        }
                    }
                }

                this.barInfo.title = `${row.STNM}`;
                // this.barInfo.xAxisData = xAxisData;
                this.barInfo.seriesName = row.STNM;
                this.barInfo.seriesData = seriesData;
            }
        }


    };
</script>

<style lang="scss" scoped>
    .content-accumulative-rainfall {
        position: relative;
    }

    .el-row {
        .el-col {
            .el-button {
                margin-left: 20px;
            }
        }
    }
</style>
