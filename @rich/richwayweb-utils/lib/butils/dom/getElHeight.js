/**
 * 获取元素的高度
 * @type {isShow}
 */
const isShow = require(`./isShow`);
const getStyle = require(`./getStyle`);
const attr = require(`./attr`);

function getElHeight(elem) {
    // 如果传入的不是对象是字符串 则通过字符串转换成对象
    if (elem != null && isShow(elem)) {
        // 从style中获取对应的高度
        if (elem.style.height != null && elem.style.height.length > 0) {
            return parseFloat(elem.style.height);
        }
        // 如果elObj.style.mqp.height为空  则从css里面获取是否定义了height信息如果定义了 则读取css里面定义的高度height
        if (parseFloat(getStyle(elem, `height`)) > 0) {
            return parseFloat(getStyle(elem, `height`));
        }

        // 如果从css里获取到的值不是大于0  可能是auto 则通过offsetHeight来进行计算
        if (elem.offsetHeight > 0) {
            const borderTopWidth = getStyle(elem, `borderTopWidth`);
            const borderBottomWidth = getStyle(elem, `borderBottomWidth`);
            const paddingTop = getStyle(elem, `paddingTop`);
            const paddingBottom = getStyle(elem, `paddingBottom`);
            const backHeight = parseFloat(elem.offsetHeight) - parseFloat(borderTopWidth) - parseFloat(borderBottomWidth) - parseFloat(paddingTop) - parseFloat(paddingBottom);
            return parseFloat(backHeight);
        }
        return 0;
    }
    // 将元素显示出来 获取高度 再将元素隐藏掉
    attr(elem, `style`, `visibility:hidden;display:block !important;`);
    const height = getStyle(elem);
    elem.removeAttribute(`style`);
    return height;

    // return parseFloat(elem.style.height);
}

module.exports = getElHeight;
