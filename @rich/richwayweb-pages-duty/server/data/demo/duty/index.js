const Mock = require(`mockjs`);
// 值班安排页-值班人员信息列表
function GetDutyList(ctx,queryInfo) {
    //const queryInfo = ctx._queryInfo;
    console.log('dsa',queryInfo);
    const personalInfo = Mock.mock({
        "data|100": [
            {
                "adcd": "@id",
                "appId": "@id",
                "changeReason": "",
                "crtBy": "admin",
                "crtDt": "@datetime",
                "dutyFlag": "",
                "dutyRecord": "",
                "endTm": null,
                "endUseraccount": "",
                "fileList": null,
                "isEndDuty": "",
                "periodId": "",
                "periodNm|1": ["白班", "晚班"],
                "planDriverNames": "",
                "planLeadNames": "",
                "planMemberNames": "",
                "planViceLeadNames": "",
                "realDriverNames": "@cname",
                "realLeadNames": "@cname",
                "realMemberNames": "@cname",
                "realViceLeadNames": "@cname",
                "recordCnt": "0",
                "registerId": "",
                "report": "",
                "scheduleDate": "@date",
                "scheduleEtm": "@datetime",
                "scheduleId": "f5d93663ef5d4e88981c522eb13be858",
                "scheduleStm": "@datetime",
                "startTm": null,
                "tm": "09-18 08:30至09-18 19:30",
                "updDt": "@datetime"
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
        data: (personalInfo.data || []).splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}
// 值班安排页-添加弹框里面的时段请求
function GetTimeInterval() {
    const timeIntervalList = Mock.mock({
        "data": [
            {  "acrossDay": "N",
                "adcd": "511823000000000",
                "appId": "",
                "beginTime": "08:30",
                "endTime": "19:30",
                "id": "27d834a2645346fab794ee7e17cf3a37",
                "periodNm": "白班"
            },
            {  "acrossDay": "Y",
                "adcd": "511823000000000",
                "appId": "",
                "beginTime": "19:30",
                "endTime": "08:00",
                "id": "3de297ebef2e4dacb2627a681e97e3f8",
                "periodNm": "晚班"
            },
            { "acrossDay": "N",
                "adcd": "511823000000000",
                "appId": "96c79dd7f08f46e3a1f5458809a330b6",
                "beginTime": "08:30",
                "endTime": "19:30",
                "id": "3b6a5276b37744bc8b440eb6c0911b28",
                "periodNm": "白班"
            },
            { "acrossDay": "Y",
                "adcd": "511823000000000",
                "appId": "96c79dd7f08f46e3a1f5458809a330b6",
                "beginTime": "19:30",
                "endTime": "08:30",
                "id": "03c11efb71464037b90f1537060a2c0e",
                "periodNm": "晚班"
            }
        ]
    });

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        data: timeIntervalList.data,
        stackTrace: null
    };
}
// 值班安排页-添加弹框里面的值班人员请求
function GetDutyManagePersonRole(ctx) {
    // const queryInfo = ctx._queryInfo;

    const allPerson = Mock.mock({
        "data|100": [
            {
                "adcd": "@id",
                "appId": "@id",
                "crtDt": null,
                "deleteFlag": "0",
                "dutyRole|1": [`1`,`2`,`3`,`4`],
                "fileCd": "",
                "groupFlag": "",
                "isPlan": "",
                "isduty": "",
                "mobile": "",
                "nt": "",
                "personId": "@id",
                "personName": "@cname",
                "personSort": 0,
                "sex": "",
                "updDt": null,
                "userAccount": ""
            }
        ]
    });

    // const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        data: allPerson.data,
        stackTrace: null
    };
}
// 值班安排页-编辑弹框里面的值班人员信息
function GetDutyManagementPerson(ctx) {
    const queryInfo = ctx._queryInfo;

    const ManagementPerson = Mock.mock(
        {
        "data": [
            {
                "dutyRole": "1",
                "fileCd": "",
                "groupflag": "",
                "isPlan": "1",
                "mobile": "13778764196",
                "personId": "d30f74c7aab84a4186cf9ee89252e724",
                "personName": "李芳",
                "scheduleId": "acf784a129f14f598fcadff3146fa5f1",
                "userAccount": ""
            },
            {
                "dutyRole": "2",
                "fileCd": "",
                "groupflag": "",
                "isPlan": "1",
                "mobile": "13778764196",
                "personId": "d30f74c7aab84a4186cf9ee89252e724",
                "personName": "赵倩",
                "scheduleId": "acf784a129f14f598fcadff3146fa5f1",
                "userAccount": ""
            },
            {
                "dutyRole": "3",
                "fileCd": "",
                "groupflag": "",
                "isPlan": "1",
                "mobile": "13778764196",
                "personId": "d30f74c7aab84a4186cf9ee89252e724",
                "personName": "刘伟",
                "scheduleId": "acf784a129f14f598fcadff3146fa5f1",
                "userAccount": ""
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
        data: ManagementPerson.data,
        stackTrace: null
    };
}
// 值班安排页-添加成功
function AddDuty() {
    return {
        success: true,
        code: `1000`,
        message: `添加成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 值班安排页-编辑成功
function UpdateDuty() {
    return {
        success: true,
        code: `1000`,
        message: `編輯成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 值班安排页-删除
function DeleteDuty() {
    return {
        success: true,
        code: `1000`,
        message: `不允许删除历史值班记录`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 值班安排页 - 导出excel表格
function DownloadTemplate() {
    return {
        success: true,
        code: `1000`,
        message: `不允许删除历史值班记录`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 值班安排页 - 导入excel表格
function ImportSchedulee() {
    return {
        success: true,
        code: `1000`,
        message: `不允许删除历史值班记录`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 值班记录页 - 请求政区
function GetAdcdCity() {
    return {
        success: true,
        code: `1000`,
        message: `不允许删除历史值班记录`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
module.exports = {
    GetDutyList,
    AddDuty, // 添加成功
    UpdateDuty,
    DeleteDuty,
    GetTimeInterval, // 添加弹框里面的时段请求
    GetDutyManagePersonRole,// 添加弹框里面的值班人员列表
    GetDutyManagementPerson ,
    DownloadTemplate,
    ImportSchedulee,
    GetAdcdCity
};
