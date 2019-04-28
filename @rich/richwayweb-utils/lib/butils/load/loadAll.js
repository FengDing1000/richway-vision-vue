/**
 * 加载JS文件
 * @param {string}src is
 * @param {object}doneCallback is
 * @param {object}failCallback is
 * @return {boolean} is
 */

const cssLoad = require(`./cssLoad`);
const jsLoad = require(`./jsLoad`);

function loadAll(arr = [], doneCallback, failCallback) {
    let count = 0;

    const init = function (){
        count++;
        if (count === arr.length) {
            doneCallback();
        }
    }

    for (const path of arr) {
        if ((path || ``).indexOf(`.js`) > -1) {
            jsLoad(path, init);
        } else if ((path || ``).indexOf(`.css`) > -1) {
            cssLoad(path, init);
        }
    }
}

module.exports = loadAll;
