export default {
    // 测站基本信息
    StationBasicInformation: r => require.ensure([], () => r(require(`./internet_platform/basic_information/station_information/station_basic_information/template`)), `components/pagesBasicInformation/stationBasicInformation`)
};
