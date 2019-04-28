/**
 * @desc  后一个节点
 * @param {object}ele is
 * @returns {Array} is
 */
function next(ele) {
    do {
        ele = ele.nextSibling;
    } while (ele && ele.nodeType !== 1);
    return ele;
}

module.exports = next;
