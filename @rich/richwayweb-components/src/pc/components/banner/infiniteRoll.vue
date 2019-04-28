<template>
	<div class="banner-outer-wrapper">
		<div class="banner-inner-wrapper" :style="{color}">
			<span
				:style="firstAnimation"
				class="first-banner">
				<span
					v-for="(item,index) in contentList"
					:key="index"><i
						:class="[icon]"
						class="richway-icon" />{{ item.content }}</span>
			</span>
			<span
				:style="secondAnimation"
				class="second-banner">
				<span
					v-for="(item,index) in contentList"
					:key="index"><i
						:class="[icon]"
						class="richway-icon" />{{ item.content }}</span>
			</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `infiniteRoll`,
    props: {
        contentList: {
            type: Array,
            default: () => []
        },
        speed: {
            type: Number,
            default: 1
        },
        icon: {
            type: String,
            default: `icon-radio-check`
        },
        color:{
            type: String,
            default: `#fff`
        }
    },
    data() {
        return {};
    },
    computed: {
        firstAnimation() {
            const second = this.getSecond();
            return {
                animation: `${second}s first-banner linear infinite normal`
            };
        },
        secondAnimation() {
            const second = this.getSecond();
            return {
                animation: `${second}s first-banner linear ${Math.floor(second / 2)}s infinite normal`
            };
        }
    },
    methods: {
        getSecond() {
            let len = 0;
            for (const str of this.contentList) {
                len += (str.content || ``).length;
            }

            return Math.floor(len / (4 * this.speed));
        }
    }
};
</script>

<style lang="scss">
    .monitor-banner {
        display: inline-block;
        width: 1000px;
        margin-left: 1rem;
    }

    .banner-outer-wrapper {
        display: inline-block;
        width: 90%;
        overflow: hidden;
    }

    .banner-inner-wrapper {
        position: relative;
        height: 2rem;
        margin: 0 auto;
        font-size: .7rem;
        line-height: 2rem;
        white-space: nowrap;

        > span {
            position: absolute;
            top: 0;
            left: 100%;
            height: 100%;
        }

        .richway-icon {
            position: relative;
            top: .2rem;
            margin-right: .2rem;
            margin-left: .5rem;
        }
    }

    .first-banner {
        padding-right: 40%;
    }

    @keyframes first-banner {
        0% {
            transform: translate3d(0, 0, 0);
        }

        100% {
            display: none;
            transform: translate3d(-200%, 0, 0);
        }
    }

    .second-banner {
        padding-right: 33%;
    }

    @keyframes second-banner {
        0% {
            transform: translate3d(0%, 0, 0);
        }

        100% {
            display: none;
            transform: translate3d(-200%, 0, 0);
        }
    }
</style>
