/**
 * 获取body的高度，宽度，滚动条高度和宽度，以及滚动条滚动的位置
 * @param {string}key is
 * @returns {*} is
 */
function getBodySizeInfo(key) {
    const doc = document;
    const docBody = doc.body;
    const docElem = doc.documentElement;

    let cWidth = 0; let cHeight = 0; let sWidth = 0; let sHeight = 0; let top = 0; let
        left = 0;
    if (doc.compatMode === `BackCompat`) {
        cWidth = docBody.clientWidth;
        cHeight = docBody.clientHeight;
        sWidth = docBody.scrollWidth;
        sHeight = docBody.scrollHeight;
        left = docBody.scrollLeft;
        top = docBody.scrollTop;
    } else {
        cWidth = docElem.clientWidth;
        cHeight = docElem.clientHeight;
        sWidth = docElem.scrollWidth;
        sHeight = docElem.scrollHeight;
        left = docElem.scrollLeft === 0 ? docBody.scrollLeft : docElem.scrollLeft;
        top = docElem.scrollTop === 0 ? docBody.scrollTop : docElem.scrollTop;
    }
    const returnObj = { cWidth, cHeight, sWidth, sHeight, top, left };
    if (key) {
        return returnObj[key] || ``;
    }
    return returnObj;
}

module.exports = getBodySizeInfo;
