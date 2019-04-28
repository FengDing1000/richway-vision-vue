/**
 * 睡眠
 * @param {number}numberMillis is
 * @returns {boolean} is
 */
module.exports = (numberMillis = 1500) => {
    let now = new Date();
    const exitTime = now.getTime() + numberMillis;
    let bl = false;
    while (!bl) {
        now = new Date();
        if (now.getTime() > exitTime) {
            bl = true;
        }
    }
    return true;
};
