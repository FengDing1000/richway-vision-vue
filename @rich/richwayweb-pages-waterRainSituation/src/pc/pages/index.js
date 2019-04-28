export default {
    RainDayForms: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/actual_forms/rain_day_forms/template`)), `components/pagesWaterRain/actualForms/rainDayForms`),
    RainMonthForms: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/actual_forms/rain_month_forms/template`)), `components/pagesWaterRain/actualForms/rainMonthForms`),
    RainYearForms: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/actual_forms/rain_year_forms/template`)), `components/pagesWaterRain/actualForms/rainYearForms`),
    ReservoirWaterForms: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/actual_forms/reservoir_water_forms/template`)), `components/pagesWaterRain/actualForms/reservoirWaterForms`),
    RiverWaterForms: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/actual_forms/river_water_forms/template`)), `components/pagesWaterRain/actualForms/riverWaterForms`),
    AccumulativeRainfall: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/rain_information/accumulative_rainfall/template`)), `components/pagesWaterRain/rainInformation/accumulativeRainfall`),
    AreaRainfall: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/rain_information/area_rainfall/template`)), `components/pagesWaterRain/rainInformation/areaRainfall`),
    RainMonitor: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/rain_information/rain_monitor/template`)), `components/pagesWaterRain/rainInformation/rainMonitor`),
    RainfallContrast: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/rain_information/rainfall_contrast/template`)), `components/pagesWaterRain/rainInformation/rainfallContrast`),
    NewReservoirWater: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/water_information/new_reservoir_water/template`)), `components/pagesWaterRain/waterInformation/newReservoirWater`),
    NewRiverWater: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/water_information/new_river_water/template`)), `components/pagesWaterRain/waterInformation/newRiverWater`),
    ReservoirWaterQuery: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/water_information/reservoir_water_query/template`)), `components/pagesWaterRain/waterInformation/reservoirWaterQuery`),
    RiverWaterQuery: r => require.ensure([], () => r(require(`./internet_platform/water_rain_pages/water_information/river_water_query/template`)), `components/pagesWaterRain/waterInformation/riverWaterQuery`),
    ArtificialWarn: r => require.ensure([], () => r(require(`./internet_platform/warn_respond/artificial_warn/template`)), `components/pagesWaterRain/warnRespond/artificialWarn`),
    HistoryWarn: r => require.ensure([], () => r(require(`./internet_platform/warn_respond/history_warn/template`)), `components/pagesWaterRain/warnRespond/historyWarn`),
    ThresholdSetting: r => require.ensure([], () => r(require(`./internet_platform/warn_respond/threshold_setting/template`)), `components/pagesWaterRain/warnRespond/thresholdSetting`)
};
