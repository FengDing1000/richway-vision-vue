<template>
	<el-popover
		:placement="placement"
		popper-class="business-layer-popper"
		trigger="click">
		<div class="business-layer-panel">
			<ul v-if="layerList.length">
				<li
					v-for="(item, index) in layerList"
					:key="index">
					<el-checkbox
						v-model="currentBusinessLayerInfo[item.code]"
						:label="item.code"
						@change="changeBusinessLayer(item)">{{ item.title }}
					</el-checkbox>
				</li>
			</ul>
			<p v-else>暂无可控制的图层</p>
		</div>
		<div
			slot="reference"
			ref="popEl"
			class="bar-item bar-btn">
			<i
				:class="[config.icon || 'icon-group']"
				class="richway-icon bar-business-layer" />
		</div>
	</el-popover>
</template>

<script type="text/ecmascript-6">
import positionFun from "../js/position.js";

export default {
    name: `BusinessLayerControl`,
    props: {
        position: {
            type: String,
            default: ``
        },
        map: {
            type: Object,
            default: () => ({})
        },
        mapOptions: {
            type: Object,
            default: () => ({})
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            currentBusinessLayerInfo: {},
            layerList: []
        };
    },
    computed: {
        placement() {
            return positionFun.getPlacementForPopover(this.position);
        }
    },
    mounted() {
        this.$mapLayersFun.MapBusinessLayersChangeListenFun(() => {
            this.getBusinessLayers();
        });

        setTimeout(() => {
            if (this.config.toggle === `show`) {
                this.$refs.popEl.click();
            }
        }, 1000);
    },
    methods: {
        getBusinessLayers() {
            const arr = [];
            this.currentBusinessLayerInfo = {};
            for (const key in window._RichWay.$map.businessLayers) {
                if (Object.hasOwnProperty.call(window._RichWay.$map.businessLayers, key)) {
                    const item = window._RichWay.$map.businessLayers[key];
                    if (!item.code) {
                        item.code = key;
                    }
                    if (item.controllByLayer === true) {
                        arr.push(item);
                        this.currentBusinessLayerInfo[item.code] = item.visibility;
                    }
                }
            }
            this.layerList = arr.sort((a, b) => parseFloat(`${a.layerSort}`) > parseFloat(`${b.layerSort}`));
        },
        changeBusinessLayer(item) {
            for (const o of this.layerList) {
                if (item.code === o.code) {
                    if (this.currentBusinessLayerInfo[item.code] === true) {
                        if (typeof ((o.layer || {}).createGraphics) === `function`) {
                            o.layer.createGraphics();
                        }
                    } else if (typeof ((o.layer || {}).clearGraphics) === `function`) {
                        o.layer.clearGraphics();
                    }
                }
            }
        }
    }
};
</script>

<style lang="scss">
    .business-layer-popper{
        width: 4rem;
    }
		.business-layer-panel {
			max-height: 15rem;
			margin-right: -.6rem;
			margin-left: -.6rem;
			overflow: auto;

			p {
				text-align: center;
			}

			li {
				position: relative;
				padding: .5rem 0 .2rem .5rem;

				&::after {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					display: inline-block;
					height: .05rem;
					background-color: #eee;
					content: "";
				}

				&:last-child {
					&::after {
						display: none;
					}
				}

				&:hover {
					background-color: rgba(0, 0, 0, .1);
				}
			}

			.el-checkbox {
				display: block;
				margin-bottom: .2rem;
				margin-left: 0 !important;
			}
		}

</style>
