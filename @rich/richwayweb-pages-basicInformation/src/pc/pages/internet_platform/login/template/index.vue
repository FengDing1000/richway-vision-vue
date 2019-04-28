<template>
	<LoginPanel />
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { LoginPanel } = RichWayWebComponents;

export default {
    components: {
        LoginPanel
    },
    mounted() {
        this._log(`login has mounted`);
    }
};
</script>
