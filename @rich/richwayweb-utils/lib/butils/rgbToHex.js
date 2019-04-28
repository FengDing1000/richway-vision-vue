// 十六进制颜色值的正则表达式
const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/* RGB颜色转换为16进制 */
module.exports = rgbString => {
    if (/^(rgb|RGB)/.test(rgbString)) {
        const aColor = rgbString.replace(/(?:\(|\)|rgb|RGB)*/g, ``).split(`,`);
        let strHex = `#`;
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex === `0`) {
                hex += hex;
            }
            if (hex.length === 1) {
                hex = `0${hex}`;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = rgbString;
        }
        return strHex;
    } if (reg.test(rgbString)) {
        const aNum = rgbString.replace(/#/, ``).split(``);
        if (aNum.length === 6) {
            return rgbString;
        } if (aNum.length === 3) {
            let numHex = `#`;
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return rgbString;
    }
};
// export default colorHex;
