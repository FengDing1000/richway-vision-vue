const path = require(`path`);
const copyAssets = require(`./build/copyAssets`);
const pcDevHost = require(`./build/webpack.dev.pc`);
const pcBuildPro = require(`./build/webpack.build.pc`);
const utils = require(`./build/utils`);
const createPage = require(`./build/createPage`);
const buildDist = require(`./build/buildDist`);
module.exports = {
    copyAssetsFun: (config)=>{
        return copyAssets(config);
    },
    pcDevHostFun: (config, info = {})=>{
        return pcDevHost(config, info);
    },
    pcBuildProFun: (config, info = {})=>{
        return pcBuildPro(config, info);
    },
    pcInitFile: (config, info = {}) =>{
        const platform = info.platform || `pc`;
        return utils.getPagesInfo({
            path: path.resolve(platform === `pc` ? config.webpack.entryPcDir : config.webpack.entryWapDir),
            platform,
            config,
            flag: info.flag
        });
    },
    pcCreatePage: (o, config) => {
        return createPage(o, config);
    },
    pcBuildDist: (config) => {
        return buildDist(config);
    }
};