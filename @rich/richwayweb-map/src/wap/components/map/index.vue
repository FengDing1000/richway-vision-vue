<template>
	<div style="position: relative;">
		<div
			:id="domID"
			class="richway-map-container">
			<div
				:id="mapInfoId"
				class="richway-map-info" />
			<ControlsComponents
				:id="mapControlId"
				:map="map"
				:map-options="mapOptions"
				:control-components="controlComponents" />
            <MapLoading :show="loadingShow" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import './index.scss';
import RichWayWebUtils from '@rich/richwayweb-utils';
import baseLayer from '../../../pc/components/map/layers/baseLayer';
import ControlsComponents from './controls/index.vue';
import PluginsComponents from '../../../pc/components/map/plugins';
import MapLayers from '../../../pc/components/map/layers';
import MapLoading from '../../../pc/components/map/controls/components/loading.vue';
import { getMainContentMaxH } from '@rich/richwayweb-components/src/wap/utils/pageInfo';
import * as _modulesType from "../../../constants/modulesType";
import MapBroadcast from "../../../pc/components/map/layers/broadcast";

const { createNamespacedHelpers } = require(`vuex`);
const L = require(`leaflet`);
const { guid, eventHandler, throttleDuration, getBodySizeInfo } = RichWayWebUtils;
const { mapState, mapMutations } = createNamespacedHelpers(_modulesType.MapMonitoring);

window._RichWay.$mapLayersFun = MapBroadcast();

export default {
    name: `MapBase`,
    components: {
        ControlsComponents,
        MapLoading
    },
    props: {
        mapConfig: {
            type: Array,
            default: () => []
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        offsetX: {
            type: Number,
            default: 0
        },
        offsetY: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            map: null,
            domID: guid(),
            mapLoad: false,
            loadingShow: true,
            mapMarkerGroup: {}
        };
    },
    computed: {
        ...mapState([
            `mapOptions`
        ]),
        mapInfoId() {
            return `map_info_${this.domID}`;
        },
        mapControlId() {
            return `map_control_${this.domID}`;
        },
        mapBusinessId() {
            return `map_business_${this.domID}`;
        },
        mapInitData() {
            const mapViewInfo = this.getMapView();
            return {
                center: mapViewInfo.center,
                zoom: mapViewInfo.zoom,
                minZoom: mapViewInfo.minZoom,
                maxZoom: mapViewInfo.maxZoom,
                layerIndex: mapViewInfo.layerIndex
            };
        },
        mapBaseLayers() {
            const mapViewInfo = this.getMapView();
            return (((mapViewInfo.regions || []).find((item = {}) => item.id === `BaseLayers`)) || {}).components || [];
        },
        mapBusinessLayers() {
            const mapViewInfo = this.getMapView();
            return (((mapViewInfo.regions || []).find((item = {}) => item.id === `BusinessLayers`)) || {}).components || [];
        },
        controlComponents() {
            const mapViewInfo = this.getMapView();
            return (((mapViewInfo.regions || []).find((item = {}) => item.id === `Controls`)) || {}).components || [];
        },
        pluginsComponents() {
            const mapViewInfo = this.getMapView();
            return (((mapViewInfo.regions || []).find((item = {}) => item.id === `Plugins`)) || {}).components || [];
        }
    },
    mounted() {
        this._log(`map: mounted...`);
        this.initMap();
        this.initData();
        // 事件委托
        eventHandler.addHandler(window, `resize`, this.resizeMap);
    },
    // activated() {
    //     this._log(`map: activated...`);
    //     // 事件委托
    //     eventHandler.addHandler(window, `resize`, this.resizeMap);
    //     this.initData();
    // },
    // deactivated() {
    //     this._log(`map: deactivated...`);
    //     // 组件销毁的时候去掉事件委托
    //     eventHandler.removeHandler(window, `resize`, this.resizeMap);
    // },
    destroyed() {
        this._log(`map: destroyed...`);
        // 组件销毁的时候去掉事件委托
        eventHandler.removeHandler(window, `resize`, this.resizeMap);

        window._RichWay.$map.baseLayers = {};
        window._RichWay.$map.businessLayers = {};
        window._RichWay.$map.plugins = {};
    },
    methods: {
        ...mapMutations([
            `SET_MAP`,
            `SET_MAP_OPTIONS`
        ]),
        getMapView() {
            return (this.mapConfig || []).find((item = {}) => item.id === `MapView`) || {};
        },
        setMapWidthAndHeight(info = {}) {
            this._log(`current map id is ${this.mapInfoId}`, this.domID);
            const rem = window._RichWay.$rem;


            const offsetX = typeof (info.offsetX) === `number` ? info.offsetX : this.offsetX;
            const offsetY = typeof (info.offsetY) === `number` ? info.offsetY : this.offsetY;

            const bodySizeInfo = getBodySizeInfo();
            const width = info.width || this.width || (bodySizeInfo.cWidth - offsetX * 20 * rem);
            // const height = info.height || this.height || (bodySizeInfo.cHeight - offsetY * 20 * rem);
            const height = getMainContentMaxH() - offsetY * 20 * rem;

            const $domID = document.getElementById(this.domID);
            $domID.style.width = `${width}px`;
            $domID.style.height = `${height}px`;
            const $mapInfoId = document.getElementById(this.mapInfoId);
            // $mapInfoId.style.width = `${width}px`;
            // $mapInfoId.style.height = `${height}px`;
            $mapInfoId.style.width = `100%`;
            $mapInfoId.style.height = `100%`;
            this._log(`map width is ${width}, map height is ${height}`);

            if (typeof ((this.map || {}).invalidateSize) === `function`) {
                this.map.invalidateSize(true);
            }
        },
        // 获取地图的基本信息
        getMapOption() {
            this._log(`map-init-data is`, this.mapInitData);
            this._log(`map-options is`, this.mapOptions);
            this.SET_MAP_OPTIONS(this.mapInitData);

            let currentLayerComponent = ((this.mapBaseLayers[0].list || [])[0]) || {};
            for (const item of this.mapBaseLayers) {
                for (const subItem of item.list) {
                    if (((subItem || {}).config || {}).active === true) {
                        currentLayerComponent = subItem;
                        break;
                    }
                }
            }
            return {
                // center  类型：LatLng  默认值：null  描述：初始化地图的地理中心.
                // center: this.mapOptions.center,
                // zoom  类型：Number  默认值：null  描述：初始化地图的缩放.
                // zoom: this.mapOptions.zoom - 3,
                // layers  类型：ILayer[]  默认值：null  描述：初始化后加载到地图上的图层.
                layers: baseLayer(currentLayerComponent).content,
                // minZoom  类型：Number  默认值：null  描述：地图的最小视图。可以重写地图图层的minZoom.
                minZoom: this.mapOptions.minZoom,
                // maxZoom  类型：Number  默认值：null  描述：地图的最大视图。可以重写地图图层的maxZoom.
                maxZoom: this.mapOptions.maxZoom,
                // zoomControl  类型：Boolean  默认值：true  描述：确定zoom control是否默认加载在地图上 .
                zoomControl: false,
                attributionControl: false
            };
        },
        initMap() {
            this._log(`map init start...${this.mapInfoId}`, this.mapOptions.zoom);
            this.setMapWidthAndHeight();
            this.map = L.map(this.mapInfoId, this.getMapOption());
            this.map.eachLayer(layer => {
                this.map._first_leaflet_id = layer._leaflet_id;
            });
            this.map.on(`load`, () => {
                this._log(`map load...`);
                this.loadingShow = false;

                window._RichWay.$map.baseLayers = {};
                window._RichWay.$map.businessLayers = {};
                window._RichWay.$map.plugins = {};

                for (const item of this.mapBusinessLayers) {
                    if (typeof (MapLayers[item.componentName]) === `function`) {
                        MapLayers[item.componentName]({
                            map: this.map,
                            mapOptions: this.mapOptions,
                            config: item.config,
                            componentName: item.componentName
                        });
                    }
                }

                for (const item of this.pluginsComponents) {
                    if (typeof (PluginsComponents[item.componentName]) === `function`) {
                        PluginsComponents[item.componentName]({
                            map: this.map,
                            mapOptions: this.mapOptions,
                            config: item.config,
                            componentName: item.componentName
                        });
                    }
                }

                this.initData();
            }).setView(this.mapOptions.center, this.mapOptions.zoom);
            this.SET_MAP(this.map);
            this._log(`map init end...`);
            this.mapLoad = true;

            // 监听对地图重新初始化的操作
            this.$mapLayersFun.MapInitListenFun((info = {}) => {
                this.setMapWidthAndHeight(info);
            });

            // 尝试地理位置的定位
            this.map.locate({
                setView: false,
                maxZoom: this.mapOptions.zoom
            });
            this.map.on(`locationfound`, (e) => {
                this._log(`定位成功=====>`, e);
                this.mapOptions.center = [e.latlng.lat, e.latlng.lng];
                const obj = {
                    to: `RN`,
                    from: `getlocation`,
                    center: e.latlng.lat+','+e.latlng.lng
                };
                setTimeout(()=>{
                    window.postMessage(JSON.stringify(obj), `*`);
                },500);

            });
            this.map.on(`locationerror`, (e) => {
                this._log(`定位出错=====>`, e);
            });
        },
        initData() {
            // 广播地图底图数据
            this.$mapLayersFun.MapBaseLayersBroadcastFun(this.mapBaseLayers);
        },
        resizeMap() {
            throttleDuration(this.setMapWidthAndHeight, 400, 400)();
        }
    }
};
</script>

<style lang="scss">
    .richway-map-container {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 15rem;
    }

    .richway-map-info {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
    }
</style>
