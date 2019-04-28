// 值班安排页面的一级路由
import INTERNET_PLATFORM_DUTY_MANAGEMENT_ARRANGEMENT from '$src/pc/pages/internet_platform/duty_management/arrangement/router';
// 值班快报统计页面的一级路由
import INTERNET_PLATFORM_DUTY_MANAGEMENT_DUTYEXPRESSSTATISTICS from '$src/pc/pages/internet_platform/duty_management/dutyExpressStatistics/router';
// 值班快报页面的一级路由
import INTERNET_PLATFORM_DUTY_MANAGEMENT_EXPRESS from '$src/pc/pages/internet_platform/duty_management/express/router';
// 值班管理页面的一级路由
import INTERNET_PLATFORM_DUTY_MANAGEMENT_MANAGEMENT from '$src/pc/pages/internet_platform/duty_management/management/router';
// 人员管理页面的一级路由
import INTERNET_PLATFORM_DUTY_MANAGEMENT_PERSONNELMANAGEMENT from '$src/pc/pages/internet_platform/duty_management/personnelManagement/router';
// 值班登记页面的一级路由
import INTERNET_PLATFORM_DUTY_MANAGEMENT_REGISTRATION from '$src/pc/pages/internet_platform/duty_management/registration/router';
// 错误页面页面的一级路由
import INTERNET_PLATFORM_ERROR from '$src/pc/pages/internet_platform/error/router';
// 登录页面的一级路由
import INTERNET_PLATFORM_LOGIN from '$src/pc/pages/internet_platform/login/router';
// 编辑短信页面的一级路由
import INTERNET_PLATFORM_MSM_INFORMATION_EDITSHORTMESSAGE from '$src/pc/pages/internet_platform/MSM_information/editShortMessage/router';
// 通讯录页面的一级路由
import INTERNET_PLATFORM_MSM_INFORMATION_MAILLIST from '$src/pc/pages/internet_platform/MSM_information/mailList/router';
// 发送列表页面的一级路由
import INTERNET_PLATFORM_MSM_INFORMATION_SENDLIST from '$src/pc/pages/internet_platform/MSM_information/sendList/router';
// 责任人维护页面的一级路由
import INTERNET_PLATFORM_PERSON_LIABLE_MAINTENANCE_PERSONLIABLEMAINTENANCE from '$src/pc/pages/internet_platform/person_liable_Maintenance/personLiableMaintenance/router';
// 首页页面的一级路由
import INTERNET_PLATFORM_PORTAL from '$src/pc/pages/internet_platform/portal/router';

const routes = [];
routes.push(INTERNET_PLATFORM_DUTY_MANAGEMENT_ARRANGEMENT);
routes.push(INTERNET_PLATFORM_DUTY_MANAGEMENT_DUTYEXPRESSSTATISTICS);
routes.push(INTERNET_PLATFORM_DUTY_MANAGEMENT_EXPRESS);
routes.push(INTERNET_PLATFORM_DUTY_MANAGEMENT_MANAGEMENT);
routes.push(INTERNET_PLATFORM_DUTY_MANAGEMENT_PERSONNELMANAGEMENT);
routes.push(INTERNET_PLATFORM_DUTY_MANAGEMENT_REGISTRATION);
routes.push(INTERNET_PLATFORM_ERROR);
routes.push(INTERNET_PLATFORM_LOGIN);
routes.push(INTERNET_PLATFORM_MSM_INFORMATION_EDITSHORTMESSAGE);
routes.push(INTERNET_PLATFORM_MSM_INFORMATION_MAILLIST);
routes.push(INTERNET_PLATFORM_MSM_INFORMATION_SENDLIST);
routes.push(INTERNET_PLATFORM_PERSON_LIABLE_MAINTENANCE_PERSONLIABLEMAINTENANCE);
routes.push(INTERNET_PLATFORM_PORTAL);

export default routes;