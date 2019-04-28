<template>
	<el-tooltip
		placement="left"
		effect="dark"
		content="回到原始位置">
		<div class="bar-item bar-btn">
			<i
				:class="[config.icon || 'icon-aim']"
				class="richway-icon bar-aim"
				@click="aim" />
		</div>
	</el-tooltip>
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
        return {};
    },
    computed: {
        placement() {
            return positionFun.getPlacementForTooltip(this.position);
        }
    },
    methods: {
        // 地图还原到原始中心点
        aim() {
            this.map.setView(this.mapOptions.center, this.mapOptions.zoom);

            // 广播数据
            this.$mapLayersFun.MapControlsBroadcastFun({
                controlType: `aim`,
                eventType: `click`,
                data: {
                    center: this.mapOptions.center
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
