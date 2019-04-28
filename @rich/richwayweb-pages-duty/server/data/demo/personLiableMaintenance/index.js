const Mock = require(`mockjs`);
// 责任人维护页-危险区责任人，左边栏信息
function GetAdcddAnadTree(ctx,queryInfo) {
    //const queryInfo = ctx._queryInfo;
    console.log('dsa',queryInfo);
    const personalInfo = Mock.mock({
        "data|20": [
            {
                "adcd": "511823100000000",
                "adnm": "@name",
                "setNum|1": [`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`],
                "totalNum|1": [`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`10`]
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
function GetPersonList(ctx,queryInfo) {
    //const queryInfo = ctx._queryInfo;
    console.log('dsa',queryInfo);
    const personalInfo = Mock.mock({
        "data|20": [
            {
                "areaId": "@id",
                "areaNm": "前进村2组",
                "chargeList|2": [
                    {
                        "adcd": "",
                        "adnm": "",
                        "areaId":"@id",
                        "areaNm": "",
                        "chargePosition": "",
                        "inchargeId": "@id",
                        "inchargeMobile": "@tel",
                        "inchargeName": "@cname",
                        "inchargePosition": "1,3"
                    }
                ]
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
    GetAdcddAnadTree,
    GetPersonList
};
