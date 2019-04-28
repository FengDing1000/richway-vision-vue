<template>
	<footer class="richway-footer">
        <slot name="footerSlot" />
	</footer>
</template>

<script type="text/ecmascript-6">
export default {
    name: `layoutFooter`
};
</script>

<style lang="scss">
    .richway-layout-base{
        .richway-footer {
            position: absolute;
            bottom: 0;
            z-index: 4;
            height: 1.5rem;
            line-height: 3rem;
            text-align: right;
            color: #fff;
            background: rgba(0, 0, 0, .6);
        }
    }
</style>
