<template>
	<div
		v-show="show"
		class="richway-map-loading">
		<div class="content-loading">
			<i class="richway-icon richway-anim richway-anim-loop richway-anim-rotate icon-loading" />
			<span>数据加载中，请稍后...</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `mapLoading`,
    props: {
        show: {
            type: Boolean,
            default: true
        }
    }
};
</script>

<style lang="scss" scoped>
		.richway-map-loading {
			position: absolute;
			z-index: 4;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: #fff;
			opacity: .6;

			.content-loading {
				position: absolute;
				top: 50%;
				left: 50%;
				display: inline-block;
				width: 12rem;
				height: 3rem;
				padding: .5rem;
				border-radius: 4px;
				color: #fff;
				background: #000;
				transform: translate(-50%, -50%);

				> span {
					padding-left: 1rem;
				}
			}

			.richway-icon {
				display: inline-block;
				width: 2rem;
				height: 2rem;
				font-size: 2rem;
				vertical-align: middle;
			}
		}
</style>
