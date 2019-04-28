import * as _ct from "../../constants/componentsType";

const Layout = r => require.ensure([], () => r(require(`./layout`)), `richway_components`);
const IconPanel = r => require.ensure([], () => r(require(`./iconPanel`)), `components/iconPanel`);
const BuildPanel = r => require.ensure([], () => r(require(`./buildPanel`)), `richway_components`);
const ErrorPanel = r => require.ensure([], () => r(require(`./errorPanel`)), `richway_components`);
const PortalPanel = r => require.ensure([], () => r(require(`../pages/internet_platform/portal/template`)), `richway_components`);
const LoginPanel = r => require.ensure([], () => r(require(`../pages/internet_platform/login/template`)), `richway_components`);
const LoginPanelExp = r => require.ensure([], () => r(require(`../pages/internet_platform/login_exp/template`)), `richway_components`);
const DataTableStandard = r => require.ensure([], () => r(require(`./dataTable/standard`)), `richway_components`);
const DataTableChoice = r => require.ensure([], () => r(require(`./dataTable/choice`)), `richway_components`);
const DataReport = r => require.ensure([], () => r(require(`./dataReport/index.vue`)), `richway_components`);
const UpLoad = r => require.ensure([], () => r(require(`./upload`)), `richway_components`);
const CascaderSegion = r => require.ensure([], () => r(require(`./region/cascaderSegion`)), `richway_components`);
// const CityCountyPanel = r => require.ensure([], () => r(require(`./region/cityCountyPanel`)), `richway_components`);

const TransferBasePanel = r => require.ensure([], () => r(require(`./transfer/transferBase`)), `richway_components`);

const UserInfoForm = r => require.ensure([], () => r(require(`./businessForm/userInfoForm`)), `richway_components`);
const ContentLeftRight = r => require.ensure([], () => r(require(`./layout/contentLeftRight`)), `richway_components`);
const VueIframe = r => require.ensure([], () => r(require(`./vueIframe`)), `richway_components`);
const RichTextEditor = r => require.ensure([], () => r(require(`./richTextEditor`)), `richway_components`);

const InfiniteRoll = r => require.ensure([], () => r(require(`./banner/infiniteRoll`)), `richway_components`);
const ScrollWarning = r => require.ensure([], () => r(require(`./scrollWarning`)), `richway_components`);
const Weather = r => require.ensure([], () => r(require(`./weather`)), `richway_components`);
const OnLineNum = r => require.ensure([], () => r(require(`./onLineNum`)), `richway_components`);
const MessageNotification = r => require.ensure([], () => r(require(`./messageNotification`)), `richway_components`);
const UserPanel = r => require.ensure([], () => r(require(`./userPanel`)), `richway_components`);

export default {
    [_ct.LayoutBase]: r => require.ensure([], () => r(require(`./layout/base`)), `components/layout/base`),
    // 字体图标面板
    Layout,
    // 字体图标面板
    IconPanel,
    // 页面建设提示面板
    BuildPanel,
    // 页面错误提示面板
    ErrorPanel,
    LoginPanel,
    LoginPanelExp,
    PortalPanel,
    DataTableStandard,
    DataTableChoice,
    DataReport,
    UpLoad,
    CascaderSegion,
    // CityCountyPanel,
    TransferBasePanel,
    UserInfoForm,
    ContentLeftRight,
    VueIframe,
    RichTextEditor,
    InfiniteRoll,
    ScrollWarning,
    Weather,
    OnLineNum,
    MessageNotification,
    UserPanel
};
