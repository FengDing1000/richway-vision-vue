/**

 @Name：BASE-公共地图-业务图层组件-云图(base/map/exlayers/CloudLayer)
 @Author：g.zhou
 @License：MIT

 */

import Map from "../index.js";
import * as bType from "../../../../constants/broadcastType";
import BusinessLayersGroup from './BusinessLayersGroup.js';

const L = require(`leaflet`);

class CommonCloudLayer extends Map {
    constructor(info = {}) {
        super(info);
        // 中国地图的矩形范围
        this.imageBounds = [[6, 61.5], [60, 145]];

        this.imageUrl = ``;

        this.layer = null;

        this.createGraphics();

        window._Subscribe.create(bType.MapBusinessLayersCloudBroadcastKey).listen(`data`, (info = {}) => {
            if (!this.layer) {
                this.createGraphics()
            }
            this.imageUrl = info.imageUrl;
            this.changeImage();
        });
    }

    // 创建图层，清空原来的图层
    createGraphics() {
        this.clearGraphics(`clear`);

        this.layer = L.imageOverlay(this.imageUrl, this.imageBounds);
        this.layerGroup = L.layerGroup([this.layer]).setZIndex(999).addTo(this.map);

        BusinessLayersGroup({
            layerGroupName: this.config.layerGroupName,
            title: this.config.title || ``,
            layer: this,
            controllByLayer: this.config.controllByLayer || false,
            layerSort: this.config.layerSort || 1,
            visibility: true,
            action: `add`
        });
    }

    // 切换云图片
    changeImage() {
        this.layer.setUrl(this.imageUrl);
    }
}

export default info => new CommonCloudLayer(info);
