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
import { mapState } from 'vuex';
import MapComponents from '$pc/components';

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
        this._log(`effect_range has mounted`);
    }
};
</script>
<style lang="scss" scoped>
		.content-effect-range {
			.richway-main {
				margin-bottom: 0;
			}
		}

		.content-effect-range {
			width: 100%;
			height: 100%;
			padding: 0 !important;
			overflow: hidden;
		}
</style>
