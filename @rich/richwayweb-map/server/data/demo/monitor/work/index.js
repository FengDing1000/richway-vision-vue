const Mock = require(`mockjs`);

function GetWorkTypeAll(ctx) {
    const queryInfo = ctx._queryInfo;
    const workTypeList = Mock.mock([
        {
            code: `reservoir`,
            name: `水库`,
            count: 345
        },
        {
            code: `rivers`,
            name: `河流`,
            count: 345
        },
        {
            code: `sluice`,
            name: `水闸`,
            count: 35
        },
        {
            code: `dike`,
            name: `堤防`,
            count: 345
        },
        {
            code: `lake`,
            name: `湖泊`,
            count: 37
        },
        {
            code: `dangerous_section`,
            name: `险工险段`,
            count: 345
        },
        {
            code: `irrigated_area`,
            name: `灌区`,
            count: 345
        },
        {
            code: `station`,
            name: `机电排灌站`,
            count: 345
        }
    ]);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: workTypeList,
        stackTrace: null
    };
}

function GetWorkAll(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.rows = 2000;
    queryInfo.page = 1;
    const workList = Mock.mock({
        "data|2000": [
            {
                NORM_POOL_STAG_CAP: null,
                UP_RIGHT_LAT: 28.0833,
                RES_NAME: `@ctitle(2, 4)水库`,
                FL_LOW_LIM_LEV: null,
                "TOT_CAP|100-1000": 500,
                UPP_LEV_FLCO: null,
                "NORM_WAT_LEV|500-1000.1-10": 796.3,
                "DEAD_LEV|300-1000": 768,
                UP_RIGHT_LONG: 107.5312,
                "ENG_STAT|1": [`1`, `2`, `3`, `4`, `5`],
                NOTE: null,
                RES_LOC: `@county(true)`,
                COMP_DATE: `1988-12-01 00:00:00`,
                ADM_DEP: `1`,
                "WAT_SHED_AREA|1-100": 10,
                "LOW_LEFT_LAT|25-28.1-10": 1,
                FLCO_CAP: null,
                "DEAD_CAP|1-100": 20,
                RUN_STAT: null,
                RES_CODE: `@id `,
                NORM_POOL_STAG_AREA: 0.3,
                "STOR_FL_CAP|1-100": 54,
                START_DATE: null,
                "RES_TYPE|1": [`1`, `2`, `3`, `4`, `5`],
                FL_LOW_LIM_LEV_CAP: null,
                COLL_DATE: `@datetime`,
                ROW_ID: 1,
                DAAD_MUL_AVER_RUOF: null,
                "LOW_LEFT_LONG|105-108.1-10": 1,
                "ENG_GRAD|1": [`1`, `2`, `3`, `4`, `5`],
                "BEN_RES_CAP|1-100": 433,
                ENG_SCAL: null,
                UPD_DATE: null
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
        data: workList.data.splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}

function GetWorkDetail(ctx) {
    const queryInfo = ctx._queryInfo;

    let workerDetail = {};
    if (queryInfo.tbnm === `ATT_RES_BASE`) {
        workerDetail = [
            {
                "filed": "NORM_POOL_STAG_CAP",
                "name": "正常蓄水位相应库容",
                "value": null
            }, {
                "filed": "UP_RIGHT_LAT",
                "name": "右上角纬度",
                "value": 27.5521
            }, {
                "filed": "RES_NAME",
                "name": "水库名称",
                "value": "小盆水水库"
            }, {
                "filed": "FL_LOW_LIM_LEV",
                "name": "防洪限制水位",
                "value": null
            }, {
                "filed": "NORM_POOL_STAG_CAP",
                "name": "正常蓄水位相应库容",
                "value": null
            }, {
                "filed": "UP_RIGHT_LAT",
                "name": "右上角纬度",
                "value": 27.5521
            }, {
                "filed": "RES_NAME",
                "name": "水库名称",
                "value": "小盆水水库"
            }, {
                "filed": "FL_LOW_LIM_LEV",
                "name": "防洪限制水位",
                "value": null
            }
        ];
    } if (queryInfo.tbnm !== `ATT_RES_BASE`) {
        workerDetail = [
            {
                "filed": "NORM_POOL_STAG_CAP",
                "name": "正常蓄水位相应库容",
                "value": null
            }, {
                "filed": "UP_RIGHT_LAT",
                "name": "右上角纬度",
                "value": 27.5521
            }, {
                "filed": "RES_NAME",
                "name": "水库名称",
                "value": "xxoo"
            }, {
                "filed": "FL_LOW_LIM_LEV",
                "name": "防洪限制水位",
                "value": null
            }
        ];
    }

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: workerDetail,
        stackTrace: null
    };
}

module.exports = {
    GetWorkTypeAll,
    GetWorkAll,
    GetWorkDetail
};
