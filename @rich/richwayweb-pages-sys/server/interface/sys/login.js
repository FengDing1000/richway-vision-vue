const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/login`,
    baseUrl: ``,
    list: [
        {
            node: {
                url: `/login`,
                method: `post`,
                fetchName: `Login`,
                description: `登录`
            },
            data: {
                cloud: {
                    url: `/base/api/token/login/token`,
                    method: `post`
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/login`,
                    handler: `Login`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/login`,
                processParametersHandler: `FilterLoginParametersFun`,
                processResultsHandler: `FilterLoginResultFun`
            }
        },
        {
            node: {
                url: `/signOut`,
                method: `post`,
                fetchName: `SignOut`,
                description: `登出`
            },
            data: {
                cloud: {
                    url: `/logout`,
                    method: `get`
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/login`,
                    handler: `LoginOut`,
                    accessToken: true
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/login`,
                processParametersHandler: null,
                processResultsHandler: `FilterSignOutResultFun`
            }
        }
    ]
};
