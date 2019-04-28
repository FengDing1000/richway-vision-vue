const Mock = require(`mockjs`);
function GetCount(ctx,queryInfo) {
    const ContactListInfo = Mock.mock({
        "data": 
            {
                "iall": 260,
                "inone": 6
            }
        
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
// 通讯录页- 表格数据信息
function GetContactTable(ctx,queryInfo) {
    const ContactListInfo = Mock.mock({
        "data|100": [
            {
                "adCd": "@id",
                "address": "唐家镇五里社区4组",
                "appId": "@id",
                "birthday": "",
                "contactsId": "00b7dd4678774d1cb1bd7f44eaba82e2",
                "contactsName": "@cname",
                "deptCd": "",
                "deptNm": "",
                "email": "",
                "fax": "",
                "groups": [
                    {
                        "key": "5481749bb98e4634ac512321a3473bb0",
                        "value": "乡镇水利员"
                    },{
                        "key": "71cf3e835f834fa49459d5ca35f74a40",
                        "value": "局班子"
                    },{
                        "key": "ca1440a0331b4a78955a1d3d142ed2f4",
                        "value": "简易雨量站监测人员"
                    },{
                        "key": "df55c3d564524aa5b0fdd3f190210b4b",
                        "value": "县防指成员"
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
        data: ContactListInfo.data,
        stackTrace: null
    };
}
// 通讯录页- 添加联系人成功提示
function AddAContact() {
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
// 通讯录页- 删除联系人成功提示
function DeleteContact() {
    return {
        success: true,
        code: `1000`,
        message: `删除成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// DeleteTreelist
// 通讯录页- 删除tree列表成功提示
function DeleteTreelist() {
    return {
        success: true,
        code: `1000`,
        message: `删除成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 通讯录页面-添加编辑联系人
function AddEditContact() {
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
// 通讯录页面-赋值到组
function CopyToGrp() {
    return {
        success: true,
        code: `1000`,
        message: `复制成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 通讯录页面-移动到组
function MoveToGrp() {
    return {
        success: true,
        code: `1000`,
        message: `移动成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
module.exports = {
    GetCount,
    GetContactTable,
    AddAContact,
    DeleteContact,
    AddEditContact,
    DeleteTreelist,
    CopyToGrp,
    MoveToGrp,
}
