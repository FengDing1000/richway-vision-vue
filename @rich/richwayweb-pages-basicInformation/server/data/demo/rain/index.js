const Mock = require(`mockjs`);


function GetRainAll(ctx) {
    const queryInfo = ctx._queryInfo;

    const data = {
        "DRP0|10-300.0-1": 0.0,
        "COUNTDRP|10-300.0-1": 0.0,
        "AVG|10-300.0-1": 0.0,
        STCD: /\d{5,6}/,
        STNM: `@county()`,
        ADDRESS: `@county()`,
        "SOURCE|1": [`PP`, `ZZ`, `RR`, `ZQ`, `RQ`],
        "lttd|26.6": 1,
        "lgtd|106.6": 1
    };

    let index = 1;
    while (index < queryInfo.columnCount) {
        data[`DRP${index}|10-300.0-1`] = 0.0;
        index++;
    }

    const rainList = Mock.mock({
        "data|100": [
            data
        ]
    });
    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: rainList.data.splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}

function GetRainTotal(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|100": [
            {
                addvcd: /\d{5}/,
                addvnm: ``,
                atcunit: ``,
                bsnm: `@county`,
                contact: ``,
                "drp|1-10.2-3": 0,
                drpMinutes: null,
                drpMinutes5: null,
                drpMinutes10: null,
                dyp: null,
                frgrd: ``,
                "lttd|30-50.2-3": 30,
                "lgtd|100-120.2-3": 100,
                status: ``,
                stcd: /[a-z]\d{5}/,
                stcdcount: null,
                stcdtype: ``,
                stcdtypeNm: ``,
                stlc: `@city(true)`,
                stnm: `@city(true)`,
                "sttp|1": [`PP`, `SS`, `DD`],
                telephone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                tm: `@datetime`,
                usfl: ``
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
        data: rainList.data.splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}

function QueryAreaRainfall(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|100": [
            {
                "drp|30-50.2-3": 30,
                dyp: null,
                etDrp: null,
                first: ``,
                intv: null,
                mon: ``,
                pdr: null,
                quarter: ``,
                stDrp: null,
                stcd: ``,
                stnm: `@city(true)`,
                tm: null,
                wth: ``
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
        data: rainList.data.splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}

function QueryRainMonitor(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|100": [
            {
                ADDVNM: null,
                "AVG|1-30.2-3": 30,
                "COUNTDRP|1-30.2-3": 30,
                "DRP0|1-30.2-3": 30,
                "DRP1|1-30.2-3": 30,
                "DRP2|1-30.2-3": 30,
                "DRP3|1-30.2-3": 30,
                PAGE_ROW_NUMBER: 1,
                STCD: /[a-z]\d{5}/,
                STNM: `@city(true)`
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
        data: rainList.data.splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}

function QueryRainContrast(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|100": [
            {
                "etdrp_1|1-100.2-3": 30,
                "etdrp_2|1-100.2-3": 30,
                "etdrp_3|1-100.2-3": 30,
                stcd: /[a-z]\d{5}/,
                "stdrp_1|1-100.2-3": 30,
                "stdrp_2|1-100.2-3": 30,
                "stdrp_3|1-100.2-3": 30,
                stnm: `@city(true)`
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
        data: rainList.data.splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}

function GetAdcdCity(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|20": [
            {
                adcd: /\d{5}/,
                adnm: `@county`,
                childs: [],
                flag: ``,
                stcd: ``,
                warnNum: 0
            }
        ]
    });

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: rainList.data,
        stackTrace: null
    };
}

module.exports = {
    GetRainAll,
    GetRainTotal,
    QueryAreaRainfall,
    GetAdcdCity,
    QueryRainMonitor,
    QueryRainContrast
};
