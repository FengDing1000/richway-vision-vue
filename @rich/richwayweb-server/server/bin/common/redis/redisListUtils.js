const path = require(`path`);
const redisClient = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisClient`));
const redisDb = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisDb`));

// 将给定值推入列表的右端
function redisPush(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    const value = (typeof (o.value) === `object`) ? JSON.stringify(o.value || {}) : o.value;
                    redisClient.rpush(o.key, value, (err, res) => {
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

// 获取列表在给定范围上的所有值
function redisLrange(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.lrange(o.key, 0, -1, (err, res) => {
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

// 获取列表在给定位置上的单个元素
function redisLindex(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.lindex(o.key, o.index || 0, (err, res) => {
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

// 通过索引设置列表元素的值
function redisLset(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.lset(o.key, o.index, JSON.stringify(o.value || {}), (err, res) => {
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

// 将列表按指定的index范围裁减
function redisLtrim(o = {}) {
    return new Promise((resolve, reject) => {
        try {
            redisDb(o).then(() => {
                try {
                    redisClient.ltrim(o.key, o.start, o.end, (err, res) => {
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
    redisPush,
    redisLindex,
    redisLset,
    redisLrange,
    redisLtrim
};
