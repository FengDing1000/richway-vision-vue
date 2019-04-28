/**
 * 测站类型过滤
 * @param {Object}station 5：自建站；1~4：水文站；编码为5位：气象站
 * @returns {string} is
 * @private
 */
export const _filterFrgrd = (station = {}) => {
    if (station.frgrd === `2`) {
        return `指挥系统`;
    }
    if ((station.stcd || ``).length === 5) {
        return `气象`;
    }
    return `水文`;
};
/**
 * 截取测站地址长度
 * @param {String}stlc is
 * @param {Integer}maxLength is
 * @returns {string} is
 * @private
 */
export const _filterStlc = (stlc = ``, maxLength = 9) => {
    stlc = stlc.replace(/(^\s*)|(\s*$)/g, ``);
    if (stlc.length <= maxLength) {
        return stlc;
    }
    return `${stlc.substring(0, maxLength)}...`;
};

/**
 * 过滤工程等级
 * @param {String}str is
 * @returns {string} is
 * @private
 */

export const _filterEngGrad = (str = ``) => {
    if (str === `5`) {
        return `小(二)型`;
    }
    if (str === `4`) {
        return `小(一)型 `;
    }
    if (str === `3`) {
        return `中型`;
    }
    if (str === `2`) {
        return `大(二)型`;
    }
    if (str === `1`) {
        return `大(一)型`;
    }
};

/**
 * 数字格式化
 * @param {String} str is
 * @param {Number} n is
 * @return {string} is
 * @private
 */
export const _filterNum = (str = ``, n = 2) => {
    if (str === null || str === undefined || str === ``) {
        return `--`;
    }
    if (typeof (str) === `string` || typeof (str) === `object` || typeof (str) === `undefined`) {
        str = parseFloat(str);
    }
    if (n < 0) {
        n = 0;
    }
    return str.toFixed(n);
};

/**
 * 字符串格式化
 * @param {String} str is
 * @param {Number} maxLength is
 * @return {string} is
 * @private
 */
export const _filterStr = (str = ``, maxLength = 9) => {
    if (typeof (str) === `object` || typeof (str) === `undefined`) {
        str = ``;
    }
    str = str.replace(/(^\s*)|(\s*$)/g, ``);
    if (str.length <= maxLength) {
        return str;
    }
    return `${str.substring(0, maxLength)}...`;
};
