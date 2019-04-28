/**
 * 软键盘上面的搜索和开始按钮
 * @type {boolean}
 */

let sign = false;
let listenerEnterCallbackFun = null;

function listenerEnter(callback) {
    if (!sign) {
        sign = true;
        document.addEventListener(`keydown`, e => {
            if (e.keyCode === 13 || e.which === 13) {
                // 点击了“搜索”
                if (listenerEnterCallbackFun && typeof (listenerEnterCallbackFun) === `function`) {
                    e.target.blur();
                    listenerEnterCallbackFun();
                }
            }
        }, { passive: true });
    }
    listenerEnterCallbackFun = callback;
}

module.exports = listenerEnter;
