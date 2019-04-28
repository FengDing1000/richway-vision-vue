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
                                    valueFormat: `yyyy-MM-dd HH:mm:SS`
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
                                key: `bsnm`,
                                label: `河流名称`
                            },
                            {
                                key: `stlc`,
                                label: `站址`
                            },
                            {
                                key: `drp`,
                                label: `降雨量(mm)`,
                                render: {
                                    type: `html`,
                                    data: row => {
                                        if (row.drp === null || row.drp === undefined || row.drp === ``) {
                                            return ``;
                                        }
                                        return Number(row.drp).toFixed(1);
                                    }
                                }
                            }
                        ]
                    },
                    getDataFun: `GetRainTotal`
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
                        valueFormat: `yyyy-MM-dd HH:mm:SS`
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
