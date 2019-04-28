module.exports = {
    prefix: `/monitorWater`,
    baseUrl: ``,
    list: [
        // 查询最新河道水情
        {
            node: {
                url: `/river/riversMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetNewRiverWaterMonitor`,
                description: `获取最新河道水情`
            },
            data: {
                cloud: {
                    url: `/hydrology/river/rivers`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/water`,
                    handler: `GetNewRiverWater`
                }
            }
        },
        // 查询最新水库水情
        {
            node: {
                url: `/rsvr/rsvrsMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetNewRsvrWaterMonitor`,
                description: `获取最新水库水情`
            },
            data: {
                cloud: {
                    url: `/hydrology/rsvr/rsvrs`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/water`,
                    handler: `GetNewRsvrWater`
                }
            }
        },
        // 查询水情详情-基本信息
        {
            node: {
                url: `/waterDetailMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `WaterDetailMonitor`,
                description: `查询水情详情-基本信息`
            },
            data: {
                cloud: {
                    url: `/hydro/waterDetail`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/water`,
                    handler: `WaterDetailMonitor`
                }
            }
        },
        // 查询水情-河道-水位流量过程线
        {
            node: {
                url: `/riverflowLineMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `RiverflowLineMonitor`,
                description: `查询水情-河道-水位流量过程线`
            },
            data: {
                cloud: {
                    url: `/hydrology/river/{stcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/water`,
                    handler: `RiverflowLine`
                }
            }
        },
        // 查询水情-水库-水位流量过程线   reservoir
        {
            node: {
                url: `/rsvrFlowLineMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `RsvrFlowLineMonitor`,
                description: `查询水情-水库-水位流量过程线`
            },
            data: {
                cloud: {
                    url: `/hydrology/rsvr/{stcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/water`,
                    handler: `RsvrFlowLine`
                }
            }
        },
        // 查询水情-水库-水位库容曲线   reservoir
        {
            node: {
                url: `/rsvrCapacityLineMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `RsvrCapacityLineMonitor`,
                description: `查询水情-水库-水位库容曲线`
            },
            data: {
                cloud: {
                    url: `/hydrology/reszvarl`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/water`,
                    handler: `rsvrCapacityLineMonitor`
                }
            }
        }
    ]
};
