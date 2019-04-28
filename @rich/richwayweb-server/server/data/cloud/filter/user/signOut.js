/**
 * 登出
 * @param {object}ctx is
 * @returns {boolean} is
 */
function FilterSignOutResultFun(ctx = {}) {
    // 把当前session里面关于用户信息的数据清空
    _richwayKoaSession.setUserInfo(ctx);
    _richwayKoaSession.setMenuList(ctx);
    return {
        code: 1000,
        success: true,
        message: `注销成功`
    };
}

module.exports = {
    FilterSignOutResultFun
};
