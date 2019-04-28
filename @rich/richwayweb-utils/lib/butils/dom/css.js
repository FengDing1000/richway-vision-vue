/**
 * 设置或者返回对应css
 * @param {object}elem is
 * @param {string}cssCode is
 * @param {string}cssValue is
 * @returns {*} is
 */
function css(elem, cssCode, cssValue) {
    if (arguments.length === 2) {
        return elem.style.cssCode;
    } if (arguments.length === 3) {
        elem.style.cssCode = cssValue;
        return elem;
    }
}

module.exports = css;
