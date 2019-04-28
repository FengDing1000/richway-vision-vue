const path = require(`path`);
const fs = require(`fs`);
const moment = require('moment');

/**
 * 删除7天前的日志
 */
function clearLogTask() {
    // 日志根目录
    const baseLogPath = path.join(process.cwd(), `logs`);
    fs.readdir(baseLogPath, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function(pathtpm){
            const src = path.join(baseLogPath, pathtpm)
            fs.readdir(src, function( err, paths ){
                paths.forEach(function(pathtpm){
                    const subSrc = path.join(src, pathtpm)
                    const exp = pathtpm.substring(0, pathtpm.indexOf(`-`));
                    const currentPath = path.join(src, `${exp}-${moment().subtract(_richwayKoaConfig.logDelIntervalTime || 7, 'd').format('YYYY-MM-DD')}-01.log`);

                    if (currentPath > subSrc) {
                        console.log(1111, currentPath, subSrc);

                        fs.exists(subSrc, exists => {
                            if (exists) {
                                fs.unlink(subSrc);
                                return true;
                            }
                            return false;
                        });
                    }
                });
            });
        });
    });
}


module.exports = {
    clearLogTask
};
