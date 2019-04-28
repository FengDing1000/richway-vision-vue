const cluster = require(`cluster`);
const _ = require(`underscore`);

/**
 * 获取当前子进程的内存情况，以及请求次数
 * @returns {boolean} is
 */
function getCurrentWorkerInfo() {
    const memoryInfo = process.memoryUsage();
    for (const key in memoryInfo) {
        if (Object.hasOwnProperty.call(memoryInfo, key)) {
            memoryInfo[key] = `${((memoryInfo[key] / 1024) / 1024).toFixed(2)}M`;
        }
    }

    _richwayKoaLog.writeWarn(`[[worker${_globalData.workerInfo.id}]] memoryInfo: ${JSON.stringify(memoryInfo)}; requestCountInfo: ${JSON.stringify(_globalData._richway_requestCountInfo)};`);
    if (process.send) {
        process.send({ call: true });
    }

    return true;
}


/**
 * 随机获取某一个子进程
 * @returns {*} is
 */
function getWorkerByRandom() {
    const ids = [];
    for (const id in cluster.workers) {
        if (Object.hasOwnProperty.call(cluster.workers, id)) {
            ids.push(id);
        }
    }
    const index = _.random(0, ids.length - 1);
    return cluster.workers[ids[index]];
}


/**
 * 获取当前子进程的数量
 * @returns {number} is
 */
function getClusterWorkerCount() {
    let workersCunt = 0;
    for (const id in cluster.workers) {
        if (Object.hasOwnProperty.call(cluster.workers, id)) {
            workersCunt++;
        }
    }
    return workersCunt;
}

module.exports = {
    getCurrentWorkerInfo,
    getWorkerByRandom,
    getClusterWorkerCount
};
