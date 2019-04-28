const path = require(`path`);
const fs = require(`fs`);
const _ = require(`underscore`);
const data = require('./data');

/**
 * 获取省市区数据
 * @return {{code: string, success: boolean, data: Array, total: number, pages: number}} is
 * @constructor
 */
function GetProvinceData() {
    return data["1"];
}

function GetSubRegionData(ctx, queryInfo){
    const result = data[queryInfo.adCd] || ``;
    if (result) {
        return result;
    } else {
        return {
            code: `7003`,
            success: false,
            message: `没有找到该行政区的下级数据`,
            data: null,
            total: 0,
            pages: 0
        };
    }
}

/**
 * 上传文件
 * @param {object}ctx is
 * @constructor
 */
function UpLoad(ctx) {
    const queryInfo = ctx._queryInfo;
    console.log(queryInfo.type);
    console.log(ctx);

    return {
        code: `1000`,
        success: true,
        data: [],
        total: 0,
        pages: 0
    };
}


function GetAdcdCity() {
    return {
        success: true,
       data: []
    };
}

module.exports = {
    GetProvinceData,
    GetSubRegionData,
    UpLoad,
    GetAdcdCity
};
