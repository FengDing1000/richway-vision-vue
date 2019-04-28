const path = require(`path`);
const redisClient = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisClient`));
const redisDb = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisDb`));

// 在散列里面关联起给定的键值对
function redisHset(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    const value = (typeof (o.value) === `object`) ? JSON.stringify(o.value || {}) : o.value;
                    redisClient.hset(o.hashKey, o.subKey, value, (err, res) => {
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

// 获取指定散列键的值
function redisHget(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.hget(o.hashKey, o.subKey, (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            let o = null;
                            try {
                                o = JSON.parse(res || `{}`);
                            } catch (e) {
                                o = res;
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


// 如果给定键存在于散列里面，则移除这个键
function redisHdel(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.hdel(o.hashKey, o.subKey, (err, res) => {
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

// 返回散列包含的键值对数量
function redisHlen(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.hlen(o.hashKey, (err, res) => {
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

// 获取散列包含的键值对
function redisHgetall(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.hgetall(o.hashKey, (err, res) => {
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
    redisHset,
    redisHget,
    redisHdel,
    redisHlen,
    redisHgetall
};
