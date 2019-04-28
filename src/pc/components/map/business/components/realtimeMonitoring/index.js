import * as _ct from '$src/constants/componentsBusinessType';

export default {
    [_ct.MapBusinessMonitorSiteList]: r => require.ensure([], () => r(require(`./site`)), `components/map/business/realtimeMonitoring/site/index`)
};
