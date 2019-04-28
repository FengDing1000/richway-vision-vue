/**
 * @desc  查找相邻元素
 * @param {object}elem is
 * @returns {Array} is
 */
function siblings(elem) {
    const nodes = [];
    const _elem = elem;
    while ((elem = elem.previousSibling)) {
        if (elem.nodeType === 1) {
            nodes.push(elem);
        }
    }

    let __elem = _elem;
    while ((__elem = __elem.nextSibling)) {
        if (__elem.nodeType === 1) {
            nodes.push(__elem);
        }
    }
    return nodes;
}

module.exports = siblings;
