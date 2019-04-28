<template>
	<div class="content-left-right">
        <div class="content-left" :style="{width}">
			<slot name="left" />
		</div>
		<div class="content-right">
			<slot name="right" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        width: {
            type: String,
            default: `15rem`
        }
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
    .content-left-right{
        display: flex;
        height: 100%;
        .content-left{
            background-color: #fff;
            overflow: auto;
            margin-right: 1rem;
        }
        .content-right {
            flex-grow: 1;
            overflow: auto;
            background-color: #fff;
        }
    }
</style>
