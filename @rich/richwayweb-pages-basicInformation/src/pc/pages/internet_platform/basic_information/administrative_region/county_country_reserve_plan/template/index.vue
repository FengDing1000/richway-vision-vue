<template>
	<div class="content content-county-country_reserve_plan">
		<BuildPanel page-name="县乡村预案" />
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
        this._log(`county_country_reserve_plan has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-county-country_reserve_plan {
        position: relative;
    }
</style>
