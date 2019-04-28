const path = require(`path`);
const fs = require(`fs`);
const Mock = require(`mockjs`);

/**
 * 获取边界数据
 * @param {object}ctx is
 * @constructor
 */
function GetBoundary(ctx) {
    const queryInfo = ctx._queryInfo;

    let bounds = ``;
    try {
        const filePath = path.join(__dirname, `../../mapData/boundary/${queryInfo.boundaryCode}.txt`);
        console.log(`file path is ${filePath}`);
        bounds = (fs.readFileSync(filePath, 'utf-8')).toString();
    } catch (err) {
        _richwayKoaLog.logErr(`readFileSync failed`, err);
        _richwayKoaLog.logError(err);
    }

    if (bounds) {
        return {
            code: `1000`,
            success: true,
            data: [bounds],
            total: 0,
            pages: 0
        };
    } else {
        return {
            code: `7002`,
            success: false,
            message: `没有找到对应行政区的边界数据`,
            data: null,
            total: 0,
            pages: 0
        };
    }
}

function GetCloudList() {
    return {"success":true,"code":1000,"message":"","total":19,"pages":0,"data":[{"id":"1e493b1b5d2340ca820a6db163140a10","cid":"11","tm":1547683200000,"filename":"cloud/cloudData/20190117080000000.PNG","comments":null,"adcd":null},{"id":"aff8db80abe3475c893efb819b26710e","cid":"11","tm":1547681400000,"filename":"cloud/cloudData/20190117073000000.PNG","comments":null,"adcd":null},{"id":"cdec6fe979b947a3b3faa35e454b1c3a","cid":"11","tm":1547679600000,"filename":"cloud/cloudData/20190117070000000.PNG","comments":null,"adcd":null},{"id":"c58c56e0895c45c5b48a173598949d5d","cid":"11","tm":1547678700000,"filename":"cloud/cloudData/20190117064500000.PNG","comments":null,"adcd":null},{"id":"0c7737ac28a14fd1b4a1a4f5b0fdee2f","cid":"11","tm":1547677800000,"filename":"cloud/cloudData/20190117063000000.PNG","comments":null,"adcd":null},{"id":"8d7cbe79c7844756a964cb257ca2ab98","cid":"11","tm":1547676900000,"filename":"cloud/cloudData/20190117061500000.PNG","comments":null,"adcd":null},{"id":"409c2766304e4d8d97396536b2c5bddc","cid":"11","tm":1547676000000,"filename":"cloud/cloudData/20190117060000000.PNG","comments":null,"adcd":null},{"id":"e0f27aa9fb15444cb59320a600724df3","cid":"11","tm":1547675100000,"filename":"cloud/cloudData/20190117054500000.PNG","comments":null,"adcd":null},{"id":"3a4839b76a9f45e7bd6e16407e2c3ed8","cid":"11","tm":1547673300000,"filename":"cloud/cloudData/20190117051500000.PNG","comments":null,"adcd":null},{"id":"f593920a6c684b9ba802a3c21f15b588","cid":"11","tm":1547672400000,"filename":"cloud/cloudData/20190117050000000.PNG","comments":null,"adcd":null},{"id":"fd2bd7beea4f47be8679cb4556f95bfd","cid":"11","tm":1547670600000,"filename":"cloud/cloudData/20190117043000000.PNG","comments":null,"adcd":null},{"id":"0908db46ebe249f0bbb6b328dc47767f","cid":"11","tm":1547668800000,"filename":"cloud/cloudData/20190117040000000.PNG","comments":null,"adcd":null},{"id":"897786647be54b2990f9d1b6b77c2bb1","cid":"11","tm":1547667900000,"filename":"cloud/cloudData/20190117034500000.PNG","comments":null,"adcd":null},{"id":"974caad6ee734a1b83b10c7b07295079","cid":"11","tm":1547666100000,"filename":"cloud/cloudData/20190117031500000.PNG","comments":null,"adcd":null},{"id":"14f3475c7a2d47528babde077730e3be","cid":"11","tm":1547665200000,"filename":"cloud/cloudData/20190117030000000.PNG","comments":null,"adcd":null},{"id":"93eed9c76cfc44259832a33d47187ddf","cid":"11","tm":1547662500000,"filename":"cloud/cloudData/20190117021500000.PNG","comments":null,"adcd":null},{"id":"a45cbc16b2654b30a69adb6c6d791152","cid":"11","tm":1547661600000,"filename":"cloud/cloudData/20190117020000000.PNG","comments":null,"adcd":null},{"id":"e3755fe9a5674bad8b002fe770685b1e","cid":"11","tm":1547659800000,"filename":"cloud/cloudData/20190117013000000.PNG","comments":null,"adcd":null},{"id":"2362f84117fa42b5a0c197f1c5ec7c80","cid":"11","tm":1547658000000,"filename":"cloud/cloudData/20190117010000000.PNG","comments":null,"adcd":null}],"stackTrace":null,"time":{"totalTime":202,"cloudTime":201,"nodeTime":1}};
    // return Mock.mock({
    //     code: `4567`,
    //     success: true,
    //     message: ``,
    //     "data|20": [
    //         {
    //             "adcd": "",
    //             "cid": "6",
    //             "comments": "",
    //             "etm": "2018-11-20 10:31:51",
    //             "filePath": "cloud/radarData/20181120100000000.png",
    //             "filecd": "d9bad572b3044a149c330bb7766aeaaa",
    //             "filename": "20181120100000000.png",
    //             "id": "acfdbc27f18346f18c592da85d8535d2",
    //             "tm": "2018-11-20 10:00:00"
    //         }
    //     ],
    //     total: 0,
    //     pages: 0
    // });
}

function GetContourList(ctx) {
    return require(`./data.js`);
}

function GetLocation() {
    return {
        success: true,
        data: [106.42827260199903,28.46415415618941]
    }
}


module.exports = {
    GetBoundary,
    GetCloudList,
    GetContourList,
    GetLocation
};
