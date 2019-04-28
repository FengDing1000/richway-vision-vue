<template>
    <Chart
        :option="optionInfo"
        :width="width"
        :height="height" />
</template>

<script type="text/ecmascript-6">
    const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

    export default {
        name: `onLineChart`,
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
                const series = [];
                const legend = [];
                let index = 0;
                for (const item of this.yAxisData) {
                    legend.push(item.name);
                    item.type = `bar`;
                    if (index === 0) {
                        item.itemStyle = {color:`#999`};
                    } else {
                        item.itemStyle = {color:`#2378f7`};
                    }
                    item.barGap = `-100%`;
                    item.barWidth = `40%`;
                    item.label= {
                        normal: {
                            show: true,
                            position: 'insideTop'
                        }
                    };
                    series.push(item);
                    index++;
                }
                return {
                    legend: {
                        x: 'left',
                        data: legend
                    },
                    grid:{
                        left: `3%`,
                        right: `5%`,
                    },
                    tooltip: {},
                    xAxis : [
                        {
                            type : 'category',
                            data : this.xAxisData,
                            axisLabel:{rotate: -60}
                        }

                    ],
                    yAxis : [
                        {
                            type : 'value'
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
