import RichWayWebUtils from '@rich/richwayweb-utils';
import appConfig from '../app.json';

const _log = RichWayWebUtils.console.log;
// 一级路由的组件1
const firstComponent = r => require.ensure([], () => r(require(`../template`)), `pages/realtime_monitoring_page`);

const firstUrl = (appConfig.url || ``).substring(1);
export default {
    // 一级路由
    path: firstUrl,
    component: firstComponent,
    meta: appConfig,
    beforeEnter: (to, from, next) => {
        _log(`Will enter ${firstUrl}...`);
        next();
    },
    children: []
};
