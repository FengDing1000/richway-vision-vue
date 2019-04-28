<template>
	<div class="richway-build-panel">
		<div class="richway-build-tit">
			<img
				:src="buildSrc"
				class="build-img">
			<h2><strong>{{ pageName }}</strong>页面建设中，敬请期待！</h2>
			<p class="english-text">Please look forward to the page construction!</p>
			<p style="margin-top: .5rem;">
				<el-button
					type="primary"
					round
					@click="handlerHomePage">返回首页
				</el-button>
			</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
const imgBuilding = require(`./../images/building.png`);

export default {
    // 页面建设提示组件
    name: `buildPanel`,
    props: {
        pageName: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            buildSrc: imgBuilding
        };
    },
    methods: {
        handlerHomePage() {
            window.top.location.href = `/`;
        }
    }
};
</script>

<style lang="scss" scoped>
		.richway-build-panel {
			position: relative;
			width: 35rem;
			padding-top: 5rem;
			margin: 0 auto;
			line-height: 1.5rem;

			.richway-build-tit {
				position: relative;
				padding-top: 1.5rem;
				padding-left: 10.5rem;
				margin-bottom: .5rem;
				line-height: 1.5rem;

				img {
					position: absolute;
					top: 0;
					left: 0;
					width: 10rem;
				}

				h2,
				.english-text {
					font-size: .9rem;
				}

				strong {
					margin-right: .5rem;
					color: blue;
				}
			}
		}
</style>
