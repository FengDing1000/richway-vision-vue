const data = require(`./data`);

/**
 * 获取当前平台的导航菜单列表
 * @param {object}ctx is
 * @return {*} is
 * @constructor
 */
function GetRoleList(ctx) {
    const queryInfo = ctx._queryInfo;
    const start = parseInt(`${queryInfo.rows}`, 10) * ((queryInfo.page || 1) - 1);
    const end = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page);
    return {
        success: true,
        code: `1000`,
        message: ``,
        total: 100,
        pages: queryInfo.page,
        stackTrace: null,
        data: data.roleList.slice(start, end)
    };
}

/**
 * 新增角色
 * @return {{success: boolean, code: string, message: string, pages: number, total: number, stackTrace: null, data: null}} is
 * @constructor
 */
function AddRole() {
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

/**
 * 修改角色
 * @return {{success: boolean, code: string, message: string, pages: number, total: number, stackTrace: null, data: null}} is
 * @constructor
 */
function UpdateRole() {
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

function SaveRole() {
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

/**
 * 删除角色
 * @return {{success: boolean, code: string, message: string, pages: number, total: number, stackTrace: null, data: null}} is
 * @constructor
 */
function DeleteRole() {
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

function GetRoleFilter() {
    return {
        success: true,
        code: `1000`,
        message: `设置成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: {
            adcd:"370500000000000",
            appid:"370500000000000",
            sttp:"('TT','VV','ZG')"
        }
    };
}

function SetRoleFilter() {
    return {
        success: true,
        code: `1000`,
        message: `设置成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

function ImportSaveRole() {
    return {
        success: true,
        code: `1000`,
        message: `设置成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}

module.exports = {
    GetRoleList,
    AddRole,
    UpdateRole,
    SaveRole,
    DeleteRole,
    GetRoleFilter,
    SetRoleFilter,
    ImportSaveRole
};
