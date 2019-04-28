const Mock = require(`mockjs`);

function GetSmallList(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|100": [
            {
                adcd: /\d{15}/,
                adnm: `@city(true)`,
                "caarea|10000-19000.2": 12897.00,
                cacd: /\d{10}/,
                canm: `@county`,
                city: `@city(true)`,
                country: `@county`,
                geodata: ``,
                "gradient|0-10.2": 1.95,
                remark: `测试接口`,
                river: `@city(true)`,
                rvhead: ``,
                "rvlen|0-100.2": 52.00,
                rvmouth: ``
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

function GetStationBasic(ctx, queryInfo) {
    const rainList = Mock.mock({
        "data|100": [
            {
                addvcd: `511802105000000`,
                admauth: ``,
                adnm: `@city(true)`,
                atcunit: ``,
                basin: ``,
                bgfrym: ``,
                bsnm: `@city(true)`,
                comments: ``,
                contact: ``,
                distance: null,
                drna: null,
                dstrvm: null,
                dtmel: 700.99,
                dtmnm: ``,
                dtpr: null,
                esstym: ``,
                fbasin: ``,
                frgrd: ``,
                hnnm: `@city(true)`,
                lat1: null,
                lat2: null,
                lgtd: 103.0,
                lng1: null,
                lng2: null,
                locality: ``,
                lttd: 29.87,
                moditime: null,
                phcd: ``,
                rstg: ``,
                rvnm: `@city(true)`,
                stazt: null,
                stbk: ``,
                stcd: `6061TA01`,
                stcdCount: null,
                stcdtype: `2`,
                stlc: `@city`,
                stnm: `@city`,
                stp: ``,
                "sttp|1": [`PP`, `RR`, `RQ`, `ZZ`, `ZQ`],
                stu: ``,
                telephone: ``,
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

function CorrelationStation() {
    const msg = Mock.mock({
        data: `关联@city(true)成功`
    });
    return {
        success: true,
        code: ``,
        message: msg.data,
        total: 0,
        pages: 0,
        data: null,
        stackTrace: ``
    };
}
// 添加信息
function UpAdd() {
    return {
        success: true,
        code: ``,
        message: `添加成功`,
        total: 0,
        pages: 0,
        data: null,
        stackTrace: ``
    };
}
// 修改信息
function ReviseMessage() {
    return {
        success: true,
        code: ``,
        message: `修改成功`,
        total: 0,
        pages: 0,
        data: null,
        stackTrace: ``
    };
}
// 删除信息
function DeleteMessage() {
    return {
        success: true,
        code: ``,
        message: `修改成功`,
        total: 0,
        pages: 0,
        data: null,
        stackTrace: ``
    };
}

module.exports = {
    GetSmallList,
    GetStationBasic,
    CorrelationStation,
    UpAdd,
    ReviseMessage,
    DeleteMessage
};
