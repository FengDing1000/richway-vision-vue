import RichWayWebUtils from '@rich/richwayweb-utils';
import appConfig from '../app.json';

const _log = RichWayWebUtils.console.log;
// 一级路由的组件
const firstComponent = r => require.ensure([], () => r(require(`../template`)), `pages/water_rain_pages/rain_information/rain_monitor_page`);
const firstUrl = (appConfig.url || ``).substring(1);

export default {
    path: firstUrl,
    // 一级路由
    component: firstComponent,
    meta: appConfig,
    beforeEnter: (to, from, next) => {
        _log(`Will enter ${firstUrl}...`);
        next();
    },
    children: []
};
