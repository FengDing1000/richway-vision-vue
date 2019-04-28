/**
 * 获取url里面的参数，转化为对象
 * @returns {{}} is
 */
function getRequest() {
    const url = window.location.search; // 获取url中"?"符后的字串
    const theRequest = {};
    if (url.indexOf(`?`) !== -1) {
        const arr = (url.substr(1) || ``).split(`&`);
        for (let i = 0, i1 = arr.length; i < i1; i++) {
            theRequest[arr[i].split(`=`)[0]] = unescape(arr[i].split(`=`)[1]);
        }
    }
    return theRequest;
}

module.exports = getRequest;
