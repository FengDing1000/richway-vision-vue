<template>
	<div
		:id="id"
		class="richway-map-business">
		<component
			v-for="(item, index) in businessComponents"
			:is="item.componentName"
			:map="map"
			:map-options="mapOptions"
			:config="item.config || {}"
			:sub-components="item.subComponents"
			:key="index" />
	</div>
</template>

<script type="text/ecmascript-6">
import businessComponentsList from './index.js';

export default {
    name: `mainMapBusiness`,
    components: businessComponentsList,
    props: {
        map: {
            type: Object,
            default: () => {}
        },
        mapOptions: {
            type: Object,
            default: () => {}
        },
        businessComponents: {
            type: Array,
            default: () => []
        },
        id: {
            type: String,
            default: `business`
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
		.richway-map-business {
			position: absolute;
			z-index: 4;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			opacity: 1;
			pointer-events: none;
		}
</style>
