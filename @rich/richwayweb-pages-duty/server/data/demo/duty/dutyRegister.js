const Mock = require(`mockjs`);

function GetAllPerson(ctx) {

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
    return {
        success: true,
        code: `1000`,
        message: `操作成功11111111111111111`,
        total: 100,
        data: allPerson.data,
        pages:0,
        stackTrace: null
    };
}
// 值班登记页-获取表头值班日期
function GetDutyTime() {

    const dutyTime = Mock.mock({
        "data": [
            {
            "adcd": "511823000000000",
            "appId": "96c79dd7f08f46e3a1f5458809a330b6",
            "changeReason": "",
            "crtBy" : "admin",
            "crtDt" : "2018-10-23 13:29:06",
            "periodId": "",
            "periodNm": "晚班",
            "personsInfo": [],
            "registerid": "",
            "scheduleDate": "2018-10-23",
            "scheduleEtm": "2018-10-25 08:00:00",
            "scheduleId": "72da4bf8fa4f43d5a814a7a75d18704a",
            "schedulePersons": null,
            "scheduleStm": "2018-10-24 08:00:00",
            "updDt": "2018-10-23 13:29:06"
            }
        ]
    });
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        data: dutyTime.data,
        pages:0,
        stackTrace: null
    };
}
// 提交值班登记
function AddRegister() {
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
// 获取值班登记页面的scheduleId
function GetScheduleId(ctx) {
    const queryInfo = ctx._queryInfo;
    const scheduleId = Mock.mock({
        "data": [
            {
                "scheduleId": "acf784a129f14f598fcadff3146fa5f1"
            }
        ]
    });
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: scheduleId.data[0].scheduleId,
        stackTrace: null
    };
}
// 值班报告值班报告底部折叠面板表格里面的数据信息
function GetDutyReportForm() {
    const scheduleId = Mock.mock({
        "data": [
            {
                "scheduleId": "acf784a129f14f598fcadff3146fa5f1"
            }
        ]
    });
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: scheduleId.data[0].scheduleId,
        stackTrace: null
    };
}
// 值班报告值班报告底部折叠面板表格里面的数据信息
function AddDutyRecord() {
    const scheduleId = Mock.mock({
        "data": [
            {
                "scheduleId": "acf784a129f14f598fcadff3146fa5f1"
            }
        ]
    });
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: scheduleId.data[0].scheduleId,
        stackTrace: null
    };
}
// 值班登记页-值班报告的汛情表 
function GetFloodSeasonTable() {
    const scheduleId = Mock.mock({
        "data": [
            {
                "scheduleId": "acf784a129f14f598fcadff3146fa5f1"
            }
        ]
    });
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: scheduleId.data[0].scheduleId,
        stackTrace: null
    };
}
// 获取值班登记页面右侧日历下的渲染信息 
function GetDutyPersonnel(ctx) {
    const queryInfo = ctx._queryInfo;

    const dutyPersonnel = Mock.mock(
        {
        "data": [
            {
                "dutyRole": "1",
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
                "personName": "赵倩",
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
        data: dutyPersonnel.data,
        stackTrace: null
    };
}

// 获取值班登记页面右侧日历下的渲染信息2
function GetDutyPersonnelInfo(ctx) {
    const queryInfo = ctx._queryInfo;

    const registerPersonnel = Mock.mock(
        {
            "data|1": [
                {
                    "adcd": "511823000000000",
                    "appId": "96c79dd7f08f46e3a1f5458809a330b6",
                    "changeReason": "",
                    "crtBy": "admin",
                    "crtDt": "2018-10-18 11:16:41",
                    "periodId": "",
                    "periodNm": "白班",
                    "personsInfo|5": [
                        {
                            "dutyRole|1": ['1','2','3','4'],
                            "fileCd": "",
                            "groupflag": "",
                            "isPlan": "0",
                            "mobile": "13795866627",
                            "personId": "@id",
                            "personName": "@cname",
                            "scheduleId": "@id",
                            "userAccount": ""
                        }
                    ],
                    "registerid": "05b6376f1f8a4459952a1668a7b5acf7",
                    "scheduleDate": "2018-10-18",
                    "scheduleEtm": "2018-10-18 19:30:00",
                    "scheduleId": "f1a069ead29346de9e48755e4ae0942c",
                    "schedulePersons": null,
                    "scheduleStm": "2018-10-18 08:30:00",
                    "updDt": "2018-10-18 15:34:35"
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
        data: registerPersonnel.data,
        stackTrace: null
    };
}
// 值班安排页-添加成功
function DeleteDutyRecord() {
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
module.exports = {
    AddRegister,
    GetScheduleId,
    GetDutyPersonnel,
    GetAllPerson,
    GetDutyPersonnelInfo,
    GetDutyTime,
    GetDutyReportForm,
    AddDutyRecord,
    GetFloodSeasonTable,
    DeleteDutyRecord
};
