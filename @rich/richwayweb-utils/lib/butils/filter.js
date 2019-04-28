const illegalCharRegex = [
    {
        pattern: `((\\s+|^)(and|exec|count|chr|mid|master|or|truncate|char|declare|join|alert)(\\s+|$))`,
        modifiers: `ig`
    },
    {
        pattern: `^(0x\\w+)`,
        modifiers: `ig`
    },
    {
        pattern: `(insert|select|delete|update|create|drop)(\\s+)`,
        modifiers: `ig`
    },
    {
        pattern: `([\\<\\>\\'\\|\\;\\&\\$"\\+]+)|(\\/\\*)|(\\*\\/)|(\\(\\))`,
        modifiers: `g`
    }
];

const illegalUrlRegex = [
    {
        pattern: `((\\s+|^)(count|chr|mid|master|truncate|char|join|)(\\s+|$))`,
        modifiers: `ig`
    },
    {
        pattern: `^(0x\\w+)`,
        modifiers: `ig`
    },
    {
        pattern: `(insert|select|delete|update|create|drop)(\\s+)`,
        modifiers: `ig`
    },
    {
        pattern: `([\\<\\>\\'\\|\\;\\&\\$"\\+\\,]+)|(\\/\\*)|(\\*\\/)|(\\(\\))`,
        modifiers: `g`
    }
];

function regString(o, str) {
    if (!str) {
        return false;
    }
    let bl = false;
    for (const item of o) {
        if ((new RegExp(item.pattern, item.modifiers)).test(str)) {
            bl = true;
            break;
        }
    }
    return bl;
}

function regObject(o, info = {}) {
    let bl = false;
    for (const key in info) {
        if (Object.hasOwnProperty.call(info, key)) {
            if (typeof (info[key]) === `string`) {
                if (regString(o, info[key])) {
                    bl = true;
                    break;
                }
            } else if (typeof (info[key]) === `object`) {
                if (regObject(o, info[key])) {
                    bl = true;
                    break;
                }
            }
            if (bl) {
                break;
            }
        }
    }
    return bl;
}

/**
 * 判断对象中的属性是否含有非法字符
 * @param {object} info is
 * @returns {boolean} is
 */
module.exports.parameterFilter = info => {
    if (typeof (info) === `object`) {
        return !regObject(illegalCharRegex, info);
    } if (typeof (info) === `string`) {
        return !regString(illegalCharRegex, info);
    }
    return true;
};

/**
 * 判断url中是否含有非法字符
 * @param {string} url is
 * @returns {boolean} is
 */
module.exports.urlFilter = url => !regString(illegalUrlRegex, url);
