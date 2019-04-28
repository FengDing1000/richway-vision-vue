const path = require(`path`);
const RichWayWebUtils = require(`@rich/richwayweb-utils`);
const KoaMenu = require(`@rich/richwayweb-utils/lib/model/appMenu`);
const menuList = KoaMenu.filterMenuList(require(path.join(process.cwd(), _richwayKoaConfig.menu_path)));

function getMenuList() {
    return _richwayKoaInterface.getKoaInterfaceExp({
        success: true,
        data: KoaMenu.filterMenuList(RichWayWebUtils.deepClone(menuList))
    });
}

function getPathFromMenu(menu = {}, url, arr) {
    let info = null;
    if (menu.url === url) {
        arr.push(menu);
        info = menu;
    } else if ((menu.children || []).length) {
        for (const item of (menu.children || [])) {
            info = getPathFromMenu(item, url, arr);
            if (info) {
                arr.splice(arr.length - 1, 0, menu);
            }
        }
    }
    return info;
}

/**
 * 获取当前账号的导航菜单数据
 * @param {object}ctx is
 * @param {object}queryInfo is
 * @return {*} is
 * @constructor
 */
function GetMenuListForUserFun(ctx = {}, queryInfo = {}) {
    return getMenuList(ctx, queryInfo);
}

/**
 * 处理当前账号的导航菜单
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterMenuListForUserResultFun(ctx = {}, resInfo = {}) {
    // 把导航菜单保存到session中
    _richwayKoaSession.setMenuList(ctx, resInfo.data);
    return resInfo;
}

/**
 * 获取当前平台的导航菜单数据
 * @param {object}ctx is
 * @param {object}queryInfo is
 * @return {*} is
 * @constructor
 */
function GetMenuListForAppFun(ctx = {}, queryInfo = {}) {
    return getMenuList(ctx, queryInfo);
}

/**
 * 处理当前平台的导航菜单
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterMenuListForAppResultFun(ctx, resInfo = {}) {
    resInfo = getMenuList(ctx, resInfo);
    return resInfo;
}

/**
 * 获取当前项目中能使用的菜单列表
 * @param {object}ctx is
 * @param {object}queryInfo is
 * @return {*} is
 * @constructor
 */
function GetMenuListForAvailableFun(ctx = {}, queryInfo = {}) {
    return getMenuList(ctx, queryInfo);
}

/**
 * 处理项目中能使用的菜单列表
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterMenuListForAvailableResultFun(ctx, resInfo = {}) {
    resInfo = getMenuList(ctx, resInfo);
    return resInfo;
}

/**
 * 菜单明细，处理参数
 * @param {object}ctx is
 * @returns {{}} is
 */
function FilterMenuInfoParametersFun(ctx = {}) {
    const queryInfo = ctx._queryInfo;
    return queryInfo;
}

/**
 * 获取当前菜单的详细数据
 * @param {object}ctx is
 * @param {object}queryInfo is
 * @return {*} is
 * @constructor
 */
function GetMenuInfoFun(ctx, queryInfo = {}) {
    return _richwayKoaInterface.getKoaInterfaceExp({
        success: true,
        data: KoaMenu.findMenuFromMenuList(queryInfo.url || queryInfo.menuId, menuList)
    });
}

/**
 * 菜单明细，处理结果
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterMenuInfoResultFun(ctx, resInfo = {}) {
    const menuListForUser = _richwayKoaSession.getMenuList(ctx);
    // 获取当前页面在导航菜单里面的路径层级关系
    const queryInfo = ctx._queryInfo;
    const breadCrumbList = [
        {
            menuName: `首页`,
            url: `/`
        }
    ];
    for (const item of menuListForUser) {
        getPathFromMenu(item, queryInfo.url, breadCrumbList);
    }

    const nonAuthorMenuList = [`/error`, `/login`, `/portal`];
    if (menuListForUser.length > 0 || nonAuthorMenuList.includes(queryInfo.url)) {
        resInfo.breadCrumbList = breadCrumbList;
    } else {
        resInfo.success = false;
        resInfo.message = `当前账号没有该页面的权限`;

        _richwayKoaLog.logInfo(`error.............. menuList is null`);
        _richwayKoaLog.logError(resInfo, ctx);
    }
    return resInfo;
}

/**
 * 新增菜单，处理参数
 * @param {object}ctx is
 * @returns {{}} is
 */
function FilterAddMenuParametersFun(ctx = {}) {
    const queryInfo = ctx._queryInfo;
    return new KoaMenu.MenuForCloud(queryInfo);
}

/**
 * 新增菜单，处理结果
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterAddMenuResultFun(ctx, resInfo = {}) {
    resInfo.data = new KoaMenu.MenuByCloud(resInfo.data);
    return resInfo;
}

/**
 * 修改菜单，处理参数
 * @param {object}ctx is
 * @returns {{}} is
 */
function FilterUpdateMenuParametersFun(ctx = {}) {
    const queryInfo = ctx._queryInfo;
    return new KoaMenu.MenuForCloud(queryInfo);
}

/**
 * 修改菜单，处理结果
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterUpdateMenuResultFun(ctx, resInfo = {}) {
    resInfo.data = new KoaMenu.MenuByCloud(resInfo.data);
    return resInfo;
}


/**
 * 获取当前平台的某个角色的导航菜单数据
 * @param {object}ctx is
 * @param {object}queryInfo is
 * @return {*} is
 * @constructor
 */
function GetMenuListForAppAndRoleFun(ctx = {}, queryInfo = {}) {
    return getMenuList();
}

/**
 * 处理当前平台的某个角色的导航菜单
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterMenuListForAppAndRoleResultFun(ctx, resInfo = {}) {
    resInfo = getMenuList();
    return resInfo;
}


module.exports = {
    GetMenuListForUserFun,
    FilterMenuListForUserResultFun,
    GetMenuListForAppFun,
    FilterMenuListForAppResultFun,
    GetMenuListForAvailableFun,
    FilterMenuListForAvailableResultFun,
    FilterMenuInfoParametersFun,
    GetMenuInfoFun,
    FilterMenuInfoResultFun,
    FilterAddMenuParametersFun,
    FilterAddMenuResultFun,
    FilterUpdateMenuParametersFun,
    FilterUpdateMenuResultFun,
    GetMenuListForAppAndRoleFun,
    FilterMenuListForAppAndRoleResultFun
};
