module.exports = {
    prefix: `/station`,
    baseUrl: ``,
    list: [
        // 获取小流域列表
        {
            node: {
                url: `/shzh/baseinfo/stream/stream`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetSmallList`,
                description: `获取小流域列表`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `GetSmallList`
                }
            }
        },
        // 获取测站基本信息
        {
            node: {
                url: `/flood/stations`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetStationBasic`,
                description: `获取测站基本信息`
            },
            data: {
                cloud: {
                    url: `/flood/stations`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `GetStationBasic`
                }
            },
            handler: {
                url: `/basicInformation`,
                processParametersHandler: `GetStationInformationParamsFun`
            }
        },
        // 关联测站
        {
            node: {
                url: `/flood/stadcd`,
                method: `post`,
                mustLogin: true,
                fetchName: `CorrelationStation`,
                description: `关联测站`
            },
            data: {
                cloud: {
                    url: `/flood/stadcd`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `CorrelationStation`
                }
            },
            handler: {
                url: `/basicInformation`,
                processParametersHandler: `GetCorrelationStationParamsFun`
            }
        },
        // 添加信息
        {
            node: {
                url: `/hydrology/addStation`,
                method: `post`,
                mustLogin: true,
                fetchName: `UpAdd`,
                description: `添加信息`
            },
            data: {
                cloud: {
                    url: `/hydrology/addStation`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `UpAdd`
                }
            }
        },
        // 修改信息
        {
            node: {
                url: `/hydrology/station`,
                method: `post`,
                mustLogin: true,
                fetchName: `ReviseMessage`,
                description: `修改信息`
            },
            data: {
                cloud: {
                    url: `/hydrology/station/{stcd}`,
                    method: `post`,
                    // postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `ReviseMessage`
                }
            }
        },
        // 删除信息
        {
            node: {
                url: `/hydrology/deleteStation`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteMessage`,
                description: `删除信息`
            },
            data: {
                cloud: {
                    url: `/hydrology/deleteStation/{deleteNum}`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `DeleteMessage`
                }
            }
        },
        // 获取本县气象水文
        {
            node: {
                url: `/getCurrentStation`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetCurrentStation`,
                description: `本县气象水文`
            },
            data: {
                cloud: {
                    url: `/flood/stations`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `GetStationBasic`
                }
            },
            handler: {
                url: `/basicInformation`,
                processParametersHandler: `GetCurrentStationParamsFun`
            }
        },
        // 获取邻县站点
        {
            node: {
                url: `/flood/stInfo/list`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetNearbyStation`,
                description: `邻县站点`
            },
            data: {
                cloud: {
                    url: `/flood/stInfo/list`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/baseInformation`,
                    handler: `GetStationBasic`
                }
            }
        }
    ]
};
