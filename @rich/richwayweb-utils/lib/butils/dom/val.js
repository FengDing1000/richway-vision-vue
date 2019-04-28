/**
 * 设置或者返回value
 * @param {object}elem is
 * @param {string}value is
 * @returns {*} is
 */
function val(elem, value) {
    if (arguments.length === 1) {
        return elem.value;
    } if (arguments.length === 2) {
        elem.value = value || ``;
        return elem;
    }
    return ``;
}

module.exports = val;
