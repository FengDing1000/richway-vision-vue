<template>
    <div class="content content-accumulative-rainfall">
        <DataTableStandard
            :config="userListDataTable"
            @on-query-change="handleQueryChange"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import RichWayWebComponents from '@rich/richwayweb-components';
    import dateSpaceUtil from "../../../../../../../common/dateSpaceUtil";

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
                                    key: `stnm`,
                                    label: `测&ensp;&ensp;&ensp;&ensp;站`,
                                    value: ``,
                                    type: `input`
                                },
                                {
                                    key: `timeSpace`,
                                    label: `时间间隔`,
                                    value: `1`,
                                    type: `select`,
                                    options: dateSpaceUtil.space
                                },
                                {
                                    key: `dateRange`,
                                    label: `时间范围`,
                                    value: dateSpaceUtil.dateRange(),
                                    type: `date`,
                                    pickerType: `datetimerange`,
                                    format: `yyyy-MM-dd HH:mm:SS`,
                                    valueFormat: `yyyy-MM-dd HH:mm:SS`,
                                    fieldKeys: [`stm`, `etm`]
                                }
                            ],
                            [
                                {
                                    key: `over`,
                                    label: `筛&ensp;&ensp;&ensp;&ensp;选`,
                                    value: `1`,
                                    type: `radio`,
                                    options: [{label: `全部`, value: `1`}, {label: `超汛限测站`, value: `2`}, {
                                        label: `超校核测站`,
                                        value: `3`
                                    }]
                                }
                            ]
                        ]
                    },
                    table: {
                        fieldList: [
                            {
                                key: `stcd`,
                                label: `测站编码`,
                                fixed: `left`
                            },
                            {
                                key: `stnm`,
                                label: `测站名称`,
                                fixed: `left`
                            },
                            {
                                width: `250`,
                                key: `stlc`,
                                label: `站址`,
                                fixed: `left`
                            },
                            {
                                key: `hnnm`,
                                label: `水系名称`
                            },
                            {
                                key: `rvnm`,
                                label: `河流名称`
                            },
                            {
                                key: `tm`,
                                label: `时间`,
                                width: `200`
                            },
                            {
                                width: `150`,
                                key: `rz`,
                                label: `库上水位(m)`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        if (row.rz === `` || row.rz === null || row.rz === undefined) {
                                            return ``;
                                        }
                                        return Number(row.rz).toFixed(2);
                                    }
                                }
                            },
                            {
                                key: `rwptn`,
                                label: `水势`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        const data = `${row.rwptn}`;
                                        if (data === `6`) {
                                            return `<span class='el-icon-caret-right'></span>`;
                                        }
                                        if (data === `5`) {
                                            return `<span class='el-icon-caret-top'></span>`;
                                        }
                                        if (data === `4`) {
                                            return `<span class='el-icon-caret-bottom'></span>`;
                                        }
                                        return data;
                                    }
                                }
                            },
                            {
                                width: `150`,
                                key: `inq`,
                                label: `入库流量(m3/s)`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        if (row.inq === `` || row.inq === null || row.inq === undefined) {
                                            return ``;
                                        }
                                        return Number(row.inq).toFixed(3);
                                    }
                                }
                            },
                            {
                                width: `150`,
                                key: `w`,
                                label: `蓄量(万m3)`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        if (row.w === `` || row.w === null || row.w === undefined) {
                                            return ``;
                                        }
                                        return Number(row.w).toFixed(3);
                                    }
                                }
                            },
                            {
                                width: `150`,
                                key: `otq`,
                                label: `出库流量(m3/s)`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        if (row.otq === `` || row.otq === null || row.otq === undefined) {
                                            return ``;
                                        }
                                        return Number(row.otq).toFixed(3);
                                    }
                                }
                            },
                            {
                                width: `150`,
                                key: `overflz`,
                                label: `超汛限水位(m)`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        if (row.overflz === `` || row.overflz === null || row.overflz === undefined) {
                                            return ``;
                                        }
                                        return Number(row.overflz).toFixed(2);
                                    }
                                }
                            },
                            {
                                width: `150`,
                                key: `overCkflz`,
                                label: `超校核水位(m)`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        if (row.overCkflz === `` || row.overCkflz === null || row.overCkflz === undefined) {
                                            return ``;
                                        }
                                        return Number(row.overCkflz).toFixed(2);
                                    }
                                }
                            },
                            {
                                key: `sttp`,
                                label: `类别`,
                                width: `90`,
                                render: {
                                    type: `html`,
                                    data: (row = {}) => {
                                        const data = row.sttp;
                                        if (data === `PP`) {
                                            return `雨量站`;
                                        }
                                        if (data === `ZZ`) {
                                            return `河道站`;
                                        }
                                        if (data === `ZQ`) {
                                            return `水文站`;
                                        }
                                        if (data === `RR`) {
                                            return `水库站`;
                                        }
                                        if (data === `DD`) {
                                            return `闸坝站`;
                                        }

                                        return data;
                                    }
                                }

                            }
                        ]
                    },
                    getDataFun: `QueryRsvrWater`
                }
            };
        },
        mounted() {
            this._log(`user_manage has mounted`);
        },
        methods: {
            handleQueryChange(info) {
                if (info.field.key === `timeSpace`) {
                    this.$set(this.userListDataTable.query.fieldList[0], 2, {
                        key: `dateRange`,
                        label: `时间范围`,
                        value: dateSpaceUtil.dateRange(info.queryInfo.timeSpace),
                        type: `date`,
                        pickerType: `datetimerange`,
                        format: `yyyy-MM-dd HH:mm:SS`,
                        valueFormat: `yyyy-MM-dd HH:mm:SS`,
                        fieldKeys: [`stm`, `etm`]
                    });
                }
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
