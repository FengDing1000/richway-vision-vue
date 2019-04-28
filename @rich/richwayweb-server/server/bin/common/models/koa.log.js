const path = require(`path`);
const fs = require(`fs`);
const _ = require(`underscore`);
const logConfig = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/log4js/config`));

/**
 * 确定目录是否存在，如果不存在则创建目录
 * @param {string}pathStr is
 * @returns {boolean} is
 */
const confirmPath = (pathStr = ``) => {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log(`createPath: ${pathStr}`);
    }
    return true;
};

/**
 * 初始化log相关目录
 * @returns {boolean} is
 */
const initLogPath = () => {
    // 创建log的根目录'log4js'
    if (logConfig.baseLogPath) {
        confirmPath(logConfig.baseLogPath);
        // 根据不同的logType创建不同的文件目录
        _.each(logConfig, item => {
            if (item.path) {
                confirmPath(path.join(logConfig.baseLogPath, item.path));
            }
        });
    }
    return true;
};

module.exports = () => {
    initLogPath();
    return require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/log4js/util`));
};
