/**
 * 判断元素是否有某个class
 * @param {object}ele is
 * @param {string}cls is
 * @returns {boolean} is
 */
function hasClass(ele, cls) {
    try {
        if (!ele) {
            return false;
        }

        if (ele.classList) {
            return ele.classList.contains(cls);
        }
        return (new RegExp(`(\\s|^)${cls}(\\s|$)`)).test(ele.className);
    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = hasClass;
