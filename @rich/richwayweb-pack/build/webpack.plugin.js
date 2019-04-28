const path = require(`path`);
const glob = require(`glob`);
const webpack = require(`webpack`);
const notifier = require(`node-notifier`);
const readline = require(`readline`);

const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const InlineManifestWebpackPlugin = require(`inline-manifest-webpack-plugin`);
// const VconsolePlugin = require(`vconsole-webpack-plugin`);
const OptimizeCssAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
// html模板
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
// 清除目录等
const CleanWebpackPlugin = require(`clean-webpack-plugin`);
// 消除未使用的CSS
const PurifyCSSPlugin = require(`purifycss-webpack`);
// 引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
const CompressionWebpackPlugin = require(`compression-webpack-plugin`);
const FriendlyErrorsPlugin = require(`friendly-errors-webpack-plugin`);
const UglifyjsWebpackPlugin = require(`uglifyjs-webpack-plugin`);
const WebpackBundleAnalyzer = require(`webpack-bundle-analyzer`);
const VueLoader = require(`vue-loader`);

// 这里将 Node 中使用的变量也传入到 Web 环境中，以方便使用
exports.definePlugin = (config) => new webpack.DefinePlugin({
    'process.env': {
        // 此地有个坑
        NODE_ENV: JSON.stringify(config.webpack.env)
    }
});


/**
 * 调用webpack的热更新插件
 * @return {HotModuleReplacementPlugin|module.HotModuleReplacementPlugin} is
 */
exports.hotModuleReplacementPlugin = () => new webpack.HotModuleReplacementPlugin();


/**
 * 优化控制台输出
 * @return {*} is
 */
exports.friendlyErrorsPlugin = (config) => new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
        messages: [
            `Network  ->  ${config.development.request_host}/`
        ]
    },
    onErrors: (severity, errors) => {
        if (severity !== `error`) return;

        const error = errors[0];
        const filename = error.file && error.file.split(`!`).pop();

        notifier.notify({
            title: path.basename(path.resolve(`.`)),
            message: `${severity}: ${error.name}`,
            subtitle: filename || ``,
            icon: path.join(__dirname, `./logo.png`)
        });
    }
});


/**
 * 这是 NamedModulesPlugin 的进阶模块，它在其基础上对模块路径进行 MD5 摘要，不仅可以实现持久化缓存，同时还避免了它引起的两个问题（文件增大，路径泄露）。用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化！
 * @return {HashedModuleIdsPlugin} is
 */
exports.hashedModuleIdsPlugin = () => new webpack.HashedModuleIdsPlugin();


/**
 * js代码压缩插件
 * @return {*} is
 */
exports.uglifyjsWebpackPlugin = () => new UglifyjsWebpackPlugin({
    exclude: /\.min\.js$/,
    cache: true,
    // 开启多线程打包
    parallel: true,
    sourceMap: false
    // extractComments: false,
    // uglifyOptions: {
    //     compress: {
    //         unused: true,
    //         warnings: false,
    //         drop_debugger: true
    //     },
    //     output: {
    //         comments: false
    //     }
    // }
});


/**
 * Merge chunks
 * @return {AggressiveMergingPlugin} is
 */
exports.aggressiveMergingPlugin = () => new webpack.optimize.AggressiveMergingPlugin();


/**
 * 将manifest内联到html中，避免多发一次请求
 * @return {*} is
 */
exports.inlineManifest = () => new InlineManifestWebpackPlugin();


/**
 * 分离css文件
 * @param {object}opt is
 * @return {*} is
 */
exports.miniCssExtractPlugin = (opt = {}) => new MiniCssExtractPlugin({
    filename: opt.filename || `css/[name].[contenthash:8].css`,
    chunkFilename: opt.chunkFilename || `css/[name].[contenthash:8].css`
});


/**
 * 消除未使用的css
 * @return {*} is
 */
exports.purifyCSS = () => new PurifyCSSPlugin({
    // glob为扫描模块，使用其同步方法
    paths: glob.sync(path.join(process.cwd(), `client/static/html/*.html`))
});


/**
 * 优化css打包，避免重复打包，压缩css
 * @return {*} is
 */
exports.optimizeCssAssetsPlugin = () => new OptimizeCssAssetsPlugin({});


/**
 * 模块依赖分析
 * @param {object}opt is
 * @return {*} is
 */
exports.webpackBundleAnalyzer = (config, opt = {}) => new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
    openAnalyzer: config.webpack.envPro,
    analyzerMode: `static`, // server, static
    reportFilename: opt.filename || `report.html`
});


/**
 * html模板
 * @param {object}opt is
 * @return {*} is
 */
exports.html = (config, opt = {}) => {
    opt.config = config;

    let css = opt.css || [];
    let preJS = opt.preJS || [];
    let js = opt.js || [];

    delete opt.css;
    delete opt.preJS;
    delete opt.js;

    if(config.webpack.envDev) {
        const static_host = config.development.static_host;
        css = css.map((item)=>{
            if(item.indexOf(`http`) > -1){
                return item;
            } else {
                return `${static_host}${item}`;
            }
        });
        preJS = preJS.map((item)=>{
            if(item.indexOf(`http`) > -1){
                return item;
            } else {
                return `${static_host}${item}`;
            }
        });
        js = js.map((item)=>{
            if(item.indexOf(`http`) > -1){
                return item;
            } else {
                return `${static_host}${item}`;
            }
        });
    }


    return new HtmlWebpackPlugin(Object.assign({}, {
        // 页面标题
        title: ``,
        // 页面关键词
        keywords: config.webpack.keywords || ``,
        // 页面描述
        description: config.webpack.description || ``,
        // 页面图标
        icon: ``,
        // 页面css文件
        css,
        // 页面前置js
        preJS,
        // 页面后置JS
        js,
        // 入口文件名
        filename: `html/error.html`,
        // html模板文件
        template: path.resolve(`index.html`),
        inject: true,
        showErrors: true,
        chunks: [],
        // 这个选项决定了 script 标签的引用顺序。选项：’none’ | ‘auto’ | ‘dependency’ |’manual’ | {function}’
        // 1. none : 不排序
        // 2. auto : 基于chunks的id进行排序
        // 3. dependency : 按照不同文件的依赖关系排序
        // 4. function : 可以指定具体排序规则
        // 5. manual
        // chunksSortMode: `dependency`,
        minify: config.webpack.envDev ? null : {
            // 移除HTML中的注释
            removeComments: true,
            // 折叠空白区域 也就是压缩代码
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }
    }, opt))
};


/**
 * 删除指定目录
 * @param {array}arr is
 * @param {object}opt is
 * @return {*} is
 */
exports.cleanWebpackPlugin = (arr = [], opt) => new CleanWebpackPlugin(arr, Object.assign({}, {
    // 根目录
    root: process.cwd(),
    // 排除不想删除的文件
    exclude: [`favicon.ico`],
    // 开启在控制台输出信息
    verbose: true,
    // 启用删除文件
    dry: false
}, opt));


/**
 * vue插件
 * @return {VueLoader.VueLoaderPlugin} is
 */
exports.vuePlugin = (config) => new VueLoader.VueLoaderPlugin();


/**
 * gzip压缩
 * @return {*} is
 */
exports.compression = (config) => new CompressionWebpackPlugin({
    // 目标文件名
    asset: `[path].gz[query]`,
    // 使用gzip压缩
    algorithm: `gzip`,
    // 满足正则表达式的文件会被压缩
    test: new RegExp(`\\.(${config.webpack.build.productionGzipExtensions.join(`|`)})$`),
    // 资源文件大于10240B=10kB时会被压缩
    threshold: 10240,
    // 最小压缩比达到0.8时才会被压缩
    minRatio: 0.8
});


/**
 * 全局暴露统一入口
 * @return {ProvidePlugin} is
 */
exports.provide = () => new webpack.ProvidePlugin({
    ECharts: `echarts/index.common`
});


/**
 * 显示构建进度
 * @return {ProvidePlugin} is
 */
exports.progressPlugin = () => new webpack.ProgressPlugin((percentage, msg) => {
    readline.clearLine(process.stdout);
    console.log(`  ${(percentage * 100).toFixed(2)}%`, msg);
    readline.moveCursor(process.stdout, 0, -1);
});


exports.occurenceOrderPlugin = () => new webpack.optimize.OccurrenceOrderPlugin();


exports.copyWebpackPlugin = (config) => new CopyWebpackPlugin([{
    from: path.join(process.cwd(), `src/assets`),
    to: path.join(process.cwd(), `${config.rootDirClientAssets}/assets`)
}]);
