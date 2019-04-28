const path = require(`path`);
const merge = require(`webpack-merge`);
const plugin = require(`./webpack.plugin`);

module.exports = (config = {}, info = {}) =>{
    const baseWebpackConfig = require(`./webpack.base.config`)(config);
    const platform = info.platform || `pc`;
    const service_router_path = platform === `pc` ? config.service_router_pc_path : config.service_router_wap_path;
    const routerPc = require(path.join(process.cwd(), service_router_path));
    const rewrites = [];
    for(const item of routerPc.pages){
        rewrites.push(
            { from: new RegExp(`^\\${item.url}[.]*`), to: `/${item.filename}` }
        );
    }

    console.log(`rewrites`, rewrites);

    const buildPath = path.join(process.cwd(), "dist");
    // 基本配置
    const webpackConfig = {
        output: {
            path: buildPath,
            filename:'bundle.js',
            publicPath:`${config.development.request_host}/`
        },
        devtool: `#eval-source-map`,
        plugins: [
            plugin.hotModuleReplacementPlugin(),
            plugin.occurenceOrderPlugin(config),
            plugin.vuePlugin(config),
            plugin.friendlyErrorsPlugin(config)
        ],
        devServer: {
            contentBase: buildPath,
            historyApiFallback: true, // 不跳转
            host: config.development.ip,
            port: config.development.port,
            inline: true, // 实时刷新
            hot: true, // Enable webpack's Hot Module Replacement feature
            progress:true,
            compress: true, // Enable gzip compression for everything served
            overlay: true, // Shows a full-screen overlay in the browser
            stats: `errors-only`, // To show only errors in your bundle
            open: true, // When open is enabled, the dev server will open the browser.
            proxy: {
                "/api": config.development.proxyApi,
                "/socket.io": `wss://${config.ip}:${config.port}`,
                "/assets": config.development.proxyApi
            },
            // index: `/html/gzshzh.html`,
            publicPath: `/`,
            historyApiFallback: {
                rewrites
            }
        }
    };

    return merge(baseWebpackConfig, webpackConfig)
};
