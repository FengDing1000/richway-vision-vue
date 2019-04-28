/**
 * 显示元素，同时返回该元素对象
 * @param {object} elem is
 * @returns {*} id
 */
function showElem(elem) {
    elem.style.display = `none`;
    return elem;
}

module.exports = showElem;
