import componentsType from "../../../../../../constants/componentsBusinessType";

const { mapBusinessTypeInfo } = componentsType;

export default {
    [mapBusinessTypeInfo.MapBusinessMonitorRain]: r => require.ensure([], () => r(require(`./rain`)), `components/map/business/realtimeMonitoring/rain/index`),
    [mapBusinessTypeInfo.MapBusinessMonitorWater]: r => require.ensure([], () => r(require(`./water`)), `components/map/business/realtimeMonitoring/water/index`),
    [mapBusinessTypeInfo.MapBusinessMonitorWork]: r => require.ensure([], () => r(require(`./work`)), `components/map/business/realtimeMonitoring/work/index`),
    [mapBusinessTypeInfo.MapBusinessMonitorWeather]: r => require.ensure([], () => r(require(`./weather`)), `components/map/business/realtimeMonitoring/weather/index`),
    [mapBusinessTypeInfo.MapBusinessMonitorWarn]: r => require.ensure([], () => r(require(`./warn`)), `components/map/business/realtimeMonitoring/warn/index`),
    [mapBusinessTypeInfo.MapBusinessMonitorVideo]: r => require.ensure([], () => r(require(`./video`)), `components/map/business/realtimeMonitoring/video/index`),
    [mapBusinessTypeInfo.MapBusinessMonitorSite]: r => require.ensure([], () => r(require(`./site`)), `components/map/business/realtimeMonitoring/site/index`)
};
