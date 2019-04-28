/**

 @Name：richwayui 项目的端口监听以及协议设置
 @Author：g.zhou
 @License：MIT

 */

const domain = require(`domain`);

module.exports = app => {
    try {
        const serviceDomain = domain.create();
        serviceDomain.on(`error`, err => {
            _richwayKoaLog.logError(err);
        });
        serviceDomain.run(() => {
            const portArgv = parseInt(process.argv[2], 10);
            const port = portArgv || process.env.PORT || _richwayKoaConfig.port;
            if (_richwayKoaConfig.protocol === `https`) {
                // const fs = require('fs');
                // const path = require('path');
                // const https = require('https');
                // //根据项目的路径导入生成的证书文件
                // const currentCompanyCode = (_richwayKoaConfig.companyCode || "").toLowerCase();
                // const privateKey = fs.readFileSync(path.join(__dirname, `${_richwayKoaConfig.root_dir}/bin/data/${currentCompanyCode}/certificate/private.pem`), 'utf8');
                // const certificate = fs.readFileSync(path.join(__dirname, `${_richwayKoaConfig.root_dir}/bin/data/${currentCompanyCode}/certificate/file.crt`), 'utf8');
                // const credentials = {key: privateKey, cert: certificate};
                // const httpsServer = https.createServer(credentials, app);
                // //创建https服务器
                // httpsServer.listen(port, function () {
                //     _richwayKoaLog.logInfo(`Server started, listen port ${_richwayKoaConfig[_richwayKoaConfig.env].server_host}`);
                // });
            } else {
                app.listen(port);
                // app.setTimeout(_richwayKoaConfig.timeout);
                _richwayKoaLog.logInfo(`Server started, listen port ${_richwayKoaConfig[_richwayKoaConfig.env].server_host}`);
            }
        });
    } catch (err) {
        _richwayKoaLog.logErr(`Server started failed`);
        _richwayKoaLog.logError(err);
    }
};
