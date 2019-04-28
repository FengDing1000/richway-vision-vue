import RichWayWebUtils from '@rich/richwayweb-utils';
import _base from '../constants/base';

const { compile, uncompile } = RichWayWebUtils.compile;
const _log = RichWayWebUtils.console.log;

const compileFlag = `NOCOMPILE`;
const compileLen = 3000;

/**
 * 判断当前环境是否支持localStorage
 * @returns {boolean} is boolean
 */
function supportsHtml5Storage() {
    try {
        return `localStorage` in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}

/**
 * 根据key删除localStorage中对应的value
 * @param {string} key is string
 * @returns {boolean} is boolean
 */
export const removeStore = key => {
    if (!supportsHtml5Storage) {
        return false;
    }
    if (!key) {
        return false;
    }
    key += `_${_base._companyCode}`;

    if (_base._envPro) {
        key = compile(key);
    }
    window.localStorage.removeItem(key);
    return true;
};

/**
 * 以键值对的形式把数据存储在localStorage中
 * 设置数据的存储时间，默认一分钟;exp<=0的时候，则一直保留
 * @param {string} key is string
 * @param {*} value is any
 * @param {number} exp is number
 * @returns {boolean} is boolean
 */
export const setStore = (key, value, exp) => {
    if (!supportsHtml5Storage) {
        return false;
    }
    if (!key) {
        return false;
    }
    key += `_${_base._companyCode}`;

    if (!exp) {
        exp = _base._exp;
    }
    exp = exp * 60 * 1000;

    value = JSON.stringify({
        val: value,
        exp,
        time: new Date().getTime(),
        ver: _base._version
    });
    if (_base._envPro) {
        key = compile(key);
        if (value.length < compileLen) {
            value = compile(value);
        } else {
            value += compileFlag;
        }
    }
    try {
        localStorage.setItem(key, value);
    } catch (oException) {
        if (oException.name === `QuotaExceededError`) {
            _log(`超出本地存储限额！`);
            // 如果历史信息不重要了，可清空后再设置
            localStorage.clear();
            localStorage.setItem(key, value);
        }
    }
    return true;
};

/**
 * 根据key从localStorage获取value
 * 超过有效期，或js版本号发生变化，则移除数据返回空值
 * @param {string} key is string
 * @returns {*} is any
 */
export const getStore = key => {
    if (!supportsHtml5Storage) {
        return null;
    }
    if (!key) {
        return null;
    }

    key += `_${_base._companyCode}`;

    if (_base._envPro) {
        key = compile(key);
    }

    let data = window.localStorage.getItem(key);
    if (!data) {
        return null;
    }
    if (_base._envPro) {
        if (data.indexOf(compileFlag) <= -1) {
            data = uncompile(data);
        } else {
            data = (data || ``).replace(compileFlag, ``);
        }
    }
    try {
        data = JSON.parse(data);
    } catch (e) {
        _log(`getStore is error: ${e}`);
    }

    if ((data.exp > 0 && new Date().getTime() - data.time > data.exp) || data.ver !== _base._version) {
        removeStore(key);
        return null;
    }
    return data.val;
};
