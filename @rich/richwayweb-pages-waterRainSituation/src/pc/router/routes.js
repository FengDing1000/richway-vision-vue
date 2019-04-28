// 错误页面页面的一级路由
import INTERNET_PLATFORM_ERROR from '$src/pc/pages/internet_platform/error/router';
// 登录页面的一级路由
import INTERNET_PLATFORM_LOGIN from '$src/pc/pages/internet_platform/login/router';
// 首页页面的一级路由
import INTERNET_PLATFORM_PORTAL from '$src/pc/pages/internet_platform/portal/router';
// 雨情日报表页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RAIN_DAY_FORMS from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/rain_day_forms/router';
// 雨情月报表页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RAIN_MONTH_FORMS from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/rain_month_forms/router';
// 雨情年报表页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RAIN_YEAR_FORMS from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/rain_year_forms/router';
// 水库水情报表页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RESERVOIR_WATER_FORMS from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/reservoir_water_forms/router';
// 河道水情报表页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RIVER_WATER_FORMS from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/river_water_forms/router';
// 累计时段降雨量页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_ACCUMULATIVE_RAINFALL from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/accumulative_rainfall/router';
// 区域平均降雨页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_AREA_RAINFALL from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/area_rainfall/router';
// 雨量对比页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_RAINFALL_CONTRAST from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/rainfall_contrast/router';
// 雨情监测页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_RAIN_MONITOR from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/rain_monitor/router';
// 最新水库水情页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_NEW_RESERVOIR_WATER from '$src/pc/pages/internet_platform/water_rain_pages/water_information/new_reservoir_water/router';
// 最新河道水情页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_NEW_RIVER_WATER from '$src/pc/pages/internet_platform/water_rain_pages/water_information/new_river_water/router';
// 水库水情查询页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_RESERVOIR_WATER_QUERY from '$src/pc/pages/internet_platform/water_rain_pages/water_information/reservoir_water_query/router';
// 河道水情查询页面的一级路由
import INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_RIVER_WATER_QUERY from '$src/pc/pages/internet_platform/water_rain_pages/water_information/river_water_query/router';

const routes = [];
routes.push(INTERNET_PLATFORM_ERROR);
routes.push(INTERNET_PLATFORM_LOGIN);
routes.push(INTERNET_PLATFORM_PORTAL);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RAIN_DAY_FORMS);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RAIN_MONTH_FORMS);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RAIN_YEAR_FORMS);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RESERVOIR_WATER_FORMS);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_ACTUAL_FORMS_RIVER_WATER_FORMS);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_ACCUMULATIVE_RAINFALL);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_AREA_RAINFALL);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_RAINFALL_CONTRAST);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_RAIN_INFORMATION_RAIN_MONITOR);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_NEW_RESERVOIR_WATER);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_NEW_RIVER_WATER);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_RESERVOIR_WATER_QUERY);
routes.push(INTERNET_PLATFORM_WATER_RAIN_PAGES_WATER_INFORMATION_RIVER_WATER_QUERY);

export default routes;