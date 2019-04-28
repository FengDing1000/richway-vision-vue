/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj is
 * @return {Boolean} is
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== `object` || Array.isArray(obj)) return false;
    return !Object.keys(obj).length;
}

module.exports = isEmptyObject;
