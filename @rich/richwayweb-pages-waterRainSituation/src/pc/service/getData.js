import fetch from '@rich/richwayweb-components/src/pc/utils/fetch';

export default {
    // 获取省份数据,
    GetProvinceData: params => fetch(`/base/getProvinceData`, params, { cache: true }),
    // 获取市区数据,
    GetSubRegionData: params => fetch(`/base/getSubRegionData`, params, {}),
    // 获取边界数据,
    GetBoundary: params => fetch(`/base/getBoundary`, params, {}),
    // 查询所有的app,
    GetAppAll: params => fetch(`/app/appAll`, params, {}),
    // 获取当前账号的菜单列表,
    GetMenuListForUser: params => fetch(`/menu/menuListForUser`, params, {}),
    // 获取项目中能使用的菜单列表,
    GetMenuListForAvailable: params => fetch(`/menu/menuLForAvailable`, params, {}),
    // 获取导航菜单的详细信息,
    GetMenuInfo: params => fetch(`/menu/menuInfo`, params, {}),
    // 新增菜单项,
    AddMenu: params => fetch(`/menu/addMenu`, params, { fullLoading: true, successTips: true }),
    // 修改菜单项,
    UpdateMenu: params => fetch(`/menu/updateMenu`, params, { fullLoading: true, successTips: true }),
    // 删除菜单项,
    DeleteMenu: params => fetch(`/menu/deleteMenu`, params, { fullLoading: true, successTips: true }),
    // 获取当前平台的菜单列表,
    GetMenuListForApp: params => fetch(`/menu/menuListForApp`, params, {}),
    // 获取当前平台的某个角色的菜单列表,
    GetMenuListForAppAndRole: params => fetch(`/menu/menuListForAppAndRole`, params, {}),
    // 保存当前平台的某个角色的菜单列表,
    SetMenuListForAppAndRole: params => fetch(`/menu/saveMenuListForAppAndRole`, params, { fullLoading: true, successTips: true }),
    // 新增账号,
    AddUser: params => fetch(`/user/addUser`, params, { fullLoading: true, successTips: true }),
    // 删除账号,
    DeleteUser: params => fetch(`/user/deleteUser`, params, { fullLoading: true, successTips: true }),
    // 修改账号,
    UpdateUser: params => fetch(`/user/updateUser`, params, { fullLoading: true, successTips: true }),
    // 获取账号信息,
    GetUser: params => fetch(`/user/getUser`, params, {}),
    // 获取用户列表,
    GetUserAll: params => fetch(`/user/getUserAll`, params, { method: `get` }),
    // 账户激活,
    SetUserActive: params => fetch(`/user/setUserActive`, params, { fullLoading: true, successTips: true, method: `get` }),
    // 账户锁定,
    SetUserLock: params => fetch(`/user/setUserLock`, params, { fullLoading: true, successTips: true, method: `get` }),
    // 账户锁定,
    SetUserUnLock: params => fetch(`/user/setUserUnLock`, params, { fullLoading: true, successTips: true, method: `get` }),
    // 重置密码,
    ResetPassword: params => fetch(`/user/resetPassword`, params, { fullLoading: true, successTips: true, method: `get` }),
    // 获取用户的分组信息,
    GetUserDepts: params => fetch(`/user/getUserDepts`, params, { method: `get` }),
    // 修改用户的页面布局信息,
    UpdateLayout: params => fetch(`/user/updateLayout`, params, {}),
    // 登录,
    Login: params => fetch(`/login/login`, params, {}),
    // 登出,
    SignOut: params => fetch(`/login/signOut`, params, {}),
    // 获取雨情数据,
    GetRainAll: params => fetch(`/hydrology/getRainAll`, params, {}),
    // 获取雨情数据详情,
    GetRainAllDetail: params => fetch(`/hydrology/getRainAllDetail`, params, {}),
    // 获取累计雨量,
    GetRainTotal: params => fetch(`/hydrology/rains/page`, params, { method: `get` }),
    // 区域平均降雨,
    QueryAreaRainfall: params => fetch(`/hydrology/rains/avgrain`, params, {}),
    // 雨情监测,
    QueryRainMonitor: params => fetch(`/hydrology/rains/rain/senior`, params, {}),
    // 雨情同期对比,
    QueryRainContrast: params => fetch(`/hydrology/rains/rain/rainlist`, params, {}),
    // 获取水情数据,
    GetWaterAll: params => fetch(`/hydrology/getWaterAll`, params, {}),
    // 获取最新河道水情,
    GetNewRiverWater: params => fetch(`/hydrology/river/rivers`, params, {}),
    // 获取最新水库水情,
    GetNewRsvrWater: params => fetch(`/hydrology/rsvr/rsvrs`, params, {}),
    // 查询河道水情,
    QueryRiverWater: params => fetch(`/hydrology/river/his`, params, {}),
    // 查询水库水情,
    QueryRsvrWater: params => fetch(`/hydrology/rsvr/his`, params, {})
};
