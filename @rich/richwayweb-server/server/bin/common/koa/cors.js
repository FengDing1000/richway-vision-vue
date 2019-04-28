/**

 @Name：richwayui 项目的跨域请求设置
 @Author：g.zhou
 @License：MIT

 */

const KoaCors = require(`koa2-cors`);

module.exports = app => {
    try {
        app.use(KoaCors({
            origin(ctx) {
                if (_richwayKoaConfig.env === `development`) {
                    return `*`; // 允许来自所有域名请求
                }
                if (ctx.path === `index`) {
                    return `*`;
                }
                return _richwayKoaConfig.hostDomain; // 这样就能只允许 http://localhost:8080 这个域名的请求了
            },
            // CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。
            // 需要获取其他字段时，使用Access-Control-Expose-Headers，
            // getResponseHeader('myData')可以返回我们所需的值
            exposeHeaders: [`WWW-Authenticate`, `Server-Authorization`],
            // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
            // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
            // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
            maxAge: 5,
            // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
            // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
            credentials: true,
            // 设置所允许的HTTP请求方法
            allowMethods: [`GET`, `POST`, `DELETE`, `OPTIONS`, `PUT`],
            // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
            allowHeaders: [`Content-Type`, `Content-Length`, `Authorization`, `Accept`, `X-Requested-With`, `accessToken`, `appId`]
        }));

        _richwayKoaLog.logInfo(`Cors module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Cors module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
