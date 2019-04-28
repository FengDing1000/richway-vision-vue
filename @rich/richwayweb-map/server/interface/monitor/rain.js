module.exports = {
    prefix: `/monitorRain`,
    baseUrl: ``,
    list: [
        // 查询雨情
        {
            node: {
                url: `/getRainAllMointor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetRainAllMointor`,
                description: `获取雨情数据`
            },
            data: {
                cloud: {
                    url: `/hydro/rain/`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/rain`,
                    handler: `GetRainAll`
                }
            }
        },
        // 雨情弹框基本信息
        {
            node: {
                url: `/getDetailRainInforMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDetailRainInforMonitor`,
                description: `雨情弹框基本信息`
            },
            data: {
                cloud: {
                    url: `/hydro/rainDetail`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/rain`,
                    handler: `GetDetailRainInfo`
                }
            }
        },
        // 近7日降雨过程线  days of rainfall process line  DaysRainLine
        {
            node: {
                url: `/raindayslineMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `DaysRainLineMonitor`,
                description: `近7日降雨过程线`
            },
            data: {
                cloud: {
                    url: `/hydrology/rains/days`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/rain`,
                    handler: `DaysRainLine`
                }
            }
        },
        // 时段降雨过程  TimeRainLine
        {
            node: {
                url: `/raintimelineMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `TimeRainLineMonitor`,
                description: `时段降雨过程`
            },
            data: {
                cloud: {
                    url: `/hydrology/rains/hours`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/rain`,
                    handler: `TimeRainLine`
                }
            }
        },
        // 未来48小时降雨过程 future
        {
            node: {
                url: `/rainfuturelineMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `FutureRainLineMonitor`,
                description: `未来48小时降雨过程`
            },
            data: {
                cloud: {
                    url: `https://api.caiyunapp.com/v2/fhAdHnAoX9IXnXjT/{lgtd},{lttd}/forecast.json`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/rain`,
                    handler: `FutureRainLine`
                }
            }
        }

    ]
};
