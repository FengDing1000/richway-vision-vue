<template>
    <div class="content content-history-warn">
        <DataTableStandard
            ref="dataList"
            :config="userListDataTable"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import RichWayWebComponents from '@rich/richwayweb-components';
    const moment = require('moment');

    const {DataTableStandard} = RichWayWebComponents;

    export default {
        components: {
            DataTableStandard
        },
        data() {
            return {
                userListDataTable: {
                    query: {
                        fieldList: [
                            [
                                {
                                    key: `adcd`,
                                    label: `行政划区`,
                                    value: ``,
                                    type: `select`,
                                    options: []
                                },
                                {
                                    key: `dateRange`,
                                    label: `时间范围`,
                                    value: [
                                        moment().date(1).format(`YYYY-MM-DD`),
                                        moment().format(`YYYY-MM-DD`)
                                    ],
                                    type: `date`,
                                    pickerType: `datetimerange`,
                                    format: `yyyy-MM-dd`,
                                    valueFormat: `yyyy-MM-dd`,
                                    fieldKeys: [`stm`, `etm`]
                                },
                                {
                                    key: `warnStatusId`,
                                    label: `预警状态`,
                                    value: ``,
                                    type: `select`,
                                    options: [{
                                        label: `全部`,
                                        value: ``
                                    }, {
                                        label: `新产生`,
                                        value: `0`
                                    }, {
                                        label: `已内部告警`,
                                        value: `10`
                                    }, {
                                        label: `已外部告警`,
                                        value: `20`
                                    }, {
                                        label: `已启动响应`,
                                        value: `30`
                                    }, {
                                        label: `响应已反馈`,
                                        value: `40`
                                    }, {
                                        label: `响应已结束`,
                                        value: `50`
                                    }, {
                                        label: `关闭预警`,
                                        value: `60`
                                    }]
                                }
                            ]
                        ]
                    },
                    table: {
                        fieldList: [
                            {key: `adnm`, label: `行政区划(乡镇)`},
                            {key: `dandName`, label: `危险区名称`},
                            {key: `stnms`, label: `相关测站名称`},
                            {key: `warnnm`, label: `预警`},
                            {key: `warndesc`, label: `预警说明`},
                            {key: `warnTypeNm`, label: `预警类型`},
                            {key: `warnGradeNm`, label: `预警等级`},
                            {
                                key: `warnstatusid`,
                                label: `预警状态`,
                                render: {
                                    type: `html`,
                                    data: row => {
                                        const data = row.warnstatusid;
                                        if (data === -1) { // 2018-08-03 兼容山洪5.0系统将-1状态值翻译
                                            return `新产生`;
                                        }
                                        if (data === 0) {
                                            return `新产生`;
                                        }
                                        if (data === 10) {
                                            return `已内部告警`;
                                        }
                                        if (data === 20) {
                                            return `已外部告警`;
                                        }
                                        if (data === 30) {
                                            return `已启动响应`;
                                        }
                                        if (data === 40) {
                                            return `响应已反馈`;
                                        }
                                        if (data === 50) {
                                            return `响应已结束`;
                                        }
                                        if (data === 60) {
                                            return `关闭预警`;
                                        }
                                        return data;
                                    }
                                }
                            },
                            {key: `warnstm`, label: `预警开始时间`, sortable: true},
                            {key: `warnetm`, label: `预警结束时间`, sortable: true},
                            {
                                key: `warnstatusid`,
                                label: `结束预警`,
                                render: {
                                    type: `btn`,
                                    list: [
                                        {
                                            label: `结束预警`,
                                            handleClick: this.handleDelete,
                                            formatFun: (index, row) => {
                                                if (row.warnstatusid !== 60) {
                                                    return `结束预警`;
                                                }
                                                return `— —`;
                                            }
                                        }
                                    ]
                                }

                            },
                            {
                                label: `操作`,
                                fixed: `right`,
                                render: {
                                    type: `btn`,
                                    list: [
                                        {
                                            label: `预警详情`,
                                            btnType: `primary`,
                                            icon: `icon-bar`,
                                            handleClick: this.handleDetail
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    getDataFun: `GetWarnCountyAdcd`
                }
            };
        },
        computed: {},
        mounted() {
            this.$getData.GetAdcdCity({
                // adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                flag: `parent`
            }).then(res => {
                const arr = [];
                res.data.forEach((item, index) => {
                    if (index === 0) {
                        arr.push({
                            label: item.adnm,
                            value: window._RichWay.$map.currentRegionInfo.code.substr(0, 6)
                        });
                    } else {
                        arr.push({
                            label: item.adnm,
                            value: item.adcd
                        });
                    }
                });
                if (arr.length > 0) {
                    this.$set(this.userListDataTable.query.fieldList[0], 0, {
                        key: `adcd`,
                        label: `行政划区`,
                        value: arr[0].value,
                        type: `select`,
                        options: arr
                    });
                }
            });
        },
        methods: {
            handleDelete(index, row) {
                if (row.warnstatusid !== 60) {
                    this.$confirm(`您确认要关闭预警吗?`, `提示`, {
                        confirmButtonText: `确定`,
                        cancelButtonText: `取消`,
                        type: `warning`
                    }).then(() => {
                        this.$getData.ClosingWarning({
                            warnId: row.warnid && String(row.warnid),
                            type: 0,
                            warnGradeNm: row.warnGradeNm,
                            name: row.dandName
                        }).then(res => {
                            this.$message({
                                message: res.message,
                                type: `success`
                            });
                            this.$refs.dataList.pagingQuery();
                        });
                    });
                }
            }
        }

    };
</script>

<style lang="scss" scoped>
    .content-history-warn {
        position: relative;
    }
</style>
