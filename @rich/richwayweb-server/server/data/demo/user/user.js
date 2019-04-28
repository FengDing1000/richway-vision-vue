const data = require(`./data`);

function AddUser() {
    return {
        success: true,
        code: `1000`,
        message: `添加成功`,
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

function UpdateUser() {
    return {
        success: true,
        code: `1000`,
        message: `修改成功`,
        pages: 0,
        total: 0,
        stackTrace: null
    };
}

function GetUser(ctx, queryInfo) {
    const userList = (data.userList || []).splice(0, 1);

    const { userAccount } = queryInfo;
    userList[0].userAccount = userAccount;
    if (userAccount === `aaa`) {
        userList[0].userName = `用户A`;
    } else if (userAccount === `bbb`) {
        userList[0].userName = `用户B`;
    }
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
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 1000,
        pages: queryInfo.page,
        data: (data.userList || []).splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
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
    AddUser,
    DeleteUser,
    UpdateUser,
    GetUser,
    GetUserAll,
    UpdateLayout
};
