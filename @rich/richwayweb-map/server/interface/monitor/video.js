module.exports = {
    prefix: `/monitorVideo`,
    baseUrl: ``,
    list: [
        // 查询测站
        {
            node: {
                url: `/getVideoStationListMonitor`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetVideoStationListMonitor`,
                description: `获取测站的监控列表`
            },
            data: {
                nonForward: true
                // cloud: {
                //     url: ``,
                //     method: `post`
                // },
                // demo: {
                //     url: `/video`,
                //     handler: `GetVideoStationList`
                // }
            },
            handler: {
                url: `/monitor/video`,
                processDataHandler: `GetVideoStationListFun`
            }
        }
    ]
};
