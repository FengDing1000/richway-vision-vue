class Menu {
    constructor(info = {}) {
        this.appId = info.appId || ``;
        this.menuId = info.menuId || ``;
        this.menuName = info.menuName || ``;
        this.menuType = info.menuType || ``;
        if (this.menuType === `component`) {
            this.menuType = `page`;
        }
        this.parentId = info.parentId || ``;
        this.parentList = info.parentList || [];
        this.layoutId = info.layoutId || ``;
        this.componentId = info.componentId || ``;
        this.sort = info.sort || 999;
        this.target = info.target || `_blank`;
        this.icon = info.icon || `icon-network`;
        this.url = this.menuType === `page` ? info.url : ``;
        this.children = info.children || [];
        if (!this.url && info.open !== null && info.open !== undefined) {
            this.openUrl = (this.children[info.open] || {}).url || ``;
        }
        this.visible = info.visible || 1;
        this.rootNode = info.rootNode || -1;
        this.config = info.config || [];
        this.module = info.module || ``;
        this.mustLogin = info.mustLogin || false;
    }
}

const menuTypeList = [
    {
        code: `page`,
        name: `页面`
    },
    {
        code: `url`,
        name: `链接`
    },
    {
        code: `label`,
        name: `菜单`
    }
];

/**
 * 通过pageId从菜单列表中查询对应的菜单信息
 * @param {string}menuId is
 * @param {array}list is
 * @return {*} is
 */
function findMenuFromMenuList(menuId = ``, list = []) {
    try {
        let menu = null;
        for (const item of list) {
            if (item.menuId === menuId) {
                menu = item;
                break;
            } else if ((item.children || []).length) {
                menu = findMenuFromMenuList(menuId, item.children);
                if (menu.menuId) {
                    break;
                }
            }
        }
        return menu || {};
    } catch (err) {
        console.log(`findMenuFromMenuList`, err);
    }
}

function getFirstMenu(menuId = ``, menuList = []) {
    let firstMenu = {};
    if (menuId && menuList.length) {
        for (const item of menuList) {
            if (menuId === item.menuId) {
                firstMenu = item;
                break;
            } else if ((item.children || []).length) {
                for (const subItem of item.children) {
                    if (menuId === subItem.menuId) {
                        firstMenu = item;
                        break;
                    } else if ((subItem.children || []).length) {
                        for (const o of subItem.children) {
                            if (menuId === o.menuId) {
                                firstMenu = item;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    return firstMenu;
}

export default {
    Menu,
    menuTypeList,
    findMenuFromMenuList,
    getFirstMenu
};
