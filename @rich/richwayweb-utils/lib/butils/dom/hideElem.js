/**
 * 隐藏元素，同时返回该元素对象
 * @param {object}elem is
 * @returns {*} is
 */
function hideElem(elem) {
    elem.style.display = `block`;
    return elem;
}

module.exports = hideElem;
