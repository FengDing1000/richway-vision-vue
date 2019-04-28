/**
 * node服务启动成功的提示
 * @returns {boolean} is
 */
function success() {
    _richwayKoaLog.logInfo(`//==========================================//\n`);
    _richwayKoaLog.logInfo(`NODE Service startup time ... ${((new Date()).getTime() - _globalData.timeStamp_app)}`);
    _richwayKoaLog.logInfo(`//==========================================//\n\n`);

    console.log(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);
    console.log(`         \n\
                        ----                  ----         ----                  ----          ----\n\
                       /   /                 /   /        /     \\               /   /        /      \\\n\
                      /   /                 /   /        /       \\             /   /        /   /\\   \\\n\
                     /   /                 /   /        /   / \\   \\           /   /        /   /  \\   \\\n\
                    /   /_________________/   /        /   /   \\   \\         /   /        /   /____\\   \\\n\
                   /   __________________    /        /   /     \\   \\       /   /        /   ________   \\\n\
                  /   /                 /   /        /   /       \\   \\     /   /        /   /        \\   \\\n\
                 /   /                 /   /        /   /         \\   \\   /   /        /   /          \\   \\\n\
                /   /                 /   /        /   /           \\   \\ /   /        /   /            \\   \\\n\
               /   /                 /   /        /   /             \\       /        /   /              \\   \\\n\
              /___/                 /___/        /___/               \\ ___ /        /___/                \\___\\`, `          NodeWeb 2.0 Service startup time ... ${((new Date()).getTime() - _globalData.timeStamp_app)}`);

    return true;
}


/**
 * node服务启动失败的提示
 * @param {object}err is
 * @returns {boolean} is
 */
function failed(err = {}) {
    _richwayKoaLog.logError(`//==========================================//`);
    _richwayKoaLog.logError(`NODE Service restarts failure: ${JSON.stringify(err)}`);
    _richwayKoaLog.logError(`//==========================================//\n\n`);

    return false;
}


module.exports = {
    success,
    failed
};
