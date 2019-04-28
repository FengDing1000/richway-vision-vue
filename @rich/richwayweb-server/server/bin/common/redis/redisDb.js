const path = require(`path`);
const redisClient = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisClient`));

module.exports = (o = {}) => new Promise((resolve, reject) => {
    try {
        const index = o.dbIndex === undefined || o.dbIndex === null ? _richwayKoaConfig.RedisDbIndex : 0;
        redisClient.select(index, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    } catch (err) {
        reject(err);
    }
});
