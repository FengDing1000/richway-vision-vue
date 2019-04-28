/**

 @Name：richwayui 项目cluster模块的入口文件
 @Author：g.zhou
 @License：MIT

 */

const path = require(`path`);
const cluster = require(`cluster`);
const numCPUs = require(`os`).cpus().length;

const mastClusterPath = path.join(_richwayKoaConfig.rootDirServer, `bin/common/cluster/master`);
const workerClusterPath = path.join(_richwayKoaConfig.rootDirServer, `bin/common/cluster/worker`);
const resultInfo = require(path.join(_richwayKoaConfig.rootDirServer, `bin/common/cluster/result`));

const getProcessType = () => `${cluster.isMaster ? `master` : `worker`}(${process.pid})`;

function init() {
    process.on(`unhandledRejection`, (reason, p) => {
        console.log(`[error-${getProcessType()}]Unhandled Rejection at: Promise`, p, `reason:`, reason);
    });
    process.on(`uncaughtException`, err => {
        console.log(`[error-${getProcessType()}]Caught exception: ${JSON.stringify(err)}`);
    });

    // 集群服务的相关参数
    if (!_richwayKoaConfig.clusterInfo) {
        _richwayKoaConfig.clusterInfo = {
            switch: `on`,
            maxCount: numCPUs,
            maxMemory: 1024
        };
    }

    if (_richwayKoaConfig.clusterInfo.switch === `on`) {
        // 如果开启了集群服务
        if (cluster.isMaster) {
            // 如果当前进程是主进程的，则初始化主进程的内容
            if (_richwayKoaConfig.clusterInfo.maxCount > numCPUs) {
                _richwayKoaConfig.clusterInfo.maxCount = numCPUs;
            }
            require(mastClusterPath).initClusterMaster().then(() => {
                resultInfo.success();
            }).catch(e => {
                resultInfo.failed(e);
            });
        } else {
            // 如果当前进程是子进程的，则初始化子进程的内容
            require(workerClusterPath).initClusterWorker();
        }
    } else {
        // 如果没有开启集群服务，则在同一个进程里面先执行主进程的内容，再执行一次子进程的内容
        require(mastClusterPath).startClusterMasterSever().then(() => {
            global._globalData.workerInfo.id = 1;
            return require(workerClusterPath).startClusterWorkerSever();
        }).then(() => ({})
        )
            .then(() => {
                resultInfo.success();
            })
            .catch(e => {
                resultInfo.failed(e);
            });
    }
}

module.exports = {
    init
};
