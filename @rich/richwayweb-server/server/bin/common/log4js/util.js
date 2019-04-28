const cluster = require(`cluster`);
const log4js = require(`log4js`);
const logConfig = require(`./config`);

// 加载配置文件
log4js.configure(logConfig);

const logUtil = {};
// 调用预先定义的日志名称
const resLogger = log4js.getLogger(`resLogger`);
const errorLogger = log4js.getLogger(`errorLogger`);
const infoLogger = log4js.getLogger();
const errLogger = log4js.getLogger(`err`);

const getProcessType = () => `${cluster.isMaster ? `master` : `worker`}(${process.pid})`;

// 格式化请求日志
const formatReqLog = (ctx = {}) => {
    const logText = [];
    // 访问方法
    logText.push(`[request method]: ${ctx.request.method}`);
    // 请求原始地址
    logText.push(`[request originalUrl]:  ${ctx.request.originalUrl}`);
    // 客户端ip
    logText.push(`[request client ip]:  ${ctx.request.ip}`);
    // 请求参数
    logText.push(`[request req]:  ${JSON.stringify(ctx._queryInfo)}`);
    // 服务器响应时间
    logText.push(`[response time]: ${(new Date()).getTime() - ctx._timeStamp}`);
    return logText.join(`\n`);
};
const formatError = (err, ctx) => {
    const logText = [];
    logText.push(`response detail ---${getProcessType()}`);
    if (typeof (err) === `string`) {
        logText.push(`[err info]:${err}`);
    } else {
        logText.push(`[err name]:${err.name}`);
        logText.push(`[err message]${err.message}`);
        logText.push(`[err stack]:${err.stack}`);
    }
    if (ctx) {
        logText.push(`${formatReqLog(ctx)}`);
    }

    return logText.join(`\n`);
};
const formatRes = ctx => {
    const logText = [];
    logText.push(`response detail ---${getProcessType()}`);
    logText.push(`${formatReqLog(ctx)}`);
    // 响应状态
    logText.push(`[response status]:${ctx.status}`);
    // 响应文本
    logText.push(`[response body]:${JSON.stringify(ctx.body)}`);
    return logText.join(`\n`);
};
const formatInfo = info => `[info-${getProcessType()}]: ${JSON.stringify(info)}`;
const formatErr = info => `[err-${getProcessType()}]: ${JSON.stringify(info)}`;

// 封装错误日志
logUtil.logError = (err, ctx) => {
    if (err && _richwayKoaConfig.logLevel <= 3) {
        errorLogger.error(`${formatError(err, ctx)}\n`);
    }
};

// 封装响应日志
logUtil.logResponse = ctx => {
    if (ctx && _richwayKoaConfig.logLevel <= 2) {
        resLogger.info(`${formatRes(ctx)}\n`);
    }
};

// 封装提示日志
logUtil.logInfo = info => {
    if (info && _richwayKoaConfig.logLevel <= 1) {
        infoLogger.info(formatInfo(info));
    }
};

// 封装错误提示日志
logUtil.logErr = info => {
    if (info && _richwayKoaConfig.logLevel <= 3) {
        errLogger.info(formatErr(info));
    }
};


module.exports = logUtil;
