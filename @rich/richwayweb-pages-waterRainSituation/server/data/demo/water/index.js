const Mock = require(`mockjs`);


function GetWaterAll(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|100": [
            {
                siteName: `@county`,
                address: `@county`,
                "waterLevel|600-900.2": 600,
                vigilanceWaterLevel: `800.50`,
                guaranteeWaterLevel: `850.00`,
                floodLimitWaterLevel: `830.00`,
                "flow|23.2": 1,
                reportingTime: `@datetime`,
                riverSystem: `西江`,
                "waterPotential|1": [`升`, `降`],
                "source|1": [`山洪`, `水文`],
                "lttd|26.6": 1,
                "lgtd|106.6": 1
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

// 最新河道水情数据
function GetNewRiverWater(ctx) {
    const queryInfo = ctx._queryInfo;
    const rainList = Mock.mock({
        "data|100": [
            {
                addvcd: /\d{5}/,
                atcunit: ``,
                avz: null,
                bsnm: `@province`,
                flwchrcd: ``,
                grq: null,
                grz: null,
                hlz: null,
                hlztm: null,
                hnnm: null,
                htz: null,
                laq: null,
                laz: null,
                "lttd|30-50.2-3": 30,
                "lgtd|100-120.2-3": 100,
                ltm: 0,
                ltz: null,
                obhtz: null,
                obhtztm: null,
                obmxq: null,
                obmxqtm: null,
                "overGrq|10-100.2-3": 0,
                overGrz: null,
                overObhtz: null,
                "overWrq|10-100.2-3": 0,
                overWrz: null,
                prjcd: ``,
                "q|1-10.2-3": 0,
                rvnm: `@province`,
                sort: ``,
                stcd: /\d{8}/,
                stlc: `@city(true)`,
                stnm: `@city(true)`,
                "sttp|1": [`PP`, `SS`, `DD`],
                tm: `@datetime`,
                type: ``,
                wptn: `4`,
                wrq: null,
                wrz: null,
                "z|10-100.2-3": 0
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


// 最新水库水情数据
function GetNewRsvrWater(ctx) {
    const queryInfo = ctx._queryInfo;
    console.log(313, queryInfo);
    const rainList = Mock.mock({
        "data|100": [
            {

                actcp: null,
                actz: null,
                addvcd: /\d{5}/,
                atcunit: ``,
                bgmd: ``,
                blrz: null,
                bsnm: `@province`,
                callWsc: null,
                ckflz: null,
                damel: null,
                ddcp: null,
                ddz: null,
                distancewl: null,
                dsflz: null,
                dw: null,
                edmd: ``,
                exceedFsltdz: null,
                fldcp: null,
                fsltdw: null,
                fsltdz: null,
                fstp: null,
                groupid: ``,
                groupname: ``,
                hhrz: null,
                hhrztm: null,
                hlrz: null,
                hlrztm: null,
                hmninq: null,
                hmninqtm: null,
                hmxinq: null,
                hmxinqtm: null,
                hmxotq: null,
                hmxotqtm: null,
                hmxw: null,
                hnnm: null,
                "inq|100-1000.2-3": 100,
                inqdr: ``,
                laz: null,
                "lttd|30-50.2-3": 30,
                "lgtd|100-120.2-3": 100,
                ltm: null,
                moditime: null,
                msqmt: ``,
                normz: null,
                occupyDw: null,
                "otq|100-1000.2-3": 100,
                "overCkflz|10-100.2-3": 0,
                "overDsflz|10-100.2-3": 0,
                "overHhrz|10-100.2-3": 0,
                "overLaz|10-100.2-3": 0,
                "overNormz|10-100.2-3": 0,
                "overflz|10-100.2-3": 0,
                prjcd: ``,
                q: null,
                rstdr: null,
                rsvrtp: ``,
                rvnm: `@province`,
                rwchrcd: ``,
                rwptn: ``,
                "rz|10-100.2-3": 0,
                sfq: null,
                sort: ``,
                stcd: /\d{8}/,
                stlc: `@city(true)`,
                stnm: `@city(true)`,
                "sttp|1": [`PP`, `RR`, `DD`],
                tm: `@datetime`,
                ttcp: null,
                type: ``,
                "w|10-100.2-3": 0,
                waitWsc: null,
                wptn: ``,
                z: null
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

// 河道水情查询
function QueryRiverWater(ctx) {
    const queryInfo = ctx._queryInfo;
    console.log(313, queryInfo);
    const rainList = Mock.mock({
        "data|100": [
            {
                addvcd: /\d{5}/,
                atcunit: ``,
                avz: null,
                bsnm: `@province`,
                flwchrcd: ``,
                grq: null,
                grz: null,
                hlz: null,
                hlztm: null,
                hnnm: null,
                htz: null,
                laq: null,
                laz: null,
                "lttd|30-50.2-3": 30,
                "lgtd|100-120.2-3": 100,
                ltm: null,
                ltz: null,
                obhtz: null,
                obhtztm: null,
                obmxq: null,
                obmxqtm: null,
                "overGrq|10-100.2-3": 0,
                overGrz: null,
                overObhtz: null,
                "overWrq|10-100.2-3": 0,
                overWrz: null,
                prjcd: ``,
                "q|10-100.2-3": 0,
                rvnm: `@province`,
                sort: ``,
                stcd: /\d{8}/,
                stlc: `@city(true)`,
                stnm: `@city(true)`,
                "sttp|1": [`PP`, `RR`, `DD`],
                tm: `@datetime`,
                type: ``,
                wptn: `4`,
                wrq: null,
                wrz: null,
                "z|10-100.2-3": 0
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

// 水库水情查询
function QueryRsvrWater(ctx) {
    const queryInfo = ctx._queryInfo;
    console.log(313, queryInfo);
    const rainList = Mock.mock({
        "data|100": [
            {
                actcp: null,
                actz: null,
                addvcd: /\d{5}/,
                atcunit: ``,
                bgmd: ``,
                blrz: null,
                bsnm: `@province`,
                callWsc: null,
                ckflz: null,
                damel: null,
                ddcp: null,
                ddz: null,
                distancewl: null,
                dsflz: null,
                dw: null,
                edmd: ``,
                exceedFsltdz: null,
                fldcp: null,
                fsltdw: null,
                fsltdz: null,
                fstp: null,
                groupid: ``,
                groupname: ``,
                hhrz: null,
                hhrztm: null,
                hlrz: null,
                hlrztm: null,
                hmninq: null,
                hmninqtm: null,
                hmxinq: null,
                hmxinqtm: null,
                hmxotq: null,
                hmxotqtm: null,
                hmxw: null,
                hnnm: `青衣江`,
                "inq|100-1000.2-3": 100,
                inqdr: ``,
                laz: null,
                "lttd|30-50.2-3": 30,
                "lgtd|100-120.2-3": 100,
                ltm: null,
                moditime: null,
                msqmt: `5`,
                normz: null,
                occupyDw: null,
                "otq|100-1000.2-3": 100,
                "overCkflz|10-100.2-3": 0,
                "overDsflz|10-100.2-3": 0,
                "overHhrz|10-100.2-3": 0,
                "overLaz|10-100.2-3": 0,
                "overNormz|10-100.2-3": 0,
                "overflz|10-100.2-3": 0,
                prjcd: ``,
                q: null,
                rstdr: null,
                rsvrtp: ``,
                rvnm: `@province`,
                rwchrcd: ``,
                rwptn: `6`,
                "rz|10-100.2-3": 0,
                sfq: null,
                sort: ``,
                stcd: /\d{8}/,
                stlc: `@city(true)`,
                stnm: `@city(true)`,
                "sttp|1": [`PP`, `RR`, `DD`],
                tm: `@datetime`,
                ttcp: null,
                type: ``,
                "w|10-100.2-3": 0,
                waitWsc: null,
                wptn: ``,
                z: null
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

module.exports = {
    GetWaterAll,
    GetNewRiverWater,
    GetNewRsvrWater,
    QueryRiverWater,
    QueryRsvrWater
};
