/**

 @Name：地图图层组件的目录文件
 @Author：g.zhou
 @License：MIT

 */

import componentsType from "../../../../constants/componentsType";

import CommonCloudLayer from './CommonCloudLayer.js';
import CommonContour from './CommonContourLayer.js';
import CommonOperation from './CommonOperationLayer.js';
import CommonPointLayer from "./CommonPointLayer";
import CommonHsfxtLayer from "./CommonHsfxtLayer";

const { businessLayersTypeInfo } = componentsType;

export default Object.assign({
    [businessLayersTypeInfo.MapBusinessLayersCloud]: CommonCloudLayer,
    [businessLayersTypeInfo.MapBusinessLayersContour]: CommonContour,
    [businessLayersTypeInfo.MapBusinessLayersOperation]: CommonOperation,
    [businessLayersTypeInfo.MapBusinessLayersHsfxt]: CommonHsfxtLayer
}, CommonPointLayer);
