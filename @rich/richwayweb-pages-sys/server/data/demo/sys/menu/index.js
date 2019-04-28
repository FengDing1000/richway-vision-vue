const path = require(`path`);
const RichWayWebUtils = require(`@rich/richwayweb-utils`);
const KoaMenu = require(`@rich/richwayweb-utils/lib/model/appMenu`);
const menuList = KoaMenu.filterMenuList(require(path.join(process.cwd(), _richwayKoaConfig.menu_path)));
/**
 * 获取当前账号的导航菜单列表
 * @param {object}ctx is
 * @return {*} is
 * @constructor
 */
function GetMenuListForUser() {
    const arr = JSON.parse(JSON.stringify(menuList));
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: arr.filter(item => item.visible === 1)
    };
}

/**
 * 获取当前平台的导航菜单列表
 * @param {object}ctx is
 * @return {*} is
 * @constructor
 */
function GetMenuListForApp() {
    const arr = JSON.parse(JSON.stringify(menuList));
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        children: arr
    };
}

/**
 * 获取导航菜单的详细信息
 * @param {object} ctx is
 * @return {*} is
 * @constructor
 */
function GetMenuInfo(ctx = {}) {
    const queryInfo = ctx._queryInfo;
    const cummentMenuInfo = KoaMenu.findMenuFromMenuList(queryInfo.url || queryInfo.menuId, menuList);
    if (cummentMenuInfo.menuType === `component`) {
        cummentMenuInfo.menuType = `page`;
    }
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: cummentMenuInfo
    };
}

/**
 * 保存菜单项
 * @param {object}ctx is
 * @return {{success: boolean, code: string, message: string, pages: number, total: number, stackTrace: null, data: null}} is
 * @constructor
 */
function SaveMenu(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.config = RichWayWebUtils.compile.uncompile(queryInfo.config);
    const menu = KoaMenu.findMenuFromMenuList(queryInfo.menuId, menuList);
    Object.assign(menu, queryInfo);
    return {
        success: true,
        code: `1000`,
        message: `保存成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

/**
 * 删除菜单项
 * @return {{success: boolean, code: string, message: string, pages: number, total: number, stackTrace: null, data: null}} is
 * @constructor
 */
function DeleteMenu() {
    return {
        success: true,
        code: `1000`,
        message: `删除成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

function GetMenuListForAppAndRole() {
    const arr = JSON.parse(JSON.stringify(menuList));
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: arr
    };
}

function SaveMenuListForAppAndRole() {
    return {
        success: true,
        code: `1000`,
        message: `保存成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

module.exports = {
    GetMenuListForUser,
    GetMenuListForApp,
    GetMenuInfo,
    SaveMenu,
    DeleteMenu,
    GetMenuListForAppAndRole,
    SaveMenuListForAppAndRole
};
