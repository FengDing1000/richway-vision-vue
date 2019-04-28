const path = require(`path`);
// const InterfaceDemoUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.interfaceDemo);
const SocketHandleUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.socketHandle);

module.exports = {
    prefix: `/socket_messageNotification`,
    baseUrl: ``,
    list: [
        // 消息公告
        {
            node: {
                url: `messageNotification`
            },
            data: {
                url: `${SocketHandleUrl}/messageNotification`,
                handler: `MessageNotification`
                // socket: {
                //     url: `/tmsg/querytmsg`,
                //     method: `get`,
                //     accessToken: true
                // },
                // demo: {
                //     url: `${InterfaceDemoUrl}/messageNotification`,
                //     handler: `GetMessageNotificationList`
                // }
            }
        }
    ]
};
