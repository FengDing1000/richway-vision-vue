const Mock = require(`mockjs`);


function GetRainAll(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.rows = 2000;
    queryInfo.page = 1;

    // const data = {
    //     "DRP0|10-300.0-1": 0.0,
    //     "COUNTDRP|10-300.0-1": 0.0,
    //     "AVG|10-300.0-1": 0.0,
    //     STCD: /\d{5,6}/,
    //     STNM: `@county()`,
    //     ADDRESS: `@county()`,
    //     "SOURCE|1": [`PP`, `ZZ`, `RR`, `ZQ`, `RQ`],
    //     "lttd|26.6": 1,
    //     "lgtd|106.6": 1
    // };

    const data = {
        "DRP0|10-300.0-1": 0.0,
        "COUNTDRP|10-300.0-1": 0.0,
        "AVG|10-300.0-1": 0.0,
        STCD: /\d{5,6}/,
        stnm: `@ctitle(2, 5)测站`,
        stlc: `@county(true)`,
        "drp|1-10.2-3": 0,
        "SOURCE|1": [`PP`, `ZZ`, `RR`, `ZQ`, `RQ`],
        "lttd|25-28.1-10": 1,
        "lgtd|105-108.1-10": 1
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
                stnm: `@ctitle(2, 4)水库`,
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
                stnm: `@ctitle(2, 4)水库`,
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
                STNM: `@ctitle(2, 4)水库`
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
                stnm: `@ctitle(2, 4)水库`
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

function TimeRainLine() {
    const list = Mock.mock({
        "data|20": [
            {
                tm: "@timedate",
                "drp| 100-1000": 100
            }
        ]
    });

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: 0,
        data: list.data,
        stackTrace: null
    };
}

function FutureRainLine() {
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: 0,
        data: [
            {
                data1: `16/1/24 16:00`,
                data2: 1345
            },
            {
                data1: `16/1/24 16:00`,
                data2: 34
            },
            {
                data1: `16/1/24 16:00`,
                data2: 12
            },
            {
                data1: `16/1/24 16:00`,
                data2: 2356
            },
            {
                data1: `16/1/24 16:00`,
                data2: 5678
            },
            {
                data1: `16/1/24 16:00`,
                data2: 23
            },
            {
                data1: `16/1/24 16:00`,
                data2: 789
            },
            {
                data1: `16/1/24 16:00`,
                data2: 12345
            },
            {
                data1: `16/1/24 16:00`,
                data2: 78
            },
            {
                data1: `16/1/24 16:00`,
                data2: 2345
            },
            {
                data1: `16/1/24 16:00`,
                data2: 5678
            },
            {
                data1: `16/1/24 16:00`,
                data2: 4567
            }
        ],
        stackTrace: null
    };
}

function DaysRainLine() {
    const list = Mock.mock({
        "data|20": [
            {
                tm: "@timedate",
                "dyp| 100-1000": 100
            }
        ]
    });

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: 0,
        data: list.data,
        stackTrace: null
    };
}

function GetDetailRainInfo(){
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: 0,
        data: {},
        stackTrace: null
    };
}

module.exports = {
    GetRainAll,
    GetRainTotal,
    QueryAreaRainfall,
    GetAdcdCity,
    QueryRainMonitor,
    QueryRainContrast,
    TimeRainLine,
    FutureRainLine,
    DaysRainLine,
    GetDetailRainInfo
};
