const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceDemo);
// const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/role`,
    baseUrl: `/base/api`,
    list: [
        // 获取角色列表
        {
            node: {
                url: `/roleList`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetRoleList`,
                description: `获取角色列表`
            },
            data: {
                cloud: {
                    url: `/sysmana/role/roles`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/role`,
                    handler: `GetRoleList`
                }
            }
        },
        // 保存角色
        {
            node: {
                url: `/saveRole`,
                method: `post`,
                mustLogin: true,
                fetchName: `SaveRole`,
                description: `保存角色`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/role/role`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/role`,
                    handler: `SaveRole`
                }
            }
        },
        // 删除角色
        {
            node: {
                url: `/deleteRole`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteRole`,
                description: `删除角色`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/role/role/{roleId}/{roleCode}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/role`,
                    handler: `DeleteRole`
                }
            }
        },
        // 获取过滤条件
        {
            node: {
                url: `/getRoleFilter`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetRoleFilter`,
                description: `获取过滤条件`
            },
            data: {
                cloud: {
                    url: `/sysmana/role/{roleCode}/dataRole/ff`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/role`,
                    handler: `GetRoleFilter`
                }
            }
        },
        // 设置过滤条件
        {
            node: {
                url: `/setRoleFilter`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetRoleFilter`,
                description: `设置过滤条件`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/role/{roleCode}/dataRole`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/role`,
                    handler: `SetRoleFilter`
                }
            }
        },
        // 保存上传的角色文件
        {
            node: {
                url: `/importSaveRole`,
                method: `post`,
                mustLogin: true,
                fetchName: `ImportSaveRole`,
                description: `保存上传的角色文件`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/impe/saveRole`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/role`,
                    handler: `ImportSaveRole`
                }
            }
        },
    ]
};
