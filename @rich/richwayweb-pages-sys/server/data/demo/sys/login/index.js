function Login() {
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: {
            token: {
                accessToken: `wwwwww`,
            },
            appId: `dddddddddddddddddd`,
            appName: `云服务平台`,
            userAccount: `wwwwww`,
            userName: `张三`,
            adcd: `520000000000000`,
            adnm: `贵州省`
        }
    };
}

function LoginOut() {
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

module.exports = {
    Login,
    LoginOut
};
