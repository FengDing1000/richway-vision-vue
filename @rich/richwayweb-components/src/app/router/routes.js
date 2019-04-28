// 登录页面的一级路由
import INTERNET_PLATFORM_LOGIN from '$src/pc/pages/internet_platform/login/router';
// 用户管理页面的一级路由
import INTERNET_PLATFORM_PLATFORM_MANAGE_USER_MANAGE from '$src/pc/pages/internet_platform/platform_manage/user_manage/router';
// 首页页面的一级路由
import INTERNET_PLATFORM_PORTAL from '$src/pc/pages/internet_platform/portal/router';

const routes = [];
routes.push(INTERNET_PLATFORM_LOGIN);
routes.push(INTERNET_PLATFORM_PLATFORM_MANAGE_USER_MANAGE);
routes.push(INTERNET_PLATFORM_PORTAL);

export default routes;
