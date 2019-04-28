const moment = require(`moment`);
const guid = require(`./../butils/guid`);

/**
 * 传递给cloud的菜单类
 */
class MenuForCloud {
    constructor(info = {}) {
        this.appId = info.appId || ``;
        this.pageId = info.menuId || ``;
        this.pageNm = info.menuName || ``;
        this.pageType = info.menuType || ``;
        this.parentId = info.parentId || ``;
        this.sortId = info.sort || ``;
        this.target = info.target || ``;
        this.url = info.url || ``;
        this.menuLogo = info.icon || ``;
        this.layoutId = info.layoutId || ``;
        this.cmptId = info.componentId || ``;
        this.children = info.children || [];
        this.config = info.config || ``;
        this.converMarks = info.converMarks || ``;
        this.crtDt = info.crtDt || ``;
        this.nt = info.rootNode || ``;
        this.visible = info.visible || ``;
        this.updDt = info.updDt || moment().format(`YYYY-MM-DD HH:mm:ss`);
    }
}

function getOpenUrl(index = 0, list = []) {
    const item = list[index] || {};
    const url = item.url || item.openUrl;
    const urlID = item.menuId || item.openUrlID;
    if (!url && (item.children || []).length) {
        return getOpenUrl(item.open, item.children);
    }
    return {
        url, urlID
    };
}

/**
 * 把从cloud过来的菜单类转换成web端使用的菜单类
 */
class MenuByCloud {
    constructor(info = {}) {
        this.appId = info.appId || ``;
        this.menuId = info.pageId || info.id || info.menuId || ``;
        this.menuName = info.pageNm || info.text || info.menuName || ``;
        this.menuType = info.pageType || info.menuType || ``;
        this.parentId = info.parentId || info.pid || ``;
        this.parentList = info.parentList || [];
        this.layoutId = info.layoutId || ``;
        this.componentId = info.cmptId || info.componentId || ``;
        this.sort = info.sortId || info.sort || 999;
        this.target = info.target || `_blank`;
        this.icon = info.menuLogo || info.icon || `icon-network`;
        this.url = this.menuType === `page` || this.menuType === `component` ? info.url : ``;
        this.children = info.children || [];

        if (this.menuType === `page` || this.menuType === `component`) {
            this.openUrl = info.openUrl || this.url || ``;
            this.openUrlID = info.openUrlID || this.menuId || ``;
        } else {
            const o = getOpenUrl(info.open, this.children);
            this.openUrl = info.openUrl || o.url;
            this.openUrlID = info.openUrlID || o.urlID;
        }

        this.visible = info.visible || 1;
        this.rootNode = info.nt || info.rootNode || -1;
        this.config = info.config || ``;
        this.module = info.module || ``;
        this.mustLogin = info.mustLogin || false;
    }
}

// class Menu {
//     constructor(info) {
//         this.id = info.id || guid();
//         this.code = info.code;
//         this.title = info.title;
//         this.url = info.type === `page` ? info.url : ``;
//         this.icon = info.icon || `icon-network`;
//         this.target = info.target || `_blank`;
//         this.sort = info.sort || 999;
//         this.children = info.children || [];
//     }
// }

class MenuForFile {
    constructor(info = {}) {
        this.pageId = info.id || guid();
        this.pageNm = info.title;
        this.pageType = info.type || `page`;
        this.url = info.type === `page` || info.type === `component` ? info.url : ``;
        this.menuLogo = info.icon || `icon-network`;
        this.target = info.target || `_blank`;
        this.sortId = info.sort || 999;
        this.children = info.children || [];
        this.module = info.module || ``;
        this.mustLogin = info.mustLogin || false;
        this.open = info.open;
        this.openUrl = info.openUrl;
        this.openUrlID = info.openUrlID;
        this.layoutId = info.layoutId || ``;
        this.config = JSON.stringify(info.config || ``);
        this.visible = info.navigation === true ? 1 : 2;
        this.describe = info.describe || ``;
        this.componentName = info.componentName || ``;
    }
}

/**
 * 通过id从菜单列表中查询对应的菜单信息
 * @param {string}id is
 * @param {array}list is
 * @return {*} is
 */
function findMenuFromMenuList(id = ``, list = []) {
    try {
        let menu = null;
        for (const item of list) {
            if (item.url === id || item.pageId === id || item.menuId === id) {
                menu = item;
                break;
            } else if ((item.children || []).length) {
                menu = findMenuFromMenuList(id, item.children);
                if (menu.menuId) {
                    break;
                }
            }
        }
        return menu || {};
    } catch (err) {
        console.log(err);
    }
}

/**
 * 过滤菜单列表
 * @param {Array}list is
 * @param {String} parentId is
 * @param {Boolean} bl is
 * @return {Array} is
 */
function filterMenuList(list = [], parentId, bl = false) {
    try {
        let arr = [];
        for (const item of list) {
            const newItem = new MenuByCloud(item);
            if (parentId) {
                newItem.parentId = parentId;
                newItem.parentList.push(parentId);
            }
            if (`${newItem.visible}` === `1` || bl) {
                arr.push(newItem);
            }

            if ((newItem.children || []).length === 0) {
                delete newItem.children;
            } else {
                if (parentId) {
                    for (const subItem of item.children) {
                        subItem.parentId = parentId;
                        if (!subItem.parentList) {
                            subItem.parentList = [];
                        }
                        subItem.parentList.push(parentId);
                    }
                }
                newItem.children = filterMenuList(item.children, newItem.menuId, bl);
            }
        }
        arr = arr.sort((a, b) => a.sort > b.sort);
        return arr;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    MenuForCloud,
    MenuByCloud,
    MenuForFile,
    findMenuFromMenuList,
    filterMenuList
};
