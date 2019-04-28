const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/menu`,
    dirPath: `${__dirname}`,
    baseUrl: `/base/api`,
    list: [
        // 获取当前账号的菜单列表,从session中获取
        {
            node: {
                url: `/menuListForUser`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetMenuListForUser`,
                description: `获取当前账号的菜单列表,从session中获取`
            },
            data: {
                nonForward: true
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/menu`,
                processDataHandler: `GetMenuListForUserFun`
            }
        },
        // 获取项目中能使用的菜单列表
        {
            node: {
                url: `/menuLForAvailable`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetMenuListForAvailable`,
                description: `获取项目中能使用的菜单列表`
            },
            data: {
                nonForward: true
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/menu`,
                processParametersHandler: null,
                processDataHandler: `GetMenuListForAvailableFun`,
                processResultsHandler: `FilterMenuListForAvailableResultFun`
            }
        },
        // 获取菜单详细信息
        {
            node: {
                url: `/menuInfo`,
                method: `post`,
                fetchName: `GetMenuInfo`,
                description: `获取导航菜单的详细信息`
            },
            data: {
                nonForward: _richwayKoaConfig.menuSource === `local`,
                cloud: {
                    url: `/app/menu/page/{pageId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/menu`,
                    handler: `GetMenuInfo`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/menu`,
                processParametersHandler: `FilterMenuInfoParametersFun`,
                processDataHandler: `GetMenuInfoFun`,
                processResultsHandler: `FilterMenuInfoResultFun`
            }
        },
        // 保存菜单
        {
            node: {
                url: `/saveMenu`,
                method: `post`,
                mustLogin: true,
                fetchName: `SaveMenu`,
                description: `保存菜单`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/app/menu/page`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/menu`,
                    handler: `SaveMenu`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/menu`,
                processParametersHandler: `FilterSaveMenuParametersFun`,
                processResultsHandler: `FilterSaveMenuResultFun`
            }
        },
        // 删除菜单
        {
            node: {
                url: `/deleteMenu`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteMenu`,
                description: `删除菜单`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/app/menu/page/del/{menuId}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/menu`,
                    handler: `DeleteMenu`
                }
            }
        },
        // 获取当前平台的菜单列表
        {
            node: {
                url: `/menuListForApp`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetMenuListForApp`,
                description: `获取当前平台的菜单列表`
            },
            data: {
                cloud: {
                    url: `/app/role/tree/{appId}`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/menu`,
                    handler: `GetMenuListForApp`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/menu`,
                processResultsHandler: `FilterMenuListForAppResultFun`
            }
        },
        // 获取当前平台的某个角色的菜单列表
        {
            node: {
                url: `/menuListForAppAndRole`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetMenuListForAppAndRole`,
                description: `获取当前平台的某个角色的菜单列表`
            },
            data: {
                cloud: {
                    url: `/app/menu/tree/{appId}/{roleCode}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/menu`,
                    handler: `GetMenuListForAppAndRole`
                }
            }
        },
        // 保存当前平台的某个角色的菜单列表
        {
            node: {
                url: `/saveMenuListForAppAndRole`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetMenuListForAppAndRole`,
                description: `保存当前平台的某个角色的菜单列表`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/access/role/menu`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/menu`,
                    handler: `SaveMenuListForAppAndRole`
                }
            }
        }
    ]
};
