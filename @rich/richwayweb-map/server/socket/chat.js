module.exports = {
    prefix: `/chat`,
    baseUrl: ``,
    list: [
        // 即时通讯
        {
            node: {
                url: `chatLogin`,
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                },
                demo: {
                    url: `/chat`,
                    handler: `ChatLogin`
                }
            }
        },
        // 上线
        {
            node: {
                url: `onLine`,
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                },
                demo: {
                    url: `/chat`,
                    handler: `OnLine`
                }
            }
        },
        // 下线
        {
            node: {
                url: `downLine`,
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                },
                demo: {
                    url: `/chat`,
                    handler: `DownLine`
                }
            }
        },
        // 聊天信息
        {
            node: {
                url: `getChat`,
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                },
                demo: {
                    url: `/chat`,
                    handler: `GetChat`
                }
            }
        }
    ]
};
