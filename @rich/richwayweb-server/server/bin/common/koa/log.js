/**

 @Name：richwayui 项目的日志功能
 @Author：g.zhou
 @License：MIT

 */

const KoaLogger = require(`koa-logger`);

module.exports = app => {
    try {
        app.use(KoaLogger());
        // 日志功能
        app.use(async (ctx, next) => {
            try {
                // 开始进入到下一个中间件
                await next();
                ctx._consumeTime = (new Date()).getTime() - ctx._timeStamp;
                // 记录响应日志
                _richwayKoaLog.logResponse(ctx);
            } catch (err) {
                ctx._consumeTime = (new Date()).getTime() - ctx._timeStamp;
                // 记录异常日志
                _richwayKoaLog.logError(err, ctx);
            }
        });

        _richwayKoaLog.logInfo(`Logger module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Logger module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
