const Mock = require(`mockjs`);

function GetDutyRecordInfo(ctx) {
    const queryInfo = ctx._queryInfo;

    const dutyRecordInfo = Mock.mock({
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
                "recordCnt|1": [1,2,3,4,5],
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
        data: (dutyRecordInfo.data || []).splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}
// 值班记录
function GetQueryDutyRecordDetails(ctx) {
    const queryInfo = ctx._queryInfo;
    const dutyRecordInfo = Mock.mock({
        "data|3": [
            {
                "adcd": "",
                "content": "囧你就",
                "crtBy": "@cname",
                "crtDt": "@datetime",
                "crtName": "",
                "fileCd": "",
                "id": "@id",
                "recordTime": "@datetime",
                "recordType": "1",
                "result": "",
                "scheduleId": "@id",
                "sortId": null,
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
        data: dutyRecordInfo.data,
        stackTrace: null
    };
}
// 值班快报页-列表数据
function GetDutyBulletinList(ctx) {
    const queryInfo = ctx._queryInfo;

    const dutyRecordInfo = Mock.mock({
        "data|100": [
            {
                "adcd": "511823000000000",
                "appId": "@id",
                "crtDt": "@datetime",
                "deleteFlag": "0",
                "dutyRole|1": ['1','2','3','4'],
                "fileCd": "",
                "groupFlag": "",
                "isPlan": "",
                "isduty": "",
                "mobile": "156363636363",
                "nt": "",
                "personId": "@id",
                "personName": "@name",
                "personSort": 0,
                "sex|1": ['1','2'],
                "updDt": "@datetime",
                "userAccount": "",
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
        data: (dutyRecordInfo.data || []).splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}
// 值班快报页-提交添加的值班人员信息
function ExpressSubmitInfo() {
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
// 值班快报页-点击删除
function ExpressDeleteInfo() {
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
    GetDutyRecordInfo, // 首次加载获取值班记录列表
    GetQueryDutyRecordDetails, // 值班记录的详细记录（弹框里面的信息）
    GetDutyBulletinList,
    ExpressSubmitInfo,
    ExpressDeleteInfo
};
