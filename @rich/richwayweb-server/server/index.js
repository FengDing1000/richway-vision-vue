/**

 @Name：richwayui 项目的启动文件
 @Author：g.zhou
 @License：MIT

 */


const path = require(`path`);
const configInfo = require(`./../config`);

function start(config = {}) {
    // 加载全局的配置文件config
    global._richwayKoaConfig = Object.assign({}, configInfo, config);
    global._richwayKoaConfig.rootDirServer = __dirname;

    // 全局变量,日志相关方法
    global._richwayKoaLog = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/models/koa.log`))();

    if (_richwayKoaConfig.env === `production`) {
        _richwayKoaConfig.ServiceHost = ``;
        _richwayKoaConfig.SocketHost = ``;
    }

    // 启动cluster服务 集群服务
    require(path.join(__dirname, `bin/common/cluster/index`)).init();
}

module.exports = {
    start
};
