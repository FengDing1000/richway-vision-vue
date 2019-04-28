const path = require(`path`);
const utils = require(`./utils`);
const plugin = require(`./webpack.plugin`);
const webpackDevConfig = require(`./webpack.dev.config`);

module.exports = (config, info) => {
    return new Promise(function (resolve, reject) {
        const platform = info.platform || `pc`;
        const webpackDevConfigInfo = webpackDevConfig(config, info);

        // 入口数组
        const entry = {};
        // 模板html数组
        // const htmls = [];
        // 获取入口页面数组的相关信息，同时生成html模板页面
        let pageIndex = 1;

        utils.getPagesInfo({
            path: path.resolve(platform === `pc` ? config.webpack.entryPcDir : config.webpack.entryWapDir),
            platform,
            config,
            flag: info.flag
        }).then((pages) => {
            for (const page of pages) {
                console.log(`page${pageIndex} options is ${JSON.stringify(page)}`);

                const entryName = `${page.code}_main`;
                entry[entryName] = page.entry;
                page.chunks = [entryName];
                webpackDevConfigInfo.plugins.push(plugin.html(config, page));
                pageIndex++;
            }

            webpackDevConfigInfo.entry = entry;

            resolve(webpackDevConfigInfo);
        }).catch((err) => {
            reject(err);
        });
    });
};
