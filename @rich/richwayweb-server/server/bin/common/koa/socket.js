/**

 @Name：richwayui 项目的web socket配置文件
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const KoaSocket = require(`koa-socket`);
const Controller = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/controller`));
const SocketHandleUrl = path.join(process.cwd(), _richwayKoaConfig.socketHandle);
global._richwayKoaSocket = {
    KoaSocket_online: ()=>{}
};

function judgeShortPath(url) {
    return (url || ``).indexOf(`node_modules`) === -1 && (url || ``).indexOf(`server`) === -1;
}

module.exports = app => {
    try {
        if (_richwayKoaConfig.webSocket) {
            const koaSocket = new KoaSocket();

            koaSocket.on(`connection`, () => { // 连接成功
                _richwayKoaLog.logInfo(`successfully connect to socket`);
            });

            const socketRouterInfo = require(path.join(process.cwd(), _richwayKoaConfig.socket_router_path));
            // const socketRouterInfo = require(path.join(process.cwd(), `server/socket/index.js`));
            const { rewriteContent } = socketRouterInfo;

            for (const item of (socketRouterInfo.list || [])) {
                for (const subItem of (item.list || [])) {
                    subItem.type = `socket`;
                    subItem.data.cloud = subItem.data.socket;

                    if (subItem.data.cloud) {
                        // 重写socket里面的url和method
                        if (rewriteContent) {
                            const curentRewriteContent = rewriteContent[subItem.node.url] || {};
                            if (curentRewriteContent.url) {
                                subItem.data.cloud.url = curentRewriteContent.url;
                            }
                            if (curentRewriteContent.method) {
                                subItem.data.cloud.method = curentRewriteContent.method;
                            }
                        }

                        if ((subItem.data.cloud.url || ``).indexOf(`http`) === -1) {
                            if ((item.baseUrl || ``).indexOf(`http`) > -1) {
                                subItem.data.cloud.url = `${item.baseUrl}${subItem.data.cloud.url}`;
                            } else {
                                subItem.data.cloud.url = `${socketRouterInfo.baseUrl}${item.baseUrl || ``}${subItem.data.cloud.url}`;
                            }
                        }
                    }

                    const methosName = `KoaSocket_${subItem.node.url}`;
                    global._richwayKoaSocket[methosName] = async (ctx, data) => {
                        let resInfo = null;
                        if (subItem.data.url && subItem.data.handler) {
                            const url = judgeShortPath(subItem.data.url) ? path.join(SocketHandleUrl, subItem.data.url) : subItem.data.url;
                            const handler = subItem.data.handler;
                            resInfo = await require(url)[handler](ctx, data);
                        } else {
                            resInfo = await Controller.InterfaceInterceptionLast(ctx, subItem);
                        }

                        koaSocket.broadcast(subItem.node.url, resInfo);
                    }

                    koaSocket.on(subItem.node.url, async (ctx, data) => {
                        ctx._socketData = data;
                        ctx._sessionID = ((((ctx.socket || {}).socket || {}).handshake || {}).headers || {}).cookie;
                        global._richwayKoaSocket[methosName](ctx, data);
                    });
                }
            }

            koaSocket.attach(app);
        }

        _richwayKoaLog.logInfo(`Socket module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Socket module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
