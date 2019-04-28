const languagesInterface = {
    NONE: { zh_CN: `没有找到提示语`, en_US: `No hints found` },
    ReSearch: {
        zh_CN: `由于长时间未操作，请重新查询`,
        en_US: `As no operations have been attempted for a long time, please search again`
    }, // 后台返回 does not exist or is expired || Document with id
    NeedLogin: {
        zh_CN: `由于长时间未操作，当前页面已失效，请重新登录`,
        en_US: `As no operations have been attempted for a long time, the current pages has expired. Please refresh the pages`
    }, // node端session失效


    UMNeedLogin: { zh_CN: `获取用户信息失败，请重新登录`, en_US: `Failed to get user information. Please log in again` },

    // 登录，登出
    LoginSuccess: { zh_CN: `登录成功`, en_US: `Login successful` },
    LoginFailed: { zh_CN: `登录失败`, en_US: `Sign in failed` },
    LogOutSuccess: { zh_CN: `登出成功`, en_US: `Logout successful` },


    RequestParameterErr: { zh_CN: `请求参数中含有非法字符`, en_US: `The request parameter contains illegal characters` },
    RequestUrlErr: { zh_CN: `请求路径中含有非法字符`, en_US: `The request url contains illegal characters` },
    BusinessFailed: { zh_CN: `业务操作失败`, en_US: `Business operation failure` }
};

module.exports.languagesInterface = languagesInterface;
