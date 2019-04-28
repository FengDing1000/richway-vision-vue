/**

 @Name：vue入口文件方法 PC端
 @Author：g.zhou
 @License：MIT

 */

// 加载公用样式
import './scss/base';
// 加载项目样式
import '$pc/scss/theme';
// 加载element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';

import RichWayWebUtils from '@rich/richwayweb-utils';

import JsonViewer from 'vue-json-viewer';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import vueSocketIo from 'vue-socket.io';
import socketIo from 'socket.io-client';
import _base from '../constants/base';
import router from './router';
import GetData from '$pc/service/getData';
import store from '$pc/store';
import { _notify, _message } from './utils/tool';

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
    _message(info);
});

// 全局设置一个对象
window._RichWay = {
    $base: _base,
    $getData: GetData,
    $map: {},
    $rem: rem(),
    $gl_notify: info => {
        window._Subscribe.create(`gl_notify`).trigger(`data`, info);
    },
    $gl_message: info => {
        window._Subscribe.create(`gl_message`).trigger(`data`, info);
    }
};

try {
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

    // JSON数据视图组件
    Vue.use(JsonViewer);

    // 图片查看组件
    Vue.use(Viewer);
    Viewer.setDefaults({
        Options: {
            inline: true,
            button: true,
            navbar: true,
            title: true,
            toolbar: true,
            tooltip: true,
            movable: true,
            zoomable: true,
            rotatable: true,
            scalable: true,
            transition: true,
            fullscreen: true,
            keyboard: true,
            url: `data-source`
        }
    });

    // 滚动加载指令
    Vue.directive(`loadmore`, {
        bind(el, binding) {
            let p = 0;
            let t = 0;
            let down = true;
            const selectWrap = el.querySelector(`.el-table__body-wrapper,.load-more-panel`);
            selectWrap.addEventListener(`scroll`, function () {
                const $this = this;
                throttleDuration(() => {
                    // 判断是否向下滚动
                    p = $this.scrollTop;
                    if (t < p) {
                        down = true;
                    } else {
                        down = false;
                    }
                    t = p;
                    // 判断是否到底
                    const sign = 10;
                    const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
                    if (scrollDistance <= sign && down) {
                        binding.value();
                    }
                }, 400, 400)();
            });
        }
    });

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

        if (_base.config.webSocket) {
            // 与服务端链接
            Vue.use(vueSocketIo, socketIo(_base.path.webSocketUrl));
        }

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
        new Vue({
            router: router(info.config),
            store
        }).$mount(`#richway_main`);
    });
};
