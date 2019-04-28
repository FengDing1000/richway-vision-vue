/**

 @Name：vur-router 路由的入口文件
 @Author：g.zhou
 @License：MIT

 */
import RichWayWebUtils from '@rich/richwayweb-utils';
import { getPageInfo, setPageInfo } from '../utils/pageInfo';
import _base from '../../constants/base';
import guard from './guard';
import components from '../components';
import componentsExp from '$pc/components';
import store from '$pc/store';
import routers from '$pc/router/routes';

const Vue = require(`vue`);
const VueRouter = require(`vue-router`);
const { Error } = components;
const _log = RichWayWebUtils.console.log;

// 获取当前页面的布局组件
function getLayoutId() {
    const layoutId = (((store.state || {}).currentPageInfo || {}).info || {}).layoutId || `Layout-Base`;
    return components[layoutId] || componentsExp[layoutId];
}

function getRoutes(config) {
    // 地址为空时跳转portal页面
    routers.unshift({
        path: ``,
        // redirect: `/portal`
        redirect: window._RichWay.$base.path.portalHost || `/portal`
    });
    // 迷失页面
    routers.push({
        path: `*`,
        component: Error
    });
    return [
        {
            // 顶层路由，对应index.html
            path: `/`,
            component: getLayoutId(),
            meta: config,
            beforeEnter: (to, from, next) => {
                _log(`Will enter layout...`);
                store.commit(`SET_SETTING_INFO`, {
                    title: config.title,
                    logo: config.logo
                });
                store.commit(`SET_REM`, window._RichWay.$rem || 1);
                // 获取账号信息及相关权限
                guard.getUserAuthor(to, from, next);
            },
            children: routers
        }
    ];
}

// 初始化页面路由
export default (config = {}) => {
    // 注册vue-router组件
    Vue.use(VueRouter);

    const routerExp = new VueRouter({
        routes: getRoutes(config),
        base: `/`,
        mode: _base._routerMode,
        strict: _base.envDev,
        scrollBehavior(to, from, savedPosition) {
            _log(`---------`);
            _log(`form:${to.path}`);
            _log(`to:${to.path}`);
            _log(`---------`);

            if (savedPosition) {
                return savedPosition;
            }
            return {
                x: 0,
                y: 0
            };
        }
    });

    // 全局前置守卫
    routerExp.beforeEach((to, from, next) => {
        _log(`********************************************************`);
        _log(to, from);
        _log(`router beforeEach... to.path is ${to.path}, from.path is ${from.path}`);
        if (to.meta.url) {
            document.title = to.meta.title;
            getPageInfo({
                type: `beforeEach`,
                url: to.path,
                config: to.meta
            }).then(() => {
                next();
            }).catch(err => {
                guard.goToErrorPage(next, err);
            });
        } else {
            next();
        }
    });

    // 全局解析守卫
    routerExp.beforeResolve((to, from, next) => {
        _log(`router beforeResolve... to.path is ${to.path}, from.path is ${from.path}`);
        next();
    });

    // 全局后置钩子
    routerExp.afterEach((to, from) => {
        _log(`router afterEach... to.path is ${to.path}, from.path is ${from.path}`);
        setPageInfo();
    });

    return routerExp;
};
