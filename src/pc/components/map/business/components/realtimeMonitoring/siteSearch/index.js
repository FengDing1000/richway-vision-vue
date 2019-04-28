export default {
    siteSearch: r => require.ensure([], () => r(require(`./siteSearch`)), `components/map/business/realtimeMonitoring/site/index`)
};
