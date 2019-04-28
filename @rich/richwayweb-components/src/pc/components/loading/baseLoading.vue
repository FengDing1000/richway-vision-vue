<template>
	<LoadingMask :loading-info="baseLoading">
		<template slot="spinner">
			<div
				:style="{'background':baseLoading.backgroundSpinner}"
				class="richway-loading-spinner">
				<i
					:class="[baseLoading.icon]"
					class="richway-icon richway-anim richway-anim-loop richway-anim-rotate" />
				<span>{{ baseLoading.text }}</span>
			</div>
		</template>
	</LoadingMask>
</template>

<script type="text/ecmascript-6">
import LoadingMask from './loadingMask.vue';

export default {
    name: `baseLoading`,
    components: {
        LoadingMask
    },
    props: {
        loadingInfo: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {};
    },
    computed: {
        baseLoading() {
            return {
                // show: this.loadingInfo.show || false,
                position: this.loadingInfo.position || `full`,
                text: this.loadingInfo.text || `正在加载3...`,
                backgroundMask: this.loadingInfo.backgroundMask || `rgba(0,0,0,0)`,
                backgroundSpinner: this.loadingInfo.backgroundSpinner || `#2f96b4`,
                icon: this.loadingInfo.icon || `icon-loading`,
                skin: this.loadingInfo.skin || ``
            };
        }
    }
};
</script>

<style lang="scss" scoped>
		.richway-loading-spinner {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 11rem;
			height: 1.8rem;
			border-radius: 4px;
			line-height: 1.8rem;
			text-align: center;
			color: #fff;
			background: #2f96b4;
			transform: translate(-50%, -50%);

			.richway-icon {
				position: relative;
				top: .2rem;
				display: inline-block;
				margin-right: .3rem;
				font-size: 1rem;
			}
		}

		.full {
			.richway-loading-spinner {
				width: 16rem;
				height: 4.5rem;
				padding-left: 1.5rem;
				line-height: 4.5rem;
				text-align: left;
			}
		}
</style>
