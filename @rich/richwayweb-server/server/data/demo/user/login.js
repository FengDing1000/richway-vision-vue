function Login() {
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: {
            token: `ddddddd`,
            expires: (new Date()).getTime() + 720000
        }
    };
}

module.exports = {
    Login
};
