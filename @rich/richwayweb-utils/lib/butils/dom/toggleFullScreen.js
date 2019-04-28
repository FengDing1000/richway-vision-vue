/**
 * 打开或者退出全屏
 * @param {boolean} bl is
 * @returns {string} is
 */
function toggleFullScreen(bl) {
    if (bl) {
        const el = document.documentElement;
        const fullMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (fullMethod) {
            fullMethod.call(el);
            return `full`;
        }
    } else {
        // 判断各种浏览器，找到正确的方法
        const exitMethod = document.exitFullscreen // W3C
            || document.mozCancelFullScreen // Chrome等
            || document.webkitExitFullscreen // FireFox
            || document.webkitExitFullscreen; // IE11
        if (exitMethod) {
            exitMethod.call(document);
            return `exit-full`;
        }
    }

    if (typeof window.ActiveXObject !== `undefined`) { // for Internet Explorer
        const wscript = new window.ActiveXObject(`WScript.Shell`);
        if (wscript !== null) {
            wscript.SendKeys(`{F11}`);
        }
    }

    return ``;
}

module.exports = toggleFullScreen;
