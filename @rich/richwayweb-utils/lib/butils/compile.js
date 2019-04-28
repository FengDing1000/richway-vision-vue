// 字符串加密
module.exports.compile = code => {
    if (!code && code !== 0) {
        return code;
    }
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
};

// 字符串解密
module.exports.uncompile = code => {
    if (!code && code !== 0) {
        return code;
    }
    code = unescape(code);
    let c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
};
