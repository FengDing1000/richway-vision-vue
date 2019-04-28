const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);

module.exports = {
    prefix: `/base`,
    baseUrl: ``,
    list: [
        // 获取边界数据
        {
            node: {
                url: `/getBoundary`,
                method: `post`,
                fetchName: `GetBoundary`,
                description: `获取边界数据`
            },
            data: {
                cloud: {
                    url: `/base/api/region-service/getBoundary/{boundaryCode}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/mapBase`,
                    handler: `GetBoundary`
                }
            }
        },
        // 获取当前地理位置
        {
            node: {
                url: `/getLocation`,
                method: `post`,
                fetchName: `GetLocation`,
                description: `获取当前地理位置`
            },
            data: {
                cloud: {
                    url: `/base/api/region-service/getBoundary/{boundaryCode}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/mapBase`,
                    handler: `GetLocation`
                }
            }
        },
        // 查询云图数据
        {
            node: {
                url: `/getCloudList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetCloudList`,
                description: `查询云图数据`
            },
            data: {
                cloud: {
                    url: `/busi/weather/cloud/pics`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/mapBase`,
                    handler: `GetCloudList`
                }
            }
        },
        // 查询等值线
        {
            node: {
                url: `/getContourList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetContourList`,
                description: `查询等值线`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/mapBase`,
                    handler: `GetContourList`
                }
            }
        }
    ]
};
