<template>
    <div class="bar-item bar-btn richway-touch-btn">
        <i
            :class="[config.icon || 'icon-layer']"
            @click="handleClick"
            class="richway-icon bar-base-layer" />

        <mt-popup
            v-model="popupVisible"
            class="base-layer-popup"
            position="bottom">
            <div class="base-layer-panel">
                <ul v-if="layerList.length">
                    <li
                        v-for="(item, index) in layerList"
                        :key="index"
                        class="layer-panel-li">
                        <p>{{ item.title }}</p>
                        <ul>
                            <li
                                v-for="(subItem, subIndex) in item.list"
                                :key="subIndex"
                                :class="[subItem.id === currentLayerId ? 'active' : '']"
                                class="layer-sub-li">
                                <p>{{ subItem.config.title }}</p>
                                <img
                                    :src="getImgPath(subItem.config.icon)"
                                    @click="changeLayer(subItem)">
                            </li>
                        </ul>
                    </li>
                </ul>
                <p v-else>暂时没有可以选择的底图</p>
            </div>
        </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import baseLayer from "../../../../../pc/components/map/layers/baseLayer";

    export default {
        name: `BaseLayerControl`,
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
                layerList: [],
                currentLayerId: ``,
                currentLayerContent: {}
            };
        },
        computed: {},
        mounted() {
            this.$mapLayersFun.MapBaseLayersListenFun((arr = []) => {
                for (const item of arr) {
                    for (const subItem of item.list) {
                        if (subItem.componentName) {
                            subItem.config.title = subItem.config.title || baseLayer(subItem);
                            if ((subItem.config || {}).active === true) {
                                this.currentLayerContent = baseLayer(subItem).content;
                                this.currentLayerId = subItem.id;
                            }
                        }
                    }
                    item.list = item.list.sort((a, b) => a.config.sort > b.config.sort);
                }
                this.layerList = arr.sort((a, b) => a.sort > b.sort);
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
            changeLayer(item = {}) {
                this.currentLayerId = item.id;
                this._log(`currentLayerId is ${this.currentLayerId}`);
                if (!this.map.hasLayer(baseLayer(item).content)) {
                    this.map.eachLayer(layer => {
                        if (layer._leaflet_id === this.leafletId || layer._leaflet_id === this.map._first_leaflet_id) {
                            layer.remove();
                        }
                    });
                    this.currentLayerContent = baseLayer(item).content;
                    this.map.addLayer(this.currentLayerContent);
                    this.leafletId = this.currentLayerContent._leaflet_id;
                }
            },
            getImgPath(url) {
                if (url.indexOf(`http`) > -1) {
                    return url;
                }
                return `${this.$base.path.nodeStaticResourcesHost}/images${url}`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .base-layer-popper{
        width: 17rem;
    }

    .base-layer-popup {
        width: 100%;
        color: #666;
        font-size: .6rem;
    }
    .base-layer-panel {
        max-height: 15rem;
        overflow: auto;

        > p {
            text-align: center;
            padding: .5rem 0 1rem;
        }

        .layer-panel-li {
            position: relative;
            padding: .5rem 0;

            &::after {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: .05rem;
                background: #eee;
                content: "";
            }

            &:last-child::after {
                display: none;
            }

            > p {
                padding: .1rem .25rem;
                font-size: .8rem;
                text-align: left;
                color: blue;
            }
        }

        .layer-sub-li {
            display: inline-block;
            width: 33.33%;
            padding: .25rem;
            cursor: pointer;

            > p {
                text-align: left;
            }

            > img {
                width: 100%;
                height: 1.2rem;
            }

            &:hover {
                background-color: rgba(0, 0, 0, .1);
            }
        }

        .active {
            img {
                padding: .1rem;
                border: 2px solid blue;
            }
        }
    }

</style>
