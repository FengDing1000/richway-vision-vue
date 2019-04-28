/**
 * 判断是否是日期类型
 * @param {object} obj is date
 * @returns {boolean} is boolean
 */
function isDate(obj = {}) {
    return Object.prototype.toString.call(obj) === `[object Date]`;
}

module.exports = isDate;
