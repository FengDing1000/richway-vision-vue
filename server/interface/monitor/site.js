module.exports = {
    prefix: `/monitorSite`,
    baseUrl: ``,
    list: [
        // 查询测站
        {
            node: {
                url: `/getSiteList`,
                method: `get`,
                mustLogin: true,
                fetchName: `GetMonitorSiteList`,
                description: `获取测站的监控列表`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `get`
                },
                demo: {
                    url: `/site`,
                    handler: `GetSiteList`
                }
            }
        }
    ]
};
