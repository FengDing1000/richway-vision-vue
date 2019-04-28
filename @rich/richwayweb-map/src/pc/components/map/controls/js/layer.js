import _baseLayers from "../../layers";

const L = require(`leaflet`);

export default (map, option = null) => {
    const baseLayers = [];
    for (const item of _baseLayers) {
        baseLayers[item.title] = item.content;
    }
    // 图层控制使用户可以在不同的底图之间切换，并可以控制覆盖物的开关
    L.control.layers(baseLayers, option).addTo(map);
};
