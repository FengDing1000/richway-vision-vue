const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/hydrology`,
    baseUrl: `/hydrology`,
    list: [
        // 查询雨情
        {
            node: {
                url: `/getRainAll`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetRainAll`,
                description: `获取雨情数据`
            },
            data: {
                cloud: {
                    url: `/rains/`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/rain`,
                    handler: `GetRainAll`
                }
            }
        },
        {
            node: {
                url: `/getRainAllDetail`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetRainAllDetail`,
                description: `获取雨情数据详情`
            },
            data: {
                cloud: {
                    url: `/rains/neighbor/`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/rain`,
                    handler: `GetRainAllDetail`
                }
            }
        },
        // 查询累计雨情
        {
            node: {
                url: `/rains/page`,
                method: `get`,
                mustLogin: true,
                fetchName: `GetRainTotal`,
                description: `获取累计雨量`
            },
            data: {
                cloud: {
                    url: `/rains/page`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/rain`,
                    handler: `GetRainTotal`
                }
            }
        },
        // 获取区域平均降雨
        {
            node: {
                url: `/rains/avgrain`,
                method: `post`,
                mustLogin: true,
                fetchName: `QueryAreaRainfall`,
                description: `区域平均降雨`
            },
            data: {
                cloud: {
                    url: `/rains/avgrain`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/rain`,
                    handler: `QueryAreaRainfall`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `GetRiverWaterParamsFun`
            }
        },
        // 雨情监测
        {
            node: {
                url: `/rains/rain/senior`,
                method: `post`,
                mustLogin: true,
                fetchName: `QueryRainMonitor`,
                description: `雨情监测`
            },
            data: {
                cloud: {
                    url: `/rains/rain/senior`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/rain`,
                    handler: `QueryRainMonitor`
                }
            }
        },
        // 雨情同期对比
        {
            node: {
                url: `/rains/rain/rainlist`,
                method: `post`,
                mustLogin: true,
                fetchName: `QueryRainContrast`,
                description: `雨情同期对比`
            },
            data: {
                cloud: {
                    url: `/rains/rain/rainlist`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/rain`,
                    handler: `QueryRainContrast`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `RainContrastParamsFun`
            }
        }
    ]
};
