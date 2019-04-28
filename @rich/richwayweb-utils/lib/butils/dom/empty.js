/**
 * 清空elem的子元素
 * @param {object}elem is
 * @returns {*} is
 */
function empty(elem) {
    elem.innerHTML = ``;
    return elem;
}

module.exports = empty;
