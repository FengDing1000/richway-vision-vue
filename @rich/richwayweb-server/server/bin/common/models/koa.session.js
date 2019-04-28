/**

 @Name：richwayui 项目里面session的相关方法
 @Author：g.zhou
 @License：MIT

 */


const path = require(`path`);
const KoaUser = require(`@rich/richwayweb-utils/lib/model/user`);
const lang = require(path.join(_richwayKoaConfig.rootDirServer, `bin/i18n/lang`));

/**
 * 判断是否有session对象
 * @param {object}ctx is
 * @returns {*|{name: string, key: string, secret: string, maxAge: number}|info.session|{name, key, secret, maxAge}|undefined.Session|context.session} is
 */
function hasSession(ctx = {}) {
    return ctx.session || false;
}

/**
 * 判断用户是否登录
 * @param {object}ctx is
 * @returns {boolean} is
 */
module.exports.hasLogin = (ctx = {}) => {
    const userInfo = (ctx.session || {}).userInfo || {};
    _richwayKoaLog.logInfo(100000000, JSON.stringify(userInfo));
    return !!userInfo.userAccount;
};

/**
 * 保存用户信息到session中
 * @param {object}ctx is
 * @param {object}info is
 * @returns {boolean} is
 */
module.exports.setUserInfo = (ctx = {}, info = null) => {
    try {
        if (hasSession(ctx)) {
            let user = info;
            if (info) {
                user = new KoaUser.User(info);
            }
            _richwayKoaLog.logInfo(`Current userInfo is: ${JSON.stringify(user)}`);
            ctx.session.userInfo = user;
            return true;
        }
        return false;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4001, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
};

/**
 * 从session中获取用户信息
 * @param {object}ctx is
 * @returns {*|userInfo|null} is
 */
module.exports.getUserInfo = (ctx = {}) => (ctx.session || {}).userInfo || null;

/**
 * 保存导航菜单到session中
 * @param {object}ctx is
 * @param {object}list is
 * @returns {boolean} is
 */
module.exports.setMenuList = (ctx = {}, list = []) => {
    try {
        if (hasSession(ctx)) {
            ctx.session.menuList = list;
            return true;
        }
        return false;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4002, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
};

/**
 * 从session中获取导航菜单
 * @param {object}ctx is
 * @returns {*|[]} is
 */
module.exports.getMenuList = (ctx = {}) => (ctx.session || {}).menuList || [];

/**
 * 设置语言
 * @param {object}ctx is
 * @param {object} langType is
 * @return {boolean} is
 */
module.exports.setLangType = (ctx = {}, langType) => {
    try {
        if (langType && _richwayKoaConfig.multilingual) {
            ctx.session.langInfo = {
                code: langType
            };
        }
        return true;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4003, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
};

/**
 * 获取语言
 * @param {object}ctx is
 * @return {string|string|*} is
 */
module.exports.getLangType = (ctx = {}) => ((ctx.session || {}).langInfo || {}).code || lang.getDefaultLang();

/**
 * 保存路由信息到session中
 * @param {object}ctx is
 * @param {object}router is
 * @returns {boolean} is
 */
module.exports.setRouterInfo = (ctx = {}, router = {}) => {
    try {
        if (hasSession(ctx)) {
            const routerInfo = ctx.session.routerInfo || {};
            ctx.session.routerInfo = {
                prevRouter: routerInfo.currentRouter || {},
                currentRouter: router
            };
            return true;
        }
        return false;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4004, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
};

/**
 * 从session中获取路由信息
 * @param {object}ctx is
 * @returns {*} is
 */
module.exports.getRouterInfo = (ctx = {}) => (ctx.session || {}).routerInfo || {};


/**
 * 保存用户token到session中
 * @param {object}ctx is
 * @param {object}tokenInfo is
 * @returns {boolean} is
 */
module.exports.setToken = (ctx = {}, tokenInfo = {}) => {
    try {
        if (hasSession(ctx)) {
            ctx.session.tokenInfo = tokenInfo;
            return true;
        }
        return false;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4005, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
};

/**
 * 从session中获取路由信息
 * @param {object}ctx is
 * @returns {*} is
 */
module.exports.getToken = (ctx = {}) => {
    // const tokenInfo = (ctx.session || {}).tokenInfo || {};
    // const nowTime = (new Date()).getTime();
    // if (nowTime <= tokenInfo.expires && tokenInfo.token) {
    //     return tokenInfo.token;
    // }
    // return ``;
    const tokenInfo = (ctx.session || {}).tokenInfo || {};
    const nowTime = (new Date()).getTime();
    console.log(nowTime <= (new Date(tokenInfo.tm)).getTime());
    if (tokenInfo.accessToken) {
        return tokenInfo.accessToken;
    }
    return ``;
};


/**
 * 保存cookie到session中
 * @param {object}ctx is
 * @param {object}tokenInfo is
 * @returns {boolean} is
 */
module.exports.setCookie = (ctx = {}, cookie) => {
    try {
        if (hasSession(ctx)) {
            ctx.session.cookie = cookie;
            return true;
        }
        return false;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4006, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
};

/**
 * 从session中获取cookie
 * @param {object}ctx is
 * @returns {*} is
 */
module.exports.getCookie = (ctx = {}) => {
    return (ctx.session || {}).cookie || ``;
};


/**
 * 保存appId到session中
 * @param {object}ctx is
 * @param {object}tokenInfo is
 * @returns {boolean} is
 */
module.exports.setAppId = (ctx = {}, appId) => {
    try {
        if (hasSession(ctx)) {
            ctx.session.appId = appId;
            return true;
        }
        return false;
    } catch (err) {
        // 释放错误
        ctx.app.emit(`error`, { status: 500, code: 4007, message: `${JSON.stringify(err)}` }, ctx);
        return false;
    }
};

/**
 * 从session中获取appId
 * @param {object}ctx is
 * @returns {*} is
 */
module.exports.getAppId = (ctx = {}) => {
    return (ctx.session || {}).appId || ``;
};
