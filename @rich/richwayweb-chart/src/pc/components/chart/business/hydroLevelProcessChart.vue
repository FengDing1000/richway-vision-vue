<template>
    <Chart
        :option="optionInfo"
        :width="width"
        :height="height" />


</template>

<script>
    const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

    let itemStyle = {
        normal: {
        },
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    };

    export default {
        name: "hydroLevelProcessChart",
        components: {
            Chart
        },
        props: {
            // 图表的宽度
            width: {
                type: String,
                default: `60rem`
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
            },
            legendType: {
                type: Object,
                default: () => {

                }
            },
            titleType: {
                type: String,
                default: ""
            }
        },
        data() {
            return {};
        },
        computed: {
            optionInfo() {
                this._log(`4444`, this.titleType)
                const legend = [];
                const series = [];
                let index = 0;
                for (const item of this.yAxisData) {
                    legend.push(item.name);
                    if (index === 0) {
                        item.type = `bar`;
                        item.barWidth = `20%`;
                        item.yAxisIndex = 1;
                        item.itemStyle =  {
                            color:`blue`
                        }

                    } else {
                        item.type = `line`;
                    }
                    if (index > 0) {
                        item.yAxisIndex = 0;
                        item.itemStyle =  {
                            color:`red`
                        }
                    }
                    item.lineStyle= {
                        width: 1
                    };
                    series.push(item);
                    index++;
                }
                return {
                    title: {
                        text: `水文站${this.titleType}过程线`,
                        x: "center"
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter: function (params) {
                            let str = ``;
                            for(const item of params){
                                if(item.value === undefined){
                                    item.value = `--`
                                }
                                str +=`${item.marker}${item.seriesName}：${item.value}<br/>`
                            };
                            return str;
                        }
                    },
                    legend: {
                        x: 'left',
                        data: legend
                    },
                    grid:{
                        left: `5%`,
                        right: `5%`,
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
                            axisLine: {onZero: false},
                            data : this.xAxisData.map(function (str) {
                                return str.replace(' ', '\n')
                            })
                        }
                    ],
                    yAxis : [
                        {
                            name: `${this.legendType.type2}`,
                            type: 'value',
                        },
                        {
                            name: `${this.legendType.type1}`,
                            nameLocation: 'start',
                            type: 'value',
                            inverse: true
                        }
                    ],
                    series : series
                }
            }

        },
    }
</script>

<style scoped>

</style>
