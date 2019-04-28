const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/base`,
    baseUrl: ``,
    list: [
        // 获取全局的配置信息
        {
            node: {
                url: `/getBaseConfig`,
                method: `post`,
                fetchName: `GetBaseConfig`,
                description: `获取全局的配置信息`
            },
            data: {
                nonForward: true
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/base`,
                processDataHandler: `GetBaseConfigFun`
            }
        },
        // 获取省份数据
        {
            node: {
                url: `/getProvinceData`,
                method: `post`,
                fetchName: `GetProvinceData`,
                description: `获取省份数据`,
                config: {
                    cache: true
                }
            },
            data: {
                cloud: {
                    url: `/base/api/region-service/prvnc`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetProvinceData`
                }
            }
        },
        // 获取市区数据
        {
            node: {
                url: `/getSubRegionData`,
                method: `post`,
                fetchName: `GetSubRegionData`,
                description: `获取市区数据`
            },
            data: {
                cloud: {
                    url: `/base/api/region-service/subregion/{adCd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetSubRegionData`
                }
            }
        },
        // 获取市县数据
        {
            node: {
                url: `/getRegionData`,
                method: `post`,
                fetchName: `GetRegionData`,
                description: `获取市县数据`
            },
            data: {
                // nonForward: true
                cloud: {
                    url: `/base/api/region-service/tree/{adcd}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/base`,
                    handler: `GetRegionData`
                }
            },
            handler: {
                url: `/base`,
                processParametersHandler: null,
                processDataHandler: `GetGetRegionDataFun`
            }
        },
        // 上传文件
        {
            node: {
                url: `/upLoad`,
                method: `post`
            },
            data: {
                nonForward: true
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/base`,
                processDataHandler: `UpLoadFileFun`
            }
        },
        // 获取政区列表
        {
            node: {
                url: `/waring/adcdCity`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetAdcdCity`,
                description: `获取政区列表`
            },
            data: {
                cloud: {
                    url: `/shzh/waring/adcdCity`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/rain`,
                    handler: `GetAdcdCity`
                }
            }
        },
        // 获取当前客户端的地理位置信息
        {
            node: {
                url: `/getGeographicInfo`,
                method: `post`,
                fetchName: `GetGeographicInfo`,
                description: `获取当前客户端的地理位置信息`
            },
            data: {
                nonForward: true
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/base`,
                processDataHandler: `GetGeographicInfoFun`
            }
        }
    ]
};
