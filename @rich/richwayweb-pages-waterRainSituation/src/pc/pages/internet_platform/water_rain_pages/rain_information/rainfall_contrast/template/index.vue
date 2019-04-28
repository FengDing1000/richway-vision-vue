<template>
    <div class="content content-area-rainfall">
        <DataTableStandard
            :config="userListDataTable"
            @on-query="handleQuery"
            @on-query-change="handleQueryChange"/>
        <el-dialog
            :modal-append-to-body="false"
            :visible.sync="dialogFormVisible"
            title="图表-柱状图">
            <ChartConstractRainGroup
                :title="barInfo.title"
                :x-axis-data="barInfo.xAxisData"
                :series-data="barInfo.seriesData"/>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import ChartComponents from '@rich/richwayweb-chart';
    import RichWayWebComponents from '@rich/richwayweb-components';
    const moment = require('moment');

    const {DataTableStandard} = RichWayWebComponents;
    const {ChartConstractRainGroup} = ChartComponents;

    export default {
        components: {
            DataTableStandard,
            ChartConstractRainGroup
        },
        data() {
            return {
                dialogFormVisible: false,
                barInfo: {
                    title: ``,
                    xAxisData: [],
                    seriesName: {},
                    seriesData: []
                },
                userListDataTable: {
                    query: {
                        fieldList: [
                            [
                                {
                                    key: `addvcds`,
                                    label: `政区列表`,
                                    value: ``,
                                    type: `select`,
                                    options: []
                                }, {
                                key: `isZero`,
                                label: `时间间隔`,
                                value: `X`,
                                type: `select`,
                                options: [{
                                    label: `旬`,
                                    value: `X`
                                }, {
                                    label: `月`,
                                    value: `M`
                                }, {
                                    label: `年`,
                                    value: `Y`
                                }]
                            }, {
                                key: `stime`,
                                label: `统计月份`,
                                value: moment().format(`YYYY-MM`),
                                type: `date`,
                                pickerType: `month`,
                                format: `yyyy-MM`,
                                valueFormat: `yyyy-MM`
                            }, {
                                key: `compareYear`,
                                label: `比对年份`,
                                value: moment().subtract(1, `years`).format(`YYYY`),
                                type: `date`,
                                pickerType: `year`,
                                format: `yyyy`,
                                valueFormat: `yyyy`
                            }
                            ]
                        ]
                    },
                    table: {
                        fieldList: [{
                            key: `stnm`,
                            label: `雨量站`,
                            fixed: `left`
                        }, {
                            key: `stcd`,
                            label: `站码`,
                            fixed: `left`
                        }]
                    },
                    getDataFun: `QueryRainContrast`
                }
            };
        },
        computed: {},
        mounted() {
            this.$getData.GetAdcdCity({adcd: ``, flag: true}).then(res => {
                const arr = [];
                res.data.forEach(item => {
                    arr.push({
                        label: item.adnm,
                        value: item.adcd
                    });
                });
                this.$set(this.userListDataTable.query.fieldList[0], 0, {
                    key: `addvcds`,
                    label: `政区列表`,
                    value: [],
                    multiple: true,
                    type: `select`,
                    options: arr
                });
            });
        },
        methods: {
            handleQuery({dataList, queryInfo}) {
                console.log(`ewew`, queryInfo);
                const [row] = dataList;
                const tableColumns = [];
                const end = [];
                const start = [];
                for (const key in row) {
                    if (Object.hasOwnProperty.call(row, key)) {
                        if (queryInfo.isZero === `M`) {
                            const addNum = Number(key.substr(-1)) - 1;
                            if (key.indexOf(`etdrp_`) === 0) {
                                end.push({
                                    key,
                                    label: moment(queryInfo.dateRange[0]).add(addNum, `month`).year(queryInfo.compareYear).format(`YYYY-MM`)
                                });
                            } else if (key.indexOf(`stdrp_`) === 0) {
                                start.push({
                                    key,
                                    label: moment(queryInfo.dateRange[0]).add(addNum, `months`).format(`YYYY-MM`)
                                });
                            }
                        } else if (queryInfo.isZero === `X`) {
                            if (key.indexOf(`etdrp_`) === 0) {
                                end.push({
                                    key,
                                    label: moment(queryInfo.stime).year(queryInfo.compareYear).format(`YYYY-MM`)
                                });
                            } else if (key.indexOf(`stdrp_`) === 0) {
                                start.push({
                                    key,
                                    label: moment(queryInfo.stime).format(`YYYY-MM`)
                                });
                            }
                        } else if (key.indexOf(`etdrp_`) === 0) {
                            end.push({
                                key,
                                label: moment(queryInfo.compareYear).format(`YYYY`)
                            });
                        } else if (key.indexOf(`stdrp_`) === 0) {
                            start.push({
                                key,
                                label: moment(queryInfo.stime).format(`YYYY`)
                            });
                        }
                    }
                }
                // 讲二级菜单名赋值给图表数据里
                const chartData = [];
                if (queryInfo.isZero === `M`) {
                    start.forEach((item, index) => {
                        chartData.push(moment(queryInfo.dateRange[0]).add(index, `months`).format(`MM 月`));
                        tableColumns.push({
                            label: moment(queryInfo.dateRange[0]).add(index, `months`).format(`MM 月`),
                            list: [item, end[index]]
                        });
                    });
                } else if (queryInfo.isZero === `Y`) {
                    const xDays = [`第一季度`, `第二季度`, `第三季度`, `第四季度`, `全年累计`];
                    xDays.forEach((item, index) => {
                        chartData.push(item);
                        tableColumns.push({
                            label: item,
                            list: [start[index], end[index]]
                        });
                    });
                } else {
                    const xDays = [`上旬`, `中旬`, `下旬`];
                    xDays.forEach((item, index) => {
                        chartData.push(item);
                        tableColumns.push({
                            label: item,
                            list: [start[index], end[index]]
                        });
                    });
                }

                // 赋值图表的横坐标
                this.barInfo.seriesName = {start, end};
                this.barInfo.xAxisData = chartData;

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
                if (info.field.key === `isZero`) {
                    let obj;
                    if (info.queryInfo.isZero === `X`) {
                        obj = {
                            key: `stime`,
                            label: `统计月份`,
                            value: moment().format(`YYYY-MM`),
                            type: `date`,
                            pickerType: `month`,
                            format: `yyyy-MM`,
                            valueFormat: `yyyy-MM`
                        };
                    } else if (info.queryInfo.isZero === `M`) {
                        obj = {
                            key: `dateRange`,
                            label: `统计月份`,
                            value: [moment().month(0).format(`YYYY-MM`), moment().format(`YYYY-MM`)],
                            type: `date`,
                            pickerType: `daterange`,
                            format: `yyyy-MM`,
                            valueFormat: `yyyy-MM`,
                            fieldKeys: [`stm`, `etm`]
                        };
                    } else {
                        obj = {
                            key: `stime`,
                            label: `统计年份`,
                            value: moment().format(`YYYY`),
                            type: `date`,
                            pickerType: `year`,
                            format: `yyyy`,
                            valueFormat: `yyyy`
                        };
                    }
                    this.$set(this.userListDataTable.query.fieldList[0], 2, obj);
                }
                if (info.field.key === `dateRange`) {
                    const start = moment(info.queryInfo.dateRange[0]).year();
                    const end = moment(info.queryInfo.dateRange[1]).year();
                    if (start !== end) {
                        this.$notify({
                            title: `警告`,
                            message: `请选择同一年的月份`,
                            type: `warning`
                        });
                        this.$set(this.userListDataTable.query.fieldList[0], 2, {
                            key: `dateRange`,
                            label: `统计月份`,
                            value: [moment().month(0).format(`YYYY-MM`), moment().format(`YYYY-MM`)],
                            type: `date`,
                            pickerType: `daterange`,
                            format: `yyyy-MM`,
                            valueFormat: `yyyy-MM`
                        });
                    }
                }
            },
            handleChart(index, row) {
                this.updateBarInfo(row);
                this.dialogFormVisible = true;
            },
            updateBarInfo(row) {
                this.barInfo.title = `${row.stnm}`;
                // this.barInfo.seriesData = this.barInfo.seriesName.map(item => ({
                //     name: item.label,
                //     data: [row[item.list[0]], row[item.list[1]]]
                // }));
                const startData = this.barInfo.seriesName.start.map(item => (row[item.key]));
                const endData = this.barInfo.seriesName.end.map(item => (row[item.key]));
                this.barInfo.seriesData = [{name: `降雨量`, data: startData}, {name: `对比年降雨量`, data: endData}];
            }
        }

    };
</script>

<style lang="scss" scoped>
    .content-area-rainfall {
        position: relative;
    }
</style>
