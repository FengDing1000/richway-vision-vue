/**
 * 在elem外部的最前面添加newElem
 * @param {object}elem is
 * @param {object}newElem is
 * @returns {*} is
 */
function before(elem, newElem) {
    elem.outerHTML = newElem + elem.outerHTML;
    return elem;
}

module.exports = before;
