<template>
	<transition
		mode="out-in"
		enter-active-class="slideInUp animated"
		leave-active-class="slideOutDown animated">
		<div
			v-show="showBackStatus"
			class="icon-back-top"
			@click="backTop">
			<i class="richway-icon icon-up-arrow" />
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

const { eventHandler, throttleDuration } = RichWayWebUtils;

export default {
    // 返回顶部
    name: `backTop`,
    data() {
        return {
            showBackStatus: false
        };
    },
    watch: {
        $route() {
            this.showBackStatus = false;
        }
    },
    mounted() {
        this.initScroll();
    },
    methods: {
        initScroll() {
            let requestFram;
            let oldScrollTop;
            let [wrapper] = document.querySelectorAll(`.richway-main`);

            const showBackFun = () => {
                if (wrapper.scrollTop > 100) {
                    this.showBackStatus = true;
                } else {
                    this.showBackStatus = false;
                }
            };
            const moveEnd = () => {
                requestFram = requestAnimationFrame(() => {
                    if (wrapper.scrollTop !== oldScrollTop) {
                        oldScrollTop = wrapper.scrollTop;
                        moveEnd();
                    } else {
                        cancelAnimationFrame(requestFram);
                    }
                    showBackFun();
                });
            };
            eventHandler.addHandler(wrapper, `scroll`, throttleDuration(() => {
                showBackFun();
            }, 400, 400));

            eventHandler.addHandler(document, `touchstart`, () => {
                [wrapper] = document.querySelectorAll(`.richway-main`);
                wrapper.removeEventListener(`scroll`, showBackFun, false);
                wrapper.addEventListener(`scroll`, showBackFun, false);

                showBackFun();
            });

            eventHandler.addHandler(document, `touchmove`, () => {
                showBackFun();
            });

            eventHandler.addHandler(document, `touchend`, () => {
                oldScrollTop = wrapper.scrollTop;
                moveEnd();
            });
        },

        backTop() {
            document.querySelectorAll(`.richway-main`)[0].scrollTop = 0;
        }
    }
};
</script>

<style lang="scss" scoped>
		.icon-back-top {
			position: fixed;
			z-index: 9;
			bottom: 2.5rem;
			right: 2.5rem;
			box-sizing: border-box;
			width: 2.5rem;
			height: 2.5rem;
			border: 1px solid rgb(255, 255, 255);
			border-radius: 50%;
			font-size: 1.5rem;
			line-height: 2.5rem;
			text-align: center;
			color: rgb(255, 255, 255);
			background: #545c64;
			cursor: pointer;
		}
</style>
