import * as _ct from '$src/constants/realtimeMonitoring/modelType';

export default {
    [ _ct.MapBusinessModelCompare ]: r => require.ensure( [], () =>
        r( require( `./compare` ) ), `components/map/business/realtimeMonitoring/site/index` ),
    [ _ct.MapBusinessModelGaugelen ]: r => require.ensure( [], () =>
        r( require( `./gaugelen` ) ), `components/map/business/realtimeMonitoring/site/index` ),
    [ _ct.MapBusinessModelSluicegauge ]: r => require.ensure( [], () =>
        r( require( `./sluicegauge` ) ), `components/map/business/realtimeMonitoring/site/index` ),
    [ _ct.MapBusinessModelWaterarea ]: r => require.ensure( [], () =>
        r( require( `./waterarea` ) ), `components/map/business/realtimeMonitoring/site/index` )
};
