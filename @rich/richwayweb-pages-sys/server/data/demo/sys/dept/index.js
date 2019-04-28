const data = require(`./data`);

function GetDeptList(ctx) {
    const queryInfo = ctx._queryInfo;
    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    const end = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 1000,
        pages: queryInfo.page,
        data: (data.deptList || []).slice(start, end),
        stackTrace: null
    };
}


function AddDept() {
    return {
        success: true,
        code: `1000`,
        message: `添加成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

function UpdateDept() {
    return {
        success: true,
        code: `1000`,
        message: `修改成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

function SaveDept() {
    return {
        success: true,
        code: `1000`,
        message: `保存成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

function DeleteDept() {
    return {
        success: true,
        code: `1000`,
        message: `删除成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

module.exports = {
    GetDeptList,
    AddDept,
    UpdateDept,
    SaveDept,
    DeleteDept
};
