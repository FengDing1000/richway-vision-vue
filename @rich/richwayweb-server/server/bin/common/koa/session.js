/**

 @Name：richwayui 项目的session配置文件
 @Author：g.zhou
 @License：MIT

 */

const KoaSession = require(`koa-session`);
const RedisStore = require(`koa2-session-redis`);
const session = require(`koa-session-minimal`);

module.exports = app => {
    try {
        if (_richwayKoaConfig.SessionStore === `redis`) {
            const sessionConf = {
                key: _richwayKoaConfig.session.key,
                /** (string) cookie key (default is koa:sess) */
                /** (number || 'session') maxAge in ms (default is 1 days) */
                /** 'session' will result in a cookie that expires when session/browser is closed */
                /** Warning: If a session cookie is stolen, this cookie will never expire */
                // 这个是确定cookie的有效期，默认是一天。
                maxAge: _richwayKoaConfig.session.maxAge,

                /** (boolean) can overwrite or not (default true) */
                overwrite: true,

                // 表示是否可以通过javascript来修改，设成true会更加安全
                /** (boolean) httpOnly or not (default true) */
                httpOnly: true,

                // 这个涉及到cookie的安全性,会自动给cookie加上一个sha256的签名
                /** (boolean) signed or not (default true) */
                signed: true,

                // 这两个都是涉及到cookie有效期的更新策略
                /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
                // 如果session有变动，每次都更新session
                rolling: false,
                /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
                // 如果session有变动，且有效期已经过了一半，需要更新session
                renew: true,

                // 可以传入一个用于session的外部存储
                store: new RedisStore({
                    host: _richwayKoaConfig.RedisHost.host,
                    port: _richwayKoaConfig.RedisHost.port,
                    password: _richwayKoaConfig.RedisHost.password
                })
            };
            app.keys = [`some secret hurr`];
            app.use(KoaSession(sessionConf, app));
        } else {
            app.use(session({
                // cookie 中存储 session-id 时的键名, 默认为 koa:sess
                key: _richwayKoaConfig.session.key,
                // 与 cookie 相关的配置
                cookie: {
                    // 写 cookie 所在的域名
                    // domain: '192.168.10.1',
                    // 写 cookie 所在的路径
                    path: `/`,
                    // cookie 有效时长
                    maxAge: _richwayKoaConfig.session.maxAge,
                    // 是否只用于 http 请求中获取
                    httpOnly: true,
                    // 是否允许重写
                    overwrite: true
                }
            }));
        }

        _richwayKoaLog.logInfo(`Session module is loaded to complete...`);
    } catch (err) {
        _richwayKoaLog.logErr(`Session module is loaded to failed...`);
        _richwayKoaLog.logError(err);
    }
};
