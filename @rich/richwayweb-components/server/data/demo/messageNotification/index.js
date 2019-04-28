const Mock = require(`mockjs`);

function GetMessageNotificationList() {
    const list =  Mock.mock({
        "data|20": [
            {
                id: `@guid`,
                "type|1": [1, 2],
                title: "预警处置",
                content: `@cword(6, 36)`,
                time: `@datetime`,
                "state|1": [0]
            }
        ]
    });

    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: 0,
        data: list.data,
        stackTrace: null
    };
}

function SetMessageNotificationInfo() {
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: 0,
        data: [],
        stackTrace: null
    };
}

module.exports = {
    GetMessageNotificationList,
    SetMessageNotificationInfo
};
