/**
 *
 * @desc   为元素添加class
 * @param  {HTMLElement} ele
 * @param  {String} cls
 * @return {boolean} is
 */

const hasClass = require(`./hasClass`);

function addClass(ele, cls) {
    if (!ele) {
        return false;
    }
    if (!hasClass(ele, cls)) {
        if (ele.classList) {
            ele.classList.add(cls);
        } else {
            ele.className += ` ${cls}`;
        }
    }
    return true;
}

module.exports = addClass;
