<template>
	<el-popover
		:placement="placement"
		popper-class="base-legend-popper"
		trigger="click">
		<LegendPanel
			:list="legendList"
			:type="config.type"
			@on-click="changeLegend" />
		<div
			slot="reference"
			ref="popEl"
			class="bar-item bar-btn">
			<i
				:class="[config.icon || 'icon-shebei']"
				class="richway-icon bar-legend" />
		</div>
	</el-popover>
</template>

<script type="text/ecmascript-6">
import LegendPanel from '../../icon/legend';
import positionFun from "../js/position.js";

export default {
    name: `LegendControl`,
    components: {
        LegendPanel
    },
    props: {
        position: {
            type: String,
            default: ``
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            currentLegendInfo: {},
            legendList: []
        };
    },
    computed: {
        placement() {
            return positionFun.getPlacementForPopover(this.position);
        }
    },
    mounted() {
        this.$mapLayersFun.MapBusinessLayersChangeListenFun(() => {
            this.getLegends();
        });

        setTimeout(() => {
            if (this.config.toggle === `show`) {
                this.$refs.popEl.click();
            }
        }, 1000);
    },
    methods: {
        getLegends() {
            const arr = [];
            this.currentLegendInfo = {};
            for (const key in window._RichWay.$map.businessLayers) {
                if (Object.hasOwnProperty.call(window._RichWay.$map.businessLayers, key)) {
                    const item = window._RichWay.$map.businessLayers[key];
                    if (!item.code) {
                        item.code = key;
                    }
                    if (item.controllByLegend === true) {
                        arr.push(item);
                        this.currentLegendInfo[item.code] = item.visibility;
                    }
                }
            }
            this.legendList = arr.sort((a, b) => parseFloat(`${a.legendSort}`) - parseFloat(`${b.legendSort}`));
        },
        changeLegend(item = {}) {
            this.currentLegendInfo[item.code] = !this.currentLegendInfo[item.code];
            for (const o of this.legendList) {
                if (item.code === o.code) {
                    if (this.currentLegendInfo[item.code] === true) {
                        if (typeof ((item.layer || {}).createGraphics) === `function`) {
                            item.layer.createGraphics();
                        }
                    } else if (typeof ((item.layer || {}).clearGraphics) === `function`) {
                        item.layer.clearGraphics();
                    }
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .base-legend-popper{
        width: 20rem;
    }
</style>
