<template>
	<Chart
		:option="lineInfo"
		width="300px"
		height="200px" />
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import WaterLevelProcessChart from '../data/waterLevelProcessChart.json';

const _log = RichWayWebUtils.console.log;
const {deepClone} = RichWayWebUtils

const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);
export default {
    name: `waterLevelProcessChart`,
    components: {
        Chart
    },
    props: {
        dataInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {};
    },
    computed: {
        lineInfo() {
            const o = deepClone(WaterLevelProcessChart);
            o.title.text = `${this.dataInfo.title}${WaterLevelProcessChart.title.text}`;
            o.xAxis[0].data = this.dataInfo.xAxisData;
            let index = 0;
            const len = o.series.length;
            for (const item of this.dataInfo.seriesData) {
                if (len > index) {
                    (o.series[index] || {}).data = item;
                }
                index++;
            }
            return o;
        }
    },
    mounted() {
        _log(`waterlevelProcessChart has mounted`);
    }

};
</script>

<style lang="scss" scoped>

</style>
