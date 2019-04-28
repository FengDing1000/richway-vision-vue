<template>
	<div class="content content-">
		<BuildPanel page-name="人员管理" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';

const _log = RichWayWebUtils.console.log;
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
        _log(` has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
		.content {
			position: relative;
		}
</style>
