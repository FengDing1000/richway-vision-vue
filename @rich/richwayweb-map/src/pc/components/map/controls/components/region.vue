<template>
	<el-popover
		:placement="placement"
		popper-class="map-region-popper"
		trigger="click">
		<MapRegionPanel @choose="handleChoose" />
		<div
			slot="reference"
			ref="popEl"
			class="bar-item bar-btn">
			<!--<i class="richway-icon icon-region bar-region" />-->
			<div class="map-region-text">{{ currentRegionInfo.name | _filterStr(3) }}</div>
		</div>
	</el-popover>
</template>

<script type="text/ecmascript-6">
import { _filterStr } from '@rich/richwayweb-utils/lib/filter/filterStation';
import positionFun from "../js/position.js";
import MapRegionPanel from './mapRegionPanel';

export default {
    name: `RegionControl`,
    components: {
        MapRegionPanel
    },
    filters: {
        _filterStr
    },
    props: {
        position: {
            type: String,
            default: ``
        },
        map: {
            type: Object,
            default: () => ({})
        },
        mapOptions: {
            type: Object,
            default: () => ({})
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            currentRegionInfo: {
                code: ``,
                name: ``
            }
        };
    },
    computed: {
        placement() {
            return positionFun.getPlacementForTooltip(this.position);
        }
    },
    mounted() {
        this.currentRegionInfo = (window._RichWay.$map || {}).currentRegionInfo || {};

        if (this.config.toggle === `show`) {
            this.$refs.popEl.click();
        }
    },
    methods: {
        handleChoose(item) {
            this.currentRegionInfo = item;
        }
    }
};
</script>

<style lang="scss">
    .map-region-popper{
        width: 25rem;
    }
    .map-region-text {
        text-align: center;
    }
</style>
