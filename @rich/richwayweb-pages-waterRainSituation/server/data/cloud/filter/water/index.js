/**
 * 最新河道水情查询参数处理
 * @param {object}ctx is
 * @return {{}} is
 */
function GetRiverWaterParamsFun(ctx) {
    const queryInfo = ctx._queryInfo;
    if (queryInfo.over === `2`) {
        queryInfo.overZone = `1`;
    } else if (queryInfo.over === `3`) {
        queryInfo.overZtwo = `1`;
    }

    return queryInfo;
}

function RainContrastParamsFun(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.addvcds = (queryInfo.addvcds || []).join();
    return queryInfo;
}

function ChangeDangerAreaParamsFun(ctx) {
    let queryInfo = ctx._queryInfo;
    queryInfo = queryInfo.list;
    return queryInfo;
}

module.exports = {
    GetRiverWaterParamsFun,
    RainContrastParamsFun,
    ChangeDangerAreaParamsFun
};
