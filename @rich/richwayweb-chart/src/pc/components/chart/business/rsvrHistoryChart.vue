<template>
    <Chart
        :option="optionInfo"
        :width="width"
        :height="height" />
</template>

<script type="text/ecmascript-6">
    const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

    export default {
        name: `rsvrHistoryChart`,
        components: {
            Chart
        },
        props: {
            // 图表的宽度
            width: {
                type: String,
                default: `28rem`
            },
            height: {
                type: String,
                default: `13rem`
            },
            xAxisData: {
                type: Array,
                default: ()=>[]
            },
            yAxisData: {
                type: Array,
                default: ()=>[]
            }
        },
        data() {
            return {};
        },
        computed: {
            optionInfo() {
                const legend = [];
                const series = [];
                for (const item of this.yAxisData) {
                    legend.push(item.name);
                    item.type = `line`;
                    item.smooth = true;
                    item.itemStyle =  {normal: {areaStyle: {type: 'default'}}};
                    series.push(item);
                }
                return {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data: legend
                    },
                    grid:{
                        left: `5%`,
                        right: `15%`,
                    },
                    dataZoom : {
                        show : true,
                        realtime : true,
                        start : 0,
                        end : 100
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : this.xAxisData,
                            name: `时间`
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name: `水位(m)`
                        }
                    ],
                    series : series
                }
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
