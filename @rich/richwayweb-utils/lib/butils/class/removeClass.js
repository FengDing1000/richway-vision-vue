/**
 *
 * @desc 为元素移除class
 * @param {HTMLElement} ele
 * @param {String} cls
 */

const hasClass = require(`./hasClass`);

function removeClass(ele, cls) {
    if (!ele) {
        return false;
    }
    if (hasClass(ele, cls)) {
        if (ele.classList) {
            ele.classList.remove(cls);
        } else {
            const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
            ele.className = ele.className.replace(reg, ` `);
        }
    }
    return true;
}

module.exports = removeClass;
