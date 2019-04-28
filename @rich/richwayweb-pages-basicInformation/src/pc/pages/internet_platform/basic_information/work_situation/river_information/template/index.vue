<template>
	<div class="content content-river-information">
		<BuildPanel page-name="水情信息" />
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
        this._log(`river_information has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-river-information {
        position: relative;
    }
</style>
