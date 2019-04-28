<template>
	<div class="content content-history-disaster">
		<BuildPanel page-name="历史灾情" />
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
        this._log(`history_disaster has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-history-disaster {
        position: relative;
    }
</style>
