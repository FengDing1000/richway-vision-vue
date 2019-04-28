module.exports = {
    prefix: `/monitorSite`,
    baseUrl: ``,
    list: [
        // 查询测站
        {
            node: {
                url: `/getSiteList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetSiteListMonitor`,
                description: `获取测站的监控列表`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                },
                demo: {
                    url: `/monitor/site`,
                    handler: `GetSiteList`
                }
            }
        }
    ]
};
