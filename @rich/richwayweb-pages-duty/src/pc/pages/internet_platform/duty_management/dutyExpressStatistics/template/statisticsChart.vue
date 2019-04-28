<template>
	<div>
		<Chart
			v-for="item in optionInfoArr"
			:option="item"
			:key="item"
			:width="width"
			:height="height" />
	</div>
</template>

<script>
const Chart = r => require.ensure([], () => r(require(`@rich/richwayweb-chart/src/pc/components/chart/index.vue`)), `richway_chart`);

export default {
    name: `StatisticsChart`,
    components: {
        Chart
    },
    props: {
        // 图表的宽度
        width: {
            type: String,
            default: `20%`
        },
        height: {
            type: String,
            default: `18rem`
        },
        xAxisData: {
            type: Array,
            default: () => []
        },
        yAxisData: {
            type: Array,
            default: () => []
        },
        listInfo: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            optionInfo: {
                title: {
                    text: `adnm`,
                    top: `bottom`,
                    left: `center`
                },
                 tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                grid: {
                    left: `20%`,
                    right: `20%`
                },
                series: [{
                    type: `pie`,
                    width: `40%`,
                    radius: `42%`,
                    center: [`40%`, `50%`],
                    selectedMode: `single`,
                    data: [{
                        value: `isNotReportCount`,
                        name: `未上报`,
                        label: {
                            normal: {
                                formatter: [
                                    `{title|{b}}{abg|}`,
                                    ` {valueHead|天数}{rateHead|占比}`,
                                    `{hr|}`,
                                    `  {value|isNotReportCount}{rate|ratio}`
                                ].join(`\n`),
                                backgroundColor: `#eee`,
                                borderColor: `#777`,
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    title: {
                                        color: `#eee`,
                                        align: `center`
                                    },
                                    abg: {
                                        backgroundColor: `#333`,
                                        width: `100%`,
                                        align: `right`,
                                        height: 25,
                                        borderRadius: [4, 4, 0, 0]
                                    },
                                    hr: {
                                        borderColor: `#777`,
                                        width: `100%`,
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    value: {
                                        width: 20,
                                        padding: [0, 20, 0, 10],
                                        align: `left`
                                    },
                                    valueHead: {
                                        color: `#333`,
                                        width: 20,
                                        padding: [0, 20, 0, 10],
                                        align: `left`
                                    },
                                    rate: {
                                        width: 30,
                                        align: `right`,
                                        padding: [0, 10, 0, 0]
                                    },
                                    rateHead: {
                                        color: `#333`,
                                        width: 30,
                                        align: `right`,
                                        padding: [0, 10, 0, 0]
                                    }
                                }
                            }
                        }
                    },
                    {
                        value: `isReportCount`,
                        name: `已上报`
                    }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: `rgba(0, 0, 0, 0.5)`
                        }
                    }
                }]
            }
        };
    },
    computed: {
        optionInfoArr() {
            return this.getOptionInfoArr();
        }
    },
    mounted() {

    },
    methods: {
        getOptionInfoArr() {
            const optionInfoArr = [];
            const optionInfoStr = JSON.stringify(this.optionInfo);
            (this.listInfo || []).map(item => {
                const optionInfoObj = optionInfoStr.replace(/(isNotReportCount)|(ratio)|(isReportCount)|(adnm)/g, matchStr => item[matchStr] || ``);
                optionInfoArr.push(JSON.parse(optionInfoObj));
                return item;
            });
            return optionInfoArr;
        }
    }
};
</script>

<style lang="scss" scoped>
.radiusDiv {
    float: left;
    width: 20%;
}
</style>
