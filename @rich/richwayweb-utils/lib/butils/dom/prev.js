/**
 * @desc  前一个节点
 * @param {object}ele is
 * @returns {Array} is
 */
function prev(ele) {
    do {
        ele = ele.previousSibling;
    } while (ele && ele.nodeType !== 1);
    return ele;
}

module.exports = prev;
