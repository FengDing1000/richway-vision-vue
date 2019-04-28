<template>
	<div
			v-loading="loading"
			:id="id"
			:style="{width, height}"
			class="richway-chart-panel" />
</template>

<script type="text/ecmascript-6">
    import RichWayWebUtils from '@rich/richwayweb-utils';
    // 完全版：echarts/dist/echarts.js，体积最大，包含所有的图表和组件，所包含内容参见：echarts/echarts.all.js。
    // 常用版：echarts/dist/echarts.common.js，体积适中，包含常见的图表和组件，所包含内容参见：echarts/echarts.common.js。
    // 精简版：echarts/dist/echarts.simple.js，体积较小，仅包含最常用的图表和组件，所包含内容参见：echarts/echarts.simple.js。
    import ECharts from '_echarts';

    const _log = RichWayWebUtils.console.log;
    const { guid } = RichWayWebUtils;

    export default {
        props: {
            // 图表的数据模板
            option: {
                type: Object,
                default: () => {}
            },
            // 图表的宽度
            width: {
                type: String,
                default: `560px`
            },
            // 图表的高度
            height: {
                type: String,
                default: `360px`
            },
            // 图表是否显示加载loading
            loading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                id: guid(),
                myChart: null
            };
        },
        computed: {
            chartOption() {
                return this.option || {};
            }
        },
        watch: {
            option() {
                _log(`chart option has change...`);
                this.initChart();
            },
            width(val) {
                _log(`chart width has change...`, val);
                this.$nextTick(()=>{
                    this.myChart.resize();
                });
            },
            height() {
                _log(`chart height has change...`);
                this.$nextTick(()=>{
                    this.myChart.resize();
                });
            }
        },
        mounted() {
            _log(`chart has mounted`);
            this.initChart();
        },
        methods: {
            initChart() {
                // 基于准备好的dom，初始化echarts实例
                _log(`chart id ${this.id}`);

                if (this.myChart) {
                    this.myChart.clear();
                }
                this.myChart = ECharts.init(document.getElementById(`${this.id}`));
                this.myChart.setOption(this.chartOption, true);

                this.$emit(`on-init`, this.id);
            }
        }

    };
</script>

<style lang="scss" scoped>
	.richway-chart-panel{
		display: inline-block;
	}
</style>
