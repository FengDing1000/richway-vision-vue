/**
 *
 @Name：hnaui 项目中处理接口的文件
 @Author：g.zhou
 @License：MIT

 */


const RichWayWebUtils = require(`@rich/richwayweb-utils`);
const worker = require('../cluster/worker');

/**
 * 返回浏览器的数据，构造函数
 */
class KoaInterface {
    constructor(info = {}) {
        if (typeof (info) === `string`) {
            info = {
                message: info
            };
        }
        const fieldInfo = {
            success: false,
            code: 9000,
            message: ``,
            total: 0,
            pages: 0,
            data: null,
            stackTrace: null
        };
        for (const key in fieldInfo) {
            if (Object.hasOwnProperty.call(fieldInfo, key)) {
                this[key] = info[key] || fieldInfo[key];
            }
        }
        for (const key in info) {
            if (Object.hasOwnProperty.call(info, key) && !Object.hasOwnProperty.call(fieldInfo, key)) {
                this[key] = info[key];
            }
        }

        if (this.success === `true`) {
            this.success = true;
        }
        if (this.success === true) {
            this.code = 1000;
        }
        this.code = parseInt(`${this.code}`, 10);
    }
}

/**
 * 后台接口统一接受处理request
 * @param {object}ctx is
 * @return {object}ctx is
 */
function getInterfaceRequest(ctx = {}) {
    let queryInfo = null;
    const method = (ctx.request.method || ``).toUpperCase();
    if (method === `POST`) {
        queryInfo = ctx.request.body;
    } else if (method === `GET`) {
        queryInfo = ctx.request.query;
    }

    if (queryInfo.q && _richwayKoaConfig.parameterEncryption) {
        let { q } = queryInfo;
        try {
            q = RichWayWebUtils.compile.uncompile(q);
            queryInfo = JSON.parse(`${q}`);
        } catch (e) {
            queryInfo = {};
            _richwayKoaLog.logInfo(111111111111, JSON.stringify(e));
            _richwayKoaLog.logError(e, ctx);
        }
    }

    _richwayKoaLog.logInfo(`【${ctx.request.url}】 req: ${JSON.stringify(queryInfo)}`);
    ctx._queryInfo = queryInfo || {};
    ctx._sessionID = ((ctx.req || {}).headers || {}).cookie;

    if (_richwayKoaConfig.clusterInfo.switch === `on`) {
        // 通知主进程去执行任务ALL_ONLINE
        worker.noticeMasterPerformTask(`ALL_ONLINE`);
    } else {
        global._richwayKoaSocket.KoaSocket_online(ctx);
    }

    return ctx;
}

/**
 * 接口响应浏览器的数据
 * @param {object}ctx is
 * @param {object}data is
 * @return {object}ctx is
 */
function setInterfaceResponse(ctx = {}, data = {}) {
    const resInfo = new KoaInterface(data);

    // if (_richwayKoaConfig.env === `development`) {
    //     utils.sleep(_richwayKoaConfig.sleepTime);
    // }

    if (resInfo.code !== 1000) {
        _richwayKoaLog.logInfo(`【${ctx.request.url}】 res: ${JSON.stringify(resInfo)}`);
    }

    const nowTime = (new Date()).getTime();
    const totalTime = nowTime - ctx._timeStamp;
    const cloudTime = ctx._cloudTime;
    const nodeTime = totalTime - cloudTime;
    resInfo.time = {
        totalTime,
        cloudTime,
        nodeTime
    };

    ctx.response.type = `json`;
    ctx.response.body = resInfo;
    _richwayKoaLog.logResponse(ctx);
    return ctx;
}


module.exports = {
    getKoaInterfaceExp: (info = {}) => new KoaInterface(info),
    getInterfaceRequest,
    setInterfaceResponse
};
