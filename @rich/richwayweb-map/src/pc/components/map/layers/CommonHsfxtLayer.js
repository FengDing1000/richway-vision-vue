import * as bType from "../../../../constants/broadcastType";
import Map from "../index.js";

const L = require(`leaflet`);

/**
 * 洪水风险图图层
 */
class CommonHsfxtLayer extends Map {
    constructor(info = {}) {
        super(info);
        this.dynamicLayer = null;
        window._Subscribe.create(this.config.subscribeKey || bType.MapBusinessLayersHsfxtBroadcastKey).listen(`data`, (info = {}) => {
            this.createGraphics(info);
        });
    }

    createGraphics(info) {
        // 请求编制单元
        if (`unit` === info.type) {
            if (this.dynamicLayer != null) {
                this.dynamicLayer.remove();
            }
            this.loadDynamicLayer(info.url);
        } else if (`schemaType` === info.type) {
            let showIds = this.getDefaultShowIds();
            let ids = this.getSchemaIds(info, this.layers);
            for (let i = 0; i < ids.length; i++) {
                showIds.push(ids[i]);
            }
            if (ids.length === 0) {
                window._RichWay.$gl_notify({
                    title: `提示信息`,
                    message: `【${info.schemaId}】没有【${info.schemaType}】图!`,
                    type: `warning`
                });
            }
            this.dynamicLayer.setLayers(showIds);
        }
    }

    loadDynamicLayer(url) {
        this.dynamicLayer = L.esri.dynamicMapLayer({
            url: url,
            opacity: 1,
            layers: []
        }).addTo(this.map);
        this.dynamicLayer.metadata((error, metadata) => {

            // 缩放到默认视图范围
            let extend = metadata.initialExtent;
            this.map.fitBounds([[extend.ymax, extend.xmax], [extend.ymin, extend.xmin]]);

            this.layers = metadata.layers
            this.schemaLayers = this.layers.filter(item => item.name.indexOf(`方案`) !== -1);

            window._Subscribe.create(`MapBusinessLayersHsfxtSchemaBroadcastKey`).trigger(`data`, this.schemaLayers);

            let showIds = this.getDefaultShowIds();
            //显示指定图层
            this.dynamicLayer.setLayers(showIds);
        })
    }

    getSchemaIds(info, layers) {
        //当前节点
        var layer = null;
        for (let i = 0; i < layers.length; i++) {
            layer = layers[i];
            if (layer.name === info.schemaId) {
                break;
            }
        }
        //找子节点
        if (layer) {
            let subLayerIds = layer.subLayerIds || [];
            let temp = [];
            for (let j = 0; j < subLayerIds.length; j++) {
                temp.push(layers[subLayerIds[j]]);
            }
            layer = null;
            for (let i = 0; i < temp.length; i++) {
                let tempLayer = temp[i];
                if (tempLayer.name === info.schemaType) {
                    layer = tempLayer;
                    break;
                }
            }
        }
        let ids = [];
        if (layer) {
            this.getChildIds([layer], layers, ids);
            ids = Array.from(new Set(ids)).sort((a, b) => a - b);
        }
        return ids;
    }

    //默认要显示的图层
    getDefaultShowIds() {
        // 获取默认需要隐藏的图层id
        let hideIds = [];
        this.getChildIds(this.schemaLayers, this.layers, hideIds);

        let hideLayerIds = Array.from(new Set(hideIds)).sort((a, b) => a - b);

        let showIds = [];
        for (let i = 0; i < this.layers.length; i++) {
            let flag = false;
            for (let j = 0; j < hideLayerIds.length; j++) {
                if (this.layers[i].id === hideLayerIds[j]) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                showIds.push(this.layers[i].id);
            }
        }

        return showIds;
    }

    // 递归获取子图层id
    getChildIds(schemaLayers, layers, hideIds) {
        for (const item of schemaLayers) {
            let { subLayerIds } = item;
            if (subLayerIds != null && subLayerIds.length > 0) {
                let temp = [];
                for (const o of schemaLayers) {
                    temp.push(layers[o]);
                }
                this.getChildIds(temp, layers, hideIds)
            }
            hideIds.push(item.id);
            for (const subItem of schemaLayers) {
                hideIds.push(subItem.id);
            }
        }
        // for (let i = 0, i1 = schemaLayers.length; i < i1; i++) {
        //     let subLayerIds = schemaLayers[i].subLayerIds;
        //     if (subLayerIds != null && subLayerIds.length > 0) {
        //         let temp = [];
        //         for (let j = 0; j < subLayerIds.length; j++) {
        //             temp.push(layers[subLayerIds[j]]);
        //         }
        //         this.getChildIds(temp, layers, hideIds)
        //     }
        //     hideIds.push(schemaLayers[i].id);
        //     for (let k = 0; k < schemaLayers.length; k++) {
        //         hideIds.push(schemaLayers[k].id);
        //     }
        // }
    }
}

export default info => new CommonHsfxtLayer(info);
