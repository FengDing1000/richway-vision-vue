import * as _ct from '$src/constants/realtimeMonitoring/dialogType';

export default {
    [ _ct.MapSiteDetailDialogCommon ]: r => require.ensure( [], () =>
        r( require( `./siteDetailDialogCommon` ) ), `components/map/business/realtimeMonitoring/site/index` ),
    [ _ct.MapSiteDetailDialogOther ]: r => require.ensure( [], () =>
        r( require( `./siteDetailDialogOther` ) ), `components/map/business/realtimeMonitoring/site/index` )
};
