const path = require(`path`);
const loader = require(`./webpack.loader`);
const plugin = require(`./webpack.plugin`);

module.exports = (config = {})=>{
    // 基本配置
    const webpackConfig = {
        mode: config.webpack.env,
        cache: true,
        devtool: config.webpack.envPro ? `cheap-module-source-map` : `cheap-module-eval-source-map`,
        resolve: {
            modules: [
                path.resolve(`node_modules`)
            ],
            extensions: [`.js`, `.vue`, `.jsx`, `.css`, `.scss`, `.less`],
            alias: {
                $config: path.resolve(process.cwd(), `config`),
                $src: path.resolve(process.cwd(), `src`),
                $pc: path.resolve(process.cwd(), `src/pc`),
                $wap: path.resolve(process.cwd(), `src/wap`),
                $app: path.resolve(process.cwd(), `src/app`),
                _vux: `vux`,
                _echarts: `echarts/index.common`
            }
        },
        resolveLoader: {
            modules: [
                path.resolve(`node_modules`)
            ]
        },
        module: {
            rules: [
                loader.css(config),
                loader.vue(config),
                loader.babel(config),
                loader.esLint(config),
                loader.text(config),
                loader.images(config),
                loader.fonts(config),
                loader.medias(config),
                loader.html(config)
            ]
        },
        // 配置插件
        plugins: [
            plugin.definePlugin(config)
        ],
        externals: {
            "leaflet": "L",
            "cesium": "Cesium",
            "turf": "turf",
            "jQuery": "$",
            "vue": "Vue",
            "vue-router": "VueRouter",
            "vuex": "Vuex",
            "moment": `moment`,
            "element-ui": "ELEMENT"
        },
        target: `web`
    };

    return webpackConfig
};
