module.exports = {
    prefix: `/effectRange`,
    baseUrl: ``,
    list: [
        // 获取避险转移的数值
        {
            node: {
                url: `/getSafeTransferNum`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetSafeTransferNum`,
                description: `获取避险转移的列表`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/effect/statis`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/effectRange`,
                    handler: `GetSafeTransferNum`
                }
            }
        },
        // 获取避险转移的列表
        {
            node: {
                url: `/getSafeTransferList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetSafeTransferList`,
                description: `获取避险转移的列表`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/investInfo`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/effectRange`,
                    handler: `GetSafeTransferList`
                }
            }
        },
        // 获取历史山洪灾害的列表
        {
            node: {
                url: `/getHisDisasterList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetHisDisasterList`,
                description: `获取历史山洪灾害的列表`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/investInfo`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/effectRange`,
                    handler: `GetHisDisasterList`
                }
            }
        },
        // 获取山洪沟的列表
        {
            node: {
                url: `/getMountainList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetMountainList`,
                description: `获取山洪沟的列表`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/investInfo`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/effectRange`,
                    handler: `GetMountainList`
                }
            }
        },
        // 获取面板详情
        {
            node: {
                url: `/getRangeDetail`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetRangeDetail`,
                description: `获取面板详情`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/investInfo`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/effectRange`,
                    handler: `GetRangeDetail`
                }
            }
        },
        // 获取监测站点数据
        {
            node: {
                url: `/getMonitoringSiteInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetMonitoringSiteInfo`,
                description: `获取监测站点数据`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/stations`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/effectRange`,
                    handler: `GetMonitoringSiteInfo`
                }
            }
        }
    ]
};
