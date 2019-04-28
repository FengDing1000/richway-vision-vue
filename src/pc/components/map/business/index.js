import * as _ct from "../../../../constants/componentsBusinessType";

export default {
    [_ct.MapBusinessMonitorContainerBase]: r => require.ensure([], () => r(require(`./components/realtimeMonitoring/index.vue`)), `components/map/business/realtimeMonitoring/index`)
};
