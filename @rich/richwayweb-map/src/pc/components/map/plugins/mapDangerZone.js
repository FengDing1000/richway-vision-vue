/**

 @Name：划危险区圆形边界类文件
 @Author：g.zhou
 @License：MIT

 */

import * as bType from '../../../../constants/broadcastType';
import Map from "../index.js";

const L = require(`leaflet`);

class MapPluginsDangerZone extends Map {
    constructor(info = {}) {
        super(info);

        this.name = `mapPluginsDangerZone`;
        this.map = info.map;
        this.mapOptions = info.mapOptions;
        this.config = info.config || {};

        this.styleInfo = {
            color: this.config.color || `#fff`,
            fillColor: this.config.fillColor || `#000`,
            fillOpacity: this.config.fillOpacity || 0.3
        };

        window._Subscribe.create(this.config.subscribeKey || bType.MapPluginsDangerZoneBroadcastKey).listen(`data`, (info = {}) => {
            this.createDangerZone(info);
        });
    }

    createDangerZone(info) {
        this.clearGraphics(`clear`);

        if (info.center && (info.bounds || []).length) {
            const centerPoint = info.center;

            // 计算距离中心点最远的一个边界点坐标
            let maxDistance = 0;
            for (const point of info.bounds) {
                const distance = L.latLng(centerPoint).distanceTo(point);
                if (distance > maxDistance) {
                    maxDistance = distance;
                }
            }

            // 画圆形
            const circle = L.circle(centerPoint, Object.assign({
                radius: maxDistance
            }, this.styleInfo));

            this.layerGroup = L.layerGroup([circle]).setZIndex(96).addTo(this.map);

            window._RichWay.$map.plugins[this.name] = circle;
        }
    }
}

export default info => new MapPluginsDangerZone(info);
