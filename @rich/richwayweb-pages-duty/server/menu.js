module.exports = [
    {
        "pageId": "bb8fdf7d-e133-f00d-7361-fee40f1aca67",
        "pageNm": "值班管理",
        "pageType": "label",
        "url": "",
        "menuLogo": "menu_duty_management",
        "target": "_blank",
        "sortId": 7,
        "children": [
            {
                "pageId": "637d8d2a-d133-f00d-7361-fe6064d8af7e",
                "pageNm": "值班安排",
                "pageType": "component",
                "url": "/internet_platform/duty_management/arrangement",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 1,
                "children": [],
                "module": "arrangement",
                "mustLogin": false,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "0e0a73da-6133-f00d-7361-fe7e53c7d268",
                "pageNm": "值班登记",
                "pageType": "component",
                "url": "/internet_platform/duty_management/registration",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 2,
                "children": [],
                "module": "registration",
                "mustLogin": false,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "4d81b2e5-3133-f00d-7361-fe41d32f8796",
                "pageNm": "值班快报",
                "pageType": "component",
                "url": "/internet_platform/duty_management/express",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 3,
                "children": [],
                "module": "express",
                "mustLogin": false,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "746f44bb-5133-f00d-7361-fe465f00224d",
                "pageNm": "值班管理",
                "pageType": "component",
                "url": "/internet_platform/duty_management/management",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 4,
                "children": [],
                "module": "management",
                "mustLogin": false,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "f2f92500-d133-f0d5-1047-c5848762025a",
                "pageNm": "值班快报统计",
                "pageType": "component",
                "url": "/internet_platform/duty_management/dutyExpressStatistics",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 999,
                "children": [],
                "module": "dutyExpressStatistics",
                "mustLogin": true,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "199093d2-2133-f06c-1373-6af3d8aac56f",
                "pageNm": "人员管理",
                "pageType": "component",
                "url": "/internet_platform/duty_management/personnelManagement",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 999,
                "children": [],
                "module": "personnelManagement",
                "mustLogin": true,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            }
        ],
        "module": "dutyManagement",
        "mustLogin": false,
        "open": 0,
        "layoutId": "",
        "config": "\"\"",
        "visible": 1
    },
    {
        "pageId": "f1262ee7-4133-f070-9b3c-ac463725f962",
        "pageNm": "短信信息",
        "pageType": "label",
        "url": "",
        "menuLogo": "icon-network",
        "target": "_blank",
        "sortId": 999,
        "children": [
            {
                "pageId": "7f59d1a3-8133-f070-9c46-cf792254fca6",
                "pageNm": "编辑短信",
                "pageType": "component",
                "url": "/internet_platform/MSM_information/editShortMessage",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 999,
                "children": [],
                "module": "editShortMessage",
                "mustLogin": true,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "887eb786-a133-f06d-8a9c-c968989dcd67",
                "pageNm": "通讯录",
                "pageType": "component",
                "url": "/internet_platform/MSM_information/mailList",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 999,
                "children": [],
                "module": "mailList",
                "mustLogin": true,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            },
            {
                "pageId": "f739950f-e133-f070-1152-2354de8bc0b9",
                "pageNm": "发送列表",
                "pageType": "component",
                "url": "/internet_platform/MSM_information/sendList",
                "menuLogo": "icon-network",
                "target": "_single",
                "sortId": 999,
                "children": [],
                "module": "sendList",
                "mustLogin": true,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            }
        ],
        "module": "MSMInformation",
        "mustLogin": false,
        "open": 0,
        "layoutId": "",
        "config": "\"\"",
        "visible": 1
    },
    {
        "pageId": "ff2ffefa-d133-f0d1-ecd5-1ab5f17c44ab",
        "pageNm": "责任人维护",
        "pageType": "label",
        "url": "",
        "menuLogo": "icon-network",
        "target": "_blank",
        "sortId": 999,
        "children": [
            {
                "pageId": "fc90cbd4-d133-f0d1-ed49-a58884123c71",
                "pageNm": "责任人维护",
                "pageType": "component",
                "url": "/internet_platform/person_liable_Maintenance/personLiableMaintenance",
                "menuLogo": "icon-network",
                "target": "_blank",
                "sortId": 999,
                "children": [],
                "module": "personLiableMaintenance",
                "mustLogin": true,
                "layoutId": "Layout-Base",
                "config": "[]",
                "visible": 1
            }
        ],
        "module": "personLiableMaintenance",
        "mustLogin": false,
        "open": 0,
        "layoutId": "",
        "config": "\"\"",
        "visible": 1
    }
]