/**

 @Name：richwayui 项目的路由启动文件
 @Author：g.zhou
 @License：MIT

 */

module.exports = app => {
    try {
        // 执行接口路由
        require(`./interface_routers`)(app);

        // 执行页面路由
        require(`./service_routers`)(app);

        _richwayKoaLog.logInfo(`Routing module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logInfo(`Routing module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
