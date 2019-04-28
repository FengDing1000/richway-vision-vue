const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceDemo);
// const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/app`,
    baseUrl: ``,
    list: [
        // 查询所有的app
        {
            node: {
                url: `/appAll`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetAppAll`,
                description: `查询所有的app`
            },
            data: {
                cloud: {
                    url: `/base/api/app/appList`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/app`,
                    handler: `GetAppAll`
                }
            }
        }
    ]
};
