<template>
	<div class="content content-comprehensive-analysis">
		<BuildPanel page-name="综合分析" />
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
        this._log(`comprehensive_analysis has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-comprehensive-analysis{
      position: relative;
    }
</style>
