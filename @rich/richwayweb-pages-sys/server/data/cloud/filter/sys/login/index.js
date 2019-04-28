const path = require(`path`);
const RichWayWebUtils = require(`@rich/richwayweb-utils`);
const KoaMenu = require(`@rich/richwayweb-utils/lib/model/appMenu`);
const menuList = KoaMenu.filterMenuList(require(path.join(process.cwd(), _richwayKoaConfig.menu_path)));
const { SendHttpRequest } = require(`@rich/richwayweb-server/server/bin/common/controller`);

/**
 * 登录参数处理
 * @param {object}ctx is
 * @return {{}} is
 */
function FilterLoginParametersFun(ctx, info, config = {}) {
    const queryInfo = ctx._queryInfo;
    queryInfo.passWord = RichWayWebUtils.compile.uncompile(queryInfo.passWord);
    _richwayKoaSession.setUserInfo(ctx, {
        userAccount: queryInfo.userName
    });

    if ((config.data.cloud.url || ``).indexOf(`http://testsh.rtongcloud.com:6688/shzh`) > -1) {
        return {
            userId: queryInfo.userName,
            password: queryInfo.passWord
        };
    } else {
        return {
            loginName: RichWayWebUtils.md5.encode64(queryInfo.userName),
            loginPassWord: (RichWayWebUtils.md5.encryption(queryInfo.passWord) || ``).toUpperCase()
        };
    }
}

/**
 * 登录结果处理
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
async function FilterLoginResultFun(ctx = {}, resInfo = {}, config = {}) {
    const queryInfo = ctx._queryInfo;

    if ((config.data.cloud.url || ``).indexOf(`http://testsh.rtongcloud.com:6688/shzh`) > -1) {
        const { data } = resInfo;
        resInfo.data = {
            token: {
                accessToken: data.token
            },
            appId: _richwayKoaConfig.appId,
            userAccount: queryInfo.userName
        };
    }

    if (resInfo.success === true) {
        // 把当前的登录信息的token保存到session
        _richwayKoaSession.setToken(ctx, resInfo.data.token);
        _richwayKoaSession.setAppId(ctx, resInfo.data.appId || resInfo.data['appId ']);
        // 保存用户信息到session中
        _richwayKoaSession.setUserInfo(ctx, resInfo.data);

        // 获取当前账号的菜单数据，并把导航菜单保存到session中
        let currentMenuList = menuList;
        if (_richwayKoaConfig.menuSource === `cloud`) {
            ctx._queryInfo.appId = _richwayKoaSession.getAppId(ctx);
            const response = await SendHttpRequest(ctx, {
                url: `${_richwayKoaConfig.InterfaceHost}/base/api/app/userMenu/{appId}`,
                method: `get`,
                accessToken: true
            });

            const bodyInfo = response.body || {};
            currentMenuList = bodyInfo.data || [];
            if (!(response.body.success === true && currentMenuList.length)) {
                return {
                    success: false,
                    message: `当前账号没有可用菜单，请联系管理员进行账号授权。`
                };
            }
        }
        _richwayKoaSession.setMenuList(ctx, KoaMenu.filterMenuList(RichWayWebUtils.deepClone(currentMenuList)));
    } else {
        resInfo.message = resInfo.message || `当前用户不存在或者密码错误!`;
    }

    global._richwayKoaSocket.KoaSocket_online(ctx);

    return resInfo;
}


/**
 * 登出
 * @param {object}ctx is
 * @returns {boolean} is
 */
function FilterSignOutResultFun(ctx = {}) {
    // 把当前session里面关于用户信息的数据清空
    _richwayKoaSession.setUserInfo(ctx);
    _richwayKoaSession.setMenuList(ctx);
    _richwayKoaSession.setToken(ctx);
    _richwayKoaSession.setAppId(ctx);

    global._richwayKoaSocket.KoaSocket_online(ctx);

    return {
        code: 1000,
        success: true,
        message: `注销成功`
    };
}

module.exports = {
    FilterLoginParametersFun,
    FilterLoginResultFun,
    FilterSignOutResultFun
};
