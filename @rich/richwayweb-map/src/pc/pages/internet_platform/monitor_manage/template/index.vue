<template>
	<div
		class="content content-effect-range">
		<MapBase
			:map-config="config"
			:offset-x="30" />
        <BusinessComponents
            :business-components="businessComponents" />
	</div>
</template>

<script type="text/ecmascript-6">
import MapComponents from '$pc/components';

const { mapState } = require(`vuex`);
const { MapBase } = MapComponents;
const BusinessComponents = r => require.ensure([], () => r(require(`../../../../components/map/business/index.vue`)), `richway_map`);

export default {
    components: {
        MapBase,
        BusinessComponents
    },
    computed: {
        ...mapState([`currentPageInfo`]),
        config() {
            return this.currentPageInfo.info.config;
        },
        businessComponents() {
            const mapBusiness = (this.currentPageInfo.info.config || []).find((item = {}) => item.id === `MapBusiness`) || {};
            return mapBusiness.components;
        }
    },
    mounted() {
        this._log(`monitor_manage has mounted, app.json config is`, this.config);

        this.$nextTick(() => {
            // 获取当前行政区的边界数据并广播
            this.$getData.GetBoundary({ boundaryCode: window._RichWay.$map.currentRegionInfo.code }).then((res = {}) => {
                this.$mapLayersFun.MapCurrentRegionInfoBroadcastFun(res.data[0]);
            });
        });
    }
};
</script>

<style lang="scss">
		.container-monitor {
			.richway-main {
				margin-bottom: 0;
			}
		}

		.content-effect-range {
            position: relative;
			width: 100%;
			height: 100%;
			padding: 0 !important;
			overflow: hidden;
		}

</style>
