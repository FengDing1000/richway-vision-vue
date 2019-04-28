const Mock = require(`mockjs`);

const roleList = Mock.mock({
    "data|1000": [
        {
            appId: "@guid",
            crtDt: `@datetime`,
            isUsed: null,
            roleCode: "@string('upper', 5)",
            roleDesc: `@cword(10, 15)`,
            roleId: "@guid",
            roleName: "角色@integer(10, 999)",
            "roleOrder|1-1000": 1000,
            updDt: `@datetime`
        }
    ]
});

module.exports = {
    roleList: roleList.data
};
