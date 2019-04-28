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
    // 设置地图的配置信息
    [_mt.SET_BUSINESS_INFO](state, opt) {
        state.businessInfo = Object.assign({}, state.businessInfo, opt);
    }
};
