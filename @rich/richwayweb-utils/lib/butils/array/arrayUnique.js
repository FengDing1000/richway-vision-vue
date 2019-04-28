/**
 * @desc 最简单数组去重法
 * @param {Array} arr is
 * @return {Boolean} is
 */
function arrayUnique(arr) {
    const n = [];
    for (let i = 0; i < arr.length; i++) {
        if (n.indexOf(arr[i]) === -1) n.push(arr[i]);
    }
    return n;
}

module.exports = arrayUnique;
