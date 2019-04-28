const path = require(`path`);
const fs = require(`fs`);

/**
 * 同步读取目录的信息
 * @param {string} path is
 * @returns {*} is
 */
function readDirectorySync(path) {
    try {
        return fs.readdirSync(path);
    } catch (e) {
        return false;
    }
}

/**
 * 同步创建目录
 * @param {string}path is
 * @returns {boolean} is
 */
function createDirectorySync(path) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    } catch (e) {
        return false;
    }
    return true;
}


/**
 * 同步删除目录
 * @param {string} pathUrl is
 * @returns {boolean} is
 */
function deleteDirectorySync(pathUrl) {
    try {
        let files = [];
        if (fs.existsSync(pathUrl)) {
            // 读取该文件夹
            files = fs.readdirSync(pathUrl);
            for (const file of files) {
                const curPath = path.join(pathUrl, file);
                if (fs.statSync(curPath).isDirectory()) {
                    deleteDirectorySync(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            }
            fs.rmdirSync(pathUrl);
        }
    } catch (e) {
        return false;
    }
    return true;
}


/**
 * 同步删除文件
 * @param {string} path is
 * @returns {boolean} is
 */
function deleteFileSync(path) {
    if (!path) {
        return false;
    }
    try {
        fs.exists(path, exists => {
            if (exists) {
                fs.unlink(path);
                return true;
            }
            return false;
        });
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * 同步读取文件
 * @param {string} path is
 * @param {boolean} flag is
 * @returns {Buffer | string | *} is
 */
function readFileSync(path, flag) {
    try {
        return fs.readFileSync(path, flag || `utf8`);
    } catch (e) {
        return false;
    }
}

// 创建文件夹
function mkdirSync(pos, dirArray, _callback) {
    const len = dirArray.length;
    if (pos >= len || pos > 10) {
        _callback();
        return;
    }
    let currentDir = ``;
    for (let i = 0; i <= pos; i++) {
        if (i !== 0) currentDir += `/`;
        currentDir += dirArray[i];
    }
    if (fs.existsSync(currentDir)) {
        console.log(`${currentDir}文件夹-已存在！`);
        mkdirSync(pos + 1, dirArray, _callback);
    } else {
        try {
            fs.mkdirSync(currentDir);
            console.log(`${currentDir}文件夹-创建成功！`);
            mkdirSync(pos + 1, dirArray, _callback);
        } catch (err) {
            console.log(currentDir, `创建文件夹出错！`);
        }
    }
}

// 创建目录结构
function mkdirsSync(dirpath, _callback = () => {}) {
    const dirArray = dirpath.split(`/`);
    if (fs.existsSync(dirpath)) {
        console.log(`文件夹已经存在!准备写入文件!`);
        _callback();
    } else {
        mkdirSync(0, dirArray, () => {
            console.log(`文件夹创建完毕!准备写入文件!`);
            _callback();
        });
    }
}

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

module.exports = {
    readDirectorySync,
    createDirectorySync,
    deleteDirectorySync,
    deleteFileSync,
    readFileSync,
    mkdirsSync,
    copy
};
