const path = require(`path`);
const SocketHandleUrl = path.resolve(__dirname, `../../`, _richwayKoaConfig.socketHandle);

module.exports = {
    prefix: `/socket_login`,
    baseUrl: ``,
    list: [
        // 在线人数
        {
            node: {
                url: `online`
            },
            data: {
                url: `${SocketHandleUrl}/login`,
                handler: `Online`
            }
        }
    ]
};
