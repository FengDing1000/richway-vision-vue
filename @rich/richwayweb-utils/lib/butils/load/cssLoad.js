/**
 * 加载CSS文件
 * @param {string}src is
 * @param {object}doneCallback is
 * @param {object}failCallback is
 * @return {boolean} is
 */
function cssLoad(src, doneCallback, failCallback) {
    if (!src || src.length === 0) {
        throw new Error(`argument "src" is required !`);
    }
    const head = document.getElementsByTagName(`head`)[0];
    const link = document.createElement(`link`);
    link.href = src;
    link.rel = `stylesheet`;
    link.type = `text/css`;
    head.appendChild(link);

    link.onload = function () {
        // js加载完成执行方法
        if (typeof (doneCallback) === `function`) {
            doneCallback();
        }
    };

    link.onerror = function () {
        if (typeof (failCallback) === `function`) {
            failCallback();
        }
    }
}

module.exports = cssLoad;
