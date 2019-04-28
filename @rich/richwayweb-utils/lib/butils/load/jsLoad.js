/**
 * 加载JS文件
 * @param {string}src is
 * @param {object}doneCallback is
 * @param {object}failCallback is
 * @return {boolean} is
 */
function jsLoad(src, doneCallback, failCallback) {
    if (!src || src.length === 0) {
        throw new Error(`argument "src" is required !`);
    }
    const head = document.getElementsByTagName(`head`)[0];
    const script = document.createElement(`script`);
    script.type = `text/javascript`;
    script.src = src;
    head.appendChild(script);

    script.onload = function () {
        // js加载完成执行方法
        if (typeof (doneCallback) === `function`) {
            doneCallback();
        }
    };

    script.onerror = function () {
        if (typeof (failCallback) === `function`) {
            failCallback();
        }
    }
}

module.exports = jsLoad;
