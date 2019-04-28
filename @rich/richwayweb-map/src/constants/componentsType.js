/**

 @Name：地图组件名称的文件
 @Author：g.zhou
 @License：MIT

 */

import RichWayWebUtils from '@rich/richwayweb-utils';
import * as bType from "./broadcastType";

const { guid } = RichWayWebUtils;

/**
 * 地图底图配置信息类
 */
class BaseLayersConfig {
    constructor(info = {}) {
        this.code = info.code || guid();
        this.title = info.title || ``;
        this.icon = info.icon || ``;
        this.sort = parseInt(`${info.sort || 1}`, 10);
        this.type = info.type || ``;
        this.url = info.url || ``;
        this.maxZoom = parseInt(`${info.maxZoom || 18}`, 10);
        this.minZoom = parseInt(`${info.minZoom || 5}`, 10);
        this.active = info.active || false;
    }
}

/**
 * 业务图层配置信息类
 */
class BusinessLayersConfig {
    constructor(info = {}) {
        this.code = info.code || guid();
        this.title = (info.title || ``).replace(`图例`,``).replace(`组件`, ``);
        this.layerGroupName = info.layerGroupName || this.code || ``;
        this.icon = info.icon || ``;
        this.color = info.color || ``;
        this.fillColor = info.fillColor || ``;
        this.fillOpacity = info.fillOpacity || ``;
        this.weight = info.weight || ``;
        this.dashArray = info.dashArray || ``;
        this.fontSize = info.fontSize || ``;
        this.init = info.init || false;
        this.controllByLayer = info.controllByLayer || false;
        this.layerSort = parseInt(`${info.layerSort || 1}`, 10);
        this.controllByLegend = info.controllByLegend || false;
        this.legendSort = parseInt(`${info.legendSort || 1}`, 10);
        this.subscribeKey = info.subscribeKey || ``;
        this.cluster = Object.assign({
            isCluster: true,
            maxZoom: 15,
            showCoverageOnHover: true
        }, info.cluster);
        this.type = info.type || ``;
        this.url = info.url || ``;
        this.iconSize = info.iconSize || [30, 30];
        this.iconAnchor = info.iconAnchor || [15, 15];

    }
}

/**
 * 控制按钮配置信息类
 */
class MapControlsConfig {
    constructor(info = {}) {
        this.code = info.code || guid();
        this.title = info.title || ``;
        this.position = info.position || `left-top`;
        this.sort = parseInt(`${info.sort || 1}`, 10);
        this.toggle = info.toggle || `hide`;
        this.icon = info.icon || `icon-setting`;
    }
}

/**
 * 地图插件配置信息类
 */
class MapPluginsConfig {
    constructor(info = {}) {
        this.code = info.code || guid();
        this.title = info.title || ``;

        if (info.inside || info.outside || info.hole) {
            this.inside = Object.assign({
                color: `#4775ca`,
                weight: 1,
                active: false
            }, info.inside);
            if (typeof (info.inside) === `object` && !Object.hasOwnProperty.call(info.inside, `active`)) {
                this.inside.active = true;
            }

            this.outside = Object.assign({
                color: `#dedbed`,
                weight: 14,
                active: false
            }, info.outside);
            if (typeof (info.outside) === `object` && !Object.hasOwnProperty.call(info.outside, `active`)) {
                this.inside.active = true;
            }

            this.hole = Object.assign({
                color: `#9a9a9a`,
                opacity: 1,
                weight: 4,
                fillColor: `#fff`,
                fillOpacity: 0.7,
                active: false
            }, info.hole);
            if (typeof (info.hole) === `object` && !Object.hasOwnProperty.call(info.hole, `active`)) {
                this.inside.active = true;
            }
        } else {
            this.color = info.color || `#fff`;
            this.fillColor = info.fillColor || `#000`;
            this.fillOpacity = info.fillOpacity || 0.3;
        }

        // for (const key in info) {
        //     if (Object.hasOwnProperty.call(info, key) && key !== `title` && key !== `code`) {
        //         this[key] = info[key] || ``;
        //     }
        // }
    }
}

// 地图底图列表
const baseLayersComponents = [
    {
        id: `MapBaseTiledDynamicMap`,
        componentName: `MapBase-TiledDynamicMap`,
        config: new BaseLayersConfig({
            title: `江河瑞通地图底图组件`
        }),
        type: `custom`
    },
    {
        id: `MapBaseTianDiTuVector`,
        componentName: `MapBase-TianDiTuVector`,
        config: new BaseLayersConfig({
            title: `天地图矢量底图组件`
        }),
        type: `tianditu`
    },
    {
        id: `MapBaseTianDiTuImage`,
        componentName: `MapBase-TianDiTuImage`,
        config: new BaseLayersConfig({
            title: `天地图影像底图组件`
        }),
        type: `tianditu`
    },
    {
        id: `MapBaseTianDiTuTerrain`,
        componentName: `MapBase-TianDiTuTerrain`,
        config: new BaseLayersConfig({
            title: `天地图地形底图组件`
        }),
        type: `tianditu`
    },
    {
        id: `MapBaseGoogleVector`,
        componentName: `MapBase-GoogleVector`,
        config: new BaseLayersConfig({
            title: `谷歌地图矢量底图组件`
        }),
        type: `google`
    },
    {
        id: `MapBaseGoogleImage`,
        componentName: `MapBase-GoogleImage`,
        config: new BaseLayersConfig({
            title: `谷歌地图影像底图组件`
        }),
        type: `google`
    },
    {
        id: `MapBaseGoogleTerrain`,
        componentName: `MapBase-GoogleTerrain`,
        config: new BaseLayersConfig({
            title: `谷歌地图地形底图组件`
        }),
        type: `google`
    }
];

// 地图业务图层列表
const businessLayersComponents = [
    {
        componentName: `Map-Business-Layers-Operation`,
        type: `nonPoint`,
        config: new BusinessLayersConfig({
            title: `动态图层`,
            type: `dynamic`,
            url: `http://gis.rwworks.com:6080/arcgis/rest/services/shanxi/shanxi_web_dynamic/MapServer`,
            controllByLayer: true,
            subscribeKey: bType.MapBusinessLayersOperationBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Cloud`,
        type: `nonPoint`,
        config: new BusinessLayersConfig({
            title: `云图组件`,
            controllByLayer: true,
            subscribeKey: bType.MapBusinessLayersCloudBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Contour`,
        type: `nonPoint`,
        config: new BusinessLayersConfig({
            title: `等值面组件`,
            controllByLayer: true,
            subscribeKey: bType.MapBusinessLayersContourBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Hsfxt`,
        type: `nonPoint`,
        config: new BusinessLayersConfig({
            title: `洪水风险图组件`,
            controllByLayer: true,
            subscribeKey: bType.MapBusinessLayersHsfxtBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Rain`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `雨量组件`,
            icon: `Map-Icon-Rain`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersRainBroadcastKey,
            iconSize: [60, 60],
            iconAnchor: [30, 30]
        })
    },
    {
        componentName: `Map-Business-Layers-Water`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `水量组件`,
            icon: `Map-Icon-Water`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersWaterBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Site`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `测站组件`,
            icon: `Map-Icon-Site`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersSiteBroadcastKey,
            iconSize: [60, 60],
            iconAnchor: [30, 30]
        })
    },
    {
        componentName: `Map-Business-Layers-RainfallSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `雨量站图例组件`,
            icon: `Map-Icon-RainfallSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersRainfallSiteBroadcastKey,
            iconSize: [60, 60],
            iconAnchor: [30, 30]
        })
    },
    {
        componentName: `Map-Business-Layers-Warn`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `预警图例组件`,
            icon: `Map-Icon-Warn`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersWarnBroadcastKey,
            iconSize: [80, 80],
            iconAnchor: [40, 40]
        })
    },
    {
        componentName: `Map-Business-Layers-Basin`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `小流域图例组件`,
            icon: `Map-Icon-Basin`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersBasinBroadcastKey,
            iconSize: [80, 80],
            iconAnchor: [40, 40]
        })
    },
    {
        componentName: `Map-Business-Layers-ReservoirSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `水库站图例组件`,
            icon: `Map-Icon-ReservoirSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersReservoirSiteBroadcastKey,
            iconSize: [80, 80],
            iconAnchor: [40, 40]
        })
    },
    {
        componentName: `Map-Business-Layers-RiverSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `河道站图例组件`,
            icon: `Map-Icon-RiverSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersRiverSiteBroadcastKey,
            iconSize: [80, 80],
            iconAnchor: [40, 40]
        })
    },
    {
        componentName: `Map-Business-Layers-ChemicalPlant`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `化工厂图例组件`,
            icon: `Map-Icon-ChemicalPlant`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersChemicalPlantBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Extinguishing`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `灭火药剂图例组件`,
            icon: `Map-Icon-Extinguishing`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersExtinguishingBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-FireHydrant`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `消防栓图例组件`,
            icon: `Map-Icon-FireHydrant`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersFireHydrantBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-GasSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `加油站图例组件`,
            icon: `Map-Icon-GasSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersGasSiteBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-HydropowerStation`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `水电站图例组件`,
            icon: `Map-Icon-HydropowerStation`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersHydropowerStationBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-ImgSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `图像站图例组件`,
            icon: `Map-Icon-ImgSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersImgSiteBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-PipeNetwork`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `管网站图例组件`,
            icon: `Map-Icon-PipeNetwork`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersPipeNetworkBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-RescueSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `救援力量图例组件`,
            icon: `Map-Icon-RescueSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersRescueSiteBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-SluiceSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `闸泵站图例组件`,
            icon: `Map-Icon-SluiceSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersSluiceSiteBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-VideoSite`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `视频监视站图例组件`,
            icon: `Map-Icon-VideoSite`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersVideoSiteBroadcastKey,
            iconSize: [60, 60],
            iconAnchor: [30, 30]
        })
    },
    {
        componentName: `Map-Business-Layers-Warehouse`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `仓库图例组件`,
            icon: `Map-Icon-Warehouse`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersWarehouseBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Dike`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `堤防图例组件`,
            icon: `Map-Icon-Dike`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersDikeBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Bridge`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `桥梁图例组件`,
            icon: `Map-Icon-Bridge`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersBridgeBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Business`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `企事业单位图例组件`,
            icon: `Map-Icon-Business`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersBusinessBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Culvert`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `路涵工程图例组件`,
            icon: `Map-Icon-Culvert`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersCulvertBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-DangerousArea`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `危险区图例组件`,
            icon: `Map-Icon-DangerousArea`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersDangerousAreaBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-FloodTrace`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `历史洪痕图例组件`,
            icon: `Map-Icon-FloodTrace`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersFloodTraceBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Gully`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `需防洪治理山洪沟图例组件`,
            icon: `Map-Icon-Gully`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersGullyBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-House`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `房屋图例组件`,
            icon: `Map-Icon-House`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersHouseBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Hsfwater`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `历史山洪灾害图例组件`,
            icon: `Map-Icon-Hsfwater`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersHsfwaterBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Placement`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `安置点图例组件`,
            icon: `Map-Icon-Placement`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersPlacementBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-RiverParagraph`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `河段图例组件`,
            icon: `Map-Icon-RiverParagraph`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersRiverParagraphBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Section`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `大断面图例组件`,
            icon: `Map-Icon-Section`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersSectionBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Town`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `集镇图例组件`,
            icon: `Map-Icon-Town`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersTownBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Transfer`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `转移路线图例组件`,
            icon: `Map-Icon-Transfer`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersTransferBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Village`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `沿河村落图例组件`,
            icon: `Map-Icon-Village`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersVillageBroadcastKey
        })
    },
    {
        componentName: `Map-Business-Layers-Weir`,
        type: `point`,
        config: new BusinessLayersConfig({
            title: `塘(堰)坝工程图例组件`,
            icon: `Map-Icon-Weir`,
            controllByLegend: true,
            subscribeKey: bType.MapBusinessLayersWeirBroadcastKey
        })
    },


    // 2019-02-20 ZG新增
    {
        componentName: `Map-Business-Layers-Default`,
        type: `point`,
        config: {
            // title: `占位图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-WellCover`,
        type: `point`,
        config: {
            title: `井盖图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-Enclosure`,
        type: `point`,
        config: {
            title: `雨篦子图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-PumpingStation`,
        type: `point`,
        config: {
            title: `泵站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-GateStation`,
        type: `point`,
        config: {
            title: `闸站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-SewageTreatmentPlant`,
        type: `point`,
        config: {
            title: `污水处理厂图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-Reservoir`,
        type: `point`,
        config: {
            title: `蓄水池图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-WaterQMMStation`,
        type: `point`,
        config: {
            title: `水质人工检监测站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-WaterQAMStation`,
        type: `point`,
        config: {
            title: `水质自动检监测站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-CameraVideoStation`,
        type: `point`,
        config: {
            title: `视频站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-CameraImgStation`,
        type: `point`,
        config: {
            title: `图片站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-RainfallStation`,
        type: `point`,
        config: {
            title: `雨量站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-FlowStation`,
        type: `point`,
        config: {
            title: `流量站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-WaterLevelStation`,
        type: `point`,
        config: {
            title: `水位站图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-UAV`,
        type: `point`,
        config: {
            title: `无人机图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-Robot`,
        type: `point`,
        config: {
            title: `巡检机器人图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-IndustrialDrainageUsers`,
        type: `point`,
        config: {
            title: `工业排水用户图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-ResidentDrainageUsers`,
        type: `point`,
        config: {
            title: `居民排水用户图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-OperationalUnit`,
        type: `point`,
        config: {
            title: `运维单位图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-ManagementUnit`,
        type: `point`,
        config: {
            title: `管理单位图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-Inspectors`,
        type: `point`,
        config: {
            title: `巡检人员图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-Rivers`,
        type: `Polyline`,
        config: {
            title: `河流图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-Lake`,
        type: `Polygon`,
        config: {
            title: `湖泊图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-SewagePipe`,
        type: `Polyline`,
        config: {
            title: `污水管图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-RainPipe`,
        type: `Polyline`,
        config: {
            title: `雨水管图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-SewageInterceptionPipe`,
        type: `Polyline`,
        config: {
            title: `截污管图例组件`
        }
    },
    {
        componentName: `Map-Business-Layers-WaterReplenishingPipe`,
        type: `Polyline`,
        config: {
            title: `补水管图例组件`
        }
    }
];

// 地图控制按钮列表
const controlsComponents = [
    {
        id: `MapControlsBaseLayer`,
        componentName: `Map-Controls-BaseLayer`,
        config: new MapControlsConfig({
            title: `切换底图`,
            icon: `icon-layer`
        })
    },
    {
        id: `MapControlsZoom`,
        componentName: `Map-Controls-Zoom`,
        config: new MapControlsConfig({
            title: `放大缩小`
        })
    },
    {
        id: `MapControlsFullScreen`,
        componentName: `Map-Controls-FullScreen`,
        config: new MapControlsConfig({
            title: `全屏`
        })
    },
    {
        id: `MapControlsBusinessLayer`,
        componentName: `Map-Controls-BusinessLayer`,
        config: new MapControlsConfig({
            title: `业务图层控制`,
            icon: `icon-group`
        })
    },
    {
        id: `MapControlsAim`,
        componentName: `Map-Controls-Aim`,
        config: new MapControlsConfig({
            title: `回到原始中心位置`,
            icon: `icon-aim`
        })
    },
    {
        id: `MapControlsRegion`,
        componentName: `Map-Controls-Region`,
        config: new MapControlsConfig({
            title: `政区选择`
        })
    },
    {
        id: `MapControlsBaseLegend`,
        componentName: `Map-Controls-Base-Legend`,
        config: new MapControlsConfig({
            title: `基本的图例`,
            icon: `icon-shebei`
        })
    },
    {
        id: `MapControlsSiteLegend`,
        componentName: `Map-Controls-Site-Legend`,
        config: new MapControlsConfig({
            title: `站点图例`,
            icon: `icon-setting`
        })
    },
    {
        id: `MapControlsAttr`,
        componentName: `Map-Controls-Attr`,
        config: new MapControlsConfig({
            title: `地图说明`
        })
    },
    {
        id: `MapControlsRange`,
        componentName: `Map-Controls-Range`,
        config: new MapControlsConfig({
            title: `范围选择`
        })
    }
];

// 地图插件列表
const pluginsComponents = [
    {
        id: `MapPluginsBoundary`,
        componentName: `Map-Plugins-Boundary`,
        config: new MapPluginsConfig({
            inside: {
                color: `#4775ca`,
                weight: 1
            },
            outside: {
                color: `#dedbed`,
                weight: 14
            },
            hole: {
                color: `#9a9a9a`,
                opacity: 1,
                weight: 4,
                fillColor: `#fff`,
                fillOpacity: 0.7
            },
            title: `画边界线`
        })
    },
    {
        id: `MapPluginsDangerZone`,
        componentName: `Map-Plugins-DangerZone`,
        config: new MapPluginsConfig({
            title: `危险区圆形边界`,
            color: `#fff`,
            fillColor: `#000`,
            fillOpacity: 0.3
        })
    }
];

const baseLayersTypeInfo = {};
for (const item of baseLayersComponents) {
    baseLayersTypeInfo[item.id] = item.componentName;
}

const businessLayersTypeInfo = {};
for (const item of businessLayersComponents) {
    const key = (item.componentName || ``).replace(`Map-Business-Layers-`, ``);
    if (!item.id) {
        item.id = `MapBusinessLayers${key}`;
    }
    if (!(item.config instanceof BusinessLayersConfig)){
        item.config = new BusinessLayersConfig(Object.assign(item.config, {
            code: `BusinessLayers${key}`,
            icon: `Map-Icon-${key}`,
            controllByLegend: true,
            subscribeKey: bType[`MapBusinessLayers${key}BroadcastKey`],
            type: item.type
        }));
    }
    businessLayersTypeInfo[item.id] = item.componentName;
}

const controlsTypeInfo = {};
for (const item of controlsComponents) {
    controlsTypeInfo[item.id] = item.componentName;
}

const pluginsTypeInfo = {};
for (const item of pluginsComponents) {
    pluginsTypeInfo[item.id] = item.componentName;
}

const mapBaseTypeInfo = {
    MapBase: `MapBase`,
    MapWapBase: `MapWapBase`
};

function getBusinessLayersInfoById(id) {
    let info = {};
    for (const item of businessLayersComponents) {
        if (item.id === id || item.componentName === id) {
            info = item;
            break;
        }
    }
    return info;
}

export default {
    baseLayersComponents,
    businessLayersComponents,
    controlsComponents,
    pluginsComponents,
    BaseLayersConfig,
    BusinessLayersConfig,
    MapControlsConfig,
    MapPluginsConfig,
    baseLayersTypeInfo,
    businessLayersTypeInfo,
    controlsTypeInfo,
    pluginsTypeInfo,
    mapBaseTypeInfo,
    getBusinessLayersInfoById
};
