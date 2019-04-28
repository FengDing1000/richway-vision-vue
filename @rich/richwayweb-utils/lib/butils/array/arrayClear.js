/**
 * 数组去重
 * @param {Array}arr is
 * @returns {*} is
 */
function arrayClear(arr) {
    const arr2 = [];
    if (arr instanceof Array) {
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr2.indexOf(arr[i]) < 0) {
                arr2.push(arr[i]);
            }
        }
        return arr2;
    }
    return false;
}

module.exports = arrayClear;
