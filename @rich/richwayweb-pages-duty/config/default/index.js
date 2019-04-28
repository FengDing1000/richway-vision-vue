/**

 @Name：richwayui 项目的配置文件
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);

// 开发环境标识
const env = `development`; // production   development
// demo pro
const interfacePattern = `demo`;

const protocol = `http`;

// WEB服务端的根目录
const rootDirServer = `server`;
// WEB客户端的根目录
const rootDirClient = `client`;
// WEB客户端静态资源的根目录
const rootDirClientAssets = `${rootDirClient}/static`;

// WEB客户端开发环境的根目录
const rootDirDev = `src`;


let ip = `localhost`;
if (env === `development`) {
    const internalIp = require(`internal-ip`);
    ip = (internalIp.v4.sync() || `localhost`);
}
// ip = "localhost";
// ip = "localhost";
// node服务端的监听端口
const port = `3003`;
const host = `${protocol}://${ip}`;
const hostPort = `${host}:${port}`;
// 开发模式下hot的监听端口
const devPort = `5000`;

const webpackEnv = process.env.NODE_ENV === `development` ? `development` : `production`;

const info = {
    // 生产，开发环境标识 production   development
    env,
    // 接口数据来源， demo pro
    interfacePattern,
    // 协议
    protocol,
    // ip
    ip,
    // 端口
    port,

    // 项目根目录路径
    rootDirServer,
    rootDirClient,
    rootDirClientAssets,
    rootDirDev,
    uploadFileDir: `/server/public/upload/`,

    // 接口demo路径
    interfaceDemo: `server/data/demo`,
    interfaceCloud: `server/data/cloud`,
    interfaceCloudFilter: `server/data/cloud/filter`,
    socketHandle: `server/data/socket`,

    // 菜单配置文件
    menu_path: `server/menu.js`,
    // 菜单来源  local  cloud
    menuSource: `local`,
    // 页面路由的配置文件路径
    service_router_pc_path: `server/service.router.pc.js`,
    service_router_wap_path: `server/service.router.wap.js`,
    // 接口路由的配置文件路径
    interface_router_path: `server/interface.router.js`,
    //  socket的配置文件路径
    socket_router_path: `server/socket.router.js`,
    // fetch的配置文件路径
    fetch_pc_path: `src/pc/service/getData.js`,
    fetch_wap_path: `src/wap/service/getData.js`,
    // vue-route的配置文件路径
    routes_path: `src/pc/router/routes.js`,
    // vux模块的配置文件路径
    modules_path: `src/pc/store/modules.js`,

    // 版本号
    version: `1.1.1-${(new Date().getTime())}`,

    // session配置
    session: {
        name: `nodeWeb2`,
        key: `richwaykey`,
        secret: `richwaysecret`,
        maxAge: 3600000// ms  3600000=1H
    },

    // 是否把基础数据放置在redis里面
    cachingData: false,
    // 缓存数据在redis里面的key
    cachingDataKey: `cachingDataKey1`,

    // 是否启动socket
    webSocket: true,

    // 全局的request请求超时时间 单位秒
    timeout: 300,
    // 接口模拟延迟时间
    sleepTime: 1500,
    // 提前获取token的时间 单位秒
    getTokenAheadTime: 60,

    // 日志级别 DEBUG INFO WARN ERR  0 1 2 3
    logLevel: 0,

    // 是否设置语言
    multilingual: false,

    // 域名
    hostDomain: ``,
    // 移动端域名
    wapHost: ``,
    // 首页路径
    portalHost: `/gzshzh/realtime_monitoring`,

    // Session是否保存在redis里面
    SessionStore: `redis`,

    // Redis配置
    RedisHost: { host: `localhost`, port: `6379`, password: `1234567` },
    // "RedisHost": {
    //     sentinels: [
    //         {"host": "10.72.83.123", "port": "26379"},
    //         {"host": "10.72.83.124", "port": "26379"},
    //         {"host": "10.72.83.85", "port": "26379"}
    //     ],
    //     name: 'mymaster',
    //     password: "Hj8*D&dlm3"
    // },
    // redis里面的库
    RedisDbIndex: 1,
    // redis的默认有效期
    RedisExpire: 60 * 60 * 24 * 100,

    // sid: `sid=cb40e44a-b6e3-4ef1-949b-0b63c68ad175`,

    // 报表服务
    ReportServiceHost: `http://222.213.236.170:8089/WebReport_yc/ReportServer`,
    // 接口服务
    InterfaceHost: `http://192.168.1.163:8080/gzshzh`,
    // 导入文件的服务
    UploadFileHost: `http://192.168.1.163:8080/gzshzh`,
    // 导出文件的服务
    DownloadFileHost: `http://192.168.1.163:8080/gzshzh`,
    // 图片服务器
    ImageServiceHost: `http://124.205.4.210:5000/staticRes`,
    // 本项目的后台服务
    ServiceHost: hostPort,
    SocketHost: `ws://${ip}:${port}`,

    // 集群相关信息
    clusterInfo: {
        // 开启集群的开关
        switch: `on`,
        // 子进程的最大数量
        maxCount: 3,
        // 每一个子进程的最大内存
        maxMemory: 1024,
        // 每一个子进程的最大空闲内存
        freeMaxMemory: 1000,
        // 每一个子进程的最小空闲时间
        freeMinTime: 300
    },

    // 开发配置
    development: {
        // 服务端路径前缀
        server_host: hostPort,
        // 接口路径前缀
        interface_host: hostPort,
        // 静态资源路径前缀 包括js,css文件
        static_host: `${hostPort}`,
        // 图片静态资源路径前缀
        img_host: `${hostPort}/assets/images`,
        // 开发时移动项目的请求路径
        request_host: `${host}:${devPort}`,
        ip,
        port: devPort,
        proxyApi: `${host}:${port}`
    },
    // 生产配置
    production: {
        // 服务端路径前缀
        server_host: ``,
        // 接口路径前缀
        interface_host: ``,
        // 静态资源路径前缀 包括js,css文件
        static_host: rootDirClientAssets,
        // 图片静态资源路径前缀
        img_host: rootDirClientAssets
    },
    webpack: {
        env: webpackEnv,
        envPro: webpackEnv === `production`,
        envDev: webpackEnv === `development`,
        entryPcDir: `src/pc/pages`,
        entryWapDir: `src/wap/pages`,
        build: {
            // 生产环境打包的目录
            assetsRoot: path.join(process.cwd(), `client/static`),
            productionGzipExtensions: [],
            analyzerfilename: `../.cache/report.build.html`
        },
        // 页面关键词
        keysWords: `江河瑞通关键字`,
        // 页面描述
        description: `江河瑞通关键字`,
        ico: webpackEnv === `production` ? `/favicon.ico` : `${hostPort}/favicon.ico`
    }
};

module.exports = info;
