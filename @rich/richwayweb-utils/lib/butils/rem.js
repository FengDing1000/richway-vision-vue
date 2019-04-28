const eventHandler = require(`./event/handler`);
const _throttleDuration = require(`./function/throttleDuration`);
const addClass = require(`./class/addClass`);
const hasClass = require(`./class/hasClass`);
const removeClass = require(`./class/removeClass`);
const parents = require(`./dom/parents`);

const activeCla = `richway-touch-active`;
const targetCla = `richway-touch-btn`;

// hnaui-btn-disabled
function actioned(e) {
    try {
        const { target } = e;
        if (!hasClass(target, `richway-btn-disabled`)) {
            if (hasClass(target, targetCla)) {
                const childrenEle = find(target, activeCla);
                if (childrenEle.length <= 0) {
                    addClass(target, activeCla);
                }
            } else {
                const parentsEle = parents(target, targetCla);
                if (parentsEle) {
                    addClass(parentsEle, activeCla);
                }
            }
        }
    } catch (e) {

    }
}

function enaction(e) {
    try {
        const { target } = e;
        if (hasClass(target, targetCla)) {
            removeClass(target, activeCla);
        } else {
            const parentsEle = parents(target, activeCla);
            if (parentsEle) {
                removeClass(parentsEle, activeCla);
            }
        }
    } catch (e) {

    }
}


/**
 * 针对移动端的处理，移动端都使用rem
 * @return {*} is
 */
module.exports = (info = {}) => {
    let coefficient = 1;
    // 监听屏幕转动，重新设置fontSize
    const docEl = document.documentElement;
    const resizeEvt = `orientationchange` in window ? `orientationchange` : `resize`;
    const resizeFun = () => {
        const {clientWidth} = docEl;
        if (!clientWidth) {
            return;
        }

        if (clientWidth < 600) {
            coefficient = clientWidth / 320;
        } else if (clientWidth > 1200) {
            coefficient = clientWidth / 1920;
        }
        docEl.style.fontSize = `${20 * coefficient}px`;
        addClass(docEl, `richway-web-pc`);
    };
    eventHandler.addHandler(window, resizeEvt, _throttleDuration(resizeFun, 400, 400));
    resizeFun();

    if (info.platform === `wap`) {
        // 模拟hover效果
        eventHandler.addHandler(document, `touchstart`, actioned);
        eventHandler.addHandler(document, `touchmove`, enaction);
        eventHandler.addHandler(document, `touchend`, enaction);
        eventHandler.addHandler(document, `touchcanvel`, enaction);
    }

    return coefficient;
};
