const path = require(`path`);
const redisClient = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisClient`));
const redisDb = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisDb`));

// 将给定元素添加到集合
function redisSadd(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    const value = (typeof (o.value) === `object`) ? JSON.stringify(o.value || {}) : o.value;
                    redisClient.sadd(o.key, value, (err, res) => {
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

// 返回集合中包含的所有元素
function redisSmembers(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.smembers(o.key, (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            let o = null;
                            const item = Array.isArray(res) ? res[0] : ``;
                            try {
                                o = JSON.parse(item || `{}`);
                            } catch (e) {
                                o = item;
                            }
                            resolve(o);
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


// 如果给定的元素在集合中，则移除此元素
function redisSrem(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.srem(o.key, (err, res) => {
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
    redisSadd,
    redisSmembers,
    redisSrem
};
