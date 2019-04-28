<template>
	<LoginPanelExp success-url="/vision_list_project/realtime_monitoring"></LoginPanelExp>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { LoginPanelExp } = RichWayWebComponents;

export default {
    components: {
        LoginPanelExp
    },
    mounted() {
        this._log(`login has mounted`);
    }
};
</script>
