// 综合分析页面的store
import visionListProjectComprehensiveAnalysis from '$src/pc/pages/vision_list_project/comprehensive_analysis/store';
// 错误页面页面的store
import error from '$src/pc/pages/vision_list_project/error/store';
// 字体库页面的store
import fontLibrary from '$src/pc/pages/vision_list_project/font_library/store';
// 登录页面的store
import login from '$src/pc/pages/vision_list_project/login/store';
// 首页页面的store
import portal from '$src/pc/pages/vision_list_project/portal/store';
// 实时监视页面的store
import realtimeMonitoring from '$src/pc/pages/vision_list_project/realtime_monitoring/store';
// 分组管理页面的store
import deptManage from '$src/pc/pages/vision_list_project/sys_manage/dept_manage/store';
// 菜单管理页面的store
import menuManage from '$src/pc/pages/vision_list_project/sys_manage/menu_manage/store';
// 角色管理页面的store
import roleManage from '$src/pc/pages/vision_list_project/sys_manage/role_manage/store';
// 角色菜单权限管理页面的store
import roleMenuAuthorityManage from '$src/pc/pages/vision_list_project/sys_manage/role_menu_authority_manage/store';
// 用户管理页面的store
import userManage from '$src/pc/pages/vision_list_project/sys_manage/user_manage/store';

const modules = {
    visionListProjectComprehensiveAnalysis,
    error,
    fontLibrary,
    login,
    portal,
    realtimeMonitoring,
    deptManage,
    menuManage,
    roleManage,
    roleMenuAuthorityManage,
    userManage
};


export default modules;