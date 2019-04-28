const path = require(`path`);
const InterfaceDemoUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceDemo);
const InterfaceCloudFilterUrl = path.resolve(__dirname, `../../../`, _richwayKoaConfig.interfaceCloudFilter);

module.exports = {
    prefix: `/user`,
    baseUrl: `/base/api`,
    list: [
        {
            node: {
                url: `/register`,
                method: `post`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                }
            }
        },
        {
            node: {
                url: `/forget`,
                method: `post`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                }
            }
        },
        // 保存用户
        {
            node: {
                url: `/saveUser`,
                method: `post`,
                mustLogin: true,
                fetchName: `SaveUser`,
                description: `保存用户`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/userinfo/userinfo`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `SaveUser`
                }
            }
        },
        // 删除用户
        {
            node: {
                url: `/deleteUser`,
                method: `post`,
                mustLogin: true,
                fetchName: `DeleteUser`,
                description: `删除账号`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/userinfo/userinfo/{userAccount}`,
                    method: `delete`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `DeleteUser`
                }
            }
        },
        // 查询用户
        {
            node: {
                url: `/getUser`,
                mustLogin: true,
                method: `post`,
                fetchName: `GetUser`,
                description: `获取账号信息`
            },
            data: {
                nonForward: true,
                cloud: {
                    url: `/sysmana/userinfo/userinfo/{userAccount}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `GetUser`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/user`,
                processParametersHandler: `FilterUserInfoParametersFun`,
                processDataHandler: `GetUserInfoFun`,
                processResultsHandler: `FilterUserInfoResultFun`
            }
        },
        // 查询用户列表
        {
            node: {
                url: `/getUserAll`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetUserAll`,
                description: `获取用户列表`
            },
            data: {
                cloud: {
                    url: `/sysmana/userinfo/userinfoPage`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `GetUserAll`
                }
            }
        },
        // 账户激活
        {
            node: {
                url: `/setUserActive`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetUserActive`,
                description: `账户激活`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/user/{userAccount}/active`,
                    method: `put`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `SetUserActive`
                }
            }
        },
        // 账户锁定
        {
            node: {
                url: `/setUserLock`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetUserLock`,
                description: `账户锁定`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/user/{userAccount}/lock`,
                    method: `put`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `SetUserLock`
                }
            }
        },
        // 账户解锁
        {
            node: {
                url: `/setUserUnLock`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetUserUnLock`,
                description: `账户锁定`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/user/{userAccount}/unlock`,
                    method: `put`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `SetUserUnLock`
                }
            }
        },
        // 重置密码
        {
            node: {
                url: `/resetPassword`,
                method: `post`,
                mustLogin: true,
                fetchName: `ResetPassword`,
                description: `重置密码`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/user/{userAccount}/resetDefPwd`,
                    method: `put`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `ResetPassword`
                }
            }
        },
        // 获取用户的分组信息
        {
            node: {
                url: `/getUserDepts`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetUserDepts`,
                description: `获取用户的分组信息`
            },
            data: {
                cloud: {
                    url: `/sysmana/userinfo/depts/{userAccount}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `GetUserDepts`
                }
            }
        },
        // 获取可以给用户设置分组的分组列表
        {
            node: {
                url: `/getDeptsForUser`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetDeptsForUser`,
                description: `获取可以给用户设置分组的分组列表`
            },
            data: {
                cloud: {
                    url: `/sysmana/dept/deptpage`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `GetDeptsForUser`
                }
            }
        },
        // 设置用户的分组信息
        {
            node: {
                url: `/setUserDepts`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetUserDepts`,
                description: `设置用户的分组信息`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/userinfo/userdept`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `SetUserDepts`
                }
            }
        },
        // 获取用户的角色信息
        {
            node: {
                url: `/getUserRoles`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetUserRoles`,
                description: `获取用户的角色信息`
            },
            data: {
                cloud: {
                    url: `/sysmana/userinfo/roles/{userAccount}`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `GetUserRoles`
                }
            }
        },
        // 获取可以给用户授权的角色列表
        {
            node: {
                url: `/getRolesForUser`,
                method: `post`,
                mustLogin: true,
                fetchName: `GetRolesForUser`,
                description: `获取可以给用户授权的角色列表`
            },
            data: {
                cloud: {
                    url: `/sysmana/role/roles`,
                    method: `get`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `GetRolesForUser`
                }
            }
        },
        // 设置用户的角色信息
        {
            node: {
                url: `/setUserRoles`,
                method: `post`,
                mustLogin: true,
                fetchName: `SetUserRoles`,
                description: `设置用户的分组信息`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/userinfo/userrole`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `SetUserRoles`
                }
            }
        },
        // 修改密码
        {
            node: {
                url: `/updatePassword`,
                method: `post`,
                mustLogin: true,
                fetchName: `UpdatePassword`,
                description: `修改密码`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/sysmana/resetpwd/changepwd`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `UpdatePassword`
                }
            }
        },
        // 保存上传的用户文件
        {
            node: {
                url: `/importSaveUser`,
                method: `post`,
                mustLogin: true,
                fetchName: `ImportSaveUser`,
                description: `保存上传的用户文件`,
                config: {
                    fullLoading: true,
                    successTips: true
                }
            },
            data: {
                cloud: {
                    url: `/impe/saveUser`,
                    method: `post`,
                    accessToken: true
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `ImportSaveUser`
                }
            }
        },
        // 修改页面布局
        {
            node: {
                url: `/updateLayout`,
                method: `post`,
                mustLogin: true,
                fetchName: `UpdateLayout`,
                description: `修改用户的页面布局信息`
            },
            data: {
                cloud: {
                    url: ``,
                    method: `post`
                },
                demo: {
                    url: `${InterfaceDemoUrl}/sys/user`,
                    handler: `UpdateLayout`
                }
            },
            handler: {
                url: `${InterfaceCloudFilterUrl}/sys/user`,
                processParametersHandler: null,
                processResultsHandler: `FilterUpdateLayoutResultFun`
            }
        }
    ]
};
