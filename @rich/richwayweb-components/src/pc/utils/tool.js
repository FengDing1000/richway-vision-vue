import store from '$pc/store';

const { Notification, MessageBox, Message } = require(`element-ui`);

/**
 * 显示与隐藏浏览器请求接口的加载动画
 * @param {object} opt is
 * @returns {boolean} is
 * @private
 */
export const _toggleBriefLoading = (opt = {}) => {
    store.commit(`SET_BRIEF_LOADING`, opt);
    return true;
};

/**
 * 全局的全屏加载动画
 * @param {object} opt is
 * @returns {boolean} is
 * @private
 */
export const _toggleFullLoading = (opt = {}) => {
    store.commit(`SET_FULL_LOADING`, opt);
    return true;
};

/**
 * 全局的快捷登录弹窗
 * @param {object} opt is
 * @returns {boolean} is
 * @private
 */
export const _toggleFastLogin = (opt = {}) => {
    store.commit(`SET_FAST_LOGIN`, opt);
    return true;
};

function getDuration(message) {
    return Math.ceil((message || ``).length/6) * 2 * 1000;
}

/**
 * 悬浮出现在页面角落，显示全局的通知提醒消息
 * @param {object} opt is
 * @returns {boolean} is
 * @private
 */
export const _notify = (opt = {}) => {
    const message = opt.message || `操作成功`;
    const duration = opt.duration || getDuration(message);
    Notification({
        title: opt.title || `成功`,
        type: opt.type || `success`,
        message,
        duration,
        offset: 60
    });
    return true;
};

export const _message = (opt = {}) => {
    const message = opt.message || `操作成功`;
    const duration = opt.duration || getDuration(message);
    Message({
        showClose: opt.showClose || true,
        type: opt.type || `success`,
        message,
        duration
    });
    return true;
};


export const _hasToLogin = message => {
    if (window._RichWay.tipsLoginCount > 0) {
        return false;
    }
    window._RichWay.tipsLoginCount = 0;
    window._RichWay.tipsLoginCount++;
    MessageBox.confirm(message || `已超时，请重新登陆...`, `提示`, {
        confirmButtonText: `确定`,
        cancelButtonText: `取消`,
        type: `warning`
    }).then(() => {
        store.commit(`SET_FULL_LOADING`, {
            show: true,
            text: `正在注销账号，请稍后...`
        });
        window._RichWay.$getData.SignOut().then(() => {
            window.location.href = `/login?service=${location.pathname}`;
        });
    }).catch(() => {

    });
};
