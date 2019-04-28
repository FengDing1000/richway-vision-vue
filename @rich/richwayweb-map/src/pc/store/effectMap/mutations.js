import * as _mt from './mutationTypes';

export default {
    // 设置地图
    [_mt.SET_MAP](state, map) {
        state.map = map;
    },
    // 设置地图的配置信息
    [_mt.SET_MAP_OPTIONS](state, opt) {
        state.mapOptions = Object.assign({}, state.mapOptions, opt);
    },
    [_mt.SET_ALL_PANEL](state, opt = {}) {
        state.rainfallInfo.show = opt.show || false;
        state.waterLevelProcessInfo.show = opt.show || false;
        state.waterLevelSketchInfo.show = opt.show || false;
    },
    // 设置12小时雨量过程图
    [_mt.SET_RAINFALL_INFO](state, opt = {}) {
        state.rainfallInfo = Object.assign({
            show: false,
            xAxisData: [],
            seriesData: []
        }, opt);
    },
    // 设置水位过程线
    [_mt.SET_WATERLEVEL_PROCESS_INFO](state, opt = {}) {
        state.waterLevelProcessInfo = Object.assign({
            show: false,
            title: ``,
            xAxisData: [],
            seriesData: []
        }, opt);
    },
    // 设置水位示意图
    [_mt.SET_WATERLEVEL_SKETCH_INFO](state, opt = {}) {
        state.waterLevelSketchInfo = Object.assign({
            show: false,
            waterDepth: 0
        }, opt);
    },
    // 设置测站列表数据
    [_mt.SET_SITE_LIST](state, opt = []) {
        state.mapSiteList = opt;
    },
    // 设置当前测站数据
    [_mt.SET_CURRENT_SITE_INFO](state, opt = {}) {
        state.mapCurrentSiteInfo = opt;
    }
};
