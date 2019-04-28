import * as _mt from './mutationTypes';
import _setting from '../../constants/setting';

export default {
    // 全局的页面设置
    [_mt.SET_SETTING_INFO](state, opt = {}) {
        // state.settingInfo = Object.assign({}, _setting.settingInfo, opt);
        state.settingInfo = Object.assign({}, state.settingInfo, opt);
    },

    // 全局的全屏加载loading
    [_mt.SET_FULL_LOADING](state, opt = {}) {
        state.fullLoading = Object.assign({}, _setting.fullLoading, opt);
    },

    // 全局的简略加载loading
    [_mt.SET_BRIEF_LOADING](state, opt = {}) {
        state.briefLoading = Object.assign({}, _setting.briefLoading, opt);
    },

    // 设置当前页面的信息
    [_mt.SET_CURRENT_PAGE_INFO](state, opt = {}) {
        state.currentPageInfo = Object.assign({}, state.currentPageInfo, opt);
    },
    [_mt.SET_CURRENT_APP_INFO](state, opt = {}) {
        state.currentAppInfo = Object.assign({}, state.currentAppInfo, opt);
    },


    // 设置加载完成的信息
    [_mt.SET_LOADED_INFO](state, opt = {}) {
        state.loadedInfo = opt;
    },

    // 设置用户信息
    [_mt.SET_USER_INFO](state, opt = {}) {
        state.userInfo = opt;
        state.hasLogin = !!state.userInfo.userAccount;
    },

    // 设置导航菜单
    [_mt.SET_MENU_LIST](state, opt = []) {
        state.menuList = opt;
    },

    // 设置面包屑
    [_mt.SET_BREAD_CRUMB_LIST](state, opt = []) {
        state.breadCrumbList = opt;
    },

    // 设置当前菜单
    [_mt.SET_CURRENT_MENU](state, opt = ``) {
        state.currentMenu = opt;
    },

    // 设置快捷登录弹窗
    [_mt.SET_FAST_LOGIN](state, opt = {}) {
        state.fastLogin.show = opt.show || false;
    },

    // 设置REM系数
    [_mt.SET_REM](state, num = 1) {
        state.rem = num;
    }
};
