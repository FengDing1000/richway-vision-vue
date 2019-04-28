<template>
	<div
		v-show="fullLoading.show"
		class="full-loading-container">
		<BaseLoading :loading-info="fullLoading" />
	</div>
</template>

<script type="text/ecmascript-6">
import BaseLoading from './baseLoading.vue';

export default {
    name: `fullLoading`,
    components: {
        BaseLoading
    },
    props: {
        fullLoading: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
		.full-loading-container {
			position: fixed;
			z-index: 99;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			display: inline-block;
		}
</style>
