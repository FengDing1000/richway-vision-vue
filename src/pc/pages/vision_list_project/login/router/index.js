import RichWayWebUtils from '@rich/richwayweb-utils';
import appConfig from '../app.json';
import store from '$pc/store/index';

const _log = RichWayWebUtils.console.log;
// 一级路由的组件
const firstComponent = r => require.ensure([], () => r(require(`../template`)), `pages/login_page`);
const firstUrl = (appConfig.url || ``).substring(1);

export default {
    // 一级路由
    path: firstUrl,
    component: firstComponent,
    meta: appConfig,
    beforeEnter: (to, from, next) => {
        _log(`Will enter ${firstUrl}...`);
        store.commit(`SET_CURRENT_PAGE_INFO`, {
            module: `login`
        });
        next();
    },
    children: []
};
