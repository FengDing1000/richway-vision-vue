/**

 @Name：vue入口文件方法 rn端
 @Author：g.zhou
 @License：MIT

 */

import './scss/base';

import RichWayWebUtils from '@rich/richwayweb-utils';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import _base from '../constants/base';
import router from './router';
import GetData from '$app/service/getData';
import store from '$app/store';
import { _notify, _messageBox } from './utils/tool';
import FastClick from './utils/fastclick';

const Vue = require(`vue`);
const { subscribe, rem, throttleDuration } = RichWayWebUtils;
const _log = RichWayWebUtils.console.log;

window._Subscribe = subscribe();
// 订阅全局的通知
window._Subscribe.create(`gl_notify`).listen(`data`, info => {
    _notify(info);
});
// 订阅全局的消息提示
window._Subscribe.create(`gl_message`).listen(`data`, info => {
    _messageBox(info);
});

// 全局设置一个对象
window._RichWay = {
    $base: _base,
    $getData: GetData,
    $map: {},
    $rem: rem({
        platform: `wap`
    }),
    $gl_notify: info => {
        window._Subscribe.create(`gl_notify`).trigger(`data`, info);
    },
    $gl_message: info => {
        window._Subscribe.create(`gl_message`).trigger(`data`, info);
    }
};

try {
    Vue.use(MintUI);

    // 取消 Vue 所有的日志与警告。
    Vue.config.silent = _base._envPro;

    // 配置是否允许 vue-devtools 检查代码,务必在加载 Vue 之后，立即同步设置以下内容
    Vue.config.devtools = _base._envDev;

    // 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。
    Vue.config.errorHandler = (err, vm, info) => {
        _log(`Vue has error...`);
        _log(err);
        _log(info);
    };

    // 为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略。 `trace` 是组件的继承关系追踪
    Vue.config.warnHandler = (msg, vm, trace) => {
        _log(`Vue has warn...`);
        _log(msg);
        _log(trace);
    };

    _log(`has init Vue`);
} catch (err) {
    _log(err);
}


export default (info = {}) => {
    GetData.GetBaseConfig().then(res => {
        _base.path = res.data.path;
        _base.config = res.data.config;
        store.commit(`SET_CURRENT_PAGE_INFO`, {
            info: res.data.config
        });

        Vue.mixin({
            created() {
                this.$base = _base;
                this.$getData = GetData;
                this._log = _log;
                this.$mapLayersFun = {};
                if (window._RichWay.$mapLayersFun) {
                    this.$mapLayersFun = window._RichWay.$mapLayersFun;
                }
            }
        });

        if (`addEventListener` in document) {
            document.addEventListener(`DOMContentLoaded`, () => {
                FastClick.attach(document.body);
            }, false);
        }

        new Vue({
            router: router(info.config),
            store
        }).$mount(`#richway_main`);
    });
};
