/**
 *
 * @desc 判断两个数组是否相等
 * @param {Array} arr1 is
 * @param {Array} arr2 is
 * @return {Boolean} is
 */
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

module.exports = arrayEqual;
