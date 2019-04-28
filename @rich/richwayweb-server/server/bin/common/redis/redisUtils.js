const path = require(`path`);
const redisClient = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisClient`));
const redisDb = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisDb`));

// 设置一个key的过期的秒数
function redisExpire(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb().then(() => {
                try {
                    redisClient.expire((o.key || o.hashKey), (o.seconds || _richwayKoaConfig.RedisExpire || (60 * 60 * 24 * 100)), (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }

                        // 关闭链接
                        // redisClient.end();
                    });
                } catch (err) {
                    reject(err);
                }
            }).catch((err = {}) => {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
}

// 删除一个key
function redisDel(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb().then(() => {
                try {
                    redisClient.del(o.key, (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }

                        // 关闭链接
                        // redisClient.end();
                    });
                } catch (err) {
                    reject(err);
                }
            }).catch((err = {}) => {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
}


module.exports = {
    redisExpire,
    redisDel
};
