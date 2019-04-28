// 县乡村基本信息页面的store
import countyCountryInformation from '$src/pc/pages/internet_platform/basic_information/administrative_region/county_country_information/store';
// 县乡村预案页面的store
import countyCountryReservePlan from '$src/pc/pages/internet_platform/basic_information/administrative_region/county_country_reserve_plan/store';
// 山洪灾害影响情况页面的store
import mountainFloodDisaster from '$src/pc/pages/internet_platform/basic_information/administrative_region/mountain_flood_disaster/store';
// 历史灾情页面的store
import historyDisaster from '$src/pc/pages/internet_platform/basic_information/disaster_situation/history_disaster/store';
// 小流域信息页面的store
import smallWatershedBasicInformation from '$src/pc/pages/internet_platform/basic_information/small_watershed/small_watershed_basic_information/store';
// 测站基本信息页面的store
import stationBasicInformation from '$src/pc/pages/internet_platform/basic_information/station_information/station_basic_information/store';
// 堤防信息页面的store
import damInformation from '$src/pc/pages/internet_platform/basic_information/work_situation/dam_information/store';
// 水库信息页面的store
import reservoirInformation from '$src/pc/pages/internet_platform/basic_information/work_situation/reservoir_information/store';
// 水情信息页面的store
import riverInformation from '$src/pc/pages/internet_platform/basic_information/work_situation/river_information/store';
// 错误页面页面的store
import error from '$src/pc/pages/internet_platform/error/store';
// 登录页面的store
import login from '$src/pc/pages/internet_platform/login/store';
// 首页页面的store
import portal from '$src/pc/pages/internet_platform/portal/store';

const modules = {
    countyCountryInformation,
    countyCountryReservePlan,
    mountainFloodDisaster,
    historyDisaster,
    smallWatershedBasicInformation,
    stationBasicInformation,
    damInformation,
    reservoirInformation,
    riverInformation,
    error,
    login,
    portal
};


export default modules;
