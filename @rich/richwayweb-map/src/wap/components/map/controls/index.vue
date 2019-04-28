<template>
	<div
		:id="id"
		class="richway-map-control">
		<div
			v-for="(item, index) in mapControlComponents"
			:key="index"
			:class="[item.className, 'bar-' + item.code]">
			<component
				v-for="(subItem, subIndex) in item.components"
				:is="subItem.componentName"
				:map="map"
				:map-options="mapOptions"
				:config="subItem.config || {}"
				:position="item.code"
				:key="subIndex" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import controlsComponentsList from './index.js';
import positionType from '../../../../constants/positionType';

export default {
    name: `mainMapControl`,
    components: controlsComponentsList,
    props: {
        map: {
            type: Object,
            default: () => {}
        },
        mapOptions: {
            type: Object,
            default: () => {}
        },
        controlComponents: {
            type: Array,
            default: () => []
        },
        id: {
            type: String,
            default: `control`
        }
    },
    data() {
        return {};
    },
    computed: {
        mapControlComponents() {
            const arr = [];
            for (const item of positionType.positionTypeList) {
                arr.push(Object.assign({
                    components: []
                }, item));
            }
            for (const item of this.controlComponents) {
                for (const subItem of arr) {
                    if (item.config.position === subItem.code) {
                        let hasThisComponent = false;
                        for (const o of subItem.components) {
                            if (o.id === item.id) {
                                hasThisComponent = true;
                                break;
                            }
                        }
                        if (!hasThisComponent) {
                            subItem.components.push(item);
                        }
                        break;
                    }
                }
            }

            // 排序
            for (const item of arr) {
                item.components.sort((a, b) => a.config.sort > b.config.sort);
            }

            return arr;
        }
    }
};
</script>

<style lang="scss">
		.richway-map-control {
			position: absolute;
			z-index: 3;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			opacity: 1;
			pointer-events: none;

			.bar-item {
				pointer-events: auto;
			}

			.bar-btn {
				position: relative;
				display: table;
				width: 1.5rem;
				height: 1.5rem;
				border: 1px solid #666;
				border-radius: 3px;
				background: #fff;

				>.richway-icon {
					display: table-cell;
					font-size: 1rem;
					text-align: center;
					vertical-align: middle;
				}

				.disabled {
					background: rgba(0, 0, 0, .1);
					cursor: not-allowed;
				}

				&:hover {
					border: 1px solid #fff;
					color: #fff;
					background: rgba(0, 0, 0, .4);
				}
			}

			.bar-top,
			.bar-bottom {
				position: absolute;
				display: inline-block;
				height: 1.5rem;
				cursor: pointer;

				.bar-item {
					float: left;
					margin-left: .5rem;
				}
			}

			.bar-top {
				top: .2rem;
			}

			.bar-bottom {
				bottom: .2rem;
			}

			.bar-top-left,
			.bar-bottom-left {
				left: 3rem;
			}

			.bar-top-right,
			.bar-bottom-right {
				right: 3rem;
			}

			.bar-left,
			.bar-right {
				position: absolute;
				display: inline-block;
				width: 1.5rem;
				cursor: pointer;

				.bar-item {
					margin-bottom: .2rem;
				}
                >div {
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
			}

			.bar-left {
				left: .3rem;
			}

			.bar-right {
				right: .3rem;
			}

			.bar-left-top,
			.bar-right-top {
				top: .3rem;
			}

			.bar-left-bottom,
			.bar-right-bottom {
				bottom: .3rem;
			}
		}

		.site-marker-spot {
			border-radius: 50%;
			font-size: 1rem;
			text-align: center;
			color: #fff;
			background-color: red;
		}
</style>
