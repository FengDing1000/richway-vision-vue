<template>
	<div class="content content-county-country_information">
		<BuildPanel page-name="县乡村基本信息" />
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
        this._log(`county_country_information has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-county-country_information {
        position: relative;
    }
</style>
