<template>
	<div
		v-show="briefLoading.show"
		class="brief-loading-container">
		<BaseLoading :loading-info="briefLoading" />
	</div>
</template>

<script type="text/ecmascript-6">
import BaseLoading from './baseLoading.vue';

export default {
    name: `briefLoading`,
    components: {
        BaseLoading
    },
    props: {
        briefLoading: {
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
		.brief-loading-container {
			position: fixed;
			z-index: 99;
			bottom: 1rem;
			right: .5rem;
			display: inline-block;
			min-width: 11rem;
			height: 1.75rem;
			overflow: hidden;
		}
</style>
