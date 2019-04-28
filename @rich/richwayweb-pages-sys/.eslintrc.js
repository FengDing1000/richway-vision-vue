// https://eslint.org/docs/user-guide/configuring
const envPro = process.env.NODE_ENV === 'production';

module.exports = {
    //此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
        //环境定义了预定义的全局变量。更多在官网查看
        "browser": true,
        "node": true,
        "commonjs": true,
        "amd": true,
        "es6": true,
        "mocha": true
    },
    // JavaScript 语言选项
    parserOptions: {
        // ECMAScript 版本
        ecmaVersion: 6,
        //类型为module，因为代码使用了使用了ECMAScript模块
        sourceType: 'module',
        // 想使用的额外的语言特性:
        ecmaFeatures: {
            // 允许在全局作用域下使用 return 语句
            globalReturn: true,
            // impliedStric
            impliedStrict: true
        },
        allowImportExportEverywhere: true,
        //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
        //parser: 'vue-eslint-parser',
        parser: "babel-eslint",
    },
    // 列举不需要检查的全局对象
    globals: {
        _richwayKoaConfig: true,
        _richwayKoaInterface: true,
        _richwayKoaSession: true,
        _richwayKoaLog: true,
        _globalData: true
    },
    // 此项是用来配置标准的js风格
    extends: [
        'airbnb-base',
        //'standard',
        //'plugin:vue/base',
        //'plugin:vue/essential',
        //'plugin:vue/strongly-recommended',
        'plugin:vue/recommended',
    ],
    // required to lint *.vue files
    // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html,vue的
    plugins: [
        //'html',
        'vue',
        'import',
        'standard',
        'promise'],
    /**
     *  "off" 或 0 - 关闭规则
     *  "warn_manager" 或 1 - 开启规则，使用警告级别的错误：warn_manager (不会导致程序退出),
     *  "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    rules: {
        //缩进风格
        "indent": [2, 4],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': envPro ? 'error' : 'off',
        // 取消换行符\n或\r\n的验证
        "linebreak-style": "off",
        // 使用分号
        "semi": ["error", "always"],
        // 箭头函数的参数可以不使用圆括号
        "arrow-parens": ["error", "as-needed"],
        // 不允许末尾逗号
        "comma-dangle": ["error", "never"],
        // 关闭函数中return的检测
        "consistent-return": "off",
        // 花括号内的换行符不一定要格式一致
        "object-curly-newline": ["error", {"consistent": true}],
        // 取消对require的验证，使得可以使用require来加载图片的相对路径
        "global-require": "off",
        // 不验证函数括号内的换行
        "function-paren-newline": "off",
        // 取消自动解析路径，以此开启alias的别名路径设置
        "import/no-unresolved": "off",
        // 允许对函数参数进行再赋值
        "no-param-reassign": "off",
        // 取消对文件扩展名的验证
        "import/extensions": "off",
        // 取消行的最大长度的验证，使SVG不用重新调整格式
        "max-len": "off",
        //允许标识符中有下划线，从而支持vue中插件的使用
        "no-underscore-dangle": "off",
        // 启用console控制台
        "no-console": 'off',
        // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
        "no-unused-expressions": "off",
        // 取消变量声明覆盖的验证
        "no-shadow": "off",
        // 取消对元素特性只能使用中划线或小驼峰形式的验证
        "vue/attribute-hyphenation": 0,
        // 取消元素有多个特性时，每个特性独占一行的验证
        "vue/max-attributes-per-line": 0,
        //引号类型 `` "" ''
        "quotes": ["error", "backtick"],
        //对象字面量中的属性名是否强制双引号
        "quote-props": ["error", "as-needed"],
        //parseInt必须指定第二个参数
        "radix": ["error", "always"],
        //要求调用 isNaN()检查 NaN
        "use-isnan": "error",
        //强制使用有效的 JSDoc 注释
        "valid-jsdoc": "error",
        //强制 typeof 表达式与有效的字符串进行比较
        "valid-typeof": "error",
        //要求使用一致的 return 语句
        "consistent-return": "off",
        //要求遵循大括号约定
        "curly": "error",
        //要求 Switch 语句中有 Default 分支,此规则的目的是在 switch 语句中强制声明 default 分支。或者也可以在最后一个 case 分支下，使用 // no default 来表明此处不需要 default 分支。注释可以任何形式出现，比如 // No Default
        "default-case": "error",
        //禁用特定的全局变量
        "no-restricted-globals": ["error", "event"],
        //使用禁止一元型态操作符++状语从句
        "no-plusplus": "off",
        //禁止未声明的变量
        "no-undef": "error",
        //遍历对象语法
        "no-restricted-syntax": "off",
        //要求使用骆驼拼写法
        "camelcase": ["error"],
        "no-bitwise": "off",
        "no-mixed-operators": "off",
        'import/no-dynamic-require': "off",
        "prefer-promise-reject-errors": "off",
        "no-tabs": "off",


        "vue/no-dupe-keys": "error",
        "vue/max-attributes-per-line": [2, {
            "singleline": 1,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/html-closing-bracket-spacing": "error",
        "vue/html-indent": ["error", "tab", {
            "attribute": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "import/no-extraneous-dependencies": 0
    }
}
