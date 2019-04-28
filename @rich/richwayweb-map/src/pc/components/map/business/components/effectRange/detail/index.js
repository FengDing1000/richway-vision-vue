export default {
    BaseInformation: r => require.ensure([], () => r(require(`./safe_transfer/baseInformation`)), `components/map/business/effectRange/safe_transfer`),
    WarnIndicators: r => require.ensure([], () => r(require(`./safe_transfer/warnIndicators`)), `components/map/business/effectRange/safe_transfer`),
    VillageDweller: r => require.ensure([], () => r(require(`./safe_transfer/villageDweller`)), `components/map/business/effectRange/safe_transfer`),
    Towner: r => require.ensure([], () => r(require(`./safe_transfer/towner`)), `components/map/business/effectRange/safe_transfer`),
    PublicInstitution: r => require.ensure([], () => r(require(`./safe_transfer/publicInstitution`)), `components/map/business/effectRange/safe_transfer`),
    ZqRelPic: r => require.ensure([], () => r(require(`./safe_transfer/zqRelPic`)), `components/map/business/effectRange/safe_transfer`),
    FhxzPic: r => require.ensure([], () => r(require(`./safe_transfer/fhxzPic`)), `components/map/business/effectRange/safe_transfer`),
    DanadPic: r => require.ensure([], () => r(require(`./safe_transfer/danadPic`)), `components/map/business/effectRange/safe_transfer`),
    LjRainPic: r => require.ensure([], () => r(require(`./safe_transfer/ljRainPic`)), `components/map/business/effectRange/safe_transfer`),
    PictureOther: r => require.ensure([], () => r(require(`./safe_transfer/pictureOther`)), `components/map/business/effectRange/safe_transfer`),
    DisasterStatistics: r => require.ensure([], () => r(require(`./history_disaster/disasterStatistics`)), `components/map/business/effectRange/history_disaster`),
    DisasterSummary: r => require.ensure([], () => r(require(`./history_disaster/disasterSummary`)), `components/map/business/effectRange/history_disaster`),
    FloodMarkData: r => require.ensure([], () => r(require(`./history_disaster/floodMarkData`)), `components/map/business/effectRange/history_disaster`),
    MountainInfo: r => require.ensure([], () => r(require(`./mountain/mountainInfo`)), `components/map/business/effectRange/mountain`),
    PreventionArea: r => require.ensure([], () => r(require(`./more/preventionArea`)), `components/map/business/effectRange/more`),
    Town: r => require.ensure([], () => r(require(`./more/town`)), `components/map/business/effectRange/more`),
    RiversideVillage: r => require.ensure([], () => r(require(`./more/riversideVillage`)), `components/map/business/effectRange/more`),
    Business: r => require.ensure([], () => r(require(`./more/business`)), `components/map/business/effectRange/more`),
    Village: r => require.ensure([], () => r(require(`./more/village`)), `components/map/business/effectRange/more`),
    Sluice: r => require.ensure([], () => r(require(`./more/sluice`)), `components/map/business/effectRange/more`),
    Weir: r => require.ensure([], () => r(require(`./more/weir`)), `components/map/business/effectRange/more`),
    Bridge: r => require.ensure([], () => r(require(`./more/bridge`)), `components/map/business/effectRange/more`),
    Culvert: r => require.ensure([], () => r(require(`./more/culvert`)), `components/map/business/effectRange/more`)
};