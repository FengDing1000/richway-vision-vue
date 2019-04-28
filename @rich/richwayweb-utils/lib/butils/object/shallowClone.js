/**
 * 浅拷贝，支持常见类型
 * @param {*}values is
 * @returns {*} is
 */
function shallowClone(values) {
    let copy;
    let cache = [];
    copy = JSON.parse(JSON.stringify(values, (key, value) => {
        if (typeof value === `object` && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    }));
    cache = null;

    return copy;
}

module.exports = shallowClone;
