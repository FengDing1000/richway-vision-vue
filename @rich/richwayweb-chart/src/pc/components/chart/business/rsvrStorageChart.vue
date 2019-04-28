<template>
    <Chart
        :option="optionInfo"
        :width="width"
        :height="height" />
</template>

<script type="text/ecmascript-6">
    const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

    export default {
        name: `rsvrStorageChart`,
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
                return {
                    tooltip: {
                        trigger: `axis`,
                        formatter: function (params) {
                            console.log(params)
                            let str = ``;
                            // let time = ``;
                            // time = `${params[0].marker}库容：${params[0].axisValue}<br/>`
                            for(const item of params){
                                if(item.value === undefined){
                                    item.value = `--`
                                }
                                str +=`${item.marker}${item.seriesName}：${item.value}m<br/>`
                            };
                            return str;
                        }
                    },
                    legend: {
                        x: 'left'
                    },
                    grid:{
                        left: `5%`,
                        right: `13%`,
                    },
                    calculable : true,
                    xAxis: [
                        {
                            type: `category`,
                            data: this.xAxisData,
                            boundaryGap : false,
                            name: `库容(百万m³)`,
                            scale:true
                        }
                    ],
                    yAxis: [
                        {
                            type: `value`,
                            name: `水位(m)`,
                            scale:true

                        }
                    ],
                    series: [
                        {
                            name: `水位`,
                            type:'line',
                            data: this.yAxisData,
                            smooth:false,
                            // itemStyle: {normal: {areaStyle: {type: 'default'}}}
                        }
                    ]
                }
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>
