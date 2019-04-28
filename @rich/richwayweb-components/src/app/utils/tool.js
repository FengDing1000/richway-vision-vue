import store from '$app/store';

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

/**
 * 悬浮出现在页面角落，显示全局的通知提醒消息
 * @param {object} opt is
 * @returns {boolean} is
 * @private
 */
export const _notify = (opt = {}) => {
    store.commit(`SET_TOAST`, opt);
    return true;
};

export const _messageBox = (opt = {}) => {
    store.commit(`SET_MESSAGE_BOX`, opt);
    return true;
};


export const _hasToLogin = message => {
    store.commit(`SET_MESSAGE_BOX`, {
        message: `已超时，请重新登陆...`,
        sureCallBack: () => {
            store.commit(`SET_FULL_LOADING`, {
                show: true,
                text: `正在注销账号，请稍后...`
            });
            window._RichWay.$getData.SignOut().then(() => {
                window.location.href = `/login?service=${location.pathname}`;
            });
        }
    });
};
