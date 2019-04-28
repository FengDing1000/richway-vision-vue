const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/personLiableMaintenance`,
    baseUrl: ``,
    list: [
        // 责任人维护页-危险区责任人-左边栏信息
        {
            node: {
                url: `/getDangerAdcddAnadTree`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDangerAdcddAnadTree`,
                description: `责任人维护页-危险区责任人-左边栏信息`
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/adcddanadtree/{adcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/personLiableMaintenance`,
                    handler: `GetDangerAdcddAnadTree`
                }
            }
        },
        {
            node: {
                url: `/getDangerPersonList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDangerPersonList`,
                description: `责任人维护页-危险区责任人-右边栏信息`
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/personList/{adcd}/{number}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/personLiableMaintenance`,
                    handler: `GetDangerPersonList`
                }
            }
        },
        // 责任人维护页-危险区责任人-右侧保存按钮
        {
            node: {
                url: `/getDangerPersonsSave`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDangerPersonsSave`,
                description: `责任人维护页-危险区责任人-右侧保存按钮`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/persons`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/personLiableMaintenance`,
                    handler: `GetDangerPersonsSave`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/personLiableMaintenance`,
                processParametersHandler: `FilterGetDangerPersonsSaveParametersFun`
            }
        },
        // 责任人维护页-防汛责任人-左边栏信息
        {
            node: {
                url: `/getFloodPreventionTree`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetFloodPreventionTree`,
                description: `责任人维护页-防汛责任人-左边栏信息`
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/adcdtree/{adcd}`,
                    method: `get`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/personLiableMaintenance`,
                    handler: `GetFloodPreventionTree`
                }
            }
        },
        // 自动预警人员-保存按钮
        {
            node: {
                url: `/getnotifiedPersonsSave`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetnotifiedPersonsSave`,
                description: `自动预警人员-保存按钮`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/notifiedPersons`,
                    method: `post`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/personLiableMaintenance`,
                    handler: `GetnotifiedPersonsSave`,

                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/personLiableMaintenance`,
                processParametersHandler: `FilterGetDangerPersonsSaveParametersFun`
            }
        },
        // 自动预警人员
        {
            node: {
                url: `/getAutomaticWarningTree`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetAutomaticWarningTree`,
                description: `自动预警人员`
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/personList/{adcd}/{number}`,
                    method: `get`,
                    postType: `body`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/personLiableMaintenance`,
                    handler: `GtAutomaticWarningTree`
                }
            }
        },
        // 责任人维护页-导入excel表格，参数名字：files
        {
            node: {
                url: `/importImpperson`,
                method: `post`,
                mustLogin: true,
                fetchName: `ImportImpperson`,
                description: `责任人维护页-导入excel表格`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/shzh/warning/personIncharge/impperson`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/duty`,
                    handler: `ImportImpperson`
                }
            }
        },
    ]
}
