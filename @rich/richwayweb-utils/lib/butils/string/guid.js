/**
 * 获取全局的唯一guid
 * @returns {string} id
 * @private
 */
function getGuid() {
    let d = new Date().getTime();
    const uuid = `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === `x` ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

module.exports = getGuid;
