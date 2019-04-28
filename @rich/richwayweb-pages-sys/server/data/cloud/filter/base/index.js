const fs = require(`fs`);
const path = require(`path`);
const { SendHttpRequest } = require(`@rich/richwayweb-server/server/bin/common/controller`);

const getUserOrigin = (ctx) => {
    const { req } = ctx;
    return req.headers.origin || ``;
}

function GetBaseConfigFun(ctx) {
    const queryInfo = ctx._queryInfo;
    const service_router_path = queryInfo.platformType === `pc` ? _richwayKoaConfig.service_router_pc_path : _richwayKoaConfig.service_router_wap_path;
    const ServiceRouter = require(path.join(process.cwd(), service_router_path));

    const origin = getUserOrigin(ctx);
    let reportServiceHost = _richwayKoaConfig.ReportServiceHost;
    let imageServiceHost = _richwayKoaConfig.ImageServiceHost;
    let interfaceServiceHost = _richwayKoaConfig.InterfaceHost;

    if (origin !== _richwayKoaConfig.hostDomain && _richwayKoaConfig.env === `production`) {
        const proxyInfo = _richwayKoaConfig.proxy || {};
        reportServiceHost = proxyInfo.ReportServiceHost || ``;
        imageServiceHost = proxyInfo.ImageServiceHost || ``;
        interfaceServiceHost = proxyInfo.InterfaceHost || ``;
    }

    return {
        success: true,
        data: {
            config: {
                timeout: _richwayKoaConfig.timeout,
                env: _richwayKoaConfig.env,
                envPro: _richwayKoaConfig.env === `production`,
                envDev: _richwayKoaConfig.env !== `production`,
                parameterEncryption: _richwayKoaConfig.parameterEncryption,
                layoutId: (ServiceRouter.pages || [])[0].layoutId || `Layout-Base`,
                logo: (ServiceRouter.pages || [])[0].logo || `/images/logo.png`,
                title: (ServiceRouter.pages || [])[0].title || ``,
                accessToken: _richwayKoaSession.getToken(ctx),
                appId: _richwayKoaSession.getAppId(ctx),
                webSocket: _richwayKoaConfig.webSocket || false
            },
            path: {
                // downloadServiceHost: _richwayKoaConfig.DownloadFileHost,
                // uploadServiceHost: _richwayKoaConfig.UploadFileHost,
                reportServiceHost,
                imageServiceHost,
                interfaceServiceHost,
                webSocketUrl: _richwayKoaConfig.SocketHost,
                nodeServiceHost: _richwayKoaConfig.ServiceHost,
                nodeStaticResourcesHost: _richwayKoaConfig.ServiceHost + `/assets`,
                portalHost: _richwayKoaConfig.portalHost
            }
        }
    };
}

async function UpLoadFileFun(ctx, queryInfo) {
    let filePath = ((ctx.request.files || {}).file).path || ``;
    filePath = (filePath || ``).substring(filePath.lastIndexOf(`\\`) + 1);
    queryInfo.file = fs.createReadStream(path.join(process.cwd(), `server/public/upload/${filePath}`))
    const url = queryInfo.url || `/base/api/fileupload/upload`;
    const response = await SendHttpRequest(ctx, {
        url: `${_richwayKoaConfig.UploadFileHost}${url}`,
        method: `post`,
        postType: `formData`,
        accessToken: true
    }, queryInfo);
    return response.body;
}

function GetGetRegionDataFun(ctx) {

}

async function GetGeographicInfoFun(ctx) {
    const queryInfo = {
        ip: `124.127.108.133`
    };
    // const response = await SendHttpRequest(ctx, {
    //     url: `http://ip.taobao.com/service/getIpInfo.php`,
    //     method: `get`
    // }, queryInfo);

    const options = {
        url: `http://ip.taobao.com/service/getIpInfo.php?ip=124.127.108.133`,
        method: `get`,
        json: true
    };
    const response = await KoaRequest(options);
    console.log(2222222, response.body);

    return response.body;
}

module.exports = {
    GetBaseConfigFun,
    UpLoadFileFun,
    GetGetRegionDataFun,
    GetGeographicInfoFun
};
