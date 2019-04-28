export default {
    AccumulativeRainProcess: r => require.ensure([], () => r(require(`./accumulativeRainProcess`)), `components/map/business/realtimeMonitoring/rain/detail`),
    IntervalRainProcess: r => require.ensure([], () => r(require(`./intervalRainProcess`)), `components/map/business/realtimeMonitoring/rain/detail`),
    ForecastRainProcess: r => require.ensure([], () => r(require(`./forecastRainProcess`)), `components/map/business/realtimeMonitoring/rain/detail`)
};
