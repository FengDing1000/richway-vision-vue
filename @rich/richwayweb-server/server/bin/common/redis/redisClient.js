const _ = require(`underscore`);
const Ioredis = require(`ioredis`);
let redisClient;

if (_richwayKoaConfig.env === `production` || _richwayKoaConfig.RedisHost.sentinels) {
    // 哨兵
    redisClient = new Ioredis(_richwayKoaConfig.RedisHost);
} else if (_.isArray(_richwayKoaConfig.RedisHost)) {
    // 集群
    redisClient = new Ioredis.Cluster(_richwayKoaConfig.RedisHost);
} else {
    // 单机
    redisClient = new Ioredis(_richwayKoaConfig.RedisHost.port, _richwayKoaConfig.RedisHost.host);
}

// redis 链接错误
redisClient.on(`error`, err => {
    _richwayKoaLog.logError(`REDIS error:${err}`);
});

module.exports = redisClient;
