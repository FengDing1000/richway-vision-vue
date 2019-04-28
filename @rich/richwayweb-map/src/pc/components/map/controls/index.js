/**

 @Name：地图基础控件的目录文件
 @Author：g.zhou
 @License：MIT

 */

import componentsType from "../../../../constants/componentsType";

const { controlsTypeInfo } = componentsType;

export default {
    [controlsTypeInfo.MapControlsFullScreen]: r => require.ensure([], () => r(require(`./components/fullScreen`)), `components/map/controls/fullScreen`),
    [controlsTypeInfo.MapControlsBaseLayer]: r => require.ensure([], () => r(require(`./components/baseLayer`)), `components/map/controls/baseLayer`),
    [controlsTypeInfo.MapControlsBusinessLayer]: r => require.ensure([], () => r(require(`./components/businessLayer`)), `components/map/controls/businessLayer`),
    [controlsTypeInfo.MapControlsAim]: r => require.ensure([], () => r(require(`./components/aim`)), `components/map/controls/aim`),
    [controlsTypeInfo.MapControlsZoom]: r => require.ensure([], () => r(require(`./components/zoom`)), `components/map/controls/zoom`),
    [controlsTypeInfo.MapControlsBaseLegend]: r => require.ensure([], () => r(require(`./components/baseLegend`)), `components/map/controls/baseLegend`),
    [controlsTypeInfo.MapControlsSiteLegend]: r => require.ensure([], () => r(require(`./components/siteLegend`)), `components/map/controls/siteLegend`),
    [controlsTypeInfo.MapControlsRegion]: r => require.ensure([], () => r(require(`./components/region`)), `components/map/controls/region`),
    [controlsTypeInfo.MapControlsAttr]: r => require.ensure([], () => r(require(`./components/attr`)), `components/map/controls/attr`),
    [controlsTypeInfo.MapControlsRange]: r => require.ensure([], () => r(require(`./components/range`)), `components/map/controls/range`)
};
