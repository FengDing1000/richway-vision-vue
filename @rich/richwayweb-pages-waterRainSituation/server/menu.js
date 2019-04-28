module.exports = [
    {
        "pageId": "21818d4f-f133-f00d-7362-042b60a4c0f2",
        "pageNm": "雨水情",
        "pageType": "label",
        "url": "",
        "menuLogo": "menu_water_rain",
        "target": "_single",
        "sortId": 999,
        "children": [
            {
                "pageId": "1ccfa871-b133-f00d-7362-06f3362348f6",
                "pageNm": "雨情信息",
                "pageType": "label",
                "url": "",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 1,
                "children": [
                    {
                        "pageId": "312c88b6-9133-f00d-7362-0667d1bdaa40",
                        "pageNm": "累计时段降雨量",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/rain_information/accumulative_rainfall",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 1,
                        "children": [],
                        "module": "accumulativeRainfall",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "50b9632f-3133-f00d-7362-06e109f2c49e",
                        "pageNm": "雨情监测",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/rain_information/rain_monitor",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 2,
                        "children": [],
                        "module": "rainMonitor",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "473fc67e-f133-f00d-7362-0637135c4d6a",
                        "pageNm": "区域平均降雨",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/rain_information/area_rainfall",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 3,
                        "children": [],
                        "module": "areaRainfall",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "b9994237-7133-f00d-7362-065dc4335d0f",
                        "pageNm": "雨量对比",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/rain_information/rainfall_contrast",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 4,
                        "children": [],
                        "module": "rainfallContrast",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    }
                ],
                "module": "rainInformation",
                "mustLogin": false,
                "open": 0,
                "layoutId": "",
                "config": "\"\"",
                "visible": 1
            },
            {
                "pageId": "c02f6efd-2133-f00d-7362-07df58ee73a6",
                "pageNm": "水情信息",
                "pageType": "label",
                "url": "",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 2,
                "children": [
                    {
                        "pageId": "fe6488fb-7133-f00d-7362-07bfd694a55a",
                        "pageNm": "最新河道水情",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/water_information/new_river_water",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 1,
                        "children": [],
                        "module": "newRiverWater",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "d3812eeb-a133-f00d-7362-07c9e128af01",
                        "pageNm": "最新水库水情",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/water_information/new_reservoir_water",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 2,
                        "children": [],
                        "module": "newReservoirWater",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "03ff3766-d133-f00d-7362-070981530056",
                        "pageNm": "河道水情查询",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/water_information/river_water_query",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 3,
                        "children": [],
                        "module": "riverWaterQuery",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "4bf145aa-9133-f00d-7362-07f323474ca9",
                        "pageNm": "水库水情查询",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/water_information/reservoir_water_query",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 4,
                        "children": [],
                        "module": "reservoirWaterQuery",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    }
                ],
                "module": "waterInformation",
                "mustLogin": false,
                "open": 0,
                "layoutId": "",
                "config": "\"\"",
                "visible": 1
            },
            {
                "pageId": "8635cd7e-d133-f00d-7362-046f47308fee",
                "pageNm": "实时报表",
                "pageType": "label",
                "url": "",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 3,
                "children": [
                    {
                        "pageId": "acca3491-d133-f00d-7362-064e369df354",
                        "pageNm": "雨情年报表",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/actual_forms/rain_year_forms",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 1,
                        "children": [],
                        "module": "rainYearForms",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "027a0e68-f133-f00d-7362-048974ab6aeb",
                        "pageNm": "雨情月报表",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/actual_forms/rain_month_forms",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 2,
                        "children": [],
                        "module": "rainMonthForms",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "40309be6-0133-f00d-7362-04c26910e086",
                        "pageNm": "雨情日报表",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/actual_forms/rain_day_forms",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 3,
                        "children": [],
                        "module": "rainDayForms",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "3b520da9-e133-f00d-7362-062151b7f4db",
                        "pageNm": "河道水情报表",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/actual_forms/river_water_forms",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 4,
                        "children": [],
                        "module": "riverWaterForms",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    },
                    {
                        "pageId": "66be21f1-5133-f00d-7362-060c0cd95c33",
                        "pageNm": "水库水情报表",
                        "pageType": "component",
                        "url": "/internet_platform/water_rain_pages/actual_forms/reservoir_water_forms",
                        "menuLogo": "icon-network",
                        "target": "_single",
                        "sortId": 5,
                        "children": [],
                        "module": "reservoirWaterForms",
                        "mustLogin": true,
                        "layoutId": "Layout-Base",
                        "config": "[]",
                        "visible": 1
                    }
                ],
                "module": "actualForms",
                "mustLogin": false,
                "open": 0,
                "layoutId": "",
                "config": "\"\"",
                "visible": 1
            }
        ],
        "module": "waterRainPages",
        "mustLogin": false,
        "open": 0,
        "layoutId": "",
        "config": "\"\"",
        "visible": 1
    }
]