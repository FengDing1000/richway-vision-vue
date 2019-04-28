/**

 @Name：richwayui 项目cluster模块的主进程内容
 @Author：g.zhou
 @License：MIT

 */


const path = require(`path`);
const cluster = require(`cluster`);

const clusterWorkers = {};
const clusterUtils = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/cluster/utils`));

/**
 * 通知所有的子进程执行任务noticeMasterPerformTask
 */
function noticeAllWorkerPerformTask(task) {
    for (const id in cluster.workers) {
        if (Object.hasOwnProperty.call(cluster.workers, id)) {
            cluster.workers[id].send({
                tasks: task
            });
        }
    }
}


/**
 * 主进程的全局变量
 * @returns {boolean} is
 */
function getClusterMasterGlobal() {
    global._globalData = {};

    // 全局变量，保存请求次数的信息
    global._globalData._richway_requestCountInfo = {
        total: 0,
        interface: 0,
        interfaceSuccess: 0,
        page: 0,
        pageSuccess: 0,
        timeStampStart: (new Date()).getTime(),
        timeStampEnd: (new Date()).getTime()
    };

    global._globalData.timeStamp_app = (new Date()).getTime();

    global._globalData.workerInfo = {
        workerNum: 0,
        disConnectIng: false

    };

    return true;
}

/**
 * 主进程要执行的内容
 * @returns {Promise<any>} is
 */
function startClusterMasterSever() {
    return new Promise((resolve, reject) => {
        try {
            // 设置主进程里面的全局变量
            getClusterMasterGlobal();
            // 开始执行所有任务
            _richwayKoaLog.logInfo(`Start performing other auxiliary tasks...`);
            const auxiliaryTasks = [
                // 加载缓存数据
                require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/redis/index`)).init(),
                // 启动定时任务
                require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/schedule/index`)).init()
            ];
            Promise.all(auxiliaryTasks).then(() => {
                _richwayKoaLog.logInfo(`Other auxiliary tasks are completed\n\n`);
                resolve();
            }).catch(e => {
                reject(e);
            });
        } catch (e) {
            reject(e);
        }
    });
}


/**
 * 创建一个子进程
 * @returns {Promise<any>} is
 */
function createClusterWorkerByFork() {
    return new Promise((resolve, reject) => {
        try {
            if (_globalData.workerInfo.workerNum < _richwayKoaConfig.clusterInfo.maxCount) {
                const work = cluster.fork();
                clusterWorkers[`worker${work.id}`] = 0;
                _richwayKoaLog.logInfo(`Create child process--${work.id}`);
                // 父、子进程间通信，接受信息
                work.on(`message`, message => {
                    if (Object.hasOwnProperty.call(message, `disconnect`)) {
                        if (message.disconnect === true) {
                            // 接收到子进程的通知，询问主进程是否断开与主进程的IPC通道，同时要保证至少有两个子进程
                            const workersCunt = clusterUtils.getClusterWorkerCount();
                            if (_globalData.workerInfo.disConnectIng === false && workersCunt > 1) {
                                _globalData.workerInfo.disConnectIng = true;
                                _richwayKoaLog.logInfo(`The notification child process ${work.id} can disconnect the IPC channel from the main process.`);
                                // 通知子进程，可以断开IPC通道
                                work.send({ disconnect: true });
                            } else {
                                // 通知子进程，暂时不能断开IPC通道
                                _richwayKoaLog.logInfo(`The notification child process ${work.id} cannot temporarily disconnect the IPC channel from the main process.`);
                                work.send({ disconnect: false });
                            }
                        } else {
                            _globalData.workerInfo.disConnectIng = false;
                        }
                    } else if (Object.hasOwnProperty.call(message, `createWorkerSuccess`)) {
                        // 接收到子进程的通知，子进程的服务启动情况
                        const workersCunt = clusterUtils.getClusterWorkerCount();
                        if (message.createWorkerSuccess === true) {
                            // 启动成功
                            _globalData.workerInfo.disConnectIng = false;
                            _globalData.workerInfo.workerNum += 1;
                            _richwayKoaLog.logInfo(`The number of sub processes: ${workersCunt}, the number of sub processes available currently：${_globalData.workerInfo.workerNum}`);
                            resolve();
                        } else {
                            // 启动失败,关闭该子进程
                            _richwayKoaLog.logInfo(`The number of sub processes: ${workersCunt}, the number of sub processes available currently：${_globalData.workerInfo.workerNum}`);
                            _globalData.workerInfo.workerNum += 1;
                            work.exit(1);
                            reject({
                                code: `0004`,
                                message: `Service startup failure of worker${work.id}`
                            });
                        }
                    } else if (Object.hasOwnProperty.call(message, `call`)) {
                        if (message.call === true) {
                            clusterWorkers[`worker${work.id}`] += 1;
                            _richwayKoaLog.logInfo(`cluster load balancing:${JSON.stringify(clusterWorkers)}`);
                        }
                    } else if (Object.hasOwnProperty.call(message, `tasks`)) {
                        if (message.tasks === `ALL_TASK_SUCCESS`) {
                            _richwayKoaLog.logInfo(`Receiving the notification of child process ${work.id}, task ALL_TASK is executed successfully.`);
                        } else if (message.tasks === `ALL_TASK_FAILED`) {
                            _richwayKoaLog.logError(`The task ALL_TASK failed to receive the notification from the child process ${work.id}.`);
                        } else if (message.tasks === `ALL_ONLINE`) {
                            // 通知所有的进程去执行任务ONLINE_TASK
                            _richwayKoaLog.logInfo(`The task ALL_ONLINE from the child process ${work.id}.`);
                            noticeAllWorkerPerformTask(`ONLINE_TASK`);
                        }
                    }

                    // _richwayKoaLog.logInfo(`[[master-worker${work.id}]] master got message from worker${work.id}: ${JSON.stringify(message)}`);
                });
                work.send({
                    globalData: _globalData
                });
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}


/**
 * 初始化主进程
 * @returns {Promise<any>} is
 */
function initClusterMaster() {
    _richwayKoaLog.logInfo(`The main process starts the service. >>>`);
    return new Promise((resolve, reject) => {
        startClusterMasterSever().then(() => {
            // 根据maxCount开启相应数量的子进程
            const workerArr = [];
            for (let i = 0; i < _richwayKoaConfig.clusterInfo.maxCount; i++) {
                workerArr.push(createClusterWorkerByFork());
            }
            Promise.all(workerArr).then(() => {
                // 通知某一个子进程执行一些任务
                clusterUtils.getWorkerByRandom().send({
                    tasks: `ALL_TASK`
                });
                _richwayKoaLog.logInfo(`The main process starts the service successfully. >>>`);
                resolve();
            }).catch(e => {
                reject(e);
            });

            // 监听worker创建成功事件  复制好一个工作进程后，工作进程主动发送一条 online 消息给主进程，主进程收到消息后触发，回调参数 worker 对象
            cluster.on(`online`, worker => {
                _richwayKoaLog.logInfo(`A notification of the child process ${worker.id} (${worker.process.pid}) has been received. It has been created successfully.`);
            });
            // 监听worker断线事件  主进程和工作进程之间 IPC 通道断开后触发
            cluster.on(`disconnect`, worker => {
                _richwayKoaLog.logInfo(`The IPC channel between the sub process ${worker.id}(${worker.process.pid}) and the main process has been disconnected.`);
            });
            // 监听worker退出事件  有工作进程退出时触发，回调参数 worker 对象、code 退出码、signal 进程被 kill 时的信号
            cluster.on(`exit`, (worker, code, signal) => {
                _richwayKoaLog.logInfo(`The child process${worker.id}(${worker.process.pid}) sign out，Sign out code${code}，Exit signal${signal}, died`);

                _globalData.workerInfo.workerNum -= 1;
                // 补齐子进程
                createClusterWorkerByFork();
            });

            // 监听worker向master状态事件   当一个工作进程调用 listen() 后触发，事件处理器两个参数 worker：工作进程对象；address: 包括 address、port、addressType
            cluster.on(`listening`, (worker, address) => {
                _richwayKoaLog.logInfo(`listening: worker${worker.id}, pid:${worker.process.pid},Address:${address.address}:${address.port}`);
            });
        }).catch(e => {
            _richwayKoaLog.logError(`Failure of main process to start service: ${JSON.stringify(e)}`);
            reject(e);
        });
    });
}

module.exports = {
    noticeAllWorkerPerformTask,
    startClusterMasterSever,
    initClusterMaster
};
