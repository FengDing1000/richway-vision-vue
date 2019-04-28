<template>
	<div
		class="content content-realtime-monitoring">
		<MapBase
			:map-config="config"
			:offset-x="30" />
        <BusinessComponents
            :business-components="businessComponents" />
	</div>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);
const MapBase = r => require.ensure([], () => r(require(`@rich/richwayweb-map/src/pc/components/map/index.vue`)), `richway_map`);
const BusinessComponents = r => require.ensure([], () => r(require(`../../../../components/map/business/index.vue`)), `richway_map`);

export default {
    components: {
        MapBase,
        BusinessComponents
    },
    data() {
        return {};
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
        this._log(`realtime_monitoring has mounted`);
    }

};
</script>

<style lang="scss">
		.container-realtime-monitoring {
			.richway-main {
				margin-bottom: 0;
			}
		}

		.content-realtime-monitoring {
            position: relative;
			width: 100%;
			height: 100%;
			padding: 0 !important;
			overflow: hidden;
		}

</style>
