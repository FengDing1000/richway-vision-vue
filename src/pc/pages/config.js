module.exports = [
    {
        root: `vision_list_project`,
        children: [
            {
                menuDir: `portal`,
                menuTitle: `首页`
            },
            {
                menuDir: `login`,
                menuTitle: `登录`
            },
            {
                menuDir: `realtime_monitoring`,
                menuTitle: `实时监视`
            },
            {
                menuDir: `comprehensive_analysis`,
                menuTitle: `综合分析`
            },
            {
                menuDir: `font_library`,
                menuTitle: `字体库`
            },
            {
                menuDir: `error`,
                menuTitle: `错误页面`
            },
            {
                menuDir: `sys_manage`,
                menuTitle: `系统管理`,
                children: [
                    {
                        menuDir: `dept_manage`,
                        menuTitle: `分组管理`,
                        component: {
                            name: `DeptManage`,
                            package: `@rich/richwayweb-pages-sys`
                        }
                    },
                    {
                        menuDir: `menu_manage`,
                        menuTitle: `菜单管理`,
                        component: {
                            name: `MenuManage`,
                            package: `@rich/richwayweb-pages-sys`
                        }
                    },
                    {
                        menuDir: `role_manage`,
                        menuTitle: `角色管理`,
                        component: {
                            name: `RoleManage`,
                            package: `@rich/richwayweb-pages-sys`
                        }
                    },
                    {
                        menuDir: `role_menu_authority_manage`,
                        menuTitle: `角色菜单权限管理`,
                        component: {
                            name: `RoleMenuAuthorityManage`,
                            package: `@rich/richwayweb-pages-sys`
                        }
                    },
                    {
                        menuDir: `user_manage`,
                        menuTitle: `用户管理`,
                        component: {
                            name: `UserManage`,
                            package: `@rich/richwayweb-pages-sys`
                        }
                    }
                ]
            }
        ]
    }
];
