import RichWayWebUtils from '@rich/richwayweb-utils';
import GetData from '$pc/service/getData';
import store from '$pc/store';

const { compile } = RichWayWebUtils.compile;
const _log = RichWayWebUtils.console.log;

/**
 * 跳转到无权限页面
 * @param {object}next is
 * @param {object} opt is
 * @return {boolean} is
 */
function goToErrorPage(next, opt = {}) {
    next({
        path: `/error`,
        query: { q: compile(JSON.stringify(opt)) }
    });
    return true;
}

function filterUrl(to) {
    return to.path.includes(`/login`) || to.path.includes(`/error`) || to.path === `/` || false;
}

/**
 * 获取用户信息，同时判断权限
 * @param {object}to is
 * @param {object}from is
 * @param {object}next is
 * @return {boolean} is
 */
function getUserAuthor(to, from, next) {
    const config = to.meta || {};
    if (filterUrl(to)) {
        next();
    } else {
        Promise.all([GetData.GetUser(), GetData.GetMenuListForUser()]).then(values => {
            const [userInfo, menuList] = values;
            _log(`userInfo`, userInfo);
            _log(`menuList`, menuList);
            // 把用户保存到全局的状态管理器里面
            store.commit(`SET_USER_INFO`, userInfo.data || {});
            store.commit(`SET_SETTING_INFO`, (userInfo.data || {}).layoutInfo);
            store.commit(`SET_MENU_LIST`, menuList.data || []);

            // 根据用户信息获取当前账号的边界编码
            window._RichWay.$map.currentRegionInfo = {
                code: userInfo.data.adcd,
                name: userInfo.data.adnm
            };

            next();
        }).catch((err = {}) => {
            // 如果噶页面必须要登录，同时获取用户信息失败，则跳转到错误页面
            if (config.mustLogin === true) {
                goToErrorPage(next, {
                    code: `8002`,
                    message: err.message || `获取用户信息失败`
                });
            } else {
                next();
            }
        });
    }
    return true;
}


export default {
    goToErrorPage,
    getUserAuthor
};
