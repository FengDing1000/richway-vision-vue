const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
// const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceCloudFilter);


module.exports = {
    prefix: `/messageNotification`,
    baseUrl: ``,
    list: [
        // 获取消息通知列表
        {
            node: {
                url: `/getMessageNotificationList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetMessageNotificationList`,
                description: `获取消息通知列表`
            },
            data: {
                cloud: {
                    url: `/tmsg/querytmsg`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/messageNotification`,
                    handler: `GetMessageNotificationList`
                }
            }
        },
        // 阅读消息通知
        {
            node: {
                url: `/setMessageNotificationInfo`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetMessageNotificationInfo`,
                description: `阅读消息通知`
            },
            data: {
                cloud: {
                    url: `/tmsg/`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/messageNotification`,
                    handler: `SetMessageNotificationInfo`
                },
                triggerSocket: `messageNotification`
            }
        }
    ]
};
