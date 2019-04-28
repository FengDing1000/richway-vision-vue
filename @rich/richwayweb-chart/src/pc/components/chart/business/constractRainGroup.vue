<template>
	<Chart
		:option="barInfo"
		width="100%" />
</template>

<script type="text/ecmascript-6">
import ConstractRainGroup from './../data/constractRainGroup.json';
import RichWayWebUtils from '@rich/richwayweb-utils';
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
            const o = deepClone(ConstractRainGroup);
            o.title.text = `${this.title}${ConstractRainGroup.title.text}`;
            o.xAxis[0].data = this.xAxisData;
            // o.series[0].name = this.seriesName;
            // o.series[0].data = this.seriesData;
            this.seriesData.forEach((item,index)=>{
                o.series.push({
                    name: item.name,
                    type: "bar",
                    barGap: 0,
                    data: item.data
                });
            })
            _log(`siteRain barInfo`, o.series);
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
