/**

 @Name：richwayui 项目的错误监听
 @Author：g.zhou
 @License：MIT

 */

const KoaOnError = require(`koa-onerror`);

module.exports = app => {
    try {
        KoaOnError(app);
        app.on(`error`, (err = {}, ctx = {}) => {
            console.error(`server error`, err);
            _richwayKoaLog.logError(err, ctx);
            ctx.redirect(`/error`);
        });

        _richwayKoaLog.logInfo(`Error module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Erroe module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
