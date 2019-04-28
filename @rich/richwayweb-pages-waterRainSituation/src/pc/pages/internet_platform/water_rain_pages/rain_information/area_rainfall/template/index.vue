<template>
    <div class="content content-area-rainfall">
        <DataTableStandard
            :config="userListDataTable"/>
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
                                    key: `addvcds`,
                                    label: `政区列表`,
                                    value: ``,
                                    type: `select`,
                                    options: []
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
                                    key: `isZero`,
                                    label: `选择类别`,
                                    value: `1`,
                                    type: `radio`,
                                    options: [{label: `不包含0值`, value: `1`}, {label: `包含0值`, value: `0`}]
                                }
                            ]
                        ]
                    },
                    table: {
                        fieldList: [
                            {
                                key: `stnm`,
                                label: `名称`,
                                fixed: `left`
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
                    getDataFun: `QueryAreaRainfall`
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
                this._log(`weqeq`, arr);
                this.$set(this.userListDataTable.query.fieldList[0], 0, {
                    key: `addvcds`,
                    label: `政区列表`,
                    value: ``,
                    type: `select`,
                    options: arr
                });
            });
            // [0].options = dateSpaceUtil.space;
        },
        methods: {}

    };
</script>

<style lang="scss" scoped>
    .content-area-rainfall {
        position: relative;
    }
</style>
