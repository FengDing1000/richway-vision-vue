/**
 * 重新设置url里面的参数
 * @param {string}param is
 * @param {string}value is
 * @returns {string}is
 */
function setRequestParam(param, value) {
    const query = location.search.substring(1);
    const p = new RegExp(`(^|)${param}=([^&]*)(|$)`);
    if (p.test(query)) {
        // query = query.replace(p,"$1="+value);
        let firstParam = query.split(param)[0];
        if (firstParam.lastIndexOf(`&`) === firstParam.length - 1) {
            firstParam = firstParam.substring(0, firstParam.length - 1);
        }
        const secondParam = query.split(param)[1];
        if (secondParam.indexOf(`&`) > -1) {
            // var lastPraam = secondParam.split("&")[1];
            const lastPraam = secondParam.substr(secondParam.indexOf(`&`) + 1);
            if (firstParam) {
                return `?${firstParam}&${param}=${value}&${lastPraam}`;
            }
            return `?${param}=${value}&${lastPraam}`;
        }
        if (firstParam) {
            return `?${firstParam}&${param}=${value}`;
        }
        return `?${param}=${value}`;
    }
    if (query === ``) {
        return `?${param}=${value}`;
    }
    return `?${param}=${value}&${query}`;
}

module.exports = setRequestParam;
