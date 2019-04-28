const Mock = require(`mockjs`);
// 编辑短信页-左侧联系人列表
function GetContactList(ctx,queryInfo) {
    const ContactListInfo = Mock.mock({
        "data|20": [
            {
                "addr": "",
                "adlCd": "511823,",
                "adlCdName": "",
                "appId": "96c79dd7f08f46e3a1f5458809a330b6",
                "children|3": [
                    {"addr": "",
                    "adlCd": "511823",
                    "adlCdName": "",
                    "appId": "96c79dd7f08f46e3a1f5458809a330b6",
                    "children": null,
                    "crtDt": "2018-11-01 00:00:00",
                    "crtDtTm": "2018-11-01 00:00:00",
                    "deptCd": "77813504de3e498f90044f68a937928e",
                    "deptNm": "111111(0)",
                    "deptParent": "0baf0dbaeee14f73acdb20527bd0bea8",
                    "eMail": "",
                    "fax": "",
                    "isParent": true,
                    "lrNm": "",
                    "menb": "",
                    "nt": "",
                    "num": 0,
                    "open": null,
                    "orgScal": "",
                    "orgScalStr": "",
                    "orgShnm": "",
                    "orgTp": "",
                    "pnm": "",
                    "tel": "",
                    "ts": "2018-11-01 00:00:00",
                    "tsTm": "2018-11-01 00:00:00",
                    "updDt": "2018-11-01 00:00:00",
                    "updDtTm": "2018-11-01 00:00:00",
                    "userinfo": null,
                    "web": "",
                    "zip": ""
                }
                ],
                "crtDt": "2018-09-20 00:00:00",
                "crtDtTm": "2018-09-20 00:00:00",
                "deptCd": "0baf0dbaeee14f73acdb20527bd0bea8",
                "deptNm": "测试分组@id",
                "deptParent": "",
                "eMail": "",
                "fax": "",
                "isParent": true,
                "lrNm": "",
                "menb": "",
                "nt": "",
                "num": 0,
                "open": true,
                "orgScal": "",
                "orgScalStr": "",
                "orgShnm": "",
                "orgTp": "",
                "pnm": "",
                "tel": "",
                "ts": "2018-09-20 00:00:00",
                "tsTm": "2018-09-20 00:00:00",
                "updDt": "2018-09-20 00:00:00",
                "updDtTm": "2018-09-20 00:00:00",
                "userinfo": null,
                "web": "",
                "zip": ""
            }
        ]
    });

    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: ContactListInfo.data,
        stackTrace: null
    };
}
// 编辑短信页面 - 左侧防汛联系人列表
function GetFloodControlList(ctx,queryInfo) {
    const ContactListInfo = Mock.mock({
        "data|3": [
            {
                "children|10": [
                    {
                        "children": [],
                        "expanded": false,
                        "id": "@id",
                        "isParent": false,
                        "leaf": true,
                        "name": "富林镇(3)",
                        "nodeData": null,
                        "parentId": "2",
                        "text": "富林镇(3)"
                    }
                ],
                "expanded": false,
                "id": "2",
                "isParent": true,
                "leaf": false,
                "name": "防汛责任人",
                "nodeData": null,
                "parentId": "",
                "text": "防汛责任人"
            }
        ]
    });

    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: ContactListInfo.data,
        stackTrace: null
    };
}
// 编辑短信页面 - 左侧防汛联系人列表
function PersonIncharge(ctx,queryInfo) {
    const ContactListInfo = Mock.mock({
        "data|3": [
            {
                "children|10": [
                    {
                        "children": [],
                        "expanded": false,
                        "id": "@id",
                        "isParent": false,
                        "leaf": true,
                        "name": "富林镇(3)",
                        "nodeData": null,
                        "parentId": "2",
                        "text": "富林镇(3)"
                    }
                ],
                "expanded": false,
                "id": "2",
                "isParent": true,
                "leaf": false,
                "name": "防汛责任人",
                "nodeData": null,
                "parentId": "",
                "text": "防汛责任人"
            }
        ]
    });

    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: ContactListInfo.data,
        stackTrace: null
    };
}
// 编辑短信页-点击tree，显示穿梭宽的信息 /contacts/list
function GetcontactsList(ctx,queryInfo) {
    const ContactsListInfo = Mock.mock({
        "data|3": [
            {
                "adCd": "511823000000000",
                "address": "唐家镇五里社区4组",
                "appId": "96c79dd7f08f46e3a1f5458809a330b6",
                "birthday": "",
                "contactsId": "00b7dd4678774d1cb1bd7f44eaba82e2",
                "contactsName": "冉建全",
                "deptCd": "",
                "deptNm": "",
                "email": "",
                "fax": "",
                "groups|3": [
                    {
                    "key": "5481749bb98e4634ac512321a3473bb0",
                    "value": "乡镇水利员"
                    }
                ],
                "idCard": "",
                "isVip": "",
                "mobile": "15196579294",
                "nt": "",
                "orderSort": null,
                "position": "监测员",
                "qq": "",
                "tel": "",
                "ts": "",
                "wechatAccount": ""
            }
        ]
    });

    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: ContactsListInfo.data,
        stackTrace: null
    };
}
// 编辑短信页-右侧的title
function Gettypes(ctx,queryInfo) {
    const ContactsListInfo = Mock.mock({
        "data": [
            {
                "key": "autograph",
                "value": "防汛办" 
            },
            {
                "key": "autographWarn",
                "value": "防汛预警中心" 
            },
            {
                "key": "custom",
                "value": "自定义" 
            }
        ]
    });

   
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: ContactsListInfo.data,
        stackTrace: null
    };
}
// 编辑短信页-左侧联系人列表
function personInchargeGroup(ctx,queryInfo) {
    const ContactListInfo = Mock.mock({
        "data|4": [
            {
            "adcd": "@id",
            "adnm": "",
            "appId": "",
            "areaId": "511823100210000",
            "chargePosition": "",
            "chargeType":"1",
            "contactId": "@id",
            "crtDt": null,
            "id": "@id",
            "inchargeMobile": "15801484187",
            "inchargeName": "王宇峰",
            "nt": "",
            "respAdcd": "",
            "updDt": null    
            }
            
        ]
    });

    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: ContactListInfo.data,
        stackTrace: null
    };
}
// 编辑短信页-点击确认发送
function SendOut() {
    return {
        success: true,
        code: `1000`,
        message: `发送成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
module.exports = {
    GetContactList,
    GetFloodControlList,
    GetcontactsList,
    Gettypes,
    SendOut,
    PersonIncharge,
    personInchargeGroup
};