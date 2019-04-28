/**
 * 加载图片
 * @param {string}src is
 * @param {object}doneCallback is
 * @param {object}failCallback is
 * @return {boolean} is
 */
function imgLoad(src, doneCallback, failCallback) {
    // 创建一个图片对象;
    const imgObj = new Image();
    // 图片对象的路径赋值;
    imgObj.src = src;
    // 图片加载完成
    imgObj.onload = () => {
        if (doneCallback && typeof (doneCallback) === `function`) {
            doneCallback();
        }
    };
    // 图片加载失败
    imgObj.onerror = err => {
        if (failCallback && typeof (failCallback) === `function`) {
            failCallback(err);
        }
    };

    return true;
}

module.exports = imgLoad;
