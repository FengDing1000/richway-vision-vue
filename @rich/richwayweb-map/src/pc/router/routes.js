// 三维地图页面的一级路由
import INTERNET_PLATFORM_CESIUM_MAP from '$src/pc/pages/internet_platform/cesium_map/router';
// 影响范围页面的一级路由
import INTERNET_PLATFORM_EFFECT_RANGE from '$src/pc/pages/internet_platform/effect_range/router';
// 登录页面的一级路由
import INTERNET_PLATFORM_LOGIN from '$src/pc/pages/internet_platform/login/router';
// 地图配置页面的一级路由
import INTERNET_PLATFORM_MAP_CONFIG_EDIT from '$src/pc/pages/internet_platform/map_config_edit/router';
// 综合监视页面的一级路由
import INTERNET_PLATFORM_MONITOR_MANAGE from '$src/pc/pages/internet_platform/monitor_manage/router';
// 首页页面的一级路由
import INTERNET_PLATFORM_PORTAL from '$src/pc/pages/internet_platform/portal/router';

const routes = [];
routes.push(INTERNET_PLATFORM_CESIUM_MAP);
routes.push(INTERNET_PLATFORM_EFFECT_RANGE);
routes.push(INTERNET_PLATFORM_LOGIN);
routes.push(INTERNET_PLATFORM_MAP_CONFIG_EDIT);
routes.push(INTERNET_PLATFORM_MONITOR_MANAGE);
routes.push(INTERNET_PLATFORM_PORTAL);

export default routes;