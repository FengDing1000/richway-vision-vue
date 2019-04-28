module.exports = {
    prefix: `/monitorWork`,
    baseUrl: ``,
    list: [
        // 查询工情类别
        {
            node: {
                url: `/getWorkTypeAllMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetWorkTypeAllMonitor`,
                description: `获取工情类别`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/work`,
                    handler: `GetWorkTypeAll`
                }
            }
        },
        // 查询工情
        {
            node: {
                url: `/getWorkAllMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetWorkAllMonitor`,
                description: `获取工情数据`
            },
            data: {
                cloud: {
                    url: `/busi/fhgc/queryfhgctb`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/work`,
                    handler: `GetWorkAll`
                }
            }
        },
        // 查询工情详情
        {
            node: {
                url: `/getWorkDetailMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetWorkDetailMonitor`,
                description: `获取工情详情`
            },
            data: {
                cloud: {
                    url: `/busi/fhgc/queryfhgctb`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `/monitor/work`,
                    handler: `GetWorkDetail`
                }
            }
        }
    ]
};
