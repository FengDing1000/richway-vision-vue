const Mock = require( `mockjs` );


function GetSiteList() {
    const data = {
        STCD: /\d{5,6}/,
        stnm: `@ctitle(2, 5)测站`,
        "model|1": [ `viw_water_gauge`, `viw_water_gauge,viw_water_area`, `viw_water_area`, `viw_water_gauge,viw_sluice_gauge`,`viw_sluice_gauge` ],
        "sttpCd|1": [ `ZZ`, `DD`, `VV`, `RR` ],
        "lttd|25-28.1-10": 1,
        "lgtd|105-108.1-10": 1,
        "status|1": [ `0`, `1`, `2` ]
    };
    const siteList = Mock.mock( {
        "data|100": [
            data
        ]
    } );
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        data: siteList.data,
        stackTrace: null
    };
}
module.exports = {
    GetSiteList
};
