const queryString = require('querystring');
const { SendHttpRequest } = require(`../../controller`);

/**
 * 下载文件
 * @param ctx
 * @constructor
 */
module.exports = async (ctx) => {
    const queryInfo = ctx.request.query || {};
    let url = `${_richwayKoaConfig.DownloadFileHost}${queryInfo.url}`;
    delete queryInfo.url;
    url += `?${queryString.stringify(queryInfo)}`;
    const response = await SendHttpRequest(ctx, {
        url,
        method: `get`,
        accessToken: true,
        dataType: `buffer`
    });
    ctx.set(`Content-disposition`, response.headers["content-disposition"]);
    ctx.set(`Content-type`, response.headers["content-type"]);
    ctx.statusCode = 200;
    ctx.body = response.body;
};
