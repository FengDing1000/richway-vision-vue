const RedisStringUtils = require(`../redis/redisStringUtils`);
const RedisHashUtils = require(`../redis/redisHashUtils`);
const hasLoginKey = `hasLoginSessionList`;

function getOnlineInfo(ctx = {}) {
    const keyInfo = {};
    const keyList = (ctx._sessionID || ``).replace(/\s/g, ``).split(`;`);
    for (const str of keyList) {
        const arr = (str || ``).split(`=`);
        if (arr.length === 2) {
            keyInfo[arr[0]] = arr[1];
        }
    }

    const key = keyInfo[_richwayKoaConfig.session.key];

    return new Promise(function (resolve, reject) {
        if (key) {
            RedisStringUtils({
                method: `get`,
                key,
                dbIndex: 0
            }).then((res = {}) => {
                let resInfo = {};
                try {
                    resInfo = JSON.parse(res);
                } catch (e) {
                    resInfo = {};
                }
                const { userInfo } = resInfo;
                const haseLogin = !!(userInfo || {}).userAccount;
                if (haseLogin) {
                    return RedisHashUtils.redisHset({
                        hashKey: hasLoginKey,
                        subKey: key,
                        value: userInfo,
                        dbIndex: 0
                    });
                } else {
                    return RedisHashUtils.redisHdel({
                        hashKey: hasLoginKey,
                        subKey: key,
                        dbIndex: 0
                    });
                }
            }).then(()=>{
                return RedisHashUtils.redisHgetall({
                    hashKey: hasLoginKey,
                    dbIndex: 0
                });
            }).then((resInfo) => {
                resolve(resInfo);
            }).catch((e) => {
                RedisHashUtils.redisHgetall({
                    hashKey: hasLoginKey,
                    dbIndex: 0
                }).then((res) => {
                    resolve(res);
                })
            })
        } else {
            RedisHashUtils.redisHgetall({
                hashKey: hasLoginKey,
                dbIndex: 0
            }).then((res) => {
                resolve(res);
            })
        }
    });
}

function clearOnlineInfo() {
    return RedisHashUtils.redisHgetall({
        hashKey: hasLoginKey,
        dbIndex: 0
    }).then((res) => {
        const arr = [];
        for (let key in res) {
            if (Object.hasOwnProperty.call(res, key)) {
                _richwayKoaLog.logInfo(`start clearOnlineInfo...sessionID is ${key}`);
                arr.push(RedisStringUtils({
                    method: `get`,
                    key,
                    dbIndex: 0
                }).then((res) => {
                    if (!res){
                        RedisHashUtils.redisHdel({
                            hashKey: hasLoginKey,
                            subKey: key,
                            dbIndex: 0
                        });
                    }
                }));
            }
        }
        return Promise.all(arr);
    });
}

module.exports = {
    getOnlineInfo,
    clearOnlineInfo
};
