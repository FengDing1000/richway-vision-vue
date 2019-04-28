/**
 * @desc  父节点
 * @param {object}elem is
 * @returns {Array} is
 */
function parent(ele) {
    do {
        ele = ele.parentNode;
    } while (ele && ele.nodeType !== 1);
    return ele;
}

module.exports = parent;
