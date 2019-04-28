export default {
    // 地图对象
    map: null,
    // 地图的配置数据
    mapOptions: {
        center: [30.592111, 114.297111],
        zoom: 13,
        minZoom: 5,
        maxZoom: 18,
        layerIndex: 10
    },
    mapSiteList: [],
    mapCurrentSiteInfo: {},

    // 近12小时雨量过程图的对象数据
    rainfallInfo: {
        show: false,
        xAxisData: [],
        seriesData: []
    },
    // 水位过程图
    waterLevelProcessInfo: {
        show: false,
        title: ``,
        xAxisData: [],
        seriesData: []
    },
    // 水位示意图
    waterLevelSketchInfo: {
        show: false,
        waterDepth: `0`
    }

};
