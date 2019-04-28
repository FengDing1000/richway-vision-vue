const Mock = require(`mockjs`);


function GetWaterAll(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.rows = 2000;
    queryInfo.page = 1;
    const rainList = Mock.mock({
        "data|2000": [
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
                "lttd|25-28.1-10": 1,
                "lgtd|105-108.1-10": 1
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
    queryInfo.rows = 2000;
    queryInfo.page = 1;
    const rainList = Mock.mock({
        "data|2000": [
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
                "lttd|25-28.1-10": 1,
                "lgtd|105-108.1-10": 1,
                ltm: 0,
                ltz: null,
                obhtz: null,
                obhtztm: null,
                obmxq: null,
                obmxqtm: null,
                "overGrq|10-100.2-3": 0,
                "overGrz|1": [0, 55],
                overObhtz: null,
                "overWrq|10-100.2-3": 0,
                "overWrz|1": [0, 55],
                prjcd: ``,
                "q|1-10.2-3": 0,
                rvnm: `@province`,
                sort: ``,
                stcd: /\d{8}/,
                stlc: `@city(true)`,
                stnm: `@ctitle(2, 4)河`,
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
    queryInfo.rows = 2000;
    queryInfo.page = 1;
    const rainList = Mock.mock({
        "data|2000": [
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
                "lttd|25-28.1-10": 1,
                "lgtd|105-108.1-10": 1,
                ltm: null,
                moditime: null,
                msqmt: ``,
                normz: null,
                occupyDw: null,
                "otq|100-1000.2-3": 100,
                "overCkflz|1": [0, 55],
                "overDsflz|1": [0, 55],
                "overHhrz|1": [0, 55],
                "overLaz|1": [0, 55],
                "overNormz|1": [0, 55],
                "overflz|1": [0, 55],
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
                stnm: `@ctitle(2, 4)水库`,
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
    queryInfo.rows = 2000;
    queryInfo.page = 1;
    const rainList = Mock.mock({
        "data|2000": [
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
                "lttd|25-28.1-10": 1,
                "lgtd|105-108.1-10": 1,
                ltm: null,
                ltz: null,
                obhtz: null,
                obhtztm: null,
                obmxq: null,
                obmxqtm: null,
                "overGrq|10-100.2-3": 0,
                "overGrz|1": [0, 55],
                overObhtz: null,
                "overWrq|10-100.2-3": 0,
                "overWrz|1": [0, 55],
                prjcd: ``,
                "q|10-100.2-3": 0,
                rvnm: `@province`,
                sort: ``,
                stcd: /\d{8}/,
                stlc: `@city(true)`,
                stnm: `@ctitle(2, 4)河`,
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
    queryInfo.rows = 2000;
    queryInfo.page = 1;
    const rainList = Mock.mock({
        "data|2000": [
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
                "lttd|25-28.1-10": 1,
                "lgtd|105-108.1-10": 1,
                ltm: null,
                moditime: null,
                msqmt: `5`,
                normz: null,
                occupyDw: null,
                "otq|100-1000.2-3": 100,
                "overCkflz|1": [0, 55],
                "overDsflz|1": [0, 55],
                "overHhrz|1": [0, 55],
                "overLaz|1": [0, 55],
                "overNormz|1": [0, 55],
                "overflz|1": [0, 55],
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
                stnm: `@ctitle(2, 4)水库`,
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

function RiverflowLine() {
    const list = Mock.mock({
        "data|20": [
            {
                tm: "@timedate",
                "zvalue| 100-1000": 100,
                "wrz| 100-1000": 100,
                "grz| 100-1000": 100,
                "qvalue| 100-1000": 100,
                "wrq| 100-1000": 100
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

function RsvrCapacityLine() {
    const list = Mock.mock({
        "data|20": [
            {
                mstm: "@timedate",
                "rz| 100-1000": 100
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

function GetWaterDetailLineChart() {
    return {
        success: true,
        data: [
            {
                data1: `05-03 09:45`,
                data2: 87655,
                data3: 85423
            },
            {
                data1: `05-03 09:45`,
                data2: 84327,
                data3: 80543
            },
            {
                data1: `05-03 09:45`,
                data2: 78765,
                data3: 75443
            },
            {
                data1: `05-03 09:45`,
                data2: 76876,
                data3: 69000
            },
            {
                data1: `05-03 09:45`,
                data2: 70986,
                data3: 70000
            },
            {
                data1: `05-03 09:45`,
                data2: 59900,
                data3: 38899
            },
            {
                data1: `05-03 09:45`,
                data2: 47899,
                data3: 37890
            },
            {
                data1: `05-03 09:45`,
                data2: 28976,
                data3: 19876
            },
            {
                data1: `05-03 09:45`,
                data2: 37654,
                data3: 37908
            }, {
                data1: `05-03 09:45`,
                data2: 41344,
                data3: 42345
            },
            {
                data1: `05-03 09:45`,
                data2: 53422,
                data3: 51456
            },
            {
                data1: `05-03 09:45`,
                data2: 65432,
                data3: 63456
            },
            {
                data1: `05-03 09:45`,
                data2: 79443,
                data3: 68908
            },
            {
                data1: `05-03 09:45`,
                data2: 85222,
                data3: 79865
            },
            {
                data1: `05-03 09:45`,
                data2: 98433,
                data3: 89765
            }
        ]
    }
}

function RsvrFlowLine(){
    const list = Mock.mock({
        "data|20": [
            {
                tm: "@timedate",
                "z| 100-1000": 100,
                "inq| 100-1000": 100,
                "otq| 100-1000": 100
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

module.exports = {
    GetWaterAll,
    GetNewRiverWater,
    GetNewRsvrWater,
    QueryRiverWater,
    QueryRsvrWater,
    RiverflowLine,
    RsvrCapacityLine,
    RsvrFlowLine
};
