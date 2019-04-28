<template>
	<el-popover
		:placement="placement"
		popper-class="site-legend-popper"
		trigger="click">
		<div class="legend-panel">
			<div class="legend-site-category">
				<div
					v-for="(item, index) in legendInfo.siteCategoryList"
					:key="index"
					class="legend-item">
					<span class="site-abb-code">{{ item.abbCode }}</span>
					<span class="site-name">{{ item.name }}</span>
				</div>
			</div>
			<div class="legend-warning-type">
				<div
					v-for="(item, index) in legendInfo.warningTypeList"
					:key="index"
					class="legend-item">
					<span
						:class="[item.classFont]"
						class="warning-classfont" />
					<span class="warning-name">{{ item.name }}</span>
				</div>
			</div>
		</div>
		<div
			slot="reference"
			class="bar-item bar-btn">
			<i
				:class="[config.icon || 'icon-setting']"
				class="richway-icon bar-legend" />
		</div>
	</el-popover>
</template>

<script type="text/ecmascript-6">
import positionFun from "../js/position.js";
import siteType from "../../../../../constants/siteType";

export default {
    name: `LegendControl`,
    props: {
        position: {
            type: String,
            default: ``
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            legendInfo: {
                siteCategoryList: siteType.siteTypeList,
                warningTypeList: [
                    {
                        type: ``,
                        classFont: `warning-normal`,
                        name: `正常`
                    },
                    {
                        type: ``,
                        classFont: `warning-early`,
                        name: `预警`
                    },
                    {
                        type: ``,
                        classFont: `warning-call`,
                        name: `报警`
                    },
                    {
                        type: ``,
                        classFont: `warning-remind`,
                        name: `提醒`
                    }
                ]
            }
        };
    },
    computed: {
        placement() {
            return positionFun.getPlacementForPopover(this.position);
        }
    }
};
</script>

<style lang="scss">
    .site-legend-popper{
        width: 14rem;
    }
		.legend-panel {
			user-select: none;

			.legend-site-category {
				width: 11.5rem;
				padding-bottom: .5rem;
				margin: .25rem;
				background-color: #fff;

				.legend-item {
					display: inline-block;
					width: 50%;
					padding-bottom: .05rem;
					padding-left: .5rem;
					border-right: 1px solid #e0dcdc;

					&:nth-child(even) {
						border-right: none;
					}
				}

				.site-name {
					padding-left: .4rem;
				}
			}

			.legend-warning-type {
				display: flex;
				width: 100%;
				height: 2.5rem;
				border-top: 1px solid #e0dcdc;
				background-color: #fff;

				.legend-item {
					flex-grow: 1;
					padding: .5rem;
				}

				.warning-classfont {
					display: inline-block;
					width: .6rem;
					height: .6rem;
					margin-left: .5rem;
					border-radius: 50%;
				}

				.warning-name {
					float: left;
					padding-left: .25rem;
				}

				.warning-normal {
					background-color: #093;
				}

				.warning-early {
					background-color: #f00;
				}

				.warning-call {
					background-color: #fc0;
				}

				.warning-remind {
					background-color: #06c;
				}
			}
		}
</style>
