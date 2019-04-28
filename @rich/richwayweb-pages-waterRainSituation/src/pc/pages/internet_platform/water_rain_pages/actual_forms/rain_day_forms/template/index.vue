<template>
    <div class="content content-rain-day_forms">
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
                day: moment().format(`YYYY-MM-DD`),
                config: {
                    query: {
                        fieldList: [
                            [
                                {
                                    key: `day`,
                                    label: `报表时间`,
                                    value: ``,
                                    type: `date`,
                                    pickerType: `date`,
                                    format: `yyyy-MM-dd`,
                                    valueFormat: `yyyy-MM-dd`
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
            this._log(`sdsd`);
        },
        methods: {
            handleQueryBtnClick(info) {
                this.iframeSrc = `${this.$base.path.reportServiceHost}?reportlet=rptRainDay.cpt&stm=${info.queryInfo.day}&etm=${info.queryInfo.day}&adcd=${window._RichWay.$map.currentRegionInfo.code.substr(0, 6)}&city=&country=`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .content-rain-day_forms {
        position: relative;
    }
</style>
