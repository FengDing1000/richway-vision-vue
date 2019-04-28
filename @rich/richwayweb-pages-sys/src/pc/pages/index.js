export default {
    // 菜单管理页面组件
    MenuManage: r => require.ensure([], () => r(require(`./internet_platform/sys_manage/menu_manage/template`)), `components/pagesSys/menuManage`),
    
    // 角色管理页面组件
    RoleManage: r => require.ensure([], () => r(require(`./internet_platform/sys_manage/role_manage/template`)), `components/pagesSys/roleManage`),
    
    // 角色菜单权限页面组件
    
    RoleMenuAuthorityManage: r => require.ensure([], () => r(require(`./internet_platform/sys_manage/role_menu_authority_manage/template`)), `components/pagesSys/roleMenuAuthorityManage`),
    
    // 分组管理页面组件
    DeptManage: r => require.ensure([], () => r(require(`./internet_platform/sys_manage/dept_manage/template`)), `components/pagesSys/deptManage`),
    
    // 用户管理页面组件
    UserManage: r => require.ensure([], () => r(require(`./internet_platform/sys_manage/user_manage/template`)), `components/pagesSys/userManage`)
};
