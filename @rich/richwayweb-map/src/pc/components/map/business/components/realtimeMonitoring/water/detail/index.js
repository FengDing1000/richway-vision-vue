export default {
    RsvrStageDischargeHydrograph: r => require.ensure([], () => r(require(`./rsvr/stageDischargeHydrograph`)), `components/map/business/realtimeMonitoring/water/detail`),
    RsvrSamePeriodHistory: r => require.ensure([], () => r(require(`./rsvr/samePeriodHistory`)), `components/map/business/realtimeMonitoring/water/detail`),
    RsvrReservoirCapacityRelationship: r => require.ensure([], () => r(require(`./rsvr/reservoirCapacityRelationship`)), `components/map/business/realtimeMonitoring/water/detail`),
    RiverStageDischargeHydrograph: r => require.ensure([], () => r(require(`./river/stageDischargeHydrograph`)), `components/map/business/realtimeMonitoring/water/detail`)
};
