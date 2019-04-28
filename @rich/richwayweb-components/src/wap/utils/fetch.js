import RichWayWebUtils from '@rich/richwayweb-utils';
import axios from 'axios';
import _base from '../../constants/base';
import * as _tool from './tool';
import { setStore, getStore } from '../../utils/storage';
import store from '$wap/store';

const { compile } = RichWayWebUtils.compile;
const _log = RichWayWebUtils.console.log;

const { source } = (window._RNConfig || {});

require(`es6-promise-always`);

const requestCount = {
    brief: 0,
    full: 0
};

function notifyErrorInfo(code = `9000`, err = {}) {
    const pathName = window.location.pathname;
    if (code === 1001 && (pathName === `/portal` || pathName === `/`)) {
        return false;
    }
    const errorData = {
        code: `${code}`,
        message: err.message || JSON.stringify(err) || _base._fetchInfo.errorTips
    };
    // 通知显示错误信息
    _tool._notify({
        title: `失败`,
        type: `error`,
        message: `${errorData.message}(${errorData.code})`
    });
}

function setLoading(config = {}, num = 1) {
    if (config.fullLoading === true) {
        requestCount.full += num;
        _tool._toggleFullLoading({
            show: requestCount.full > 0
        });
    } else {
        requestCount.brief += num;
        _tool._toggleBriefLoading({
            show: requestCount.brief > 0
        });
    }
    _log(`request count is: ${JSON.stringify(requestCount)}`);

    return true;
}

/**
 * axios 基础配置
 * @type {number}
 */
axios.defaults.baseURL = _base._interfaceUrl;
axios.defaults.timeout = _base._fetchInfo.timeOut;

/**
 * 添加一个请求拦截器
 */
axios.interceptors.request.use((config = {}) => {
    _log(`axios.interceptors.request success...`, config);
    Object.assign(config.headers, {
        accessToken: window._RichWay.$base.config.accessToken || ``,
        appId: window._RichWay.$base.config.appId || ``
    });
    return config;
}, (err = {}) => {
    // 对请求错误做些什么
    _log(`axios.interceptors.request err...`, err);
    notifyErrorInfo(9001, err);
    return Promise.reject(err);
});

/**
 * 添加一个响应拦截器
 */
axios.interceptors.response.use((res = {}) => {
    // 对响应数据做点什么
    _log(`axios.interceptors.response success...`, res);
    const currentConfig = res.config.config || {};
    setLoading(currentConfig, -1);

    const resData = res.data || {};
    try {
        if (res.status === 200) {
            if (resData.code === 1000) {
                // 如果允许缓存，则把数据保存在本地
                if (currentConfig.cache) {
                    setStore(res.config.url, res.data, currentConfig.exp);
                }
                // 如果successTips为true,则直接通知message
                if (currentConfig.successTips === true) {
                    _tool._notify({
                        message: resData.message
                    });
                }
                return resData;
            }
            if (resData.code === 1001) {
                // node服务session过期的情况，需要重新登录
                // 显示快捷登录弹窗
                if (((store.state.currentPageInfo || {}).info || {}).mustLogin === true) {
                    // _tool._toggleFastLogin({ show: true });
                    _tool._hasToLogin(resData.message);
                }

                store.commit(`SET_USER_INFO`, {});
            } else if (resData.code === 1002) {
                // node服务报错

            } else if (resData.code === 1003) {
                // node服务报错
                window.location.href = `/login`;
            } else {
                // 其他情况
            }
        } else {
            resData.code = 9002;
            resData.message = `服务异常：${res.statusText}`;
        }
    } catch (err) {
        resData.code = 9003;
        resData.message = JSON.stringify(err);
    }

    notifyErrorInfo(resData.code, resData);
    _log(`axios.interceptors.response failed...`);
    return Promise.reject(resData);
}, (err = {}) => {
    // 对响应错误做点什么
    _log(`axios.interceptors.response err...`, err);
    setLoading(err.config.config, -1);
    notifyErrorInfo(9004, err);
    return Promise.reject(err);
});


// 配合RN
const callbackListInfo = {};
window.document.addEventListener(`message`, event => {
    let res = {};
    try {
        res = JSON.parse(event.data);
    } catch (e) {
        _log(4444, e);
    }
    if (res.from === `RN`) {
        callbackListInfo[res.to](res);
    }
});

function getRNInfoByPostMessage(info) {
    return new Promise((resolve, reject) => {
        try {
            callbackListInfo[info.from] = res => {
                resolve(res);
            };
            setTimeout(() => {
                window.postMessage(JSON.stringify(info), `*`);
            }, 500);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * 参数url，请求的地址
 * @param {string}url 请求的地址
 * @param {object}params 请求的参数
 * @param {object}config 配置，后期使用
 * @returns {*} Promise
 */
export default (url, params = {}, config = {}) => {
    try {
        if (!url) {
            const errorData = {
                code: 9005,
                message: `url is null`
            };
            notifyErrorInfo(9005, errorData);
            return Promise.reject(errorData);
        }
        // 统一处理参数
        if (typeof params === `string`) {
            params = {};
        }
        // 添加语言
        params.langType = `zh_CN`;
        // 添加平台
        params.platformType = `wap`;

        if (source === `RN`) {
            return getRNInfoByPostMessage({
                to: `RN`,
                from: url,
                data: params
            });
        }
        // 如果cache为true，但是没有设置有效期exp，则默认为_base._exp
        if (config.cache === true && config.exp === undefined) {
            config.exp = _base._exp;
        }
        // 如果参数里面带有有效期exp，则认为是需要缓存数据到本地
        if (config.exp) {
            config.cache = true;
        }
        // 如果cache为true，同时本地的数据有效，则直接使用本地的数据
        const itemData = getStore(_base._interfaceUrl + url);
        if (config.cache === true && itemData) {
            _log(`fetch cache...`);
            return Promise.resolve(itemData);
        }

        const method = (config.method || `post`).toLocaleLowerCase();
        const options = {
            url,
            method,
            config
        };
        options.cancelToken = params.cancelToken;

        // 如果是需要加密的，则需要把参数加密
        if (_base.config.parameterEncryption) {
            params = { q: compile(JSON.stringify(params || {})) };
        }

        if (method === `post`) {
            options.data = params;
        } else if (method === `get`) {
            options.params = params;
        }
        setLoading(config, 1);
        return axios(options);
    } catch (err) {
        _log(`fetch try catch err...`);
        notifyErrorInfo(9006, err);
        return Promise.reject(err);
    }
};
