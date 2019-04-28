<template>
	<div class="zoom-panel">
		<div class="bar-item bar-btn bar-zoom-plus">
			<el-tooltip
				:placement="placement"
				class="item"
				effect="dark"
				content="放大">
				<i
					:class="{'disabled': disabledIn}"
					class="richway-icon icon-plus"
					@click="zoomIn" />
			</el-tooltip>
		</div>
		<div class="bar-item bar-btn bar-zoom-reduce">
			<el-tooltip
				:placement="placement"
				class="item"
				effect="dark"
				content="缩小">
				<i
					:class="{'disabled': disabledOut}"
					class="richway-icon icon-reduce"
					@click="zoomOut" />
			</el-tooltip>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
import positionFun from "../js/position.js";

export default {
    name: `zoomControl`,
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
        }
    },
    data() {
        return {
            disabledIn: false,
            disabledOut: false
        };
    },
    computed: {
        placement() {
            return positionFun.getPlacementForTooltip(this.position);
        }
    },
    methods: {
        // 放大地图
        zoomIn() {
            if (!this.disabledIn) {
                this._log(`map start zoomIn...`);
                this.map.zoomIn();
            }
            this.judge();
        },
        // 缩小地图
        zoomOut() {
            if (!this.disabledOut) {
                this._log(`map start zoomOut...`);
                this.map.zoomOut();
            }
            this.judge();
        },
        judge() {
            const currentZoom = this.map.getZoom();
            if (currentZoom >= this.mapOptions.maxZoom) {
                this.disabledIn = true;
                this.disabledOut = false;
            } else if (currentZoom <= this.mapOptions.minZoom) {
                this.disabledIn = false;
                this.disabledOut = true;
            } else {
                this.disabledIn = false;
                this.disabledOut = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
	.zoom-panel {
		position: relative;
		width: 2.15rem;
		margin-bottom: .5rem;

		.bar-zoom-plus {
			margin-bottom: 0 !important;
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}

		.bar-zoom-reduce {
			margin-bottom: 0 !important;
			border-top-right-radius: 0;
			border-top-left-radius: 0;
		}
	}
</style>
