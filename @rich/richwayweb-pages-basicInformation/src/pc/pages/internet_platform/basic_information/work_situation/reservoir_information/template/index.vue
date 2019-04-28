<template>
	<div class="content content-reservoir-information">
		<BuildPanel page-name="水库信息" />
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
        this._log(`reservoir_information has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-reservoir-information {
        position: relative;
    }
</style>
