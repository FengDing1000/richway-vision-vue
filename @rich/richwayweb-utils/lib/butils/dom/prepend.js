/**
 * 在elem内部的最前面添加newElem
 * @param {object}elem is
 * @param {object}newElem is
 * @returns {*} is
 */
function prepend(elem, newElem) {
    elem.innerHTML = newElem + elem.innerHTML;
    return elem;
}

module.exports = prepend;
