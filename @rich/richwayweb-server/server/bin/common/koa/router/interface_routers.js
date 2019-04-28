/**

 @Name：richwayui 项目的接口路由逻辑文件
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const Router = require(`koa-router`);
const Controller = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/controller`));
const KoaInterfaceHandle = require(`@rich/richwayweb-utils/lib/model/interfaceHandle`);
/**
 * 初始化接口路由
 * @param {object}app is
 * @returns {boolean} is
 */
module.exports = app => {
    try {
        const interfaceRouterInfo = require(path.join(process.cwd(), _richwayKoaConfig.interface_router_path));
        // const interfaceRouterInfo = require(path.join(process.cwd(), `server/interface/index.js`));
        const { rewriteContent } = interfaceRouterInfo;
        for (const item of (interfaceRouterInfo.list || [])) {
            const router = new Router({
                prefix: `/api${item.prefix}`
            });

            for (const subItem of (item.list || [])) {
                const routerItem = KoaInterfaceHandle(subItem);

                // 重写cloud里面的url和method
                if (rewriteContent) {
                    const curentRewriteContent = rewriteContent[routerItem.node.fetchName] || {};
                    if (curentRewriteContent.url) {
                        routerItem.data.cloud.url = curentRewriteContent.url;
                    }
                    if (curentRewriteContent.method) {
                        routerItem.data.cloud.method = curentRewriteContent.method;
                    }
                }

                if ((routerItem.data.cloud.url || ``).indexOf(`http`) === -1) {
                    if ((item.baseUrl || ``).indexOf(`http`) > -1) {
                        routerItem.data.cloud.url = `${item.baseUrl}${routerItem.data.cloud.url}`;
                    } else {
                        routerItem.data.cloud.url = `${interfaceRouterInfo.baseUrl}${item.baseUrl || ``}${routerItem.data.cloud.url}`;
                    }
                }
                // 请求路径
                const url = routerItem.node.url || ``;
                // 请求方式
                const method = (routerItem.node.method || `post`).toLocaleLowerCase();
                if (url) {
                    // router[method](url, (ctx, next) => Controller.InterfaceInterceptionFirst(ctx, next, routerItem), (ctx, next) => Controller.InterfaceInterceptionLast(ctx, next, routerItem));
                    router[method](url, async (ctx, next) => {
                        // 添加时间戳，接口开始时间
                        ctx._timeStamp = (new Date()).getTime();
                        const firstData = await Controller.InterfaceInterceptionFirst(ctx, routerItem);
                        if(firstData.success){
                            const lastData = await Controller.InterfaceInterceptionLast(ctx, routerItem);
                            _richwayKoaInterface.setInterfaceResponse(ctx, lastData);
                        } else {
                            _richwayKoaInterface.setInterfaceResponse(ctx, _richwayKoaInterface.getKoaInterfaceExp(firstData));
                        }
                    });
                }
            }
            app.use(router.routes());
        }
    } catch (err) {
        _richwayKoaLog.logError(err);
    }
};
