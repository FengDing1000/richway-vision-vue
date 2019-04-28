/**

 @Name：划边界类文件
 @Author：g.zhou
 @License：MIT

 */

import * as bType from '../../../../constants/broadcastType';
import Map from "../index.js";

const L = require(`leaflet`);

class MapPluginsBoundary extends Map {
    constructor(info = {}) {
        super(info);

        this.name = `mapPluginsBoundary`;
        this.map = info.map;
        this.mapOptions = info.mapOptions;
        this.config = info.config || {};

        window._Subscribe.create(this.config.subscribeKey || bType.MapCurrentRegionInfoBroadcastKey).listen(`data`, (str = ``) => {
            this.createBoundary(str);
        });
    }

    createBoundary(str) {
        this.clearGraphics(`clear`);

        const arr = (str || ``).split(`;`) || [];
        const pathArr = [];
        for (const str of arr) {
            const temp = (str || ``).split(`,`) || [];
            if (temp.length === 2) {
                pathArr.push([parseFloat(temp[1]), parseFloat(temp[0])]);
            }
        }
        if (pathArr.length) {
            // 先清空之前已经划的边界
            const polyLineLayer = window._RichWay.$map.plugins[this.name];
            if (typeof ((polyLineLayer || {}).remove) === `function`) {
                polyLineLayer.remove();
            }

            const layers = [];
            const { inside, outside, hole } = this.config;
            let polyLineInside = null;
            let polygonHole = null;
            let polyLineOutside = null;
            if (typeof (inside) === `object` && inside.active !== false) {
                polyLineInside = L.polyline([pathArr], {
                    color: inside.color || `#9a9a9a`,
                    weight: inside.weight || 1
                });
                layers.push(polyLineInside);
            }
            if (typeof (outside) === `object` && outside.active !== false) {
                polyLineOutside = L.polyline([pathArr], {
                    color: outside.color || `#dedbed`,
                    weight: outside.weight || 14
                });
                layers.push(polyLineOutside);
            }
            if (typeof (hole) === `object` && hole.active !== false) {
                var latlngs = [
                    [[90, -180], [90, 180], [-180, 180], [-180, -180]], // outer ring
                    [pathArr] // hole
                ];
                polygonHole = L.polygon(latlngs, {
                    color: hole.color || `#9a9a9a`,
                    opacity: hole.opacity || 1,
                    weight: hole.weight || 2,
                    fillColor: hole.fillColor || `#fff`,
                    fillOpacity: hole.fillOpacity || 0.7
                });
                layers.push(polygonHole);
            }

            this.layerGroup = L.layerGroup(layers).setZIndex(96).addTo(this.map);
            this.map.fitBounds((polyLineInside || polygonHole || polyLineOutside).getBounds());

            window._RichWay.$map.plugins[this.name] = {
                inside: polyLineInside,
                outside: polyLineOutside,
                hole: polygonHole
            };
        }
    }
}

export default info => new MapPluginsBoundary(info);
