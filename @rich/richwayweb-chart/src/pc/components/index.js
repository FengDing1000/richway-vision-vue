import * as _ct from '../../constants/componentsType';

export default {
    [_ct.ChartRainfallProcess]: r => require.ensure([], () => r(require(`./chart/business/rainfallProcessChart`)), `components/chart/rainfallProcessChart`),
    [_ct.ChartWaterLevelProcess]: r => require.ensure([], () => r(require(`./chart/business/waterLevelProcessChart`)), `components/chart/waterLevelProcessChart`),
    [_ct.ChartWaterLevelSketch]: r => require.ensure([], () => r(require(`./chart/business/waterLevelSketchChart`)), `components/chart/waterLevelSketchChart`),
    ChartRain: r => require.ensure([], () => r(require(`./chart/business/rainChart`)), `components/chart/rainChart`),
    ChartRsvrStorage: r => require.ensure([], () => r(require(`./chart/business/rsvrStorageChart`)), `components/chart/rsvrStorageChart`),
    ChartRsvrHistory: r => require.ensure([], () => r(require(`./chart/business/rsvrHistoryChart`)), `components/chart/rsvrHistoryChart`),
    ChartRsvrProcess: r => require.ensure([], () => r(require(`./chart/business/rsvrProcessChart`)), `components/chart/rsvrProcessChart`),
    ChartRiverProcess: r => require.ensure([], () => r(require(`./chart/business/riverProcessChart`)), `components/chart/riverProcessChart`),
    ChartAccumulativeRainProcess: r => require.ensure([], () => r(require(`./chart/business/accumulativeRainProcessChart`)), `components/chart/accumulativeRainProcessChart`),
    ChartIntervalRainProcess: r => require.ensure([], () => r(require(`./chart/business/intervalRainProcessChart`)), `components/chart/intervalRainProcessChart`),
    ChartForecastRainProcess: r => require.ensure([], () => r(require(`./chart/business/forecastRainProcessChart`)), `components/chart/forecastRainProcessChart`),
    ChartHydorProcess: r => require.ensure([], () => r(require(`./chart/business/hydroLevelProcessChart`)), `components/chart/hydroLevelProcessChart`),
    ChartSiteRainOne: r => require.ensure([], () => r(require(`./chart/business/siteRainOne`)), `components/chart/siteRainOne`),
    ChartConstractRainGroup: r => require.ensure([], () => r(require(`./chart/business/constractRainGroup`)), `components/chart/constractRainGroup`),
    ChartOnLine: r => require.ensure([], () => r(require(`./chart/business/onLineChart`)), `components/chart/onLineChart`),
    ExpLineInfo1: r => require.ensure([], () => r(require(`./chart/example/lineInfo_1`)), `components/chart/exp`),
    ExpLineInfo2: r => require.ensure([], () => r(require(`./chart/example/lineInfo_2`)), `components/chart/exp`),
    ExpPieInfo1: r => require.ensure([], () => r(require(`./chart/example/pieInfo_1`)), `components/chart/exp`),
    ExpPieInfo2: r => require.ensure([], () => r(require(`./chart/example/pieInfo_2`)), `components/chart/exp`),
    ExpBarInfo1: r => require.ensure([], () => r(require(`./chart/example/barInfo_1`)), `components/chart/exp`),
    ExpBarInfo2: r => require.ensure([], () => r(require(`./chart/example/barInfo_2`)), `components/chart/exp`),
    SmsAbnormalBar: r => require.ensure([], () => r(require(`./chart/business/smsAbnormalBar`)), `components/chart/sms`)
};
