import BusinessLayersGroup from "./layers/BusinessLayersGroup";
import MapIcon from "./icon";

class Map {
    constructor(info = {}) {
        this.map = info.map;
        this.componentName = info.componentName || ``;
        this.rem = window._RichWay.$rem;

        this.config = info.config || {
            title: ``,
            icon: ``,
            init: false
        };

        this.maxZoom = this.config.maxZoom || info.mapOptions.maxZoom;
        this.minZoom = this.config.minZoom || info.mapOptions.minZoom;

        if (!this.config.layerGroupName) {
            this.config.layerGroupName = this.config.code;
        }
        this.layerGroup = null;

        this.getLatLng = item => [item.lttd, item.lgtd];

        // console.log(`a ${this.constructor.toString().match(/function\s*([^(]*)\(/)[1]} ...`);
    }

    // 获取ICON
    getIcon() {
        if (typeof (MapIcon[this.config.icon]) === `function`) {
            this.icon = MapIcon[this.config.icon]({
                _config: this.config
            });
        }
    }

    // 清空图层
    clearGraphics(flag) {
        if (this.layerGroup && typeof (this.layerGroup.clearLayers) === `function`) {
            this.layerGroup.clearLayers();
        }
        if (flag !== `clear`) {
            BusinessLayersGroup({
                layerGroupName: this.config.layerGroupName,
                visibility: false
            });
        }
    }
}

export default Map;
