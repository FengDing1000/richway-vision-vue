/**

 @Name：richwayui request模块二次封装
 @Author：g.zhou
 @License：MIT

 */

const request = require(`request`);

module.exports = (options = {}) => new Promise((resolve, reject) => {
    if (!options.timeout) {
        options.timeout = parseInt((`${_richwayKoaConfig.timeout}`), 10) * 1000;
    }
    const timestamp = (new Date()).getTime();

    if (options.method === `POST` && options.formData) {
        request.post({
            url: options.url,
            formData: options.formData
        }, (err, res = {}, body) => {
            if (!err && res.statusCode === 200) {
                let jsonData = {};
                try {
                    jsonData = JSON.parse(body);
                } catch (e) {
                    jsonData = body;
                }

                resolve({
                    status: `success`,
                    data: jsonData
                });
            } else {
                reject({
                    code: `0456`,
                    status: `failed`,
                    message: `${JSON.stringify(err)},time:${((new Date()).getTime()) - timestamp}`,
                    data: {
                        err,
                        res
                    }
                });
            }
        });
    } else {
        request(options, (err, res = {}, body) => {
            options = null;
            if (!err && res.statusCode === 200) {
                let jsonData = {};
                try {
                    jsonData = JSON.parse(body);
                } catch (e) {
                    jsonData = body;
                }

                resolve(jsonData);
            } else {
                reject({
                    code: `0456`,
                    status: `failed`,
                    message: `${JSON.stringify(err)},time:${((new Date()).getTime()) - timestamp}`,
                    data: {
                        err,
                        res
                    }
                });
            }
        });
    }
});
