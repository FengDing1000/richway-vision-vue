<template>
	<div class="content content-font-library">
		<IconPanel />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { IconPanel } = RichWayWebComponents;

export default {
    components: {
        IconPanel
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {
        this._log(`font_library has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-font-library{
      position: relative;
        overflow-y: auto !important;
    }
</style>
