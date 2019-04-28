/**
 * 判断元素是否显示
 * @type {getStyle} is
 */
const getStyle = require(`./getStyle`);

function isShow(elem) {
    const display = getStyle(elem, `display`);
    if (display === `none`) {
        return false;
    }
    return true;
}

module.exports = isShow;
