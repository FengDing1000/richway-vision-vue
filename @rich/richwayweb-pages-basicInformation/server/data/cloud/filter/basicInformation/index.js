/**
 * 基础信息
 * @param {object}ctx is
 * @return {{}} is
 */
function GetStationInformationParamsFun(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.stcdtype = 2;
    queryInfo.city = ``;
    queryInfo.country = ``;

    return queryInfo;
}

function GetCurrentStationParamsFun(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.stcdtype = `1,3`;

    return queryInfo;
}

function GetCorrelationStationParamsFun(ctx) {
    let queryInfo = ctx._queryInfo;
    queryInfo = queryInfo.list;

    return queryInfo;
}

module.exports = {
    GetStationInformationParamsFun,
    GetCurrentStationParamsFun,
    GetCorrelationStationParamsFun
};
