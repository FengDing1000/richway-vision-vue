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
                for (const item of this.xAxisData) {
                    legend.push(item.name);
                    item.type = `bar`;
                    item.label={
                        normal: {
                            show: true,
                                position: 'insideRight'
                        }
                    };
                    series.push(item);
                }
                return {
                    title: {
                        text: "短信异常统计",
                        subtext: this.subTitle,
                        x: "center"
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    // tooltip : {
                    //     trigger: 'axis',
                        // formatter: (parmas) => {
                        //     let str= ``;
                        //     let time = ``;
                        //     time = `时间：${parmas[0].axisValue}<br/>`
                        //     for(const item of parmas) {
                        //         str+= `${item.marker}${item.seriesName}：${item.value}mm/min`
                        //     };
                        //     return time+str;
                        // }

                    // },
                    legend: {
                        x: 'left',
                        data: legend
                    },
                    grid:{
                        left: `5%`,
                        right: `10%`,
                    },
                    // dataZoom : {
                    //     show : true,
                    //     realtime : true,
                    //     start : 0,
                    //     end : 100
                    // },
                    xAxis : [
                        {
                            type: 'value'
                        }
                    ],
                    yAxis : {
                        type: 'category',
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    series : series
                }
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
