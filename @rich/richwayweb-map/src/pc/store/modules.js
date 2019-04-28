// 三维地图页面的store
import cesiumMap from '$src/pc/pages/internet_platform/cesium_map/store';
// 影响范围页面的store
import effectRange from '$src/pc/pages/internet_platform/effect_range/store';
// 登录页面的store
import login from '$src/pc/pages/internet_platform/login/store';
// 地图配置页面的store
import mapConfigEdit from '$src/pc/pages/internet_platform/map_config_edit/store';
// 综合监视页面的store
import monitorManage from '$src/pc/pages/internet_platform/monitor_manage/store';
// 首页页面的store
import portal from '$src/pc/pages/internet_platform/portal/store';

const modules = {
    cesiumMap,
    effectRange,
    login,
    mapConfigEdit,
    monitorManage,
    portal
};


export default modules;