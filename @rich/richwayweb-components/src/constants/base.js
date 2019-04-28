// 开发环境
const _env = process.env.NODE_ENV === `development` ? `development` : `production`;
const _envPro = _env === `production`;
const _envDev = _env === `development`;
// 机构编号
const _companyCode = `richway`;

// 版本号
const _version = `1.0`;

// 缓存的默认有效时间，单位是分钟
const _exp = 60;

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * interfaceUrl: 接口域名地址
 * imgBaseUrl: 图片所在域名地址
 *
 */
const _baseUrl = ``;
const _interfaceUrl = `/api`;
const _staticUrl = `/assets`;
const _routerMode = `history`;
const _imgBaseUrl = `${_staticUrl}/images`;

/**
 * fetch默认参数
 * @type {{timeout: number}} is
 * @private
 */
const _fetchInfo = {
    timeOut: 60000,
    errorTips: `系统出现未知错误，请联系管理员`

};

export default {
    _env,
    _envPro,
    _envDev,
    _companyCode,
    _version,
    _exp,
    _baseUrl,
    _interfaceUrl,
    _staticUrl,
    _imgBaseUrl,
    _routerMode,
    _fetchInfo,
    path: {},
    config: {}
};
