const crypto = require(`crypto`);

// md5加密
module.exports.encryption = text => crypto.createHash(`md5`).update(text).digest(`hex`);

// sha1加密
module.exports.sha1 = text => crypto.createHash(`sha1`).update(text).digest(`hex`);

module.exports.encode64 = input => {
    const keyStr = `ABCDEFGHIJKLMNOP` + `QRSTUVWXYZabcdef` + `ghijklmnopqrstuv` + `wxyz0123456789+/` + `=`;
    let output = ``;
    let chr1; let chr2; let
        chr3 = ``;
    let enc1; let enc2; let enc3; let
        enc4 = ``;
    let i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = ``;
        enc1 = enc2 = enc3 = enc4 = ``;
    } while (i < input.length);
    return output;
};
