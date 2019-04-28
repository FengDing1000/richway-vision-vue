const path = require(`path`);
const redisClient = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisClient`));
const redisDb = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisDb`));
const redisUtils = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisUtils`));

module.exports = (o = {}) => new Promise((resolve, reject) => {
    try {
        redisDb(o).then(() => {
            if (o.method === `set`) {
                try {
                    const value = (typeof (o.value) === `object`) ? JSON.stringify(o.value || {}) : o.value;
                    redisClient.set(o.key, value, (err, result) => {
                        if (err) {
                            _richwayKoaLog.logError(`Redis set ${o.key} Err: ${JSON.stringify(err)}`);
                            reject(err);
                        } else {
                            redisUtils.redisExpire(o);
                            _richwayKoaLog.logInfo(`Redis set ${o.key} Result: ${JSON.stringify(result)}`);
                            resolve(result);
                        }
                    });
                } catch (err) {
                    reject(err);
                }
            } else {
                try {
                    redisClient.get(o.key, (err, result) => {
                        if (err) {
                            _richwayKoaLog.logError(`Redis get ${o.key} Err: ${JSON.stringify(err)}`);
                            reject(err);
                        } else {
                            // _richwayKoaLog.logInfo(`Redis get ${o.key} Result: ${JSON.stringify(result)}`);
                            resolve(result);
                        }
                    });
                } catch (err) {
                    reject(err);
                }
            }
        }).catch((err = {}) => {
            reject(err);
        });
    } catch (err) {
        reject(err);
    }
});
