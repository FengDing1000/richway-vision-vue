const path = require(`path`);
const RichWayWebUtils = require(`@rich/richwayweb-utils`);

const routerUtils = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/koa/router/router_utils`));
const markdown = require(path.join(_richwayKoaConfig.rootDirServer, `bin/markdown/index.js`));

/**
 * 判断当前用户的session是否已经过期，或者是否已经登录，则跳转到登录页面
 * @param {object}ctx is
 * @param {object}routesItem is
 * @return {boolean} is
 */
function filterLogin(ctx, routesItem = {}) {
    try {
        if (!_richwayKoaSession.hasLogin(ctx) && routesItem.mustLogin === true) {
            routerUtils.redirectLogin(ctx, ctx.request.href);
            return false;
        }
        return true;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4005, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
}

/**
 * 过滤页面
 * @param {array}list is
 * @param {string}url is
 * @return {boolean} is
 */
function filterPage(list = [], url) {
    try {
        if (!url) {
            return false;
        }
        if (url === `/error`) {
            return true;
        }
        let bl = false;
        for (const item of list) {
            if ((item.url || ``) === url) {
                bl = true;
                break;
            } else if ((item.children || []).length) {
                if (filterPage(item.children, url)) {
                    bl = true;
                    break;
                }
            }
        }
        return bl;
    } catch (err) {
        _richwayKoaLog.logError(err);
        return false;
    }
}

/**
 * 判断当前账号是否有权限访问当前页面
 * @param {object}ctx ias
 * @param {object}routesItem is
 * @return {boolean} is
 */
function filterAuthor(ctx, routesItem = {}) {
    try {
        const menuList = _richwayKoaSession.getMenuList(ctx);
        if (_richwayKoaSession.hasLogin(ctx) && routesItem.mustLogin === true) {
            if (!filterPage(menuList, routesItem.url)) {
                routerUtils.redirectError(ctx, {
                    code: 7002,
                    message: `当前账号无权限访问该页面`
                });
                return false;
            }
        }
        return true;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4006, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
}

/**
 *  判断当前访问平台进行判断，切换到对应的路径，做重定向
 * @param {object}ctx is
 * @param {object}routesItem is
 * @return {boolean} is
 */
function filterRedirect(ctx, routesItem = null) {
    const { path, originalUrl } = ctx.request;
    const browserInfo = RichWayWebUtils.browser(ctx.request);
    _richwayKoaLog.logInfo(`browserInfo is ${JSON.stringify(browserInfo)}`);
    _richwayKoaLog.logInfo(`originalUrl is ${originalUrl}`);
    // 判断userAgent
    if (browserInfo.mobile) {
        // 如果是移动端，则重定向到wap页面
        if ((originalUrl || ``).indexOf(`/wap`) === -1) {
            ctx.response.redirect(_richwayKoaConfig.wapHost || `/wap`);
            return false;
        }
    } else if ((originalUrl || ``).indexOf(`/wap`) > -1) {
        routerUtils.redirectPortal(ctx);
        return false;
    }
    // 重定向到首页
    if (path === `/` || path === ``) {
        routerUtils.redirectPortal(ctx);
        return false;
    }
    // 注销页面路由
    if (path === `/signOut`) {
        _richwayKoaSession.setUserInfo(ctx);
        routerUtils.redirectLogin(ctx);
        return false;
    }
    // 如果找不到对应的路由，则跳转到错误页面
    if (!routesItem) {
        routerUtils.redirectError(ctx, {
            code: 7001,
            message: `找不到该页面`
        });
        return false;
    }

    return true;
}

module.exports = (ctx, routesItem) => {
    if (!markdown(ctx, routesItem)) {
        return false;
    }

    if (!filterRedirect(ctx, routesItem)) {
        return false;
    }
    if (!filterLogin(ctx, routesItem)) {
        return false;
    }
    if (!filterAuthor(ctx, routesItem)) {
        return false;
    }
    return true;
};
