/**

 @Name：richwayui 项目的压缩设置
 @Author：g.zhou
 @License：MIT

 */

const KoaCompress = require(`koa-compress`);

module.exports = app => {
    try {
        app.use(KoaCompress());

        _richwayKoaLog.logInfo(`Gzip module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Gzip module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
