<template>
    <Chart
        :option="optionInfo"
        :width="width"
        :height="height" />
</template>

<script type="text/ecmascript-6">
    const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

    export default {
        name: `rsvrProcessChart`,
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
            subTitle: {
                type: String,
                default: ``
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
                for (const item of this.yAxisData) {
                    legend.push(item.name);
                    item.type = `line`;
                    item.color = `blue`;
                    item.itemStyle =  {
                        normal: {areaStyle: {color:`blue`,}}
                    };
                    series.push(item);
                }
                return {
                    title: {
                        text: "未来48小时降雨预测",
                        subtext: this.subTitle,
                        x: "center"
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter: (parmas) => {
                            let str= ``;
                            let time = ``;
                            time = `时间：${parmas[0].axisValue}<br/>`
                            for(const item of parmas) {
                                str+= `${item.marker}${item.seriesName}：${item.value}mm/min`
                            };
                            return time+str;
                        }

                    },
                    legend: {
                        x: 'left',
                        data: legend
                    },
                    grid:{
                        left: `5%`,
                        right: `10%`,
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
                            axisLine: {onZero: false},
                            name: `时间`
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name: `降雨强度(mm/min)`,
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
