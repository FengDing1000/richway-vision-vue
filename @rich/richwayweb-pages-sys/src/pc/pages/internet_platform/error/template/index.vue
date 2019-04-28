<template>
	<ErrorPanel />
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { ErrorPanel } = RichWayWebComponents;

export default {
    name: `Error`,
    components: {
        ErrorPanel
    },
    mounted() {
        this._log(`error has mounted`);
    }
};
</script>

<style lang="scss" scoped>

</style>
