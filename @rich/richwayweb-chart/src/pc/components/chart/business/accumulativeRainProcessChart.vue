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
            // 图表的宽度ss
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
                    if (index === 0) {
                        item.type = `bar`;
                        item.barWidth = `40%`;
                    } else {
                        item.type = `line`;
                    }
                    item.smooth = true;
                    if (index > 0) {
                        item.yAxisIndex = 1;
                    }
                    item.itemStyle =  {
                        color:`blue`
                        // normal: {areaStyle: {type: 'default'}}
                    };
                    series.push(item);
                    index++;
                }
                return {
                    title: {
                        text: "时段降雨过程",
                        x: "center"
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter: (parmas) => {
                            let str= ``;
                            let time = ``;
                            time = `时间：${parmas[0].axisValue}<br/>`
                            for(const item of parmas) {
                                if(item.value === undefined) {
                                    item.value = `--`;
                                };
                                str+= `${item.marker}${item.seriesName}：${item.value}mm<br/>`
                            };
                            return  time+str;
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
                            boundaryGap : true,
                            data : this.xAxisData,
                            axisLine: {onZero: true},
                            name: `时间`
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name: `时段降雨(mm)`
                        },
                        {
                            type : 'value',
                            name: `累计(mm)`
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
