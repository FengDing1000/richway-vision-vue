<template>
	<div
		:class="[baseLoading.skin]"
		class="richway-loading-container">
		<div
			:style="{'background':baseLoading.backgroundMask}"
			class="richway-loading-mask" />
		<slot name="spinner" />
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `baseLoading`,
    props: {
        loadingInfo: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {};
    },
    computed: {
        baseLoading() {
            return {
                backgroundMask: this.loadingInfo.backgroundMask || `rgba(0,0,0,0)`,
                skin: this.loadingInfo.skin || ``
            };
        }
    }
};
</script>

<style lang="scss" scoped>
		.richway-loading-container {
			position: relative;
			width: 100%;
			height: 100%;
		}

		.richway-loading-mask {
			width: 100%;
			height: 100%;
		}
</style>
