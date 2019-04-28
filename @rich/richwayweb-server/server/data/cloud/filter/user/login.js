const RichWayWebUtils = require(`@rich/richwayweb-utils`);

/**
 * 登录参数处理
 * @param {object}ctx is
 * @return {{}} is
 */
function FilterLoginParametersFun(ctx) {
    const queryInfo = ctx._queryInfo;
    queryInfo.passWord = RichWayWebUtils.compile.uncompile(queryInfo.passWord);
    _richwayKoaSession.setUserInfo(ctx, {
        userAccount: queryInfo.userName
    });
    return {
        userId: queryInfo.userName,
        // password: RichWayWebUtils.md5.encryption(queryInfo.passWord)
        password: queryInfo.passWord
    };
}

/**
 * 登录结果处理
 * @param {object}ctx is
 * @param {object}resInfo is
 * @returns {{}} is
 */
function FilterLoginResultFun(ctx = {}, resInfo = {}) {
    // 把当前的登录信息的token保存到session
    _richwayKoaSession.setToken(ctx, resInfo.data);
    return resInfo;
}


module.exports = {
    FilterLoginParametersFun,
    FilterLoginResultFun
};
