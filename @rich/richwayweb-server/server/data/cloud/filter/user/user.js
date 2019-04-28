function FilterUserInfoParametersFun(ctx = {}) {
    const queryInfo = ctx._queryInfo;
    const userInfo = _richwayKoaSession.getUserInfo(ctx);
    queryInfo.userAccount = userInfo.userAccount;
    return queryInfo;
}

/**
 * 获取用户信息
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterUserInfoResultFun(ctx = {}, resInfo = {}) {
    const data = resInfo.data || [];
    // 把当前的用户信息保存到session中
    [resInfo.data] = data;
    _richwayKoaSession.setUserInfo(ctx, resInfo.data);
    return resInfo;
}

/**
 * 修改用户的页面布局信息
 * @param {object}ctx is
 * @param {object}resInfo is
 * @return {{}} is
 * @constructor
 */
function FilterUpdateLayoutResultFun(ctx = {}, resInfo = {}) {
    const userInfo = _richwayKoaSession.getUserInfo(ctx);
    userInfo.layoutInfo = resInfo.data;
    _richwayKoaSession.setUserInfo(ctx, userInfo);

    return resInfo;
}

module.exports = {
    FilterUserInfoParametersFun,
    FilterUserInfoResultFun,
    FilterUpdateLayoutResultFun
};
