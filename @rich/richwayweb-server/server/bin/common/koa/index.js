const Koa = require(`koa`);

const KoaGzip = require(`./gzip`);
const KoaCache = require(`./cache`);

const KoaStatic = require(`./static`);
const KoaBody = require(`./body`);
const KoaCors = require(`./cors`);
const KoaSession = require(`./session`);
const KoaDomain = require(`./domain`);
const KoaRouter = require(`./router`);
const KoaLog = require(`./log`);
const KoaError = require(`./error`);
const KoaSocket = require(`./socket`);

module.exports = () => {
    let app = new Koa();

    // 开启gzip
    KoaGzip(app);

    // 设置缓存静态资源
    KoaCache(app);

    // 提交表单数据
    KoaBody(app);

    // 设置静态资源文件
    KoaStatic(app);

    // 设置cors
    KoaCors(app);

    // 设置session
    KoaSession(app);

    // 设置路由
    KoaRouter(app);

    // 设置日志
    KoaLog(app);

    // 监听错误
    KoaError(app);

    // socket
    KoaSocket(app);

    // 给ctx第一时间添加时间戳
    app.use(async (ctx, next) => {
        // 响应开始时间
        ctx._timeStamp = (new Date()).getTime();
        await next();
    });

    // 监听端口
    KoaDomain(app);

    return app;
};
