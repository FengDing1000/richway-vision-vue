import componentsType from "../../../../constants/componentsType";

const L = require(`leaflet`);
const { baseLayersTypeInfo } = componentsType;

export default (info = {}) => {
    const OperationLayer = ((window._RichWay.$map.businessLayers || {}).Operation || {}).layer || {};
    if (info.config.operationLayer) {
        if (OperationLayer && typeof (OperationLayer.createGraphics) === `function`) {
            OperationLayer.createGraphics();
        }
    } else if (OperationLayer && typeof (OperationLayer.clearGraphics) === `function`) {
        OperationLayer.clearGraphics();
    }

    if (info.componentName === baseLayersTypeInfo.MapBaseGoogleVector) {
        return {
            code: info.id || `googleVector`,
            title: info.config.title || `谷歌矢量`,
            icon: info.config.icon || ``,
            content: L.tileLayer(`http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: []
            }).setZIndex(95)
        };
    } if (info.componentName === baseLayersTypeInfo.MapBaseGoogleImage) {
        return {
            code: info.id || `googleImage`,
            title: info.config.title || `谷歌影像`,
            icon: info.config.icon || ``,
            content: L.layerGroup([L.tileLayer(`http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: []
            }), L.tileLayer(`http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: []
            })]).setZIndex(95)
        };
    } if (info.componentName === baseLayersTypeInfo.MapBaseGoogleTerrain) {
        return {
            code: info.id || `googleTerrain`,
            title: info.config.title || `谷歌地形`,
            icon: info.config.icon || ``,
            content: L.tileLayer(`http://www.google.cn/maps/vt?lyrs=t@189&gl=cn&x={x}&y={y}&z={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: []
            }).setZIndex(95)
        };
    } if (info.componentName === baseLayersTypeInfo.MapBaseTianDiTuVector) {
        return {
            code: info.id || `tianDiTuVector`,
            title: info.config.title || `天地图矢量`,
            icon: info.config.icon || ``,
            content: L.layerGroup([L.tileLayer(`http://t{s}.tianditu.gov.cn/DataServer?tk=77c16e8dc3854adb6beba873501a3d55&T=vec_w&X={x}&Y={y}&L={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            }), L.tileLayer(`http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            })]).setZIndex(95)
        };
    } if (info.componentName === baseLayersTypeInfo.MapBaseTianDiTuImage) {
        return {
            code: info.id || `tianDiTuImage`,
            title: info.config.title || `天地图影像`,
            icon: info.config.icon || ``,
            content: L.layerGroup([L.tileLayer(`http://t{s}.tianditu.gov.cn/DataServer?tk=77c16e8dc3854adb6beba873501a3d55&T=img_w&X={x}&Y={y}&L={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            }), L.tileLayer(`http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            })]).setZIndex(95)
        };
    } if (info.componentName === baseLayersTypeInfo.MapBaseTianDiTuTerrain) {
        return {
            code: info.id || `tianDiTuTerrain`,
            title: info.config.title || `天地图地形`,
            icon: info.config.icon || ``,
            content: L.layerGroup([L.tileLayer(`http://t{s}.tianditu.gov.cn/DataServer?tk=77c16e8dc3854adb6beba873501a3d55&T=ter_w&X={x}&Y={y}&L={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            }), L.tileLayer(`http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}`, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            })]).setZIndex(95)
        };
    } if (info.componentName === baseLayersTypeInfo.MapBaseDynamicNormalMap || info.componentName === baseLayersTypeInfo.MapBaseTiledDynamicMap) {
        if (info.config.type === `dynamic`) {
            return {
                code: info.id || `dynamicNormalMap`,
                title: info.config.title || `江河瑞通`,
                icon: info.config.icon || ``,
                content: L.esri.dynamicMapLayer({
                    url: info.config.url,
                    opacity: 1
                }).setZIndex(95)
            };
        }
        return {
            code: info.id || `dynamicNormalMap`,
            title: info.config.title || `江河瑞通`,
            icon: info.config.icon || ``,
            content: L.tileLayer(info.config.url, {
                maxZoom: info.config.maxZoom || 18,
                minZoom: info.config.minZoom || 5,
                subdomains: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`]
            }).setZIndex(95)
        };
    }
};
