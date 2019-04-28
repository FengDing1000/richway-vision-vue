export default {
    // 值班安排页面组件
    DutyArrangement: r => require.ensure([], () => r(require(`./internet_platform/duty_management/arrangement/template`)), `components/pagesDuty/dutyArrangement`),
    // 值班快报页面组件
    DutyExpress: r => require.ensure([], () => r(require(`./internet_platform/duty_management/express/template`)), `components/pagesDuty/dutyExpress`),
    // 值班管理页面组件
    DutyManagement: r => require.ensure([], () => r(require(`./internet_platform/duty_management/management/template`)), `components/pagesDuty/dutyManagement`),
    // 值班登记页面组件
    DutyRegistration: r => require.ensure([], () => r(require(`./internet_platform/duty_management/registration/template`)), `components/pagesDuty/dutyRegistration`),
    // 人员管理页面组件
    PersonnelManagement: r => require.ensure([], () => r(require(`./internet_platform/duty_management/personnelManagement/template`)), `components/pagesDuty/personnelManagement`),
    // 值班快报统计
    DutyExpressStatistics: r => require.ensure([], () => r(require(`./internet_platform/duty_management/dutyExpressStatistics/template`)), `components/pagesDuty/dutyExpressStatistics`),
    // 责任人维护
    PersonLiableMaintenance: r => require.ensure([], () => r(require(`./internet_platform/person_liable_Maintenance/personLiableMaintenance/template`)), `components/pagesDuty/personLiableMaintenance`),
    // 编辑短信页面组件
    MSMEditShortMessage: r => require.ensure([], () => r(require(`./internet_platform/MSM_information/editShortMessage/template`)), `components/pagesDuty/mSMEditShortMessage`),
    // 短信发送列表页面组件
    MSMSendList: r => require.ensure([], () => r(require(`./internet_platform/MSM_information/sendList/template`)), `components/pagesDuty/mSMSendList`),
    // 通讯录页面组件
    MSMMailList: r => require.ensure([], () => r(require(`./internet_platform/MSM_information/mailList/template`)), `components/pagesDuty/mSMMailList`)
};
