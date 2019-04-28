const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/warnRespond`,
    baseUrl: ``,
    list: [
        {
            node: {
                url: `/warngrades`,
                method: `post`,
                fetchName: `GetWarnGrades`,
                description: `获取预警等级`
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/warngrades`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/warntypes`,
                method: `post`,
                fetchName: `GetWarnTypes`,
                description: `获取预警类型`
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/warntypes`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/warnrecords`,
                method: `post`,
                fetchName: `GetWarnRecords`,
                description: `手动录入人工预警信息`
            },
            data: {
                cloud: {
                    url: `/warning/warnrecord/warnrecords`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/warnCountyAdcd`,
                method: `post`,
                fetchName: `GetWarnCountyAdcd`,
                description: `历史预警——预警信息列表查询`
            },
            data: {
                cloud: {
                    url: `/shzh/waring/warnCountyAdcd`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/closingWarning`,
                method: `post`,
                fetchName: `ClosingWarning`,
                description: `关闭预警`
            },
            data: {
                cloud: {
                    url: `/shzh/waring/closingWarning/`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/danadtree`,
                method: `post`,
                fetchName: `DangerTree`,
                description: `危险区ztree信息加载`
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/danadtree/{adcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/StationsThreshold`,
                method: `post`,
                fetchName: `StationsThreshold`,
                description: `阀值设置——根据危险区ID查询其设置过的预警阀值信息`
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/area/stations/{dandId}/R`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/WaterThreshold`,
                method: `post`,
                fetchName: `WaterThreshold`,
                description: `阀值设置——根据危险区ID加载危险区水位站列表信息`
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/area/stations/{dandId}/Z,Q`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/containSts`,
                method: `post`,
                fetchName: `GetAllStations`,
                description: `阀值设置——查询目前区县下包含的测站信息`
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/adcd/containSts`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/stations/adcd`,
                method: `post`,
                fetchName: `GetStationAdcd`,
                description: `阀值设置——根据所选政区加载其下雨量测站数据`
            },
            data: {
                cloud: {
                    url: `/flood/stations/{adcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        {
            node: {
                url: `/area/stations`,
                method: `post`,
                fetchName: `ChangeDangerArea`,
                description: `阀值设置——保存(修改)预警阀值设置值`
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/area/stations`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `ChangeDangerAreaParamsFun`
            }
        },
        {
            node: {
                url: `/warnGradeId`,
                method: `post`,
                fetchName: `DeleteRainStation`,
                description: `阀值设置——根据危险区ID+测站编码+预警类型删除数据`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/area/stcd/warnGradeId/{type}`,
                    method: `delete`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `ChangeDangerAreaParamsFun`
            }
        },
        {
            node: {
                url: `/DeleteOneRain`,
                method: `post`,
                fetchName: `DeleteOneRain`,
                description: `阀值设置——根据危险区ID+测站编码+预警类型删除数据`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/warning/warnrule/area/{dandid}/{stcd}/{warnGradeId}/{type}`,
                    method: `delete`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        }
    ]
};
