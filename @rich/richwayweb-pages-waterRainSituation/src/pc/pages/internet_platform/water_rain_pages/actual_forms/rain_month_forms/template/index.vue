<template>
    <div class="content content-rain-month_forms">
        <DataReport
            :iframe-src="iframeSrc"
            :config="config"
            @on-query="handleQueryBtnClick"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import RichWayWebComponents from '@rich/richwayweb-components';
    import moment from 'moment';

    const {DataReport} = RichWayWebComponents;

    export default {
        components: {
            DataReport
        },
        data() {
            return {
                month: moment().format(`YYYY-MM`),
                config: {
                    query: {
                        fieldList: [
                            [
                                {
                                    key: `month`,
                                    label: `报表时间`,
                                    value: ``,
                                    type: `date`,
                                    pickerType: `month`,
                                    format: `yyyy-MM`,
                                    valueFormat: `yyyy-MM`
                                }
                            ]
                        ]
                    }
                },
                iframeSrc: ``
            };
        },
        computed: {},
        mounted() {
            this._log(`sdsd`, this.iframeSrc);
        },
        methods: {
            handleQueryBtnClick(info) {
                this.iframeSrc = `${this.$base.path.reportServiceHost}?reportlet=rptRainMonth.cpt&op=view&tm=${info.queryInfo.month}&adcd=${window._RichWay.$map.currentRegionInfo.code.substr(0, 6)}&city=&country=`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .content-rain-month_forms {
        position: relative;
    }
</style>
