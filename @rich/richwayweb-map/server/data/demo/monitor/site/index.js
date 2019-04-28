const Mock = require(`mockjs`);

function TimeList() {
    this.data = Mock.mock({
        "data|0.1": 1
    }).data;
}

function TimeListArray() {
    const arr = [];
    for (let c = 0; c < 7; c++) {
        arr.push((new TimeList()).data);
    }
    this.data = arr;
}


function GetSiteList(ctx) {
    const queryInfo = ctx._queryInfo;
    const data = {
        meas_id: ``,
        AD_CD: /\d{15,16}/,
        almCount: 0,
        TS: ``,
        "isWarn|1-2": true,
        measNm: `水位标高`,
        LOC_TP_CD: `static`,
        VAL: `无数据`,
        stcd: `ns59`,
        "sttp|1": ["PZ", "RR", "PP", "ZZ", "ZQ"],
        "lttd|25-28.1-10": 1,
        "lgtd|105-108.1-10": 1,
        wrnCount: 0,
        CD: `ns59`,
        crtCount: 0,
        nm: `@ctitle(2, 5)测站`,
        rainfallInfo: {
            timeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            // "data|12":[(new TimeList()).data]
            data: []
        },
        waterLevelProcessInfo: {
            timeList: [`周一`, `周二`, `周三`, `周四`, `周五`, `周六`, `周日`],
            // "data|6":[new TimeListArray()]
            data: []
        },
        waterLevelSketchInfo: {
            "waterDepth|5-20": 5
        }
    };
    if (queryInfo.fav === true) {
        data.fav = true;
    } else {
        data[`fav|1-2`] = true;
    }
    if (queryInfo.status.length === 1 && queryInfo.status.indexOf(`1`) > -1) {
        data.isWarn = true;
    } else {
        data[`isWarn|1-2`] = true;
    }

    const rainList = Mock.mock({
        "data|2000": [
            data
        ]
    });

    const len = rainList.data.length;
    for (let a = 0; a < len; a++) {
        for (let c = 0; c < 12; c++) {
            rainList.data[a].rainfallInfo.data.push((new TimeList()).data);
        }
        for (let b = 0; b < 6; b++) {
            rainList.data[a].waterLevelProcessInfo.data.push((new TimeListArray()).data);
        }
    }


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
    GetSiteList
};
