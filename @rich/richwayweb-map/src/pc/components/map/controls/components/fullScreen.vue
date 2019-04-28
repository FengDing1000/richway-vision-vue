<template>
	<div class="bar-item bar-btn">
		<el-tooltip
			:content="title"
			:placement="placement"
			effect="dark">
			<i
				:class="[status === 'exit-full' ? 'icon-full-screen' : 'icon-exit-full']"
				class="richway-icon bar-full-screen"
				@click="fullScreen" />
		</el-tooltip>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import positionFun from "../js/position.js";

const { toggleFullScreen } = RichWayWebUtils;

export default {
    name: `FullScreenControl`,
    props: {
        position: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            status: `exit-full`
        };
    },
    computed: {
        title() {
            return this.status === `exit-full` ? `进入全屏` : `退出全屏`;
        },
        placement() {
            return positionFun.getPlacementForTooltip(this.position);
        }
    },
    methods: {
        // 全屏
        fullScreen() {
            this._log(`fullScreen`);
            this.status = toggleFullScreen(this.status === `exit-full`);
        }
    }
};
</script>

<style lang="scss">

</style>
