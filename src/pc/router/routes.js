// 综合分析页面的一级路由
import VISION_LIST_PROJECT_COMPREHENSIVE_ANALYSIS from '$src/pc/pages/vision_list_project/comprehensive_analysis/router';
// 错误页面页面的一级路由
import VISION_LIST_PROJECT_ERROR from '$src/pc/pages/vision_list_project/error/router';
// 字体库页面的一级路由
import VISION_LIST_PROJECT_FONT_LIBRARY from '$src/pc/pages/vision_list_project/font_library/router';
// 登录页面的一级路由
import VISION_LIST_PROJECT_LOGIN from '$src/pc/pages/vision_list_project/login/router';
// 首页页面的一级路由
import VISION_LIST_PROJECT_PORTAL from '$src/pc/pages/vision_list_project/portal/router';
// 实时监视页面的一级路由
import VISION_LIST_PROJECT_REALTIME_MONITORING from '$src/pc/pages/vision_list_project/realtime_monitoring/router';
// 分组管理页面的一级路由
import VISION_LIST_PROJECT_SYS_MANAGE_DEPT_MANAGE from '$src/pc/pages/vision_list_project/sys_manage/dept_manage/router';
// 菜单管理页面的一级路由
import VISION_LIST_PROJECT_SYS_MANAGE_MENU_MANAGE from '$src/pc/pages/vision_list_project/sys_manage/menu_manage/router';
// 角色管理页面的一级路由
import VISION_LIST_PROJECT_SYS_MANAGE_ROLE_MANAGE from '$src/pc/pages/vision_list_project/sys_manage/role_manage/router';
// 角色菜单权限管理页面的一级路由
import VISION_LIST_PROJECT_SYS_MANAGE_ROLE_MENU_AUTHORITY_MANAGE from '$src/pc/pages/vision_list_project/sys_manage/role_menu_authority_manage/router';
// 用户管理页面的一级路由
import VISION_LIST_PROJECT_SYS_MANAGE_USER_MANAGE from '$src/pc/pages/vision_list_project/sys_manage/user_manage/router';

const routes = [];
routes.push(VISION_LIST_PROJECT_COMPREHENSIVE_ANALYSIS);
routes.push(VISION_LIST_PROJECT_ERROR);
routes.push(VISION_LIST_PROJECT_FONT_LIBRARY);
routes.push(VISION_LIST_PROJECT_LOGIN);
routes.push(VISION_LIST_PROJECT_PORTAL);
routes.push(VISION_LIST_PROJECT_REALTIME_MONITORING);
routes.push(VISION_LIST_PROJECT_SYS_MANAGE_DEPT_MANAGE);
routes.push(VISION_LIST_PROJECT_SYS_MANAGE_MENU_MANAGE);
routes.push(VISION_LIST_PROJECT_SYS_MANAGE_ROLE_MANAGE);
routes.push(VISION_LIST_PROJECT_SYS_MANAGE_ROLE_MENU_AUTHORITY_MANAGE);
routes.push(VISION_LIST_PROJECT_SYS_MANAGE_USER_MANAGE);

export default routes;