<template>
	<Chart
			:option="optionInfo"
			:width="width"
			:height="height" />
</template>

<script type="text/ecmascript-6">
    const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

    export default {
        name: `rainChart`,
        components: {
            Chart
        },
        props: {
            // 图表的宽度
            width: {
                type: String,
                default: `560px`
            },
        },
        data() {
            return {
                optionInfo: {
                    title: {
                        text: `今日累计降雨：0mm 今日降雨历时：0H 今日降雨时刻：2018/9/26 10:00:00`,
                        textStyle: {
                            color: `#333`,
                            fontStyle: `normal`,
                            fontSize: 18
                        },
                        left: `center`,
                        subtext: `2018-09-26 00:00:00 - 2018-09-26 14:00:00`
                    },
                    color: [`#3398DB`],
                    tooltip: {
                        trigger: `axis`,
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: `shadow` // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: `3%`,
                        right: `4%`,
                        bottom: `3%`,
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: `category`,
                            data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: `value`
                        }
                    ],
                    series: [
                        {
                            name: `降雨量`,
                            type: `bar`,
                            barWidth: `60%`,
                            data: [0, 0.5, 0.7, 0.1, 1.2, 0.3, 1.2, 3.2]
                        }
                    ]
                },
                // width: `100%`,
                height: `260px`
            };
        }
    };
</script>

<style lang="scss" scoped>

</style>
