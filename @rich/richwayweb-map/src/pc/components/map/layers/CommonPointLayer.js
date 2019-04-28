/**

 @Name：BASE-公共地图-业务图层组件-标记物(base/map/exlayers/CommonPointLayer)
 @Author：g.zhou
 @License：MIT

 */

import Map from "../index.js";
import MapIcon from '../icon';
import BusinessLayersGroup from './BusinessLayersGroup.js';
import componentsType from "../../../../constants/componentsType";

const L = require(`leaflet`);

class CommonPointLayer extends Map {
    constructor(info = {}) {
        super(info);

        this.config.cluster = Object.assign({
            isCluster: true,
            maxZoom: 15,
            showCoverageOnHover: true
        }, this.config.cluster);

        this.icon = {};
        this.getIcon();

        this.iconSize = [30, 30];
        this.iconAnchor = [15, 15];
        this.markerList = info.markerList || [];
    }

    init() {
        const currentConfig = (componentsType.getBusinessLayersInfoById(this.componentName) || {}).config;
        this.iconSize = currentConfig.iconSize;
        this.iconAnchor = currentConfig.iconAnchor;

        const fieldArr = [
            `icon`,
            `code`,
            `layerGroupName`,
            `title`,
            `controllByLayer`,
            `controllByLegend`,
            `subscribeKey`,
            `type`,
            `color`,
            `fillColor`,
            `fillOpacity`,
            `weight`,
            `weight`,
            `dashArray`
        ];
        for (let key of fieldArr) {
            this.config[key] = this.config[key] || currentConfig[key];
        }
    }

    subscribeListen() {
        window._Subscribe.create(this.config.subscribeKey).listen(`data`, (arr = []) => {
            this.markerList = arr;
            this.createGraphics();
        });

        if (this.config.init === true) {
            this.createGraphics(false);
        }
    }

    // createPopContent(layer) {
    //     return `<span>内容11111111</span>`;
    // }

    // 创建图层，清空原来的图层
    createGraphics(bl = true) {
        this.clearGraphics(`clear`);

        const zoom = this.map.getZoom();
        if (zoom < this.minZoom || zoom > this.maxZoom) {
            return false;
        }
        const layers = [];
        const polygons = [];
        for (const item of this.markerList) {
            // 画点
            if (item.lgtd && item.lttd) {
                const options = {
                    icon: this.getSymbolBySTTP(item),
                    data: item.data || {}
                };
                const marker = L.marker(this.getLatLng(item), options);
                if (typeof ((item.options || {}).createPopContent) === `function`) {
                    marker.bindPopup(item.options.createPopContent);
                } else if (typeof (this.createPopContent) === `function`) {
                    marker.bindPopup(this.createPopContent);
                }
                marker.on(`click`, () => {
                    let popup = null;
                    if ((item.options || {}).bindPopup === true) {
                        popup = L.popup({
                            maxWidth: 700
                        })
                            .setLatLng(this.getLatLng(item))
                            .setContent((item.options || {}).popupHtml || `<p>数据记载中，请稍后...</p>`)
                            .openOn(this.map);
                    }
                    if (typeof ((item.options || {}).clickFun) === `function`) {
                        item.options.clickFun(item, popup);
                    }
                });
                layers.push(marker);
            }

            // 画区域
            if (item.shape && item.shape.type === `Polygon` && item.shape.bounds) {
                const polygon = L.polygon(item.shape.bounds, {
                    color: item.shape.color || this.config.color || `rgba(223, 23, 23, 1)`,
                    fillColor: item.shape.fillColor || this.config.fillColor || `rgba(223, 23, 23, .1)`,
                    fillOpacity: item.shape.fillOpacity || this.config.fillOpacity || 0.3,
                    weight: item.shape.weight || this.config.weight || 3
                });
                if (typeof ((item.options || {}).createPopContent) === `function`) {
                    polygon.bindPopup(item.options.createPopContent);
                } else if (typeof (this.createPopContent) === `function`) {
                    polygon.bindPopup(this.createPopContent);
                }
                polygon.on(`click`, () => {
                    let popup = null;
                    if ((item.options || {}).bindPopup === true) {
                        popup = L.popup({
                            maxWidth: 700
                        })
                            .setLatLng(polygon.getCenter())
                            .setContent((item.options || {}).popupHtml || `<p>数据记载中，请稍后...</p>`)
                            .openOn(this.map);
                    }
                    if (typeof ((item.options || {}).clickFun) === `function`) {
                        item.options.clickFun(item, popup);
                    }
                });
                // 画区域的中心点
                if (((item.options || {}).tips || {}).middle !== undefined) {
                    polygons.push({
                        icon: L.divIcon({
                            iconSize: [this.rem * this.iconSize[0], this.rem * this.iconSize[1]],
                            iconAnchor: [this.rem * this.iconAnchor[0], this.rem * this.iconAnchor[1]],
                            className: `map-marker-panel`,
                            html: `<span class="marker-tips marker-tips-middle" style="background-color: ${(item.options || {}).color || `#1565c0`};">${((item.options || {}).tips || {}).middle || ``}</span>`
                        }),
                        polygon
                    });
                }
                layers.push(polygon);
            }

            // 画线
            if (item.shape && item.shape.type === `Polyline` && item.shape.bounds) {
                const polyLine = L.polyline(item.shape.bounds, {
                    color: item.shape.color || this.config.color || `rgba(223, 23, 23, 1)`,
                    weight: item.shape.weight || this.config.weight || 3,
                    dashArray:  item.shape.dashArray || this.config.dashArray || `5`
                });
                if (typeof ((item.options || {}).createPopContent) === `function`) {
                    polyLine.bindPopup(item.options.createPopContent);
                } else if (typeof (this.createPopContent) === `function`) {
                    polyLine.bindPopup(this.createPopContent);
                }
                polyLine.on(`click`, () => {
                    if (typeof ((item.options || {}).clickFun) === `function`) {
                        item.options.clickFun(item);
                    }
                });
                layers.push(polyLine);
            }
        }

        if (this.config.cluster.isCluster) {
            this.layerGroup = L.markerClusterGroup({
                disableClusteringAtZoom: this.config.cluster.maxZoom ,
                removeOutsideVisibleBounds: true,
                chunkedLoading: true,
                showCoverageOnHover: this.config.cluster.showCoverageOnHover
            });
            this.layerGroup.addLayers(layers);
            this.map.addLayer(this.layerGroup);
        } else {
            this.layerGroup = L.layerGroup(layers).setZIndex(96).addTo(this.map);
        }

        // 在此画区域的中心点
        for (const item of polygons) {
            const marker = L.marker(item.polygon.getCenter(), {
                icon: item.icon
            });
            this.layerGroup.addLayer(marker);
        }

        BusinessLayersGroup(Object.assign(this.config, {
            title: this.config.title || this.icon.title,
            icon: this.icon,
            layer: this,
            visibility: bl,
            action: `add`
        }));
    }

    getSymbolBySTTP(item) {
        const symbolOptions = {
            iconSize: [this.rem * this.iconSize[0], this.rem * this.iconSize[1]],
            iconAnchor: [this.rem * this.iconAnchor[0], this.rem * this.iconAnchor[1]],
            className: this.icon.className || `map-marker-panel`,
            html: this.icon.html || ``
        };

        if (item.options) {
            let iconInfo = {};
            if (typeof (MapIcon[this.config.icon]) === `function`) {
                item._config = this.config;
                iconInfo = MapIcon[this.config.icon](item);
            }
            symbolOptions.html = iconInfo.html;
        }
        const PointSymbol = L.divIcon(symbolOptions);

        return PointSymbol;
    }
}

class DefaultPointLayer extends CommonPointLayer {
    constructor(info) {
        super(info);
        this.init();
        this.getIcon();
        this.subscribeListen();
    }
}

function getDefaultPointLayerExp(info) {
    return new DefaultPointLayer(info);
}

// 获取所有的业务图层
const layersInfo = {};
for (const item of componentsType.businessLayersComponents) {
    if (item.type === `point` || true) {
        layersInfo[item.componentName] = getDefaultPointLayerExp;
    }
}

export default layersInfo;
