<template>
	<div
		v-loading="loading"
		class="iframe-content">
		<iframe
			id="myfarme"
			:src="iframeSrc"
			frameborder="0"
			scrolling="auto"
			style="height: 100%; width: 100%;"
			@load="handleIframeLoad" />
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `vueIframe`,
    components: {},
    props: {
        url: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        iframeSrc() {
            return this.url;
        }
    },
    mounted() {
        this._log(`vueIframe has mounted`);
        this.loading = true;
    },
    methods: {
        handleIframeLoad() {
            this.loading = false;
        }
    }
};
</script>

<style lang="scss" scoped>
    .iframe-content {
        position: relative;
        height: 100%;
    }
</style>
