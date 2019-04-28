/**
 * 在elem外部的最后面添加newElem
 * @param {object}elem is
 * @param {object}newElem is
 * @returns {*} is
 */
function after(elem, newElem) {
    elem.outerHTML += newElem;
    return elem;
}

module.exports = after;
