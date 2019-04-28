module.exports = [
    {
        "pageId": "4bc5b0bf-2133-f009-8c6a-b6a3ae6de62b",
        "pageNm": "系统管理",
        "pageType": "label",
        "url": "",
        "menuLogo": "icon-sys",
        "target": "_blank",
        "sortId": 5,
        "children": [
            {
                "pageId": "3d8986e7-0133-f009-8c6a-b8d24d9f95d9",
                "pageNm": "用户管理",
                "pageType": "component",
                "url": "/internet_platform/sys_manage/user_manage",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 1,
                "children": [],
                "module": "userManage",
                "mustLogin": false,
                "layoutId": "",
                "config": "[{\"id\":\"MapView\",\"center\":[26.595353,106.6602],\"zoom\":8,\"minZoom\":1,\"maxZoom\":18,\"regions\":[{\"id\":\"BaseLayers\",\"title\":\"地图底图\",\"components\":[{\"title\":\"贵州地图\",\"sort\":1,\"list\":[{\"id\":\"MapBase-DynamicNormalMap_2\",\"componentName\":\"MapBase-DynamicNormalMap\",\"config\":{\"icon\":\"/map/gzmap.png\",\"active\":true,\"title\":\"贵州矢量图\",\"type\":\"dynamic\",\"url\":\"http://192.168.0.101:6080/arcgis/rest/services/gz_20181119/MapServer\",\"sort\":1}},{\"id\":\"MapBase-DynamicNormalMap_dem\",\"componentName\":\"MapBase-DynamicNormalMap\",\"config\":{\"icon\":\"/map/gzmapdem.png\",\"active\":false,\"title\":\"贵州地形图\",\"type\":\"dynamic\",\"url\":\"http://192.168.0.101:6080/arcgis/rest/services/gz_20181119_dem/MapServer\",\"sort\":2}}],\"type\":\"custom\"},{\"title\":\"谷歌地图\",\"sort\":2,\"list\":[{\"id\":\"BusinessLayersGoogleVector\",\"componentName\":\"MapBase-GoogleVector\",\"config\":{\"icon\":\"/map/googlemap.png\",\"title\":\"谷歌矢量\",\"sort\":2}},{\"id\":\"BusinessLayersGoogleImage\",\"componentName\":\"MapBase-GoogleImage\",\"config\":{\"icon\":\"/map/googleimage.png\",\"title\":\"谷歌影像\",\"sort\":3}},{\"id\":\"BusinessLayersGoogleTerrain\",\"componentName\":\"MapBase-GoogleTerrain\",\"config\":{\"icon\":\"/map/googletrain.png\",\"title\":\"谷歌地形\",\"sort\":4}}],\"type\":\"google\"},{\"title\":\"天地图地图\",\"sort\":3,\"list\":[{\"id\":\"BusinessLayersTianDiTuVector\",\"componentName\":\"MapBase-TianDiTuVector\",\"config\":{\"icon\":\"/map/tianditumap.png\",\"title\":\"天地图矢量\",\"sort\":5}},{\"id\":\"BusinessLayersTianDiTuImage\",\"componentName\":\"MapBase-TianDiTuImage\",\"config\":{\"icon\":\"/map/tiandituimage.png\",\"title\":\"天地图影像\",\"sort\":6}},{\"id\":\"BusinessLayersTianDiTuTerrain\",\"componentName\":\"MapBase-TianDiTuTerrain\",\"config\":{\"icon\":\"/map/tianditutrain.png\",\"title\":\"天地图地形\",\"sort\":7}}],\"type\":\"tianditu\"}]},{\"id\":\"BusinessLayers\",\"title\":\"业务图层\",\"components\":[{\"id\":\"BusinessLayersContour\",\"componentName\":\"Map-Business-Layers-Contour\",\"config\":{\"code\":\"BusinessLayersContour\",\"layerGroupName\":\"Contour\",\"title\":\"等值面\",\"icon\":\"\",\"init\":true,\"controllByLayer\":true,\"layerSort\":2,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersCloud\",\"componentName\":\"Map-Business-Layers-Cloud\",\"config\":{\"code\":\"BusinessLayersCloud\",\"layerGroupName\":\"Cloud\",\"title\":\"云图\",\"icon\":\"\",\"init\":true,\"controllByLayer\":true,\"layerSort\":2,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersRain\",\"componentName\":\"Map-Business-Layers-Rain\",\"config\":{\"code\":\"BusinessLayersRain\",\"layerGroupName\":\"Rain\",\"title\":\"雨量\",\"icon\":\"Map-Icon-Rain\",\"init\":true,\"controllByLayer\":true,\"layerSort\":2,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersSite\",\"componentName\":\"Map-Business-Layers-Site\",\"config\":{\"code\":\"BusinessLayersSite\",\"layerGroupName\":\"Site\",\"title\":\"测站\",\"icon\":\"Map-Icon-Site\",\"init\":true,\"controllByLayer\":true,\"layerSort\":2,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersWarn\",\"componentName\":\"Map-Business-Layers-Warn\",\"config\":{\"code\":\"BusinessLayersWarn\",\"layerGroupName\":\"Warn\",\"title\":\"预警\",\"init\":true,\"legendSort\":5,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersChemicalPlant\",\"componentName\":\"Map-Business-Layers-ChemicalPlant\",\"config\":{\"code\":\"BusinessLayersChemicalPlant\",\"layerGroupName\":\"ChemicalPlant\",\"title\":\"化工厂\",\"init\":true,\"legendSort\":5,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersExtinguishing\",\"componentName\":\"Map-Business-Layers-Extinguishing\",\"config\":{\"code\":\"BusinessLayersExtinguishing\",\"layerGroupName\":\"Extinguishing\",\"title\":\"灭火药剂\",\"icon\":\"Map-Icon-Extinguishing\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":6,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersFireHydrant\",\"componentName\":\"Map-Business-Layers-FireHydrant\",\"config\":{\"code\":\"BusinessLayersFireHydrant\",\"layerGroupName\":\"FireHydrant\",\"title\":\"消防栓\",\"icon\":\"Map-Icon-FireHydrant\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":6,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersGasSite\",\"componentName\":\"Map-Business-Layers-GasSite\",\"config\":{\"code\":\"BusinessLayersGasSite\",\"layerGroupName\":\"GasSite\",\"title\":\"加油站\",\"icon\":\"Map-Icon-GasSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":4,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersHydropowerStation\",\"componentName\":\"Map-Business-Layers-HydropowerStation\",\"config\":{\"code\":\"BusinessLayersHydropowerStation\",\"layerGroupName\":\"HydropowerStation\",\"title\":\"水电站\",\"icon\":\"Map-Icon-HydropowerStation\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":4,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersImgSite\",\"componentName\":\"Map-Business-Layers-ImgSite\",\"config\":{\"code\":\"BusinessLayersImgSite\",\"layerGroupName\":\"ImgSite\",\"title\":\"图像站\",\"icon\":\"Map-Icon-ImgSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":6,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersPipeNetwork\",\"componentName\":\"Map-Business-Layers-PipeNetwork\",\"config\":{\"code\":\"BusinessLayersPipeNetwork\",\"layerGroupName\":\"PipeNetwork\",\"title\":\"管网站\",\"icon\":\"Map-Icon-PipeNetwork\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":6,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersRainfallSite\",\"componentName\":\"Map-Business-Layers-RainfallSite\",\"config\":{\"code\":\"BusinessLayersRainfallSite\",\"layerGroupName\":\"RainfallSite\",\"title\":\"雨量站\",\"icon\":\"Map-Icon-RainfallSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":3,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersRescueSite\",\"componentName\":\"Map-Business-Layers-RescueSite\",\"config\":{\"code\":\"BusinessLayersRescueSite\",\"layerGroupName\":\"RescueSite\",\"title\":\"救援力量\",\"icon\":\"Map-Icon-RescueSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":3,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersReservoirSite\",\"componentName\":\"Map-Business-Layers-ReservoirSite\",\"config\":{\"code\":\"BusinessLayersReservoirSite\",\"layerGroupName\":\"ReservoirSite\",\"title\":\"水库站\",\"icon\":\"Map-Icon-ReservoirSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":2,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersRiverSite\",\"componentName\":\"Map-Business-Layers-RiverSite\",\"config\":{\"code\":\"BusinessLayersRiverSite\",\"layerGroupName\":\"RiverSite\",\"title\":\"河道站\",\"icon\":\"Map-Icon-RiverSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":12,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersSluiceSite\",\"componentName\":\"Map-Business-Layers-SluiceSite\",\"config\":{\"code\":\"BusinessLayersSluiceSite\",\"layerGroupName\":\"SluiceSite\",\"title\":\"闸泵站\",\"icon\":\"Map-Icon-SluiceSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":2,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersVideoSite\",\"componentName\":\"Map-Business-Layers-VideoSite\",\"config\":{\"code\":\"BusinessLayersVideoSite\",\"layerGroupName\":\"VideoSite\",\"title\":\"视频监视站\",\"icon\":\"Map-Icon-VideoSite\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":2,\"subscribeKey\":\"\"}},{\"id\":\"BusinessLayersWarehouse\",\"componentName\":\"Map-Business-Layers-Warehouse\",\"config\":{\"code\":\"BusinessLayersWarehouse\",\"layerGroupName\":\"Warehouse\",\"title\":\"仓库\",\"icon\":\"Map-Icon-Warehouse\",\"init\":true,\"controllByLayer\":false,\"controllByLegend\":true,\"legendSort\":2,\"subscribeKey\":\"\"}}]},{\"id\":\"Controls\",\"title\":\"控制按钮\",\"components\":[{\"id\":\"MapControlsBaseLayer\",\"componentName\":\"Map-Controls-BaseLayer\",\"config\":{\"position\":\"left-bottom\",\"sort\":4}},{\"id\":\"MapControlsAim\",\"componentName\":\"Map-Controls-Aim\",\"config\":{\"position\":\"left-bottom\",\"sort\":3}},{\"id\":\"MapControlsBusinessLayer\",\"componentName\":\"Map-Controls-BusinessLayer\",\"config\":{\"position\":\"left-bottom\",\"sort\":5}},{\"id\":\"MapControlsZoom\",\"componentName\":\"Map-Controls-Zoom\",\"config\":{\"position\":\"left-bottom\",\"sort\":1}},{\"id\":\"MapControlsBaseLegend\",\"componentName\":\"Map-Controls-Base-Legend\",\"config\":{\"position\":\"left-bottom\",\"sort\":2}},{\"id\":\"MapControlsAttr\",\"componentName\":\"Map-Controls-Attr\",\"config\":{\"position\":\"left-top\",\"sort\":1}},{\"id\":\"MapControlsRegion\",\"componentName\":\"Map-Controls-Region\",\"config\":{\"position\":\"left-top\",\"sort\":2}}]},{\"id\":\"Plugins\",\"title\":\"地图插件\",\"components\":[{\"id\":\"MapPluginsBoundary\",\"componentName\":\"Map-Plugins-Boundary\",\"config\":{\"inside\":{\"color\":\"#4775ca\",\"weight\":1},\"outside\":{\"color\":\"#dedbed\",\"weight\":14}}}]}]},{\"id\":\"MapBusiness\",\"components\":[{\"id\":\"MapBusinessMonitorContainerBase\",\"componentName\":\"Map-Business-Monitor-ContainerBase\",\"config\":{\"position\":\"right\",\"sort\":3},\"subComponents\":[{\"id\":\"MapBusinessMonitorRain\",\"componentName\":\"Map-Business-Monitor-Rain\",\"title\":\"雨情\",\"icon\":\"icon-rain\",\"sort\":2},{\"id\":\"MapBusinessMonitorWater\",\"componentName\":\"Map-Business-Monitor-Water\",\"title\":\"水情\",\"icon\":\"icon-water\",\"sort\":3},{\"id\":\"MapBusinessMonitorWeather\",\"componentName\":\"Map-Business-Monitor-Weather\",\"title\":\"气象\",\"icon\":\"icon-cloud\",\"sort\":4},{\"id\":\"MapBusinessMonitorWork\",\"componentName\":\"Map-Business-Monitor-Work\",\"title\":\"工情\",\"icon\":\"icon-cloud\",\"sort\":4},{\"id\":\"MapBusinessMonitorWarn\",\"componentName\":\"Map-Business-Monitor-Warn\",\"title\":\"预警\",\"icon\":\"icon-warn\",\"sort\":3}]}]}]",
                "visible": 1
            },
            {
                "pageId": "9500b809-b133-f00c-ccac-f187570db099",
                "pageNm": "分组管理",
                "pageType": "component",
                "url": "/internet_platform/sys_manage/dept_manage",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 2,
                "children": [],
                "module": "deptManage",
                "mustLogin": true,
                "layoutId": "",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "d6b0e9f7-3133-f009-8c6a-b87f849211ab",
                "pageNm": "角色管理",
                "pageType": "component",
                "url": "/internet_platform/sys_manage/role_manage",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 3,
                "children": [],
                "module": "roleManage",
                "mustLogin": false,
                "layoutId": "",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "15c93d03-8133-f009-8c6a-b71c7872e053",
                "pageNm": "菜单管理",
                "pageType": "component",
                "url": "/internet_platform/sys_manage/menu_manage",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 4,
                "children": [],
                "module": "menuManage",
                "mustLogin": true,
                "layoutId": "",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "336b1951-8133-f009-8c6a-b6cecff4ea27",
                "pageNm": "角色菜单权限管理",
                "pageType": "component",
                "url": "/internet_platform/sys_manage/role_menu_authority_manage",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 5,
                "children": [],
                "module": "roleMenuAuthorityManage",
                "mustLogin": true,
                "layoutId": "",
                "config": "[]",
                "visible": 1
            }
        ],
        "module": "platformManage",
        "mustLogin": false,
        "open": 0,
        "layoutId": "",
        "config": "\"\"",
        "visible": 1
    },
    {
        "pageId": "2844079b-d134-1399-dd2d-b7983cd4dcc0",
        "pageNm": "字体库",
        "pageType": "component",
        "url": "/font_library",
        "menuLogo": "icon-network",
        "target": "_blank",
        "sortId": 999,
        "children": [],
        "module": "fontLibrary",
        "mustLogin": false,
        "layoutId": "",
        "config": "[]",
        "visible": 1
    }
]