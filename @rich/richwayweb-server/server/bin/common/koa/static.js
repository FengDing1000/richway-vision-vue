/**

 @Name：richwayui 项目的静态资源设置
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const KoaStatic = require(`koa-static`);

module.exports = app => {
    try {
        app.use(KoaStatic(path.join(process.cwd(), _richwayKoaConfig.rootDirClientAssets)));

        _richwayKoaLog.logInfo(`Static module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Static module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
