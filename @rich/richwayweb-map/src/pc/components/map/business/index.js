import componentsBusinessType from "../../../../constants/componentsBusinessType";

const { mapBusinessTypeInfo } = componentsBusinessType;

export default {
    [mapBusinessTypeInfo.MapBusinessRealtimeMonitoring]: r => require.ensure([], () => r(require(`./components/realtimeMonitoring/index.vue`)), `components/map/business/realtimeMonitoring/index`),
    [mapBusinessTypeInfo.MapBusinessEffectRange]: r => require.ensure([], () => r(require(`./components/effectRange/index.vue`)), `components/map/business/effectRange/index`)
    // [_ct.MapBusinessHsfxt]: r => require.ensure([], () => r(require(`./components/hsfxt/index.vue`)), `components/map/business/hsfxt/index`)
};
