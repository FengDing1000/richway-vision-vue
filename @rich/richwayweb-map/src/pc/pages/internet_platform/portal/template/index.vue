<template>
	<PortalPanel />
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { PortalPanel } = RichWayWebComponents;

export default {
    components: {
        PortalPanel
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
