/**

 @Name：richwayui 项目cluster模块的子进程内容
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const cluster = require(`cluster`);

/**
 * 通知主进程执行任务
 * @param task
 */
function noticeMasterPerformTask(task) {
    process.send({
        tasks: task
    });
}


/**
 * 子进程要执行的内容
 * @returns {Promise<any>} is
 */
function startClusterWorkerSever() {
    return new Promise((resolve, reject) => {
        try {
            // 设置子进程里面的全局变量
            // 全局变量,接口入口出口的相关方法
            global._richwayKoaInterface = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/models/koa.interface`));
            // 全局变量,session的基础方法
            global._richwayKoaSession = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/models/koa.session`));

            // koa基础的设置 启动koa
            const app = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/koa`))();
            resolve(app);
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * 判断子进程是否达到了空闲状态的标准
 * @returns {boolean} is
 */
function judgeFreeForWorker() {
    const thisWorker = cluster.worker;
    const thisWorkerMemoryInfo = thisWorker.process.memoryUsage();
    const freeMaxMemory = (parseInt(`${_richwayKoaConfig.clusterInfo.freeMaxMemory}`, 10) || 200) * 1024 * 1024;
    const freeMinTime = (parseInt(`${_richwayKoaConfig.clusterInfo.freeMinTime}`, 10) || 30) * 1000;
    const { timeStampStart, timeStampEnd } = global._globalData._richway_requestCountInfo;
    const countSuccess = !(global._globalData._richway_requestCountInfo.page + global._globalData._richway_requestCountInfo.interface - global._globalData._richway_requestCountInfo.pageSuccess - global._globalData._richway_requestCountInfo.interfaceSuccess);
    // console.log4js(thisWorker.id, thisWorkerMemoryInfo.rss, freeMaxMemory, (new Date()).getTime() - timeStamp_end, freeMinTime, timeStampStart, timeStamp_end, countSuccess);
    if (thisWorkerMemoryInfo.rss >= freeMaxMemory && (new Date()).getTime() - timeStampEnd > freeMinTime && timeStampStart <= timeStampEnd && countSuccess) {
        return true;
    }
    return false;
}

/**
 * 监察子进程的内存情况，达到规定值的时候，通知主进程是否允许断开该子进程和主进程的IPC 通道
 * @returns {boolean} is
 */
function supervisionClusterWorker() {
    setTimeout(() => {
        const thisWorker = cluster.worker;
        const thisWorkerMemoryInfo = thisWorker.process.memoryUsage();
        // const thisWorkerCpuInfo = thisWorker.process.cpuUsage();

        const maxMemory = (parseInt(`${_richwayKoaConfig.clusterInfo.maxMemory}`, 10) || 1024) * 1024 * 1024;
        if (thisWorkerMemoryInfo.rss >= maxMemory) {
            // 如果子进程的内存达到了最大值，向主进程请求是否可以断开IPC通道
            process.send({ disconnect: true });
        } else if (judgeFreeForWorker()) {
            // 如果子进程的空闲时间达到了一定的值，同时其内存也达标，则向主进程请求是否可以断开IPC通道
            process.send({ disconnect: true });
            _richwayKoaLog.logInfo(`The sub process ${thisWorker.id} asks whether the main process can disconnect the IPC channel between them. >>>`);
        } else {
            supervisionClusterWorker();
        }
    }, 10000);

    return true;
}

/**
 * 初始化子进程
 * @returns {Promise<any>} is
 */
function initClusterWorker() {
    const thisWorker = cluster.worker;
    _richwayKoaLog.logInfo(`Sub process ${thisWorker.id} starts service >>>`);
    return new Promise((resolve, reject) => {
        startClusterWorkerSever().then(() => {
            // 子进程的服务启动成功，通知主进程
            _richwayKoaLog.logInfo(`Sub process ${thisWorker.id} starts service successfully >>>`);
            process.send({ createWorkerSuccess: true });
            resolve();
        }).catch(e => {
            // 子进程的服务启动失败，通知主进程
            _richwayKoaLog.logError(`Sub process ${thisWorker.id} failed to start service: ${JSON.stringify(e)}`);
            process.send({ createWorkerSuccess: false });
            reject(e);
        });

        // 监听与主进程的通信
        process.on(`message`, message => {
            // _richwayKoaLog.logInfo(`[[worker-${thisWorker.id}]] got message from master: ${JSON.stringify(message)}`);
            if (Object.hasOwnProperty.call(message, `globalData`)) {
                if (!global._globalData) {
                    global._globalData = {};
                }
                global._globalData._richway_requestCountInfo = message.globalData._richway_requestCountInfo;
                global._globalData.timeStamp_app = message.globalData.timeStamp_app;
                global._globalData.workerInfo = message.globalData.workerInfo;
                global._globalData.workerInfo.id = thisWorker.id;
            } else if (Object.hasOwnProperty.call(message, `disconnect`)) {
                if (message.disconnect === false) {
                    // 接收到主进程的通知，暂时不能断开IPC通道，子进程继续监察内存
                    supervisionClusterWorker();
                } else if (message.disconnect === true) {
                    // 接收到主进程的通知，可以断开IPC通道
                    _richwayKoaLog.logInfo(`The sub process ${thisWorker.id} starts to disconnect the IPC channel from the main process.`);
                    if (judgeFreeForWorker()) {
                        process.disconnect();
                    } else {
                        process.send({ disconnect: false });
                    }
                }
            } else if (Object.hasOwnProperty.call(message, `tasks`)) {
                if (message.tasks === `ALL_TASK`) {
                    // 接收到主进程的通知，需要去执行一些任务
                    _richwayKoaLog.logInfo(`The sub process ${thisWorker.id} is notified to start the ALL_TASK task.`);

                } else if (message.tasks === "ONLINE_TASK") {
                    // 接收到主进程的通知，需要去执行推送在线人数的任务
                    _richwayKoaLog.logInfo(`The sub process ${thisWorker.id} is notified to start the ONLINE_TASK task.`);

                    global._richwayKoaSocket.KoaSocket_online();
                }
            }
        });
        supervisionClusterWorker();
    });
}

module.exports = {
    noticeMasterPerformTask,
    startClusterWorkerSever,
    initClusterWorker
};
