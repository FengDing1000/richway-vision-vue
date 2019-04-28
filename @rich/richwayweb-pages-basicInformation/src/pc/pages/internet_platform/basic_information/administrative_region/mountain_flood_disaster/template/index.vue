<template>
	<div class="content content-mountain-flood_disaster">
		<BuildPanel page-name="山洪灾害影响情况" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { BuildPanel } = RichWayWebComponents;

export default {
    components: {
        BuildPanel
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {
        this._log(`mountain_flood_disaster has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-mountain-flood_disaster {
        position: relative;
    }
</style>
