/**
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object} is
 */
function parseQueryString(url) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf(`?`) + 1);
    if (!search) {
        return {};
    }
    return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, `\\"`).replace(/&/g, `","`).replace(/=/g, `":"`)}"}`);
}

module.exports = parseQueryString;
