/**
 * @desc 判断是否是微信
 * @returns {boolean} is
 */
function isWeixin() {
    return window.navigator.userAgent.toLowerCase().match(/micromessenger/i) != null;
}

module.exports = isWeixin;
