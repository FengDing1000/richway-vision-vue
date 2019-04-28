/**
 * 加密
 * @param {string} code is string
 * @returns {*} is string
 * @private
 */
export const compile = code => {
    let c;
    if (code === null || code === `undefined` || code === ``) {
        return code;
    }
    code += ``;
    c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
};

/**
 * 解密
 * @param {string} code is string
 * @returns {*} is any
 * @private
 */
export const uncompile = code => {
    let c;
    if (code === null || code === `undefined` || code === ``) {
        return code;
    }
    code += ``;
    code = unescape(code);
    c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (let i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
};
