const Mock = require(`mockjs`);


function GetSafeTransferList(ctx) {
    const queryInfo = ctx._queryInfo;
    // let list = {
    //     data: []
    // };
    //

    // if (queryInfo.tableName === `CULVERT`) {
    //     list = Mock.mock({
    //         "data|20": [
    //             {
    //                 NAME: `@ctitle(1, 3)村涵洞`,
    //                 WSCD: `WFF@id`,
    //                 PID: `@idW00f`,
    //                 CENTROID: ``,
    //                 SHAPE: `{"type":"Point","y":26.429263000000105,"x":108.39724899999999}`,
    //                 CADCD: `@id`,
    //                 ADCD: `@id`,
    //                 OBJECTID: `@id`,
    //                 "PTCOUNT|150-1000": 200,
    //                 "ETCOUNT|100-500": 278,
    //                 data4: `@cname`,
    //                 data5: `18600345867`
    //             }
    //         ]
    //     });
    // } else if (queryInfo.tableName !== `CULVERT`) {
    //     list = Mock.mock({
    //         "data|20": [
    //             {
    //                 NAME: `@ctitle(1, 3)村涵洞`,
    //                 WSCD: `WFF@id`,
    //                 PID: `@idW00f`,
    //                 CENTROID: ``,
    //                 SHAPE: `{"rings":"[[106.405766751653, 28.45004871732857], [106.40530989513985, 28.450505573841724], [106.40530989513985, 28.450734002098272], [106.40569060890095, 28.451761929252882], [106.40603325128563, 28.45214264301387], [106.40679467880756, 28.45267564227902], [106.40751803495357, 28.4527137136551], [106.40767032045795, 28.4527137136551], [106.40987846027116, 28.452865999159485], [106.40892667586894, 28.4520284288854], [106.4084317479797, 28.4517238578768], [106.40778453458591, 28.450581716593888], [106.405766751653, 28.45004871732857]]","type":"Polygon"}`,
    //                 CADCD: `@id`,
    //                 ADCD: `@id`,
    //                 OBJECTID: `@id`,
    //                 "PTCOUNT|150-1000": 200,
    //                 "ETCOUNT|100-500": 278,
    //                 data4: `@cname`,
    //                 data5: `18600345867`
    //             }
    //         ]
    //     });
    // }

    const list = [];
    for (let a = 0; a < 20; a++) {
        const SHAPE = Mock.mock({
            type:"Point",
            "y|25-28.1-10": 1,
            "x|105-108.1-10": 1
        });
        if (queryInfo.tableName === `DANAD`) {
            SHAPE.type = `Polygon`;
            SHAPE.rings = `[[105.4412841796875, 27.688392321785685], [109.01733398437501, 27.688392321785685], [109.01733398437501, 25.958044673317843], [105.4412841796875, 25.958044673317843]]`;
        }
        list.push(Mock.mock({
            NAME: `@ctitle(2, 5)村涵洞`,
            WSCD: `WFF@id`,
            PID: `@idW00f`,
            CENTROID: ``,
            SHAPE: JSON.stringify(SHAPE),
            CADCD: `@id`,
            ADCD: `@id`,
            OBJECTID: `@id`,
            "PTCOUNT|150-1000": 200,
            "ETCOUNT|100-500": 278,
            data4: `@cname`,
            data5: `18600345867`
        }));
    }
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: list,
        stackTrace: null
    };
}

function GetHisDisasterList(ctx) {
    const queryInfo = ctx._queryInfo;
    const list = Mock.mock({
        "data|20": [
            {
                OTIME: `@time`,
                ADDRESS: `@ctitle(5, 9)村`,
                WSCD: `WFF@id`,
                ADCD: `@id`,
                "DPCOUNT|100-500": 250,
                "MPCOUNT|100-500": 250
            }
        ]
    });
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: list.data,
        stackTrace: null
    };
}

function GetMountainList(ctx) {
    const queryInfo = ctx._queryInfo;
    const list = Mock.mock({
        "data|20": [
            {
                NAME: `@ctitle(2, 6)沟`,
                TOWNS: `@city(true)`,
                FSTAND: `地狱级`,
                WSCD: `WFF@id`,
                ADCD: `@id`,
                "PCOUNT|200-1000": 500
            }
        ]
    });
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: list.data,
        stackTrace: null
    };
}


// 弹框所有接口
function GetRangeDetail(ctx) {
    const queryInfo = ctx._queryInfo;
    let list = {
        data: []
    };
    if (queryInfo.tableName === `IA_ADC_DANAD`) {
        list = Mock.mock({
            "data|20": [
                {
                    NAME: `@ctitle(2, 6)河`,
                    "PTCOUNT|1-100": 100,
                    "ETCOUNT|1-100": 100,
                    "ECOUNT1|1-100": 100,
                    "ECOUNT2|1-100": 100,
                    "ECOUNT3|1-100": 100,
                    "ECOUNT4|1-100": 100,
                    "HTCOUNT|1-100": 100,
                    "HCOUNT1|1-100": 100,
                    "HCOUNT2|1-100": 100,
                    "HCOUNT3|1-100": 100,
                    "HCOUNT4|1-100": 100,
                    ADCD: `@id`,
                    WSCD: `WHA01001231KA000,WHA01001221KA000,WHA01001241KA000,WHA01001211KAA00`,
                    "CAREA|1-300.1-10": 128.8,
                    "CHLENGTH|1-10000": 34990,
                    "CHPERCENT|1-100": 13,
                    "FCATION|1-100": 5,
                    "FSTAND|1-100": 2
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_A_DFWRULE`) {
        list = Mock.mock({
            "data|20": [
                {
                    disasterCode: `@string("upper", 20)`,
                    disasterDate: `@date`,
                    disasterAddress: `@csentence()`,
                    WARNGRADEID: `一级戒备`,
                    "LWATER|123.3": 1,
                    "STDT|99.1-3": 1,
                    "DRPT|22.1-3": 1,
                    CALMATH: `人体解析法`,
                    SIGNER: `Steven`,
                    "rainfall|1-1000": 5444,
                    "deathNum|1-100": 2,
                    "disappearNum|1-100": 33,
                    "damageHouseNum|1-100": 44,
                    "transferNum|1-1000": 444,
                    "economicLoss|1-10000": 6666,
                    disasterDescribe: `@cparagraph`
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_ECC_FLRVVLG`) {
        list = Mock.mock({
            "data|20": [
                {
                    NAME: `@cname`,
                    "PTCOUNT|1-15": 3,
                    AREA: `100`,
                    BTYPE: `草房子`,
                    BWATER: `xxoo`,
                    BHILL: `ooxx`,
                    disasterSummary: `@cparagraph`
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_ECC_DTRESIDENT`) {
        list = Mock.mock({
            "data|20": [
                {
                    BHILL: 0,
                    VNAME: `@ctitle(2, 6)村`,
                    LGTD: 106.013864,
                    MODITIME: `2015-08-29 16:07:31`,
                    COMMENTS: ``,
                    CADCD: `520330`,
                    HTCOUNT: 0,
                    STATUS: `审核通过`,
                    AREA: 1180.00,
                    WSCD: `WF@id`,
                    HELE: 436.00,
                    ADCD: `@id`,
                    LTTD: 28.155715,
                    CENTROID: ``,
                    PAGE_ROW_NUMBER: 1,
                    SIGNER: null,
                    AUDBATCH: `520330_习水县_S001`,
                    BELE: 452.52,
                    BLGTD: null,
                    GUID: `6f70d63f-54f0-4758-a08b-c2808e887aa0`,
                    PID: `@idn04G`,
                    BCODE: null,
                    STYPE: `2`,
                    PTCOUNT: 24,
                    BTYPE: `4`,
                    ADDRESS: ` `,
                    BWATER: 1,
                    BLTTD: 28.156308
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_ML_BSNSSINFO`) {
        list = Mock.mock({
            "data|20": [
                {
                    NAME: `鑫源工作室`,
                    OCODE: `xxoo`,
                    ADDRESS: `@ctitle(5, 9)村`,
                    altitude: 333.56,
                    ADCD: 10010,
                    floodVisitSituation: `@csentence(15)`,
                    investigationCompany: `weewewewewewe`,
                    investigationDate: `@date`
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_HSC_HSFWATER`) {
        list = Mock.mock({
            "data|20": [
                {
                    "MTCD|+1": 10010,
                    OTIME: `@date()`,
                    NAME: `@city()`,
                    ADDRESS: `@ctitle(5, 9)村`,
                    "PFRAIN|12.3": 12,
                    "DPCOUNT|1-20": 10,
                    "MPCOUNT|1-20": 10,
                    "CHCOUNT|1-20": 10,
                    "SPCOUNT|1-20": 10,
                    "ELOSE|100-5000": 10,
                    DDSCRIB: `家破人亡`,
                    "CAREA|1-100.1-5": 2,
                    "CHLENGTH|1-100": 20,
                    CHPERCENT: `30`,
                    FCATION: `无`,
                    FSTAND: `宇宙级`,
                    altitude: 333.56,
                    ADCD: 10010,
                    floodVisitSituation: `@csentence(15)`,
                    investigationCompany: `weewewewewewe`,
                    investigationDate: `@date`
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_HSC_HFDFTS`) {
        list = Mock.mock({
            "data|20": [
                {
                    "FCD|+1": 10010,
                    OTIME: `@date()`,
                    ELEVATION: `80`,
                    ADDRESS: `@ctitle(5, 9)村`,
                    FVISIT: `没有访问`,
                    SUNIT: `龙组`,
                    STIME: `@date()`,
                    floodVisitSituation: `@csentence(15)`,
                    investigationCompany: `weewewewewewe`,
                    investigationDate: `@date`,
                    imgSrc1: `http://192.168.10.1:3003/assets/images/map/1.jpg`
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_WRC_GULLY`) {
        list = Mock.mock({
            "data|20": [
                {
                    "GULLYCD|+1": 10010,
                    NAME: `@city()`,
                    ADDRESS: `@ctitle(5, 9)村`,
                    "ADCD|+1": 20020,
                    "WSCD|+1": 30030,
                    "CAREA|1-100.1-5": 2,
                    "CHLENGTH|1-100": 20,
                    CHPERCENT: `30`,
                    FCATION: `无`,
                    FSTAND: `宇宙级`,
                    altitude: 333.56,
                    ADCD: 10010,
                    floodVisitSituation: `@csentence(15)`,
                    investigationCompany: `weewewewewewe`,
                    investigationDate: `@date`,
                    imgSrc1: `http://192.168.10.1:3003/assets/images/map/1.jpg`,
                    imgSrc2: `http://192.168.10.1:3003/assets/images/map/2.jpg`
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_C_PREVAD`) {
        list = Mock.mock({
            "data|20": [
                {
                    "ADCD|+1": 20020,
                    "GULLYCD|+1": 10010,
                    NAME: `@city()`,
                    ADDRESS: `@ctitle(5, 9)村`,
                    "PTCOUNT|200-1000": 300,
                    "LDAREA|1000-10000": 3000,
                    "PLAREA|500-6000": 2000,
                    "ETCOUNT:|1-100": 20,
                    "PTCOUNT|200-600": 300,
                    "ECOUNT1|1-100": 100,
                    "ECOUNT2|1-100": 100,
                    "ECOUNT3|1-100": 100,
                    "ECOUNT4|1-100": 100,
                    "HTCOUNT|1-100": 100,
                    "HCOUNT1|1-100": 100,
                    "HCOUNT2|1-100": 100,
                    "HCOUNT3|1-100": 100,
                    "HCOUNT4|1-100": 100,
                    "WSCD|+1": 30030,
                    "CAREA|1-100.1-5": 2,
                    "CHLENGTH|1-100": 20,
                    CHPERCENT: `30`,
                    FCATION: `无`,
                    FSTAND: `宇宙级`,
                    altitude: 333.56,
                    ADCD: 10010,
                    floodVisitSituation: `@csentence(15)`,
                    investigationCompany: `weewewewewewe`,
                    investigationDate: `@date`
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_ECC_DTRESIDENT`) { // 重要城（集）镇居民户
        list = Mock.mock({
            "data|20": [
                {
                    BHILL: 0,
                    VNAME: `@ctitle(1, 3)村`,
                    LGTD: 106.013864,
                    MODITIME: `2015-08-29 16:07:31`,
                    COMMENTS: ``,
                    CADCD: `520330`,
                    HTCOUNT: 0,
                    STATUS: `审核通过`,
                    AREA: 1180.00,
                    WSCD: `WFA66001211IB000`,
                    HELE: 436.00,
                    ADCD: `520330103200000`,
                    LTTD: 28.155715,
                    CENTROID: ``,
                    PAGE_ROW_NUMBER: 1,
                    SIGNER: null,
                    AUDBATCH: `520330_习水县_S001`,
                    BELE: 452.52,
                    GUID: `6f70d63f-54f0-4758-a08b-c2808e887aa0`,
                    PID: `5203301032000002n04G`,
                    BCODE: null,
                    STYPE: `2`,
                    PTCOUNT: 24,
                    BTYPE: `4`,
                    ADDRESS: ` `,
                    BWATER: 1,
                    BLTTD: 28.156308
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_ECC_BSNSSINFO`) { // 企事业单位
        list = Mock.mock({
            "data|20": [
                {
                    EICD: `单位编码110`,
                    NAME: `@city()`,
                    WSCD: `WFA66001211IB000`,
                    BHILL: 0,
                    LGTD: 106.013864,
                    MODITIME: `2015-08-29 16:07:31`,
                    COMMENTS: ``,
                    CADCD: `520330`,
                    HTCOUNT: 0,
                    STATUS: `审核通过`,
                    AREA: 1180.00,
                    HELE: 436.00,
                    ADCD: `520330103200000`,
                    LTTD: 28.155715,
                    CENTROID: ``,
                    PAGE_ROW_NUMBER: 1,
                    SIGNER: null,
                    AUDBATCH: `520330_习水县_S001`,
                    BELE: 452.52,
                    GUID: `6f70d63f-54f0-4758-a08b-c2808e887aa0`,
                    PID: `5203301032000002n04G`,
                    BCODE: null,
                    STYPE: `2`,
                    PTCOUNT: 24,
                    BTYPE: `4`,
                    ADDRESS: ` `,
                    BWATER: 1,
                    BLTTD: 28.156308
                }
            ]
        });
    } else if (queryInfo.tableName === `IA_EGC_CULVERT`) { // 路涵
        list = Mock.mock({
            "data|20": [
                {
                    CULCD: `000`,
                    CULNAME: `路涵`,
                    WSCD: `WFA66001211IB000`,
                    ADCD: `520330103200000`,
                    PICID: `10010`,
                    LGTD: 105.013864,
                    LTTD: 28.155715,
                    HEIGHT: `20m`,
                    LENGHT: `30m`,
                    WIDTH: `40m`,
                    TYPE: `拱形`
                }
            ]
        });
    } else { // 其他所有的面板
        list = Mock.mock({
            "data|20": [
                {
                    SPCD: `水闸soso`,
                    GATE_CODE: `水闸111`,
                    GATE_NAME: `水闸水闸`,
                    RV_CODE: `大闸蟹`,
                    GATE_TYPE: `特大`,
                    HOLE_NUM: 55,
                    HOLE_WID: `66m`,
                    FL_GATE_FLOW: `50立方米`,
                    RUB_DAM_HIG: `70m`,
                    RUB_DAM_LEN: `80m`,
                    DAMCD: `塘（堰）坝111`,
                    DAMNAME: `钱塘江`,
                    XHST: `300立方米`,
                    MT: `大坝`,
                    BRCD: `桥梁111`,
                    BRNAME: `石拱桥`,
                    LENGTH: `20m`,
                    CULCD: `000`,
                    CULNAME: `xx00`,
                    WSCD: `WFA66001211IB000`,
                    ADCD: `520330103200000`,
                    PICID: `10010`,
                    LGTD: 106.6,
                    LTTD: 28.155715,
                    HEIGHT: `20m`,
                    LENGHT: `30m`,
                    WIDTH: `40m`,
                    TYPE: `拱形`
                }
            ]
        });
    }

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: list.data,
        stackTrace: null
    };
}

function GetMonitoringSiteInfo(ctx) {
    const queryInfo = ctx._queryInfo;

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: [
            {
                code: `rainfall_station`,
                name: `雨量站`,
                num: 4
            },
            {
                code: `channel_station`,
                name: `河道站`,
                num: 2
            },
            {
                code: `reservoir_station`,
                name: `水库站`,
                num: 64
            },
            {
                code: `video_station`,
                name: `视频站`,
                num: 477
            }
        ],
        stackTrace: null
    };
}


module.exports = {
    GetSafeTransferList,
    GetHisDisasterList,
    GetMountainList,
    GetRangeDetail,
    GetMonitoringSiteInfo
};
