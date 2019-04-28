import RichWayWebUtils from '@rich/richwayweb-utils';
import GetData from '$app/service/getData';
import store from '$app/store';
import menu from '@rich/richwayweb-utils/lib/model/menu';

const { offset } = RichWayWebUtils;
const _log = RichWayWebUtils.console.log;

/**
 * 获取当前页面的url
 * @return {string} is
 */
export const getCurrentPageUrl = () => window.location.pathname;

function getMenuInfo(o = {}) {
    return new Promise((resolve, reject) => {
        GetData.GetMenuInfo({
            url: o.url
            // urlID: getRequest().menuId
            // urlID: o.config.id
        }).then((res = {}) => {
            if (res.success === true || !o.type) {
                const data = res.data || {};
                let config;
                try {
                    config = JSON.parse(`${data.config || ``}`) || undefined;
                } catch (err) {
                    _log(`menuInfo.config to object is err`, err);
                    config = undefined;
                }

                data.config = config;
                const dataMenu = new menu.Menu(data);
                _log(`current menuInfo by interface is`, dataMenu);
                _log(`app.json is`, o.config);

                const menuInfo = new menu.Menu(o.config);
                for (const key in menuInfo) {
                    if (Object.hasOwnProperty.call(menuInfo, key)) {
                        if (key === `config`) {
                            if ((dataMenu[key] || []).length > 0) {
                                menuInfo.config = dataMenu.config;
                            }
                        } else {
                            menuInfo[key] = dataMenu[key] || menuInfo[key];
                        }
                    }
                }

                store.commit(`SET_BREAD_CRUMB_LIST`, res.breadCrumbList || []);
                store.commit(`SET_CURRENT_PAGE_INFO`, {
                    module: menuInfo.module,
                    info: menuInfo
                });
                _log(`current menuInfo is`, menuInfo);
                resolve();
            } else {
                reject(res);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * 获取将要跳转到页面的信息
 * @param {object}o is
 * @return {*} is
 */
export const getPageInfo = (o = {}) => new Promise((resolve, reject) => {
    try {
        const url = (o.url || getCurrentPageUrl()).replace(`/wap`, ``);
        store.commit(`SET_CURRENT_PAGE_INFO`, {
            url,
            loading: true,
            info: {}
        });
        if (url === `/` || url === `/error` || url === `/login` || url === `/portal`) {
            store.commit(`SET_BREAD_CRUMB_LIST`, []);
            store.commit(`SET_CURRENT_PAGE_INFO`, {
                module: url.replace(`/`, ``),
                info: {}
            });
            resolve();
        } else {
            const { source } = window._RNConfig;
            o.url = url;
            if (source === `RN`) {
                store.commit(`SET_CURRENT_PAGE_INFO`, {
                    module: o.config.module,
                    info: new menu.Menu(o.config)
                });
                resolve();
            } else {
                getMenuInfo(o).then(() => {
                    resolve();
                }).catch(() => {
                    reject();
                });
            }
        }
    } catch (err) {
        reject();
    }
});

/**
 * 设置当前页面信息
 * @return {boolean} is
 */
export const setPageInfo = () => {
    store.commit(`SET_CURRENT_PAGE_INFO`, {
        loading: false
    });
    return true;
};

/**
 * 页面跳转
 * @param {object}activeItem is
 * @param {object}router is
 * @return {boolean} is
 */
export const goToPage = (activeItem = {}, router) => {
    const activeUrl = activeItem.openUrl || activeItem.url || ``;
    const activeUrlID = activeItem.openUrlID || activeItem.menuId || ``;
    if (!activeUrl || location.pathname === activeUrl) {
        return false;
    }
    const target = activeItem.target || `_blank`;
    if (target === `_single`) {
        if ((activeUrl || ``).indexOf(`http://`) > -1) {
            window.location.href = activeUrl;
        } else {
            // router.push({ path: activeUrl, query: { menuId: activeUrlID } });
            router.push(activeUrl);
        }
    } else if (target === `_blank`) {
        window.open(`${activeUrl}?menuId=${activeUrlID}`);
    } else {
        let _target = ``;
        if (target === `_self`) {
            _target = window.self;
        } else if (target === `_parent`) {
            _target = window.parent;
        } else if (target === `_top`) {
            _target = window.top;
        } else {
            _target = window;
        }
        _target.location.href = `${activeUrl}?menuId=${activeUrlID}`;
    }
};


export const getMainContentMaxH = () => {
    const mainContentPreOffset = offset(document.getElementById(`mainContentPre`));
    const clientH = document.body.clientHeight;
    let offsetNum = 10 * (window._RichWay.$rem || 1);
    const mapDom = document.getElementsByClassName(`richway-map-container`);
    if (mapDom.length) {
        offsetNum = 0;
    }
    const maxH = clientH - mainContentPreOffset.top - offsetNum;

    return maxH;
};
