export default {
    // 3D地图页面
    CesiumMap: r => require.ensure([], () => r(require(`./internet_platform/cesium_map/template`)), `components/pagesMap/cesium_map`),
    // 危险范围页面
    EffectRange: r => require.ensure([], () => r(require(`./internet_platform/effect_range/template`)), `components/pagesMap/effect_range`),
    // 实时监视页面
    MonitorManage: r => require.ensure([], () => r(require(`./internet_platform/monitor_manage/template`)), `components/pagesMap/monitor_manage`),
    // 地图配置编辑页面
    MapConfigEdit: r => require.ensure([], () => r(require(`./internet_platform/map_config_edit/template`)), `components/pagesMap/map_config_edit`)
};
