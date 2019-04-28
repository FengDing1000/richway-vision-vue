// 错误页面页面的store
import error from '$src/pc/pages/internet_platform/error/store';
// 字体库页面的store
import fontLibrary from '$src/pc/pages/internet_platform/font_library/store';
// 登录页面的store
import login from '$src/pc/pages/internet_platform/login/store';
// 首页页面的store
import portal from '$src/pc/pages/internet_platform/portal/store';
// 分组管理页面的store
import deptManage from '$src/pc/pages/internet_platform/sys_manage/dept_manage/store';
// 菜单管理页面的store
import menuManage from '$src/pc/pages/internet_platform/sys_manage/menu_manage/store';
// 角色管理页面的store
import roleManage from '$src/pc/pages/internet_platform/sys_manage/role_manage/store';
// 角色菜单权限管理页面的store
import roleMenuAuthorityManage from '$src/pc/pages/internet_platform/sys_manage/role_menu_authority_manage/store';
// 用户管理页面的store
import userManage from '$src/pc/pages/internet_platform/sys_manage/user_manage/store';

const modules = {
    error,
    fontLibrary,
    login,
    portal,
    deptManage,
    menuManage,
    roleManage,
    roleMenuAuthorityManage,
    userManage
};


export default modules;