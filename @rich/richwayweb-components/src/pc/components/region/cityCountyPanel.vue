<template>
	<div
		v-show="show"
		class="region-panel">
		<div class="region-arrow" />
		<i
			class="richway-icon icon-close"
			@click.stop="handleClose" />
			<!--<MapRegionPanel @choose="handleChoose" type="panel"></MapRegionPanel>-->
	</div>
</template>

<script type="text/ecmascript-6">
// import MapRegionPanel from '@rich/richwayweb-map/src/pc/components/map/controls/components/mapRegionPanel';

export default {
    name: `cityCountyPanel`,
    components: {
        // MapRegionPanel
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClose() {
            this.$emit(`on-hide`);
        },
        handleChoose(item) {
            this.$emit(`choose`, item);
        }
    }
};
</script>

<style lang="scss" scoped>
		.region-panel {
			position: absolute;
			top: 2.7rem;
			display: inline-block;
			border: 2px solid rgba(102, 153, 255, 1);
			border-radius: 5px;
			color: #69f;
		}

		.icon-close {
			position: absolute;
			z-index: 3;
			top: .5rem;
			right: 1rem;
			width: 2rem;
			height: 2rem;
			border: 1px dashed rgba(71, 117, 202, 1);
			font-weight: 600;
			font-size: 1.5rem;
			line-height: 2rem;
			text-align: center;
			color: #4775ca !important;
			cursor: pointer;

			&:hover {
				background-color: rgba(0, 0, 0, .1);
			}
		}

		.region-arrow {
			position: absolute;
			top: -.6rem;
			left: 1.5rem;
			width: 1rem;
			height: 1rem;
			border-top: 2px solid #69f;
			border-left: 2px solid #69f;
			background: #fff;
			transform: rotate(45deg);
		}
</style>
