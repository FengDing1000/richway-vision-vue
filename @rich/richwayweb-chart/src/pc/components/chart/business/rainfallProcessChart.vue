<template>
	<Chart
		:option="lineInfo"
		width="300px"
		height="200px" />
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RainfallProcessChartJson from '../data/rainfallProcessChart.json';

const _log = RichWayWebUtils.console.log;
const {deepClone} = RichWayWebUtils

const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

export default {
    name: `rainfallProcessChart`,
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
            _log(`rainfallProcessChart`, this.dataInfo);
            const o = deepClone(RainfallProcessChartJson);
            o.xAxis[0].data = (this.dataInfo || {}).xAxisData;
            o.series[0].data = (this.dataInfo || {}).seriesData;
            return o;
        }
    },
    mounted() {
        _log(`rainfallProcessChart has mounted`);
    }

};
</script>

<style lang="scss" scoped>

</style>
