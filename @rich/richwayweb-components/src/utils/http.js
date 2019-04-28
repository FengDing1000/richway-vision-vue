import axios from 'axios';

const instance = axios.create({
    baseURL: ``,
    timeout: 50000
});

let cancel;
const promiseArr = {};
const { CancelToken } = axios;

// http request 拦截器
instance.interceptors.request.use(
    config => {
        // 发起请求时，取消掉当前正在进行的相同请求
        if (promiseArr[config.url]) {
            promiseArr[config.url](`操作取消`);
            promiseArr[config.url] = cancel;
        } else {
            promiseArr[config.url] = cancel;
        }

        Object.assign(config.headers, {
            accessToken: window._RichWay.$base.config.accessToken,
            appId: window._RichWay.$base.config.appId
        });
        config.baseURL = window._RichWay.$base.path.interfaceServiceHost;
        return config;
    },
    error => Promise.reject(error)
);


// http response 拦截器
instance.interceptors.response.use(
    response => response,
    error => {
        if (error && error.response) {
            switch (error.response.status) {
            case 400:
                error.message = `错误请求`;
                break;
            case 401:
                error.message = `未授权，请重新登录`;
                break;
            case 403:
                error.message = `拒绝访问`;
                break;
            case 404:
                error.message = `请求错误,未找到该资源`;
                break;
            case 405:
                error.message = `请求方法未允许`;
                break;
            case 408:
                error.message = `请求超时`;
                break;
            case 500:
                error.message = `服务器端出错`;
                break;
            case 501:
                error.message = `网络未实现`;
                break;
            case 502:
                error.message = `网络错误`;
                break;
            case 503:
                error.message = `服务不可用`;
                break;
            case 504:
                error.message = `网络超时`;
                break;
            case 505:
                error.message = `http版本不支持该请求`;
                break;
            default:
                error.message = `连接错误${error.response.status}`;
            }
        } else {
            error.message = `连接到服务器失败`;
        }
        // message.error(error.message)
        return Promise.resolve(error.response);
    }
);


/**
 * 封装get方法
 * @param url
 * @param param
 * @returns {Promise}
 */

function getFetch(url, param = {}) {
    return new Promise((resolve, reject) => {
        instance({
            method: `get`,
            url,
            params: param,
            cancelToken: new CancelToken(c => {
                cancel = c;
            })
        }).then(res => {
            resolve(res);
        });
    });
}


/**
 * 封装post请求
 * @param url
 * @param param
 * @returns {Promise}
 */

function postFetch(url, param = {}) {
    return new Promise((resolve, reject) => {
        instance({
            method: `post`,
            url,
            data: param,
            cancelToken: new CancelToken(c => {
                cancel = c;
            })
        }).then(res => {
            resolve(res);
        });
    });
}

/**
 * 封装patch请求
 * @param url
 * @param param
 * @returns {Promise}
 */

function patchFetch(url, param = {}) {
    return new Promise((resolve, reject) => {
        instance({
            method: `patch`,
            url,
            data: param,
            cancelToken: new CancelToken(c => {
                cancel = c;
            })
        }).then(res => {
            resolve(res);
        });
    });
}

/**
 * 封装put请求
 * @param url
 * @param param
 * @returns {Promise}
 */

function putFetch(url, param = {}) {
    return new Promise((resolve, reject) => {
        instance({
            method: `put`,
            url,
            data: param,
            cancelToken: new CancelToken(c => {
                cancel = c;
            })
        }).then(res => {
            resolve(res);
        });
    });
}

/**
 * 封装delete请求
 * @param url
 * @param param
 * @returns {Promise}
 */

function deleteFetch(url, param = {}) {
    return new Promise((resolve, reject) => {
        instance({
            method: `delete`,
            url,
            data: param,
            cancelToken: new CancelToken(c => {
                cancel = c;
            })
        }).then(res => {
            resolve(res);
        });
    });
}

export default {
    getFetch,
    postFetch,
    patchFetch,
    putFetch,
    deleteFetch
};
