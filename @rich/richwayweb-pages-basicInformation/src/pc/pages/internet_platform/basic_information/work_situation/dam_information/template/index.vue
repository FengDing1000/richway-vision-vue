<template>
	<div class="content content-dam-information">
		<BuildPanel page-name="堤防信息" />
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
        this._log(`dam_information has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-dam-information {
        position: relative;
    }
</style>
