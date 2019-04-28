const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceDemo);
// const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/dept`,
    baseUrl: `/base/api`,
    list: [
        // 查询所有的分组
        {
            node: {
                url: `/deptList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDeptList`,
                description: `查询所有的分组`
            },
            data: {
                cloud: {
                    url: `/sysmana/dept/dept`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/dept`,
                    handler: `GetDeptList`
                }
            }
        },
        // 保存分组
        {
            node: {
                url: `/saveDept`,
                method: `post`,
                mustLogin: true,
                fetchName: `SaveDept`,
                description: `保存分组`
            },
            data: {
                cloud: {
                    url: `/sysmana/dept/dept`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/dept`,
                    handler: `SaveDept`
                }
            }
        },
        // 删除分组
        {
            node: {
                url: `/deleteDept`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteDept`,
                description: `删除分组`
            },
            data: {
                cloud: {
                    url: `/sysmana/dept/dept/{deptCd}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/dept`,
                    handler: `DeleteDept`
                }
            }
        }
    ]
};
