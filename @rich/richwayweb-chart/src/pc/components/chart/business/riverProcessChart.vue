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
                 const maxMin = {'min':undefined, 'max':100};
                const legend = [];
                const series = [];
                let index = 0;
                for (const item of this.yAxisData) {
                    legend.push(item.name);
                    item.type = `line`;
                    item.smooth = true;
                    if (index > 0) {
                        item.yAxisIndex = 1;

                    } if(item.name === `水位`) {
                        item.itemStyle = {color:`#ff87ff`}
                        item.yAxisIndex = 0;
                    }
                    if(item.name === `警戒水位`) {
                        item.itemStyle = {color:`red`}
                        item.yAxisIndex = 0;
                    }
                    if(item.name === `保证水位`) {
                        item.yAxisIndex = 0;
                    }
                    if(item.name === `流量`) {
                        item.itemStyle = {color:`#0101ff`}
                    }
                    // if (index === 0 || index === 1) {
                    //     item.markPoint =  {
                    //         data : [
                    //             {type : 'max', name: '最大值'},
                    //             {type : 'min', name: '最小值'}
                    //         ]
                    //     };
                    //     item.markLine = {
                    //         data : [
                    //             {type : 'average', name: '平均值'}
                    //         ]
                    //     };
                    // }
                    // item.itemStyle =  {normal: {areaStyle: {type: 'default'}}};
                        item.min = (maxMin.min!==undefined && (maxMin.min - 10) >0) ? (maxMin.min - 10) : 0;
                        item.max = 100;
                    series.push(item);
                    index++;
                }
                return {
                    title: {
                        text: "水位流量过程线",
                        top:`top`,
                        x: "center"
                    },
                    tooltip : {
                        trigger: 'axis',
                        formatter: function (params) {
                            let str = ``;
                            let time = ``;
                            time = `时间：${params[0].axisValue}<br/>`
                            for(const item of params){
                                if(item.value === undefined){
                                    item.value = `--`
                                }
                                if(item.seriesName.includes('水位')){
                                    str +=`${item.marker}${item.seriesName}：${item.value}m<br/>`
                                } else {
                                    str +=`${item.marker}${item.seriesName}：${item.value}m³/s<br/>`
                                }
                            };
                            return time+str;
                        }
                    },
                    legend: {
                        x: 'left',
                        top:`10%`,
                        data: legend
                    },
                    grid:{
                        left: `5%`,
                        right: `5%`,
                        top: `30%`
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
                            axisLine: {onZero: false}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name: `水位(m)`
                        },
                        {
                            type : 'value',
                            name: `流量(m³/s)`
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
