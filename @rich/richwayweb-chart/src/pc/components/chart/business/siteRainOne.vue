<template>
	<Chart
		:option="barInfo"
		width="100%" />
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import SiteRainJson from '../data/siteRainOne.json';

const _log = RichWayWebUtils.console.log;
const {deepClone} = RichWayWebUtils

const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

export default {
    components: {
        Chart
    },
    props: {
        title: {
            type: String,
            default: ``
        },
        xAxisData: {
            type: Array,
            default: () => []
        },
        seriesName: {
            type: String,
            default: ``
        },
        seriesData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {};
    },
    computed: {
        barInfo() {
            const o = deepClone(SiteRainJson);
            o.title.text = `${this.title}${SiteRainJson.title.text}`;
            o.xAxis[0].data = this.xAxisData;
            o.series[0].name = this.seriesName;
            o.series[0].data = this.seriesData;
            _log(`siteRain barInfo`, o);
            return o;
        }
    },
    mounted() {
        _log(`siteRainChart has mounted`);
    }

};
</script>

<style lang="scss" scoped>

</style>
