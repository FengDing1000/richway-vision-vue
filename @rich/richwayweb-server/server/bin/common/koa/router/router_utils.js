const RichWayWebUtils = require(`@rich/richwayweb-utils`);

/**
 * 重定向到首页
 * @param {object}ctx is
 * @param {string}href is
 * @return {boolean} is
 */
module.exports.redirectPortal = (ctx = {}) => {
    ctx.response.redirect(_richwayKoaConfig.portalHost || `/portal`);
    return false;
};


/**
 * 重定向到错误页面
 * @param {object}ctx is
 * @param {object}opt is
 * @return {boolean} is
 */
module.exports.redirectError = (ctx = {}, opt = {}) => {
    const info = {
        code: opt.code || 7000,
        message: opt.message || `找不到该页面`
    };
    const q = `?q=${encodeURIComponent(RichWayWebUtils.compile.uncompile(JSON.stringify(info)))}`;
    ctx.response.redirect(`/error${q}`);
    return false;
};


/**
 * 重定向到登录页面
 * @param {object}ctx is
 * @param {string}href is
 * @return {boolean} is
 */
module.exports.redirectLogin = (ctx = {}, href = ``) => {
    let service = ``;
    if (href) {
        service = `?service=${encodeURIComponent(href)}`;
    }
    ctx.response.redirect(`/login${service}`);
    return false;
};
