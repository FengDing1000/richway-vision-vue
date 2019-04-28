/**
 * @desc webpack打包入口文件
 */
const browser = require(`./browser`);
const clone = require(`./clone`);
const compile = require(`./compile`);
const filter = require(`./filter`);
const guid = require(`./guid`);
const hump = require(`./hump`);
const md5 = require(`./md5`);
const random = require(`./random`);
const rem = require(`./rem`);
const sleep = require(`./sleep`);
const console = require(`./console`);
const subscribe = require(`./subscribe`);

const rgbToHex = require(`./rgbToHex`);

const eventHandler = require(`./event/handler`);
const throttleDuration = require(`./function/throttleDuration`);

const getBodySizeInfo = require(`./dom/getBodySizeInfo`);
const toggleFullScreen = require(`./dom/toggleFullScreen`);
const offset = require(`./dom/offset`);
const deepClone = require(`./object/deepClone`);
const shallowClone = require(`./object/shallowClone`);
const date = require(`./date`);
const getRequest = require(`./url/getRequest`);

const cssLoad = require(`./load/cssLoad`);
const imgLoad = require(`./load/imgLoad`);
const jsLoad = require(`./load/jsLoad`);
const loadAll = require(`./load/loadAll`);

const latlngToLeaflet = require(`./latlngToLeaflet`);
const downloadFile = require(`./downloadFile`);

module.exports = {
    browser,
    clone,
    compile,
    filter,
    guid,
    hump,
    md5,
    random,
    rem,
    sleep,
    console,
    subscribe,
    rgbToHex,
    eventHandler,
    throttleDuration,
    getBodySizeInfo,
    toggleFullScreen,
    offset,
    deepClone,
    shallowClone,
    date,
    getRequest,
    cssLoad,
    imgLoad,
    jsLoad,
    loadAll,
    latlngToLeaflet,
    downloadFile
};
