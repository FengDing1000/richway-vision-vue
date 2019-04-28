// 错误页面页面的一级路由
import INTERNET_PLATFORM_ERROR from '$src/pc/pages/internet_platform/error/router';
// 字体库页面的一级路由
import INTERNET_PLATFORM_FONT_LIBRARY from '$src/pc/pages/internet_platform/font_library/router';
// 登录页面的一级路由
import INTERNET_PLATFORM_LOGIN from '$src/pc/pages/internet_platform/login/router';
// 首页页面的一级路由
import INTERNET_PLATFORM_PORTAL from '$src/pc/pages/internet_platform/portal/router';
// 分组管理页面的一级路由
import INTERNET_PLATFORM_SYS_MANAGE_DEPT_MANAGE from '$src/pc/pages/internet_platform/sys_manage/dept_manage/router';
// 菜单管理页面的一级路由
import INTERNET_PLATFORM_SYS_MANAGE_MENU_MANAGE from '$src/pc/pages/internet_platform/sys_manage/menu_manage/router';
// 角色管理页面的一级路由
import INTERNET_PLATFORM_SYS_MANAGE_ROLE_MANAGE from '$src/pc/pages/internet_platform/sys_manage/role_manage/router';
// 角色菜单权限管理页面的一级路由
import INTERNET_PLATFORM_SYS_MANAGE_ROLE_MENU_AUTHORITY_MANAGE from '$src/pc/pages/internet_platform/sys_manage/role_menu_authority_manage/router';
// 用户管理页面的一级路由
import INTERNET_PLATFORM_SYS_MANAGE_USER_MANAGE from '$src/pc/pages/internet_platform/sys_manage/user_manage/router';

const routes = [];
routes.push(INTERNET_PLATFORM_ERROR);
routes.push(INTERNET_PLATFORM_FONT_LIBRARY);
routes.push(INTERNET_PLATFORM_LOGIN);
routes.push(INTERNET_PLATFORM_PORTAL);
routes.push(INTERNET_PLATFORM_SYS_MANAGE_DEPT_MANAGE);
routes.push(INTERNET_PLATFORM_SYS_MANAGE_MENU_MANAGE);
routes.push(INTERNET_PLATFORM_SYS_MANAGE_ROLE_MANAGE);
routes.push(INTERNET_PLATFORM_SYS_MANAGE_ROLE_MENU_AUTHORITY_MANAGE);
routes.push(INTERNET_PLATFORM_SYS_MANAGE_USER_MANAGE);

export default routes;