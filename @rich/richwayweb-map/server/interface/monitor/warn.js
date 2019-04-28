module.exports = {
    prefix: `/monitorWarn`,
    baseUrl: ``,
    list: [
        // 获取预警数据
        {
            node: {
                url: `/getWarnAllMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetWarnAllMonitor`,
                description: `获取预警数据`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/warning`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/warn`,
                    handler: `GetWarnAll`
                }
            }
        },

        // 获取预警处置的提示对象
        {
            node: {
                url: `/getWarnDetailProcessPeopleMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetWarnDetailProcessPeopleMonitor`,
                description: `获取预警处理数据`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/warn`,
                    handler: `GetWarnDetailProcessPeople`
                }
            }
        },

        // 预警-督导-处置
        {
            node: {
                url: `/postProcessTipsMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `PostProcessTipsMonitor`,
                description: `预警-督导-处置`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/warn/monitor/warn/process/{warnId}`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `/warn`,
                    handler: `PostProcessTipsMonitor`
                }
            }
        },
        // 预警-督导-查询状态
        {
            node: {
                url: `/getProcessTipsMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetProcessTipsMonitor`,
                description: `预警-督导-查询状态`

            },
            data: {
                cloud: {
                    url: `/warn/monitor/warn/process/{warnId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/warn`,
                    handler: `getProcessTipsMonitor`
                }
            }
        },

        // 预警处置的立即提示
        {
            node: {
                url: `/setProcessTipsMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetProcessTipsMonitor`,
                description: `预警处置的立即提示`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: ``,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/warn`,
                    handler: `SetProcessTips`
                }
            }
        },
        // 根据测站编码获取小流域空间数据   WatershedSpatialData
        {
            node: {
                url: `/getwatershedSpatialDataMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetWatershedSpatialDataMonitor`,
                description: `小流域空间数据`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/basin/{stcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/warn`,
                    handler: `GetWatershedSpatialData`
                }
            }
        },
        // 滚动预警  Scroll the warning
        {
            node: {
                url: `/scrollWarningMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `ScrollWarningMonitor`,
                description: `滚动预警`
            },
            data: {
                cloud: {
                    url: `/warn/monitor/rollWarning`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/warn`,
                    handler: `ScrollWarning`
                }
            }
        }
    ]
};
