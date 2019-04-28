/**
 * 账号激活状态
 * @param {Number} code is
 * @returns {string} is
 * @private
 */
export const _filterIsActive = code => {
    if (code === 0) {
        return `未激活`;
    } if (code === 1) {
        return `已激活`;
    }
    return ``;
};

/**
 * 账号锁定状态
 * @param {Number} code is
 * @returns {string} is
 * @private
 */
export const _filterUserStatus = code => {
    if (code === 1) {
        return `正常`;
    } if (code === 2) {
        return `锁定`;
    }
    return ``;
};

/**
 * 账号的性别
 * @param {Number} code is
 * @returns {string} is
 * @private
 */
export const _filterUserSex = code => {
    if (code === 0) {
        return `女`;
    } if (code === 1) {
        return `男`;
    }
    return ``;
};

/**
 * 截取用户的姓名长度
 * @param {string}name is
 * @returns {string} is
 * @private
 */
export const _filterUserNameElip = (name = ``) => {
    const maxLen = 9;
    if (name.length <= maxLen) {
        return name;
    }
    return `${name.substring(0, maxLen)}...`;
};
