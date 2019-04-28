<template>
    <div
        class="bar-item bar-btn richway-touch-btn">
        <i
            :class="[config.icon || 'icon-group']"
            @click="handleClick"
            class="richway-icon bar-business-layer"/>

        <mt-popup
            v-model="popupVisible"
            class="business-layer-popup"
            position="bottom">
            <div class="business-layer-panel">
                <mt-checklist
                    v-if="layerList.length"
                    v-model="checkValue"
                    :options="layerList"
                    @change="changeBusinessLayer($event)"></mt-checklist>
                <p v-else>暂无可控制的图层</p>
            </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">

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
                popupVisible: false,
                checkValue: [],
                layerList: [],
            };
        },
        computed: {},
        mounted() {
            this.$mapLayersFun.MapBusinessLayersChangeListenFun(() => {
                this.getBusinessLayers();
            });

            setTimeout(() => {
                if (this.config.toggle === `show`) {
                    this.popupVisible = true;
                }
            }, 1000);
        },
        methods: {
            handleClick() {
                this.popupVisible = true;
            },
            getBusinessLayers() {
                // this.checkValue = [];
                const arr = [];
                for (const key in window._RichWay.$map.businessLayers) {
                    if (Object.hasOwnProperty.call(window._RichWay.$map.businessLayers, key)) {
                        const item = window._RichWay.$map.businessLayers[key];
                        if (!item.code) {
                            item.code = key;
                        }
                        if (item.controllByLayer === true) {
                            item.value = item.code;
                            item.label = item.title;
                            arr.push(item);
                            // this.checkValue.push(item.code);
                        }
                    }
                }
                this.layerList = arr.sort((a, b) => parseFloat(`${a.layerSort}`) > parseFloat(`${b.layerSort}`));
            },
            changeBusinessLayer(codeList) {
                for (const o of this.layerList) {
                    for (const code of codeList) {
                        if (code === o.code) {
                            if (o.visibility === true) {
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
        }
    };
</script>

<style lang="scss" scoped>
    .business-layer-popper {
        width: 4rem;
    }

    .business-layer-popup {
        width: 100%;
        color: #666;
        font-size: .6rem;
    }

    .business-layer-panel {
        max-height: 15rem;
        overflow: auto;

        p {
            text-align: center;
            padding: .5rem 0 1rem;
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
