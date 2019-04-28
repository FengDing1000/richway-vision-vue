/**

 @Name：BASE-公共地图-业务图层组件-等值线(base/map/exlayers/CommonContourLayer)
 @Author：g.zhou
 @License：MIT

 */

import RichWayWebUtils from '@rich/richwayweb-utils';
import Map from "../index.js";
import * as bType from "../../../../constants/broadcastType";
import BusinessLayersGroup from './BusinessLayersGroup.js';

const L = require(`leaflet`);
const { rgbToHex } = RichWayWebUtils;

class CommonContourLayer extends Map {
    constructor(info = {}) {
        super(info);
        this.contourInfo = null;
        this.praseColor = (level, colors) => {
            let color = `#ffffff`;
            if (colors[level]) {
                color = rgbToHex(`rgb(${colors[level].rgb})`);
            }

            return color;
        };
        this.convert2GeoJson = (input = [], color = `#ff0000`, type = `Polygon`) => {
            let geoJson = {};
            if (type === `Polygon`) {
                geoJson = {
                    type: `Feature`,
                    geometry: {
                        type: `Polygon`,
                        coordinates: [
                            input.geometry.rings[0]
                        ]
                    },
                    properties: {
                        color,
                        attributes: input.attributes
                    }
                };
            }
            if (type === `Polyline`) {
                geoJson = {
                    type: `Feature`,
                    geometry: {
                        type: `LineString`,
                        coordinates: [
                            input.geometry.paths[0]
                        ]
                    },
                    properties: {
                        color,
                        attributes: input.attributes
                    }
                };
            }
            return geoJson;
        };

        window._Subscribe.create(this.config.subscribeKey || bType.MapBusinessLayersContourBroadcastKey).listen(`data`, (info = {}) => {
            this.contourInfo = info;
            this.createGraphics();
        });
    }

    createGraphics() {
        this.clearGraphics(`clear`);
        const { iso } = JSON.parse(this.contourInfo.data);
        if (iso) {
            const layers = [];
            if (this.contourInfo.type === `rain`) {
                try {
                    const colorsArr = iso.colors;
                    const featuresArr = JSON.parse(JSON.parse(iso.value)).results[0].value.features;
                    featuresArr.forEach(attr => {
                        let color = colorsArr[attr.attributes.level];
                        color = color || {};
                        const rgb = color.rgb || ``;
                        const rings = attr.geometry.rings[0];
                        const latlngs = [];
                        rings.forEach(ring => {
                            latlngs.push([ring[1], ring[0]]);
                        });
                        const c = rgb.split(`,`);
                        const polygon = L.polygon(latlngs, {
                            fillColor: `rgba(${parseInt(c[0], 10)},${parseInt(c[1], 10)},${parseInt(c[2], 10)},1)`,
                            color: {}
                        });
                        layers.push(polygon);
                    });
                } catch (e) {
                    this._log(e);
                }
            } else {
                const geos = iso.value.results[0].value.features;
                const rgbColors = iso.colors;
                geos.map(geo => {
                    const geoCoords = this.convert2GeoJson(geo);
                    const _this = this;
                    const geoLayer = L.geoJSON(geoCoords, {
                        style(feature) {
                            return {
                                color: _this.praseColor(feature.properties.attributes.level, rgbColors),
                                weight: 1,
                                fillOpacity: 0.4
                            };
                        }
                        // onEachFeature(feature, layer) {
                        //     _log(feature, layer);
                        // }
                    });
                    layers.push(geoLayer);
                    return geoLayer;
                });
            }

            if (layers.length) {
                this.layerGroup = L.layerGroup(layers).setZIndex(98).addTo(this.map);
            }
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

export default info => new CommonContourLayer(info);
