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
    return {
        success: true,
        data: _richwayKoaSession.getMenuList(ctx)
    };
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
 * 处理当前菜单的参数
 * @param ctx
 * @return {{pageId, url}}
 * @constructor
 */
function FilterMenuInfoParametersFun(ctx) {
    const queryInfo = ctx._queryInfo;

    const menuList = _richwayKoaSession.getMenuList(ctx);
    const { url } = queryInfo;
    let pageId = queryInfo.urlID || queryInfo.menuId || ``;
    if (!pageId) {
        pageId = KoaMenu.findMenuFromMenuList(url, menuList).menuId;
    }

    const info = {
        pageId,
        url
    };
    ctx._queryInfo = info;

    return info;
}

/**
 * 获取当前菜单的详细数据
 * @param {object}ctx is
 * @param {object}queryInfo is
 * @return {*} is
 * @constructor
 */
function GetMenuInfoFun(ctx, queryInfo = {}) {
    const cummentMenuInfo = KoaMenu.findMenuFromMenuList(queryInfo.url || queryInfo.pageId, menuList)
    if (cummentMenuInfo.menuType === `component`) {
        cummentMenuInfo.menuType = `page`;
    }
    return _richwayKoaInterface.getKoaInterfaceExp({
        success: true,
        data: cummentMenuInfo
    });
}

/**
 * 菜单明细，处理结果
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
// function FilterMenuInfoResultFun(ctx, resInfo = {}) {
//     if (resInfo.success === true) {
//         if(resInfo.data === null){
//             resInfo = GetMenuInfoFun(ctx, ctx._queryInfo);
//         } else {
//             try{
//                 resInfo.data = new KoaMenu.MenuByCloud(resInfo.data);
//             } catch(e){
//                 console.log(3333, e);
//             }
//         }
//     }
//     const menuListForUser = _richwayKoaSession.getMenuList(ctx);
//     // 获取当前页面在导航菜单里面的路径层级关系
//     const queryInfo = ctx._queryInfo;
//     const breadCrumbList = [
//         {
//             menuName: `首页`,
//             url: `/`
//         }
//     ];
//     for (const item of menuListForUser) {
//         getPathFromMenu(item, queryInfo.url, breadCrumbList);
//     }
//
//     const nonAuthorMenuList = [`/error`, `/login`, `/portal`];
//     if (menuListForUser.length > 0 || nonAuthorMenuList.includes(queryInfo.url)) {
//         resInfo.breadCrumbList = breadCrumbList;
//     } else {
//         resInfo.success = false;
//         resInfo.message = `当前账号没有该页面的权限`;
//
//         console.log(`error.............. menuList is null`);
//         _richwayKoaLog.logError(resInfo, ctx);
//     }
//     return resInfo;
// }
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
        resInfo.success = true;
    } else {
        resInfo.code = 1003;
        resInfo.success = false;
        resInfo.message = `当前账号没有该页面的权限`;

        console.log(`error.............. menuList is null`);
        _richwayKoaLog.logError(resInfo, ctx);
    }
    resInfo.data = new KoaMenu.MenuByCloud(resInfo.data || {});
    return resInfo;
}

/**
 * 保存菜单，处理参数
 * @param {object}ctx is
 * @returns {{}} is
 */
function FilterSaveMenuParametersFun(ctx = {}) {
    const queryInfo = ctx._queryInfo;
    return new KoaMenu.MenuForCloud(queryInfo || {});
}

/**
 * 保存菜单，处理结果
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterSaveMenuResultFun(ctx, resInfo = {}) {
    resInfo.data = new KoaMenu.MenuByCloud(resInfo.data || {});
    return resInfo;
}


/**
 * 处理当前平台的某个角色的导航菜单
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterMenuListForAppResultFun(ctx, resInfo = {}){
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: KoaMenu.filterMenuList(RichWayWebUtils.deepClone(resInfo.children || []), ``, true)
    };
}


module.exports = {
    GetMenuListForUserFun,
    GetMenuListForAvailableFun,
    FilterMenuListForAvailableResultFun,
    FilterMenuInfoParametersFun,
    GetMenuInfoFun,
    FilterMenuInfoResultFun,
    FilterSaveMenuParametersFun,
    FilterSaveMenuResultFun,
    FilterMenuListForAppResultFun
};
