<template>
    <div class="content content-rain-year_forms">
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
                yr: moment().format(`YYYY`),
                config: {
                    query: {
                        fieldList: [
                            [
                                {
                                    key: `yr`,
                                    label: `报表时间`,
                                    value: ``,
                                    type: `date`,
                                    pickerType: `year`,
                                    format: `yyyy`,
                                    valueFormat: `yyyy`
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
            this._log(`mounted`);
        },
        methods: {
            handleQueryBtnClick(info) {
                this.iframeSrc = `${this.$base.path.reportServiceHost}?reportlet=rptRainYear.cpt&amp;yr=${info.queryInfo.yr}&amp;adcd=${window._RichWay.$map.currentRegionInfo.code.substr(0, 6)}&amp;city=&amp;country=`;
            }
        }

    };
</script>

<style lang="scss" scoped>
    .content-rain-year_forms {
        position: relative;
    }
</style>
