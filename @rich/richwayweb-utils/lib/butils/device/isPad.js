/**
 * @desc 判断是否是微信
 * @returns {boolean} is
 */
function isPad() {
    return window.navigator.userAgent.toLowerCase().match(/iPad/i) != null;
}

module.exports = isPad;
