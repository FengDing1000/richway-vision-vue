<template>
    <div
        class="bar-item bar-btn richway-touch-btn">
        <i
            :class="[config.icon || 'icon-shebei']"
            @click="handleClick"
            class="richway-icon bar-legend" />

        <mt-popup
            v-model="popupVisible"
            class="base-legend-popup"
            position="bottom">
            <LegendPanel
                :list="legendList"
                :type="config.type"
                @on-click="changeLegend" />
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
import LegendPanel from '../../../../../pc/components/map/icon/legend';

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
            popupVisible: false,
            currentLegendInfo: {},
            legendList: []
        };
    },
    computed: {},
    mounted() {
        this.$mapLayersFun.MapBusinessLayersChangeListenFun(() => {
            this.getLegends();
        });

        setTimeout(() => {
            if (this.config.toggle === `show`) {
                this.popupVisible = true;
            }
        }, 1000);
    },
    methods: {
        handleClick() {
            this.popupVisible = true;
        },
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
    .base-legend-popup {
        width: 100%;
        color: #666;
        font-size: .6rem;
        .legend-content {
            width: 100% !important;
        }
    }
</style>
