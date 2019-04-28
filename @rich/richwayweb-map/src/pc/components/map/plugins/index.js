/**

 @Name：地图插件的目录文件
 @Author：g.zhou
 @License：MIT

 */

import componentsType from "../../../../constants/componentsType";
import Boundary from './mapBoundary.js';
import DangerZone from './mapDangerZone.js';

const { pluginsTypeInfo } = componentsType;

export default {
    [pluginsTypeInfo.MapPluginsBoundary]: Boundary,
    [pluginsTypeInfo.MapPluginsDangerZone]: DangerZone
};
