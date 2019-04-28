import * as _ct from '$src/constants/componentsBusinessType';

export default {
    [_ct.MapBusinessMonitorRain]: r => require.ensure([], () => r(require(`./rain`)), `components/map/business/realtimeMonitoring/rain/index`),
    [_ct.MapBusinessMonitorWater]: r => require.ensure([], () => r(require(`./water`)), `components/map/business/realtimeMonitoring/water/index`),
    [_ct.MapBusinessMonitorWork]: r => require.ensure([], () => r(require(`./work`)), `components/map/business/realtimeMonitoring/work/index`),
    [_ct.MapBusinessMonitorWeather]: r => require.ensure([], () => r(require(`./weather`)), `components/map/business/realtimeMonitoring/weather/index`),
    [_ct.MapBusinessMonitorWarn]: r => require.ensure([], () => r(require(`./warn`)), `components/map/business/realtimeMonitoring/warn/index`),
    [_ct.MapBusinessMonitorVideo]: r => require.ensure([], () => r(require(`./video`)), `components/map/business/realtimeMonitoring/video/index`),
    [_ct.MapBusinessMonitorSite]: r => require.ensure([], () => r(require(`./site`)), `components/map/business/realtimeMonitoring/site/index`)
};
