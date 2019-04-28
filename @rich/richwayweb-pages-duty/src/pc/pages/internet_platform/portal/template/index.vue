<template>
	<PortalPanel />
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { PortalPanel } = RichWayWebComponents;

export default {
    name: `portal`,
    components: {
        PortalPanel
    }
};
</script>

<style lang="scss" scoped>
		.content-portal {
			position: relative;
		}
</style>
