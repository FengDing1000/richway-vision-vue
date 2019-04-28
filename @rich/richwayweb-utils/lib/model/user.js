class User {
    constructor(info = {}) {
        this.userName = info.userName || ``;
        this.nickName = info.nickName || ``;
        this.userAccount = info.userAccount || ``;
        this.layoutInfo = info.layoutInfo || ``;
        this.accountType = info.accountType || {};
        this.loginName = info.loginName || ``;
        this.loginPassWord = info.loginPassWord || ``;
        this.mobileNo = info.mobileNo || ``;
        this.userStatus = info.userStatus || ``;

        this.appId = info.appId || ``;
        this.appName = info.appName || ``;
        this.email = info.email || ``;
        this.isActive = info.isActive || ``;
        this.isUser = info.isUser || ``;

        // 行政区编码
        this.adcd = info.adcd || info.adCd || ``;
        // 行政区名称
        this.adnm = info.adnm || info.adNm || ``;

        // 最后登录时间
        this.loginTime = info.loginTime || (new Date()).getTime();
        // 在线状态
        this.isOnline = info.isOnline || true;
        // 累计登录时间
        this.durationTime = info.durationTime || 0;
    }
}

module.exports = {
    User
};
