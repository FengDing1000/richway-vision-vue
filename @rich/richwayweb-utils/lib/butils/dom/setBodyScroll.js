/**
 * 设置滚动条的高度和宽度位置
 * @param {object}o is
 */
function setBodyScroll(o = {}) {
    const docBody = document.body;
    const docElem = document.documentElement;
    if (o.top) {
        docElem.scrollTop = docBody.scrollTop = o.top;
    }
    if (o.left) {
        docElem.scrollLeft = docBody.scrollLeft = o.left;
    }
}

module.exports = setBodyScroll;
