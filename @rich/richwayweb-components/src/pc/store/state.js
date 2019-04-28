import _setting from '$src/constants/setting';

export default {
    // 当前页面的模块名称
    moduleName: ``,

    // 当前页面的信息
    currentPageInfo: {
        // 当前页面的url
        url: ``,
        // 当前页面的模块名称
        module: ``,
        // 当前页面的main部分在更新
        loading: false,
        // 当前页面的详细信息
        info: {}
    },

    currentAppInfo: {},

    // 已经加载项
    loadedInfo: {
        platformInfo: {}
    },

    // 全局的页面设置
    settingInfo: _setting.settingInfo,

    // 全局的全屏加载loading
    fullLoading: _setting.fullLoading,

    // 全局的简略加载loading
    briefLoading: _setting.briefLoading,

    // 是否登录
    hasLogin: false,
    // 用户信息
    userInfo: {},
    // 导航菜单
    menuList: [],
    // 面包屑
    breadCrumbList: [],
    // 当前菜单
    currentMenu: ``,

    // 快捷登录弹窗
    fastLogin: {
        show: false,
        backgroundMask: `rgba(0,0,0,.3)`
    },

    // rem系数
    rem: 1
};
