/**
 * 这个方法返回一个矩形对象，包含四个属性：left、header、right和bottom。分别表示元素各边与页面上边和左边的距离。
 * header 元素上边距离页面上边的距离
 * right 元素右边距离页面左边的距离
 * bottom 元素下边距离页面上边的距离
 * left 元素左边距离页面左边的距离
 * @param {object}element is
 * @returns {{header: number, bottom: number, left: number, right: number}} is
 */
function getPosition(element) {
    const doc = document;
    const docBody = doc.body;
    const docElem = doc.documentElement;

    const rect = element.getBoundingClientRect();

    // document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
    // document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
    const { clientTop, clientLeft } = docElem;

    const scrollTop = docElem.scrollTop || docBody.scrollTop || 0;
    const scrollLeft = docElem.scrollLeft || docBody.scrollLeft || 0;

    const cTop = rect.top - clientTop;
    const cBottom = rect.bottom - clientTop;
    const cLeft = rect.left - clientLeft;
    const cRight = rect.right - clientLeft;

    const sTop = cTop + scrollTop;
    const sBottom = cBottom + scrollTop;
    const sLeft = cLeft + scrollLeft;
    const sRight = cRight + scrollLeft;

    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    return {
        cTop,
        cBottom,
        cLeft,
        cRight,
        sTop,
        sBottom,
        sLeft,
        sRight,
        width,
        height
    };
}

module.exports = getPosition;
