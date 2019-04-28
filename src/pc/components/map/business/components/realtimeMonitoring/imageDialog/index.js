import * as _ct from '$src/constants/realtimeMonitoring/zoomImageType';

export default {
    [_ct.MapSiteZoomImageDialogCommon]: r => require.ensure([], () =>
    r( require( `./zoomImageDialogCommon` ) ), `components/map/business/realtimeMonitoring/site/index` ),
    [_ct.MapSiteZoomImageDialogOther]: r => require.ensure([], () =>
    r( require( `./zoomImageDialogOther` ) ), `components/map/business/realtimeMonitoring/site/index` )
};
