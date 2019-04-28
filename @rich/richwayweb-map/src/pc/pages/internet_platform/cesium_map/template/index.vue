<template>
	<div class="content content-cesium-map">
		<div
			id="cesiumContainer"
			style="height:800px;" />
	</div>
</template>

<script type="text/ecmascript-6">
    import RichWayWebUtils from '@rich/richwayweb-utils';

    const { loadAll } = RichWayWebUtils;
// const Cesium = require(`cesium`);

export default {
    data() {
        return {
            map3D: null
        };
    },
    computed: {},
    mounted() {
        this._log(`cesium_map has mounted`);

        const jsList = [
            `/assets/js/Cesium/Cesium.js`,
            `/assets/js/Cesium/Widgets/widgets.css`
        ];
        loadAll(jsList, this.init);
    },
    methods: {
        init() {
            const { Cesium } = window;
            this.map3D = new Cesium.Viewer(`cesiumContainer`, {
                // terrainProvider: new Cesium.CesiumTerrainProvider({
                //     url: `http://assets.agi.com/stk-terrain/world`,
                //     requestWaterMask: true,
                //     requestVertexNormals: true
                // }),
                // imageryProvider: new Cesium.UrlTemplateImageryProvider({
                //     url: `http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali`
                // }),
                //是否显示地名查找控件
                geocoder: true,
                // selectionIndicator: false,
                // fullscreenButton: false,
                // 主页 地球回正
                homeButton: true,
                //是否显示投影方式控件
                sceneModePicker: true,
                //是否显示动画控件(左下方那个)
                animation: true,
                //是否显示点击要素之后显示的信息
                infoBox: true,
                //是否显示帮助信息控件
                navigationHelpButton: true,
                //是否显示时间线控件
                timeline: true,
                //是否显示图层选择控件
                baseLayerPicker: true
            });

            //全球影像中文注记服务
            this.map3D.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible",
                show: false
            }));

            console.log(`map3D`,this.map3D);
        }
    }
};
</script>

<style lang="scss" scoped>
    .content-cesium-map{
      position: relative;
    }
    .content-cesium-map {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0 !important;
        overflow: hidden;
    }
</style>
