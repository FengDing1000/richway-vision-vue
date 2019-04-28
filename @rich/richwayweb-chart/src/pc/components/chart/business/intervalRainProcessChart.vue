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
                const series = [];
                const legend = [];
                let datari = []
                let dataji = []
                let datalei = []
                let index = 0;
                for (const item of this.yAxisData) {
                    legend.push(item.name);
                    if (index === 0) {
                        item.type = `bar`;
                        item.barWidth = `20%`;
                        datari = item.data

                    } else {
                        item.type = `line`;
                        dataji = item.data
                    }

                    if (index > 0) {
                        item.yAxisIndex = 1;
                    }

                    item.itemStyle =  {
                        color:`blue`
                        // normal: {areaStyle: {type: 'default'}}
                    };
                    series.push(item);
                    index++;
                };
                for(let i = 0;i<dataji.length;i++){
                    datalei[i]= parseFloat(dataji[i])
                }

 /*               datalei.map(function(item){
                    return +item;
                });*/
                function calmax(arr){
                    var max=arr[0];
                    for(let i=1;i<arr.length;i++){
                        if(max<arr[i]){
                            max=arr[i];
                        }
                        } if(max<1){
                            if(max<=0.5){
                                maxval=0.5
                            }
                            else{
                                maaval=1
                            }
                        }
                        else{
                            var maxint=Math.ceil(max/10);
                            var maxval=maxint*10;
                    }
                    return maxval;
                }
                function calmin(arr){
                    var min=arr[0];
                    for (let i=1;i<arr.length;i++){
                        if(min>arr[i]){
                            min=arr[i]
                        }
                    }
                    var minint=Math.ceil(min/10);
                    var minval=minint*10;
                    if(minval=10){
                        minval=0
                    }
                    return minval;
                }
                var mindatari = calmin(datari);
                var maxdatari = calmax(datari);
                var mindatalei = calmin(datalei);
                var maxdatalei = calmax(datalei);
                var interval_left = (maxdatari-mindatari)/5;
                var interval_right =(maxdatalei-mindatalei)/5;
                return {
                    title: {
                        text: "近7日降雨过程",
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
                                str +=`${item.marker}${item.seriesName}：${item.value}mm<br/>`
                            };
                            return time+str;
                        }
                    },
                    legend: {
                        x: 'left',
                        top:`5%`,
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
                            axisLine: {onZero: false},
                            name: `时间`
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name: `日降雨(mm)`,
                            min:mindatari,
                            max:maxdatari,
                            interval:interval_left,
                            axisLabel: {
                                formatter: function (value, index) {
                                    return value.toFixed(1);
                                }
                            }
                        },
                        {
                            splitLine:{
                                show:false
                            },
                            type : 'value',
                            name: `累计(mm)`,
                            min:mindatalei,
                            max:maxdatalei,
                            interval:interval_right,
                            axisLabel: {
                                formatter: function (value, index) {
                                    return value.toFixed(1);
                                }
                            }
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
