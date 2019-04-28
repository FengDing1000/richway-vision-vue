/**

 @Name：richwayui 项目的缓存数据
 @Author：g.zhou
 @License：MIT

 */


const path = require(`path`);
const redisStringUtils = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/redisStringUtils`));
const variableTypes = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/variable-types`));

module.exports.init = () => new Promise((resolve, reject) => {
    if (!_richwayKoaConfig.cachingData) {
        resolve();
    } else {
        try {
            const timeStampRedis = (new Date()).getTime();
            _richwayKoaLog.logInfo(`The cache data module Start initialization...`);

            const ketList = [
                {
                    name: `province`,
                    key: variableTypes.provinceKey,
                    url: path.join(_richwayKoaConfig.rootDirServer, `bin/data/province`),
                    funName: `getProvince`,
                    defaultData: {}
                },
                {
                    name: `country`,
                    key: variableTypes.countryKey,
                    url: path.join(_richwayKoaConfig.rootDirServer, `bin/data/country`),
                    funName: `getCountry`,
                    defaultData: {}
                },
                {
                    name: `pinyin`,
                    key: variableTypes.pinyinKey,
                    url: path.join(_richwayKoaConfig.rootDirServer, `bin/data/pinyin`),
                    funName: `getPinyin`,
                    defaultData: {}
                }
            ];

            const arr = [];
            arr.push(redisStringUtils({
                method: `set`,
                key: _richwayKoaConfig.cachingDataKey,
                value: ketList
            }));
            for (const item of ketList) {
                let itemData = null;
                try {
                    itemData = require(item.url)[item.funName]();
                } catch (e) {
                    _richwayKoaLog.logError(`${item.url} Err: ${JSON.stringify(e)}`);
                    itemData = item.defaultData;
                }
                arr.push(redisStringUtils({
                    method: `set`,
                    key: item.key,
                    value: itemData
                }));
            }
            Promise.all(arr).then(() => {
                _richwayKoaLog.logInfo(`The cache data module is loaded to complete...${(new Date()).getTime() - timeStampRedis}`);
                resolve();
            }).catch(err => {
                _richwayKoaLog.logError(`Redis cachingDataKey Err: ${JSON.stringify(err)}`);
                reject(err);
            });
        } catch (e) {
            reject(e);
        }
    }
});
