import Map from "../index.js";

const L = require(`leaflet`);

class GeoJsonLayer extends Map {
    constructor(info = {}) {
        super(info);
        this.redIcon = L.divIcon({
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            className: `site-marker-spot`,
            html: `<span>L</span>`
        });
        this.layerGroup = null;
        this.markerList = [{// geoJson type和geometry是必须属性
            type: `Feature`,
            properties: {
                stName: `石家河`,
                rainValue: `8.5`,
                river: `淮河`,
                lon: 116.7,
                lat: 33.496
            },
            geometry: {
                type: `Point`,
                coordinates: [116.7, 33.496]
            }
        }, {
            type: `Feature`,
            properties: {
                stName: `东溪`,
                rainValue: `9.5`,
                river: `东淠河`,
                lon: 117.351,
                lat: 33.817
            },
            geometry: {
                type: `Point`,
                coordinates: [117.351, 33.817]
            }
        }];

        this.createGraphics();
    }

    createGraphics() {
        this.clearGraphics();
        const _this = this;
        const layers = [];
        L.geoJSON(this.markerList, {
            onEachFeature() {},
            pointToLayer(geoJsonPoint, latlng) {
                const marker = L.marker(latlng, { icon: _this.redIcon });
                layers.push(marker);
                return marker;
            }
        }).addTo(this.map);
        this.layerGroup = L.layerGroup(layers);
        window._RichWay.$map.businessLayers.GeoJsonLayer = this.layerGroup;
    }

    clearGraphics() {
        if (this.layerGroup) {
            this.layerGroup.clearLayers();
        }
    }
}

export default info => new GeoJsonLayer(info);
