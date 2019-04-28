<template>
	<div class="water-level-sketch-map">
		<div class="sketch-map-title">水位示意图</div>
		<div class="sketch-map-content">
			<span class="span1" />
			<span class="span2" />
			<span class="span3" />
			<span class="span4" />
			<span class="span5" />
			<!--地面标高线-->
			<span class="span6">
				<span class="span-left">{{ groundHeightStandard }}(m)<br>地面标高</span>
				<span class="span-right">{{ groundHeight }}(m)<br>井深</span>
			</span>
			<!--管顶标高线-->
			<span class="span7">
				<span class="span-left">{{ conduitHeightStandard }}(m)<br>管顶标高</span>
				<span class="span-right">{{ conduitHeight }}(m)<br>管顶</span>
			</span>
			<!--井底标高线-->
			<span class="span8">
				<span class="span-left">{{ wellHeightStandard }}(m)<br>井底标高</span>
				<span class="span-right">{{ wellHeight }}(m)<br></span>
			</span>
			<span
				:style="{height:waterH}"
				class="span9">
				<span>水深:{{ waterDepth }}(m)</span>
			</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

const _log = RichWayWebUtils.console.log;

export default {
    name: `WaterLevelSketchMap`,
    props: {
        title: {
            type: String,
            default: ``
        },
        groundHeight: {
            type: String,
            default: `2`
        },
        groundHeightStandard: {
            type: String,
            default: `2`
        },
        conduitHeight: {
            type: String,
            default: `0.8`
        },
        conduitHeightStandard: {
            type: String,
            default: `0.8`
        },
        wellHeight: {
            type: String,
            default: `0`
        },
        wellHeightStandard: {
            type: String,
            default: `0`
        },
        waterDepth: {
            type: String,
            default: `0`
        }
    },
    data() {
        return {};
    },
    computed: {
        waterH() {
            return `${this.waterDepth}px`;
        }
    },
    mounted() {
        _log(`waterLevelSketchMap has mounted`);
    }

};
</script>

<style lang="scss" scoped>
		.water-level-sketch-map {
			.sketch-map-title {
				padding-bottom: 6px;
				text-align: center;
			}

			.sketch-map-content {
				position: relative;
				height: 160px;
				padding: 0 10px;
				font-size: 12px;

				> span {
					position: absolute;
					display: inline-block;
				}
			}

			.span1,
			.span2,
			.span3,
			.span4,
			.span5 {
				top: 0;
				bottom: 50px;
			}

			.span1,
			.span5 {
				width: 50px;
			}

			.span1 {
				left: 0;
			}

			.span5 {
				right: 0;
			}

			.span2,
			.span4 {
				width: 60px;
				border-top: 2px solid #898989;
				background-color: #fbbea5;
			}

			.span2 {
				left: 50px;
				border-left: 2px solid #898989;
			}

			.span4 {
				right: 50px;
				border-right: 2px solid #898989;
			}

			.span3 {
				left: 110px;
				right: 110px;
			}

			.span6,
			.span7,
			.span8 {
				left: 0;
				right: 0;
				height: 1px;
				text-align: left;
				background-color: #999;

				> span {
					position: absolute;
					top: -15px;
					display: inline-block;
				}

				.span-right {
					right: 0;
					text-align: right;
				}
			}

			.span6 {
				top: 0;
			}

			.span7 {
				bottom: 50px;
			}

			.span8 {
				bottom: 0;
			}

			.span9 {
				bottom: 0;
				left: 50px;
				right: 50px;
				height: 0;
				text-align: center;
				color: blue;
				background-color: #898989;
				transition: all .3s;

				> span {
					position: absolute;
					top: -20px;
					left: 0;
					right: 0;
					display: inline-block;
				}
			}
		}
</style>
