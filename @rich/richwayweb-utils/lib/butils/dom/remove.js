/**
 * 删除elem
 * @param {object}elem is
 * @returns {*} is
 */
function remove(elem) {
    elem.parentNode && elem.parentNode.removeChild(elem);
}

module.exports = remove;
