<template>
	<div class="content content-portal">
		<BuildPanel page-name="首页" />
	</div>
</template>

<script type="text/ecmascript-6">
import BuildPanel from '../../../../components/buildPanel';

export default {
    components: {
        BuildPanel
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {
        this._log(`portal has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
		.content-portal {
			position: relative;
		}
</style>
