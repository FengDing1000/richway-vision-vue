const path = require(`path`);
const merge = require(`webpack-merge`);
const plugin = require(`./webpack.plugin`);

module.exports = (config = {}) => {
    const baseWebpackConfig = require(`./webpack.base.config`)(config);
    // 基本配置
    const webpackConfig = {
        output: {
            publicPath: `/`,
            filename: `js/[name].[chunkhash:8].bundle.js`,
            chunkFilename: `js/[name].[chunkhash:8].chunk.js`
        },
        optimization: {
            runtimeChunk: {
                name: `manifest`
            },
            minimizer: config.webpack.envPro ? [
                plugin.uglifyjsWebpackPlugin(),
                plugin.optimizeCssAssetsPlugin()
            ] : [],
            noEmitOnErrors: true,
            splitChunks: {
                chunks: `async`, // 必须三选一： "initial" | "all" | "async"
                minSize: 30000, // 最小尺寸
                minChunks: 2, // must be greater than or equal 2. The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
                maxAsyncRequests: 5, // 最大异步请求数
                maxInitialRequests: 3, // 最大初始化请求数
                name: true, // 名称，此选项可接收 function
                cacheGroups: {
                    vendor: { // key 为entry中定义的 入口名称
                        name: `richway_vendor`, // 要缓存的 分隔出来的 chunk 名称
                        chunks: `all`, // all-异步加载快，但初始下载量较大，文件共用性好； initial-初始下载量较小，但异步加载量较大，文件间有重复内容
                        priority: -10,
                        reuseExistingChunk: false, // 选项用于配置在模块完全匹配时重用已有的块，而不是创建新块
                        test: /[\\/]node_modules[\\/]/
                    },
                    common: { // key 为entry中定义的 入口名称
                        name: `richway_common`, // 要缓存的 分隔出来的 chunk 名称
                        chunks: `all`, // all-异步加载快，但初始下载量较大，文件共用性好； initial-初始下载量较小，但异步加载量较大，文件间有重复内容
                        priority: -10,
                        reuseExistingChunk: false, // 选项用于配置在模块完全匹配时重用已有的块，而不是创建新块
                        test: /[\\/]src[\\/]/
                    }
                }
            }
        },
        plugins: config.webpack.envPro ? [
            plugin.copyWebpackPlugin(config),
            plugin.progressPlugin(),
            plugin.aggressiveMergingPlugin(),
            plugin.hashedModuleIdsPlugin(),
            plugin.miniCssExtractPlugin(config),
            plugin.vuePlugin(config),
            plugin.webpackBundleAnalyzer(config, {
                filename: config.webpack.build.analyzerfilename
            })
        ] : [
            plugin.aggressiveMergingPlugin,
            plugin.vuePlugin(config)
        ],
        externals: {}
    };

    // 特殊要求，gzip处理
    if (config.webpack.envPro) {
        baseWebpackConfig.plugins.push(plugin.compression(config));
    }

    return merge(
        baseWebpackConfig,
        webpackConfig
    );
};
