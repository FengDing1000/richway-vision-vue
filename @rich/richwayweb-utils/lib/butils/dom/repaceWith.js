/**
 * 替换elem
 * @param {object} elem is
 * @param {object}newElem is
 * @returns {*} is
 */
function replaceWith(elem, newElem) {
    elem.outerHTML = newElem;
    return elem;
}

module.exports = replaceWith;
