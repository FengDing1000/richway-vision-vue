/**
 * 事件的绑定与移除库
 * @type {{addHandler: EventUtil.addHandler, removeHandler: EventUtil.removeHandler}}
 */
const EventUtil = {
    /* 检测绑定事件 */
    addHandler(ele, type, handler) {
        try {
            if (ele.addEventListener) {
                ele.addEventListener(type, handler, false);
            } else if (ele.attachEvent) {
                ele.attachEvent(`on${type}`, handler);
            } else {
                ele[`on${type}`] = handler;
            }
        } catch (e) {
            console.log(e);
        }
    },
    /* 通过removeHandler */
    removeHandler(ele, type, handler) {
        try {
            if (ele.removeEventListener) {
                ele.removeEventListener(type, handler, false);
            } else if (ele.deattachEvent) {
                ele.deattachEvent(`on${type}`, handler);
            } else {
                ele[`on${type}`] = null;
            }
        } catch (e) {
            console.log(e);
        }
    }
};

module.exports = EventUtil;
