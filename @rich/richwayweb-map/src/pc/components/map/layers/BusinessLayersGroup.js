import * as bType from "../../../../constants/broadcastType";

export default (info = {}) => {
    if (info.action === `add`) {
        window._RichWay.$map.businessLayers[info.layerGroupName] = info;

    } else if (window._RichWay.$map.businessLayers[info.layerGroupName]) {
        window._RichWay.$map.businessLayers[info.layerGroupName].visibility = false;

    }
    window._Subscribe.create(bType.MapBusinessLayersChangeBroadcastKey).trigger(`data`, true);
};
