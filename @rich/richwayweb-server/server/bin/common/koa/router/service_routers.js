/**

 @Name：richwayui 项目的页面路由逻辑文件
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const fs = require(`fs`);
const Router = require(`koa-router`);
const routerIntercept = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/koa/router/router_intercept`));
const routerDownLoad = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/koa/router/downLoad`));

/**
 * 通过path获取对应路由的数据
 * @param {object}o is
 * @return {*} is
 */
function getRouterInfo(o = {}) {
    let info = null;
    try {
        const serviceRoutersPcData = require(path.join(process.cwd(), _richwayKoaConfig.service_router_pc_path));
        const serviceRoutersWapData = require(path.join(process.cwd(), _richwayKoaConfig.service_router_wap_path));
        const serviceRouters = [].concat(serviceRoutersPcData.pages, serviceRoutersWapData.pages);
        for (const item of (serviceRouters || [])) {
            const { method, url, filename, platform } = item;
            if (o.path.indexOf(url) === 0 && (method || ``).toUpperCase() === (o.method || ``).toUpperCase()) {
                info = {
                    method,
                    url,
                    filePath: path.join(process.cwd(), `${_richwayKoaConfig.rootDirClientAssets}`, platform, filename),
                    mustLogin: item.mustLogin || false
                };
                break;
            }
        }
    } catch (err) {
        _richwayKoaLog.logError(err);
    }
    return info;
}

module.exports = app => {
    try {
        const router = new Router();
        // 针对没有注册过的url，则重定向到首页
        router.all(`/*`, async (ctx = {}) => {
            try {
                const {
                    path,
                    method
                } = ctx.request;
                _richwayKoaLog.logInfo(`=======================Page loading...to ${path}`);

                // 下载文件
                if (path === `/downLoad`) {
                    await routerDownLoad(ctx);
                    return false;
                } else {
                    const routerItem = getRouterInfo({
                        path,
                        method
                    });
                    _richwayKoaLog.logInfo(`current router is ${JSON.stringify(routerItem)}`);
                    _richwayKoaSession.setRouterInfo(ctx, routerItem);

                    // 页面路由的拦截
                    if (routerIntercept(ctx, routerItem)) {
                        ctx.response.type = `html`;
                        ctx.response.body = fs.createReadStream(routerItem.filePath);
                        return false;
                    }
                }
            } catch (err) {
                // 释放错误
                ctx.app.emit(`error`, { status: 500, code: 4007, message: `${JSON.stringify(err)}` }, ctx);
                _richwayKoaLog.logError(err);
            }
            return false;
        });

        app.use(router.routes());
    } catch (err) {
        _richwayKoaLog.logError(err);
    }
};
