<template>
	<main
		:class="[slide ? 'has-slide' : '']"
		class="richway-main richway-clear">
		<!--左侧导航菜单-->
		<Slide v-if="slide" />
		<!--面包屑-->
		<MenuBreadcrumb
			v-if="breadcrumb"
			:bread-crumb="breadCrumbList" />
		<div id="mainContentPre" />
		<div
			v-loading="loading"
			:style="contentMaxH"
			class="richway-content">
			<!--<transition-->
			<!--mode="out-in"-->
			<!--enter-active-class="slideInUp animated"-->
			<!--leave-active-class="fadeOut animated">-->
			<!--<keep-alive>-->
			<!--<router-view />-->
			<!--</keep-alive>-->
			<!--</transition>-->
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive" />
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive" />
		</div>
		<slot name="mainSlot" />
	</main>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import { getMainContentMaxH } from '../../../../utils/pageInfo';

const { mapState } = require(`vuex`);
const { eventHandler, throttleDuration } = RichWayWebUtils;
const Slide = r => require.ensure([], () => r(require(`../slide`)), `components/layout/base`);
const MenuBreadcrumb = r => require.ensure([], () => r(require(`../../../navmenu/menuBreadcrumb`)), `richway_components`);

export default {
    name: `layoutMain`,
    components: {
        Slide,
        MenuBreadcrumb
    },
    props: {
        slide: {
            type: Boolean,
            default: true
        },
        breadcrumb: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            contentMaxH: {
                maxHeight: `600px`
            }
        };
    },
    computed: {
        ...mapState([`currentPageInfo`, `breadCrumbList`]),
        loading() {
            return this.currentPageInfo.loading;
        }
    },
    watch: {
        $route() {
            if (typeof (this.bodyResize) === `function`) {
                this.bodyResize();
            }
        }
    },
    mounted() {
        eventHandler.addHandler(window, `resize`, this.bodyResize);
        this.bodyResize();
    },
    destroyed() {
        eventHandler.removeHandler(window, `resize`, this.bodyResize);
    },
    methods: {
        bodyResize() {
            throttleDuration(() => {
                this.contentMaxH.maxHeight = `${getMainContentMaxH()}px`;
            }, 400, 400)();
        }
    }
};
</script>

<style lang="scss">
    .richway-layout-base {
        .richway-main {
            position: relative;
            box-sizing: border-box;
            height: 100%;
            overflow: hidden;
            .richway-content{
                height:100%;
            }

            .content {
                height: 100%;
                padding: .5rem 1.2rem 0;
                overflow: hidden;
                box-sizing: border-box;
            }
        }

        .has-slide {
            &.richway-main {
                padding-left: 8.1rem;
            }
        }
    }
</style>
