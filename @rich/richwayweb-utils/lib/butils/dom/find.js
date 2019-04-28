/**
 * @desc  查找元素
 * @param {object}ele is
 * @param {object}selector is
 * @returns {Array} is
 */
function find(ele, selector) {
    return (ele || document).querySelectorAll(selector);
}

module.exports = find;
