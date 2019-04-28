<template>
	<main
		class="richway-main richway-clear">
		<div
			v-loading="loading"
			class="richway-content">
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

const { mapState } = require(`vuex`);
const { eventHandler, throttleDuration } = RichWayWebUtils;

export default {
    name: `mainContainer`,
    data() {
        return {};
    },
    computed: {
        ...mapState([`currentPageInfo`]),
        loading() {
            return this.currentPageInfo.loading;
        }
    }
};
</script>

<style lang="scss">
    .richway-layout-wap-base {
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
    }
</style>
