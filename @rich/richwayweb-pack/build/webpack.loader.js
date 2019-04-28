const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

function cssLoaders(config, options) {
    options = options || {};
    const cssLoader = {
        loader: `css-loader`,
        // options是loader的选项配置
        options: {
            // 生成环境下压缩文件
            minimize: config.webpack.envPro,
            // 根据参数是否生成sourceMap文件
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: `postcss-loader`,
        // options是loader的选项配置
        options: {
            // 生成环境下压缩文件
            minimize: config.webpack.envPro,
            // 根据参数是否生成sourceMap文件
            sourceMap: options.sourceMap

        }
    };

    // 生成loader
    function generateLoaders(loader, loaderOptions) {
        const rules = [`vue-style-loader`, cssLoader];
        if (options.usePostCSS) {
            rules.push(postcssLoader);
        }
        if (loader) {
            rules.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)

        if (options.extract) {
            rules.splice(1, 0, MiniCssExtractPlugin.loader);
        }
        return rules;
    }

    // 返回css类型对应的loader组成的对象 generateLoaders()来生成loader
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders(`less`),
        sass: generateLoaders(`sass`, { indentedSyntax: true }),
        scss: generateLoaders(`sass`),
        stylus: generateLoaders(`stylus`),
        styl: generateLoaders(`stylus`)
    };
}

function styleLoaders(config, options) {
    // 定义返回的数组，数组中保存的是针对各类型的样式文件的处理方式
    const output = [];
    // 调用cssLoaders方法返回各类型的样式对象(css: loader)
    const loaders = cssLoaders(config, options);
    // 循环遍历loaders
    for (const extension in loaders) {
        if (Object.hasOwnProperty.call(loaders, extension)) {
            // 根据遍历获得的key(extension)来得到value(loader)
            const loader = loaders[extension];
            output.push({
                // 处理的文件类型
                test: new RegExp(`\\.${extension}$`),
                // 用loader来处理，loader来自loaders[extension]
                use: loader
            });
        }
    }
    return output;
}


/**
 * 加载css,less,scss文件
 * @return {{test: RegExp, use: *[]}} is
 */
exports.css = (config) => ({
    test: /\.(css|less|scss)$/,
    use: [
        config.webpack.envDev ? {
            loader: `style-loader`,
            options: {
                sourceMap: config.webpack.envDev
            }
        } : MiniCssExtractPlugin.loader,
        {
            loader: `css-loader`,
            options: {
                sourceMap: config.webpack.envDev,
                importLoaders: 1
            }
        },
        {
            loader: `postcss-loader`,
            options: {
                sourceMap: config.webpack.envDev
            }
        },
        {
            loader: `less-loader`,
            options: {
                sourceMap: config.webpack.envDev
            }
        },
        {
            loader: `sass-loader`,
            options: {
                sourceMap: config.webpack.envDev
            }
        }
    ]
});

/**
 * 处理vue文件，包括里面引用的样式文件和style代码
 * @return {{test: RegExp, loader: string, options: {loaders, cssSourceMap: boolean, cacheBusting: boolean, transformToRequire: {video: string[], source: string, img: string, image: string}}}} is
 */
exports.vue = (config) => ({
    test: /\.vue$/,
    loader: `vue-loader`,
    options: {
        loaders: styleLoaders(config, {
            sourceMap: config.webpack.envDev,
            extract: config.webpack.envPro,
            usePostCSS: config.webpack.envPro
        }),
        cssSourceMap: config.webpack.envDev,
        cacheBusting: config.webpack.envDev,
        transformToRequire: {
            video: [`src`, `poster`],
            source: `src`,
            img: `src`,
            image: `xlink:href`
        }
    }
});

/**
 * 处理.js/.vue文件里面的javascript语法
 * @return {{enforce: string, test: RegExp, loader: string, include, options: {fix: boolean, cache: boolean, failOnError: *, useEslintrc: boolean, formatter: *}}} is
 */
exports.esLint = (config) => ({
    enforce: `pre`,
    test: /\.(js|vue)$/,
    loader: `eslint-loader`,
    include: path.resolve(`src`),
    options: {
        fix: true,
        cache: config.webpack.envDev ? path.resolve(`.cache/eslint`) : false,
        // 生产环境发现代码不合法，则中断编译
        failOnError: config.webpack.envPro,
        useEslintrc: true,
        formatter: require(`eslint-friendly-formatter`)
    }
});

/**
 * 处理.js文件里面的javascript语法
 * @return {{test: RegExp, include, use: {loader: string, options: {cacheDirectory, babelrc: boolean}}}} is
 */
exports.babel = (config) => ({
    test: /\.js$/,
    include: path.resolve(`src`),
    use: {
        loader: `babel-loader`,
        options: {
            cacheDirectory: path.resolve(`.cache/babel`),
            babelrc: true
        }
    }
});

// html中的img标签
// exports.htmlImg = (opt = {}) => {
//     return {
//         test: /\.html$/,
//         use: ["html-withimg-loader"]
//     };
// }

/**
 * 处理图片
 * @param {*}opt is
 * @return {{test: RegExp, use: *[]}} is
 */
exports.images = (config, opt = {}) => ({
    test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
    use: [
        {
            loader: `url-loader`,
            options: {
                limit: 10000,
                name: opt.filename || `images/[name].[hash:8].[ext]`
            }
        },
        // 生产模式启用图片压缩
        config.webpack.envPro && {
            loader: `imagemin-loader`,
            options: {
                plugins: [
                    {
                        use: `imagemin-pngquant`
                    },
                    {
                        use: `imagemin-mozjpeg`
                    }
                    // {
                    //   use: `imagemin-guetzli`
                    // },
                    // {
                    //   use: `imagemin-gifsicle`
                    // },
                    // {
                    //   use: `imagemin-svgo`
                    // },
                    // {
                    //   use: `imagemin-webp`
                    // }
                ]
            }
        }
    ].filter(p => p)
});

/**
 * 处理字体文件
 * @param {*}opt is
 * @return {{test: RegExp, loader: string, options: {limit: number, name: string}}} is
 */
exports.fonts = (config, opt = {}) => ({
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: `url-loader`,
    options: {
        limit: 3000,
        name: opt.filename || `fonts/[name].[hash:8].[ext]`
    }
});

/**
 * 处理多媒体
 * @param {*}opt is
 * @return {{test: RegExp, loader: string, options: {limit: number, name: string}}} is
 */
exports.medias = (config, opt = {}) => ({
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: `url-loader`,
    options: {
        limit: 3000,
        name: opt.filename || `medias/[name].[hash:8].[ext]`
    }
});

/**
 * 处理.md/.txt/.tpl类文件
 * @return {{test: RegExp, loader: string}} is
 */
exports.text = (config) => ({
    test: /\.(md|txt|tpl)$/,
    loader: `raw-loader`
});


/**
 * 处理_temp.html类模板文件
 * @param {*}opt is
 * @return {{test: RegExp, use: *[]}} is
 */
exports.html = (config, opt = {}) => ({
    test: /_temp.html$/,
    use: [{
        loader: `html-loader`,
        options: {
            minimize: opt.minimize || true
        }
    }]
});
