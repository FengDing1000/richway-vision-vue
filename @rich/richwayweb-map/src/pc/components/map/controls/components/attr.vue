<template>
	<div
		v-if="attrHtml"
		:style="config"
		class="map-attr-panel"
		v-html="attrHtml" />
</template>

<script type="text/ecmascript-6">
import positionFun from "../js/position.js";

export default {
    name: `AimControl`,
    props: {
        position: {
            type: String,
            default: ``
        },
        config: {
            type: Object,
            default: () => ({})
        },
        map: {
            type: Object,
            default: () => ({})
        },
        mapOptions: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            attrHtml: ``
        };
    },
    computed: {
        placement() {
            return positionFun.getPlacementForTooltip(this.position);
        }
    },
    mounted() {
        this.$mapLayersFun.MapAttrListenFun(info => {
            this.attrHtml = info.html || ``;
        });
    }
};
</script>

<style lang="scss" scoped>
    .map-attr-panel{
        display: inline-block;
        width: 14rem;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        padding: .2rem .5rem;
        border-radius: .2rem;
        margin-bottom: 1rem;
        pointer-events: none;
    }
</style>
