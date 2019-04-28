/**
 * 在elem内部的最后面添加newElem
 * @param {object}elem is
 * @param {object}newElem is
 * @returns {*} is
 */
function append(elem, newElem) {
    elem.innerHTML += newElem;
    return elem;
}

module.exports = append;
