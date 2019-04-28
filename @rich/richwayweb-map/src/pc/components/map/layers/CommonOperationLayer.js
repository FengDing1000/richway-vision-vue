/**

 @Name：BASE-公共地图-业务图层组件-动态图(base/map/exlayers/CommonOperationLayer)
 @Author：g.zhou
 @License：MIT

 */

import Map from "../index.js";
import * as bType from "../../../../constants/broadcastType";
import BusinessLayersGroup from './BusinessLayersGroup.js';

const L = require(`leaflet`);

class CommonOperationLayer extends Map {
    constructor(info = {}) {
        super(info);
        this.operationInfo = {
            type: this.config.type,
            url: this.config.url
        };

        window._Subscribe.create(this.config.subscribeKey || bType.MapBusinessLayersOperationBroadcastKey).listen(`data`, (info = {}) => {
            this.operationInfo = info;
            this.createGraphics();
        });

        if (this.config.type && this.config.url) {
            this.createGraphics();
        }
    }

    createGraphics() {
        this.clearGraphics(`clear`);
        let layer = null;
        if (this.operationInfo.type === `tile`) {
            // http://t{s}.tianditu.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles
            layer = L.tileLayer(this.operationInfo.url, {
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            });
        } else if (this.operationInfo.type === `dynamic`) {
            layer = L.esri.dynamicMapLayer({
                url: this.operationInfo.url,
                opacity: 1
            });
        }

        if (layer) {
            this.layerGroup = L.layerGroup([layer]).setZIndex(97).addTo(this.map);
        }

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
}

export default info => new CommonOperationLayer(info);
