/**

 @Name：richwayui 项目的定时任务文件
 @Author：g.zhou
 @License：MIT

 */
const schedule = require("node-schedule");
const KoaOnLine = require(`../models/koa.online`);
const master = require('../cluster/master');
const task = require('./task');

/**
 * 定时任务，每小时执行一次
 */
function taskStartByHour() {
    // 每小时的1分1秒的时候触发下面的任务
    // schedule.scheduleJob('1 1 * * * *',()=>{
    //     _richwayKoaLog.logInfo(`start taskStartByHour...`);
    //     KoaOnLine.clearOnlineInfo();
    // });
    // 每5分钟执行一次
    var rule     = new schedule.RecurrenceRule();
    var times    = [1,6,11,16,21,26,31,36,41,46,51,56];
    rule.minute  = times;
    schedule.scheduleJob(rule, () =>{
        _richwayKoaLog.logInfo(`start taskStartByHour...`);
        KoaOnLine.clearOnlineInfo().then(() => {
            if (_richwayKoaConfig.clusterInfo.switch === `on`) {
                // 通知所有的子进程去执行任务ONLINE_TASK
                master.noticeAllWorkerPerformTask(`ONLINE_TASK`);
            } else {
                global._richwayKoaSocket.KoaSocket_online();
            }
        });
    });
}

/**
 * 定时任务，每天执行一次
 */
function taskStartByDay() {
    // 每天的凌晨1点1分30秒触发
    schedule.scheduleJob('30 1 1 * * *',()=>{
        _richwayKoaLog.logInfo(`start taskStartByDay...`);
        task.clearLogTask();
    });
}

function init() {
    taskStartByHour();
    taskStartByDay();
}

module.exports = {
    init
};
