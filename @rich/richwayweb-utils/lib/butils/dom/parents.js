/**
 * @desc  获取某一确定的父节点
 * @param {object}elem is
 * @returns {Array} is
 */

const hasClass = require(`../class/hasClass`);

function parents(ele, selector) {
    if (!ele || !selector) {
        return false;
    }
    while (ele && !hasClass(ele, selector)) {
        ele = ele.parentNode;
    }
    return ele;// 返回的target即是你要的box元素
}

module.exports = parents;
