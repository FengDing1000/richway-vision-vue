// 错误页面页面的store
import error from '$src/pc/pages/internet_platform/error/store';
// 登录页面的store
import login from '$src/pc/pages/internet_platform/login/store';
// 首页页面的store
import portal from '$src/pc/pages/internet_platform/portal/store';
// 雨情日报表页面的store
import rainDayForms from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/rain_day_forms/store';
// 雨情月报表页面的store
import rainMonthForms from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/rain_month_forms/store';
// 雨情年报表页面的store
import rainYearForms from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/rain_year_forms/store';
// 水库水情报表页面的store
import reservoirWaterForms from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/reservoir_water_forms/store';
// 河道水情报表页面的store
import riverWaterForms from '$src/pc/pages/internet_platform/water_rain_pages/actual_forms/river_water_forms/store';
// 累计时段降雨量页面的store
import accumulativeRainfall from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/accumulative_rainfall/store';
// 区域平均降雨页面的store
import areaRainfall from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/area_rainfall/store';
// 雨量对比页面的store
import rainfallContrast from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/rainfall_contrast/store';
// 雨情监测页面的store
import rainMonitor from '$src/pc/pages/internet_platform/water_rain_pages/rain_information/rain_monitor/store';
// 最新水库水情页面的store
import newReservoirWater from '$src/pc/pages/internet_platform/water_rain_pages/water_information/new_reservoir_water/store';
// 最新河道水情页面的store
import newRiverWater from '$src/pc/pages/internet_platform/water_rain_pages/water_information/new_river_water/store';
// 水库水情查询页面的store
import reservoirWaterQuery from '$src/pc/pages/internet_platform/water_rain_pages/water_information/reservoir_water_query/store';
// 河道水情查询页面的store
import riverWaterQuery from '$src/pc/pages/internet_platform/water_rain_pages/water_information/river_water_query/store';

const modules = {
    error,
    login,
    portal,
    rainDayForms,
    rainMonthForms,
    rainYearForms,
    reservoirWaterForms,
    riverWaterForms,
    accumulativeRainfall,
    areaRainfall,
    rainfallContrast,
    rainMonitor,
    newReservoirWater,
    newRiverWater,
    reservoirWaterQuery,
    riverWaterQuery
};


export default modules;
