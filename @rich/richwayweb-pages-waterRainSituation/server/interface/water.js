const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/hydrology`,
    baseUrl: `/hydrology`,
    list: [
        // 查询水情
        {
            node: {
                url: `/getWaterAll`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetWaterAll`,
                description: `获取水情数据`
            },
            data: {
                cloud: {
                    url: `/getWaterAll`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/water`,
                    handler: `GetWaterAll`
                }
            }
        },
        // 查询最新河道水情
        {
            node: {
                url: `/river/rivers`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetNewRiverWater`,
                description: `获取最新河道水情`
            },
            data: {
                cloud: {
                    url: `/river/rivers`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/water`,
                    handler: `GetNewRiverWater`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `GetRiverWaterParamsFun`
            }
        },
        // 查询最新水库水情
        {
            node: {
                url: `/rsvr/rsvrs`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetNewRsvrWater`,
                description: `获取最新水库水情`
            },
            data: {
                cloud: {
                    url: `/rsvr/rsvrs`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/water`,
                    handler: `GetNewRsvrWater`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `GetRiverWaterParamsFun`
            }
        },
        // 查询河道水情
        {
            node: {
                url: `/river/his`,
                method: `post`,
                mustLogin: true,
                fetchName: `QueryRiverWater`,
                description: `查询河道水情`
            },
            data: {
                cloud: {
                    url: `/river/his`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/water`,
                    handler: `QueryRiverWater`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `GetRiverWaterParamsFun`
            }
        },
        // 查询水库水情
        {
            node: {
                url: `/rsvr/his`,
                method: `post`,
                mustLogin: true,
                fetchName: `QueryRsvrWater`,
                description: `查询水库水情`
            },
            data: {
                cloud: {
                    url: `/rsvr/his`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/water`,
                    handler: `QueryRsvrWater`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/water`,
                processParametersHandler: `GetRiverWaterParamsFun`
            }
        }
    ]
};
