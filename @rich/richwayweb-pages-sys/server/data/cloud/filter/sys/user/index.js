function FilterUserInfoParametersFun(ctx = {}, {}, config = {}) {
    const queryInfo = ctx._queryInfo;
    const userInfo = _richwayKoaSession.getUserInfo(ctx);
    queryInfo.userAccount = userInfo.userAccount;
    return queryInfo;
}

function GetUserInfoFun(ctx) {
    return {
        success: true,
        data: _richwayKoaSession.getUserInfo(ctx)
    };
}

/**
 * 获取用户信息
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterUserInfoResultFun(ctx = {}, resInfo = {}) {
    if (resInfo.success && resInfo.data) {
        _richwayKoaSession.setUserInfo(ctx, resInfo.data);
    } else {
        resInfo.message = `获取当前账号信息失败！`;
    }
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
    GetUserInfoFun,
    FilterUserInfoResultFun,
    FilterUpdateLayoutResultFun
};
