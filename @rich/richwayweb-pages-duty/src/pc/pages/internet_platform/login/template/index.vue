<template>
	<LoginPanel success-url="/internet_platform/duty_management/arrangement" />
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { LoginPanel } = RichWayWebComponents;

export default {
    components: {
        LoginPanel
    }
};
</script>
