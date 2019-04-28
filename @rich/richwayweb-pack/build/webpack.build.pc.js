const path = require(`path`);
const utils = require(`./utils`);
const plugin = require(`./webpack.plugin`);
const webpackBuildConfig = require(`./webpack.build.config`);

module.exports = (config = {}, info = {}) => {
    return new Promise(function (resolve, reject) {
        const platform = info.platform || `pc`;
        const webpackBuildConfigInfo = webpackBuildConfig(config);
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
                page.chunks = [`manifest`, `richway_vendor`, `richway_common`, entryName];
                webpackBuildConfigInfo.plugins.push(plugin.html(config, page));
                pageIndex++;
            }

            const assetsRoot = path.join(config.webpack.build.assetsRoot, platform);
            webpackBuildConfigInfo.entry = entry;
            webpackBuildConfigInfo.output.path = assetsRoot;
            webpackBuildConfigInfo.output.publicPath = `/${platform}/`;
            webpackBuildConfigInfo.plugins.unshift(plugin.cleanWebpackPlugin([assetsRoot], {}));
            // webpackBuildConfigInfo.plugins.push(plugin.inlineManifest());

            resolve(webpackBuildConfigInfo);
        }).catch((err) => {
            reject(err);
        });
    });
};
