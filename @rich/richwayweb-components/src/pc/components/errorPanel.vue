<template>
	<div class="richway-error-panel">
		<div class="richway-error-tit">
			<i class="richway-icon icon-tree" />
			<h2>{{ message }}</h2>
			<p class="english-text">Sorry, The server can't find the requested page.</p>
		</div>
		<div class="richway-error-text">
			<p>1.请检查您输入的信息是否正确</p>
			<p>2.点击<a
				href="javascript:window.top.location.href='/'"
				class="hna-purpe"> 获取帮助</a>，或<a
					href="javascript:window.top.location.href='/'"
					class="hna-purpe"> 联系我们</a></p>
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
import RichWayWebUtils from '@rich/richwayweb-utils';

const { uncompile } = RichWayWebUtils.compile;

export default {
    // 错误提示组件
    name: `errorPanel`,
    data() {
        return {
            params: {}
        };
    },
    computed: {
        message() {
            return this.params.message || `非常抱歉，未能找到您所访问的页面！`;
        }
    },
    created() {
        this.params = this.$route.query.q;
        if (this.params) {
            try {
                this.params = JSON.parse(uncompile(this.params)) || {};
            } catch (e) {
                this.params = {};
            }
        }
    },
    mounted() {
        this._log(`error has mounted`);
    },
    methods: {
        handlerHomePage() {
            window.top.location.href = `/`;
        }
    }

};
</script>

<style lang="scss" scoped>
		.richway-error-panel {
			position: relative;
			width: 37.5rem;
			padding: 15% .75rem;
			margin: 0 auto;
			line-height: 1.5rem;

			.richway-error-text {
				padding-left: 4.5rem;
				font-size: .8rem;
				color: #666;
			}

			.richway-error-tit {
				position: relative;
				padding-left: 4.5rem;
				margin-bottom: .5rem;
				line-height: 1.5rem;
                h2{
                    font-size: 1.5rem;
                    font-weight: 600;
                    padding: .8rem 0;
                }
				.english-text {
					font-size: .9rem;
				}
			}

			.richway-icon {
				position: absolute;
				top: 0;
				left: 0;
				margin-right: .5rem;
				font-size: 3.25rem;
				vertical-align: middle;
				color: #333;
			}

			a {
				color: blue;
			}
		}
</style>
