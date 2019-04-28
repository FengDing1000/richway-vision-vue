// 值班安排页面的store
import arrangement from '$src/pc/pages/internet_platform/duty_management/arrangement/store';
// 值班快报统计页面的store
import dutyExpressStatistics from '$src/pc/pages/internet_platform/duty_management/dutyExpressStatistics/store';
// 值班快报页面的store
import express from '$src/pc/pages/internet_platform/duty_management/express/store';
// 值班管理页面的store
import management from '$src/pc/pages/internet_platform/duty_management/management/store';
// 人员管理页面的store
import personnelManagement from '$src/pc/pages/internet_platform/duty_management/personnelManagement/store';
// 值班登记页面的store
import registration from '$src/pc/pages/internet_platform/duty_management/registration/store';
// 错误页面页面的store
import error from '$src/pc/pages/internet_platform/error/store';
// 登录页面的store
import login from '$src/pc/pages/internet_platform/login/store';
// 编辑短信页面的store
import editShortMessage from '$src/pc/pages/internet_platform/MSM_information/editShortMessage/store';
// 通讯录页面的store
import mailList from '$src/pc/pages/internet_platform/MSM_information/mailList/store';
// 发送列表页面的store
import sendList from '$src/pc/pages/internet_platform/MSM_information/sendList/store';
// 责任人维护页面的store
import personLiableMaintenance from '$src/pc/pages/internet_platform/person_liable_Maintenance/personLiableMaintenance/store';
// 首页页面的store
import portal from '$src/pc/pages/internet_platform/portal/store';

const modules = {
    arrangement,
    dutyExpressStatistics,
    express,
    management,
    personnelManagement,
    registration,
    error,
    login,
    editShortMessage,
    mailList,
    sendList,
    personLiableMaintenance,
    portal
};


export default modules;