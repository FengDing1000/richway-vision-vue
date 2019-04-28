const data = require(`./data`);
const deptData = require(`../dept/data`);
const roleData = require(`../role/data`);


function SaveUser() {
    return {
        success: true,
        code: `1000`,
        message: `保存成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}

function DeleteUser() {
    return {
        success: true,
        code: `1000`,
        message: `删除成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}

function GetUser(ctx, queryInfo) {
    const userList = (data.userList || []).slice(0, 1);

    const { userAccount } = queryInfo;
    userList[0].userAccount = userAccount;
    if (userAccount === `aaa`) {
        userList[0].userName = `用户A`;
    } else if (userAccount === `bbb`) {
        userList[0].userName = `用户B`;
    }

    console.log(444444, userList);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 0,
        pages: 1,
        data: userList,
        stackTrace: null
    };
}

function GetUserAll(ctx) {
    const queryInfo = ctx._queryInfo;
    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    const end = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 1000,
        pages: queryInfo.page,
        data: (data.userList || []).slice(start, end),
        stackTrace: null
    };
}



function SetUserActive() {
    return {
        success: true,
        code: `1000`,
        message: `激活成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}
function SetUserLock() {
    return {
        success: true,
        code: `1000`,
        message: `锁定成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}
function SetUserUnLock() {
    return {
        success: true,
        code: `1000`,
        message: `解锁成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}

function ResetPassword(){
    return {
        success: true,
        code: `1000`,
        message: `重置密码成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}

function UpdatePassword(){
    return {
        success: true,
        code: `1000`,
        message: `修改密码成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}

function GetUserDepts(ctx){
    const queryInfo = ctx._queryInfo;
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 1000,
        pages: queryInfo.page,
        data: (deptData.deptList || []).slice(0, 2),
        stackTrace: null
    };
}

function GetDeptsForUser(ctx){
    const queryInfo = ctx._queryInfo;
    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 1000,
        pages: queryInfo.page,
        data: (deptData.deptList || []).splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}

function SetUserDepts(){
    return {
        success: true,
        code: `1000`,
        message: `设置分组成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: []
    };
}

function GetUserRoles(ctx){
    const queryInfo = ctx._queryInfo;
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 1000,
        pages: queryInfo.page,
        data: (roleData.roleList || []).slice(0, 2),
        stackTrace: null
    };
}

function GetRolesForUser(ctx){
    const queryInfo = ctx._queryInfo;

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 1000,
        pages: queryInfo.page,
        data: (roleData.roleList || []).slice(0, 35),
        stackTrace: null
    };
}

function SetUserRoles(){
    return {
        success: true,
        code: `1000`,
        message: `设置角色成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: []
    };
}

function ImportSaveUser(){
    return {
        success: true,
        code: `1000`,
        message: `解锁成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: []
    };
}

function UpdateLayout(ctx) {
    return {
        success: true,
        code: `1000`,
        message: `页面布局修改成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: ctx._queryInfo
    };
}



module.exports = {
    SaveUser,
    DeleteUser,
    GetUser,
    GetUserAll,
    UpdateLayout,
    SetUserActive,
    SetUserLock,
    SetUserUnLock,
    ResetPassword,
    UpdatePassword,
    ImportSaveUser,
    GetUserDepts,
    GetDeptsForUser,
    SetUserDepts,
    GetUserRoles,
    GetRolesForUser,
    SetUserRoles
};
