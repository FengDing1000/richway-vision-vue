const path = require(`path`);
const KoaRequest = require(`koa2-request`);
const RichWayWebUtils = require(`@rich/richwayweb-utils`);

const {_i18n} = require(path.join(_richwayKoaConfig.rootDirServer, `bin/i18n/index`));
// const routerUtils = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/koa/router/router_utils`));

const InterfaceDemoUrl = path.join(process.cwd(), _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.join(process.cwd(), _richwayKoaConfig.interfaceCloudFilter);

/**
 * 发送http请求
 * @param ctx
 * @param cloudInfo
 * @param queryInfo
 * @return {Promise<*>}
 * @constructor
 */
async function SendHttpRequest(ctx, cloudInfo = {}, queryInfo) {
    const options = {
        url: cloudInfo.url,
        method: (cloudInfo.method || `get`).toUpperCase(),
        json: true,
        timeout: _richwayKoaConfig.timeout * 1000,
        headers: {
            appId: _richwayKoaSession.getAppId(ctx),
            // accessToken: _richwayKoaSession.getToken(ctx) || ``,
            "content-type": `application/json; charset=utf-8`,
            'User-Agent': ((ctx.request || {}).headers || {})[`user-agent`]
        }
    };

    if (cloudInfo.dataType === `json`) {
        options.json = true;
    } else {
        options.encoding = null;
        options.headers["Accept"] = `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8`;
        options.headers["Accept-Language"] = `zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7`;
        options.headers["Accept-Encoding"] = `gzip, deflate`;
    }

    if ((options.url || ``).indexOf(`login`) === -1){
        options.headers.Cookie = _richwayKoaSession.getCookie(ctx);
    }

    // 判断是否需要在头部添加accessToken
    if(cloudInfo.accessToken === true){
        const accessToken = _richwayKoaSession.getToken(ctx);
        _richwayKoaLog.logInfo(`current accessToken is ${accessToken}`);
        //判断是否有token
        if(accessToken){
            options.headers.accessToken = accessToken;
        } else {
            return {
                code: 1001,
                success: false,
                message: `token失效，需要重新登录...`
            };
        }
    }

    // 处理一遍url，替换里面的参数
    if(/{.+}/.test(options.url)){
        const info = ctx._queryInfo;
        for(let key in info){
            if(Object.hasOwnProperty.call(info, key)){
                options.url = options.url.replace(`{${key}}`, info[key]);
            }
        }
    }

    // 单独处理参数为数组的情况
    if (cloudInfo.parameterForm && queryInfo[cloudInfo.parameterForm]) {
        queryInfo = queryInfo[cloudInfo.parameterForm];
    }

    // 根据method，来特别处理headers和url
    if (options.method !== `GET`) {
        if (cloudInfo.postType === `body`) {
            options.headers["content-type"] = `application/json; charset=utf-8`;
            options.body = JSON.stringify(queryInfo);
            // options.body = queryInfo;
        } else if (cloudInfo.postType === `form`) {
            options.headers["content-type"] = `application/x-www-form-urlencoded; charset=utf-8`;
            options.form = queryInfo;
        } else if (cloudInfo.postType === `formData`) {
            options.headers["content-type"] = `multipart/form-data; charset=utf-8`;
            options.formData = queryInfo;
        }

    } else {
        // options.headers["Accept"] = `application/json; charset=utf-8`;
        // const queryString = require('querystring');
        // if (queryString) {
        //     options.url += `?${queryString.stringify(queryInfo)}`;
        // }
        options.headers["Accept"] = `application/json; charset=utf-8`;
        const queryString = require('querystring');
        const urlSearchString = queryString.stringify(queryInfo);
        if (urlSearchString && options.url.indexOf('?') === -1) {
            options.url += `?${urlSearchString}`;
        }
    }

    _richwayKoaLog.logInfo(`request cloud........................`);
    _richwayKoaLog.logInfo(`request cloud url is ${options.url}`);
    _richwayKoaLog.logInfo(`request cloud method is ${options.method} ${cloudInfo.postType}`);
    _richwayKoaLog.logInfo(`request cloud headers is ${JSON.stringify(options.headers)}`);
    _richwayKoaLog.logInfo(`request cloud parameters is ${JSON.stringify(options.body || options.form || options.formData)}`);

    var j = KoaRequest.jar();
    options.jar = j;

    // 添加时间戳 接口请求微服务的开始时间
    const startCloudT = (new Date()).getTime();
    const response = await KoaRequest(options);

    // 兼容不规范的response
    // if (!Object.hasOwnProperty.call(response.body, `success`)) {
    //     response.body = {
    //         success: true,
    //         data: response.body
    //     };
    // }

    const resInfo = response.body || {};

    if (resInfo.success === false) {
        _richwayKoaLog.logInfo(`【${options.url}】 res: ${JSON.stringify(resInfo)}`);
    }

    const str = JSON.stringify(resInfo)
    if (str.indexOf(`<html`) > -1){
        _richwayKoaLog.logInfo(`【${options.url}】 res: ${JSON.stringify(resInfo)}`);
        response.body = {
            success: false,
            code: 9004,
            message: `接口${options.url}异常，请联系管理员`
        };
    }

    if (options.url.indexOf(`login`) > -1){
        let cookieString = _richwayKoaConfig.sid;
        _richwayKoaSession.setCookie(ctx, cookieString);
    }

    if (options.url.includes(`.json`)) {
        response.body = {
            success: true,
            data: resInfo
        };
    }

    return response;
}

/**
 * 检查参数
 * @param {object}ctx is
 * @param {object}queryInfo is
 * @return {boolean} is
 * @constructor
 */
function CheckParameter(ctx = {}) {
    const queryInfo = ctx._queryInfo;
    if (!RichWayWebUtils.filter.parameterFilter(queryInfo) && false) {
        _richwayKoaLog.logError(`Interface parameters contain illegal characters...`, ctx);
        return {
            code: 1002,
            success: false,
            message: _i18n(ctx, `RequestParameterErr`)
        };
    }
    return {
        code: 1000,
        success: true
    };
}

/**
 * 检查是否登录，用于接口权限控制
 * @param {object}ctx is
 * @param {object}config is
 * @constructor
 */
function CheckLogin(ctx = {}, config = {}) {
    if ((config.node || {}).mustLogin === true && !_richwayKoaSession.hasLogin(ctx)) {
        _richwayKoaLog.logError(`CheckLogin: need login...`, ctx);

        return {
            code: 1001,
            success: false,
            message: _i18n(ctx, `NeedLogin`)
        };
    }
    return {
        code: 1000,
        success: true
    };
}


// async function GetDataByUrlAndHandler(ctx = {}, options = {}) {
//     let data = options.data;
//     try {
//         if (options.url && options.handler) {
//             _richwayKoaLog.logInfo(`GetDataByUrlAndHandler`, options.url, options.handler);
//             data = await require(options.url)[options.handler](ctx, RichWayWebUtils.clone.deepCloneObj(options.data || {}), RichWayWebUtils.clone.deepCloneObj(options.config || {}));
//         }
//     } catch (err) {
//         _richwayKoaLog.logError(err, ctx);
//     }
//     return data;
// }


async function GetDataByUrlAndHandler(ctx = {}, options = {}) {
    let data = {
        success: false,
        message: `没有数据`,
        data: null
    };

    if (options.url && options.handler) {
        let optionsObject = null;
        try {
            optionsObject = await require(options.url);
            if (optionsObject && typeof optionsObject[options.handler] === `function`) {
                data = optionsObject[options.handler](ctx, RichWayWebUtils.clone.deepCloneObj(options.data || {}), RichWayWebUtils.clone.deepCloneObj(options.config || {}));
            } else {
                data.message = `在文件${options.url}中没有定义方法${options.handler}`;
            }
        } catch (err) {
            _richwayKoaLog.logError(err, ctx);
            data.message = `找不到文件${options.url}`;
        }
    } else {
        data.message = `接口参数配置不齐全，url和handle不能为空`;
    }

    return data;
}

function judgeShortPath(url) {
    return (url || ``).indexOf(`node_modules`) === -1 && (url || ``).indexOf(`server`) === -1;
}

/**
 * 处理接口的参数
 * @param {object}ctx is
 * @param {object}config is
 * @return {*} is
 * @constructor
 */
async function ProcessParametersHandler(ctx = {}, config = {}) {
    let queryInfo = null;
    const handler = config.handler || {};
    if (handler.url && handler.processParametersHandler) {
        queryInfo = await GetDataByUrlAndHandler(ctx, {
            url: judgeShortPath(handler.url) ? path.join(InterfaceCloudFilterUrl, handler.url) : handler.url,
            handler: handler.processParametersHandler,
            data: {},
            config
        });
    } else {
        queryInfo = config.type === `socket` ? ctx._socketData : ctx._queryInfo;
    }
    _richwayKoaLog.logInfo(`has processParametersHandler...`);
    return queryInfo;
}

/**
 * node服务独立处理业务数据
 * @param {object}ctx is
 * @param {object}config is
 * @param {object}data is
 * @return {*} is
 * @constructor
 */
async function ProcessDataHandler(ctx = {}, config = {}, data = {}) {
    let resInfo = null;
    const handler = config.handler || {};
    if (handler.url && handler.processDataHandler) {
        resInfo = await GetDataByUrlAndHandler(ctx, {
            url: judgeShortPath(handler.url) ? path.join(InterfaceCloudFilterUrl, handler.url) : handler.url,
            handler: handler.processDataHandler,
            data,
            config
        });
    } else {
        resInfo = data;
    }
    _richwayKoaLog.logInfo(`has processDataHandler...`);
    return resInfo;
}

/**
 * 获取接口的数据
 * @param {object}ctx is
 * @param {object}config is
 * @param {object}queryInfo is
 * @return {Promise<*>} is
 * @constructor
 */
async function GetDataHandler(ctx = {}, config = {}, queryInfo = {}) {
    let resInfo = null;
    const data = config.data || {};
    try {
        _richwayKoaLog.logInfo(`interface config is ${JSON.stringify(config)}`);
        if (!data.nonForward) {
            if (_richwayKoaConfig.interfacePattern === `demo`) {
                // 取demo数据
                if (!data.demo) {
                    data.demo = {};
                }
                resInfo = await GetDataByUrlAndHandler(ctx, {
                    url: judgeShortPath(data.demo.url) ? path.join(InterfaceDemoUrl, data.demo.url) : data.demo.url,
                    handler: data.demo.handler,
                    data: queryInfo
                });
            } else {
                // 取真实数据
                if (!data.cloud) {
                    data.cloud = {};
                }


                // 添加时间戳 接口请求微服务的开始时间
                const startCloudT = (new Date()).getTime();
                const response = await SendHttpRequest(ctx, data.cloud, queryInfo);
                ctx._cloudTime = (new Date()).getTime() - startCloudT;
                resInfo = response.body || {};
            }
        } else {
            resInfo = ProcessDataHandler(ctx, config, queryInfo);
        }
        _richwayKoaLog.logInfo(`has getDataHandler...`);
    } catch (err) {
        _richwayKoaLog.logInfo(`GetDataHandler err`, err);
        _richwayKoaLog.logError(err);

        let message = ``;
        if (err.code === `ECONNREFUSED`) {
            message = `连接服务器失败`;
        } else if (err.code === `ECONNRESET` || err.code === `ESOCKETTIMEDOUT` || err.code === `ETIMEDOUT`) {
            message = `服务器连接超时`;
        } else if (err.code === `ENOTFOUND`) {
            message = `系统错误`;
        } else {
            message = JSON.stringify(err);
        }
        resInfo = _richwayKoaInterface.getKoaInterfaceExp({
            code: 6001,
            message
        });
    }
    return resInfo;
}

/**
 * 处理接口返回的数据
 * @param {object}ctx is
 * @param {object}config is
 * @param {object}data is
 * @return {*} is
 * @constructor
 */
async function ProcessResultsHandler(ctx = {}, config = {}, data = {}) {
    let resInfo = null;
    const handler = config.handler;
    if (handler.url && handler.processResultsHandler) {
        resInfo = await GetDataByUrlAndHandler(ctx, {
            url: judgeShortPath(handler.url) ? path.join(InterfaceCloudFilterUrl, handler.url) : handler.url,
            handler: handler.processResultsHandler,
            data,
            config
        });
    } else {
        resInfo = data;
    }
    _richwayKoaLog.logInfo(`has processResultsHandler...`);

    if (config.data.triggerSocket) {
        if (typeof (global._richwayKoaSocket[`KoaSocket_${config.data.triggerSocket}`]) === `function`){
            global._richwayKoaSocket[`KoaSocket_${config.data.triggerSocket}`]();
        }
    }

    return resInfo;
}


/**
 * 所有接口的第一个拦截器，默认情况下统一
 * @param {object}ctx is
 * @param {object}config is
 * @constructor
 */
async function InterfaceInterceptionFirst(ctx = {}, config = {}) {
    try {
        // 获取接口参数
        _richwayKoaInterface.getInterfaceRequest(ctx);
        const queryInfo = ctx._queryInfo;
        // 设置语言
        _richwayKoaSession.setLangType(ctx, queryInfo.langType);

        // 检查参数
        let info = CheckParameter(ctx);
        if (info.success === false) {
            return info;
        }

        // 判断登录条件
        info = CheckLogin(ctx, config);
        if (info.success === false) {
            return info;
        }

        return info;
    } catch (err) {
        return {
            code: 6002,
            success: false,
            message: JSON.stringify(err)
        };
    }
}

/**
 * 所有接口的最后一个拦截器
 * @param {object}ctx is
 * @param {object}config is
 * @constructor
 */
async function InterfaceInterceptionLast(ctx = {}, config = {}) {
    try {
        let queryInfo = null;
        // 接口的结果数据
        let resInfo = null;

        if (!config.handler) {
            config.handler = {};
        }
        // 如果需要单独处理参数
        queryInfo = await ProcessParametersHandler(ctx, config);

        // 获取接口数据
        resInfo = await GetDataHandler(ctx, config, queryInfo);

        // 如果需要单独处理结果
        resInfo = await ProcessResultsHandler(ctx, config, resInfo);

        return resInfo;
    } catch (err) {
        _richwayKoaInterface.setInterfaceResponse(ctx, _richwayKoaInterface.getKoaInterfaceExp({
            code: 6003,
            message: JSON.stringify(err)
        }));
    }
}

module.exports = {
    SendHttpRequest,
    // _i18n,
    InterfaceInterceptionFirst,
    InterfaceInterceptionLast
};
