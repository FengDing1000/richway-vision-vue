const Mock = require(`mockjs`);

function createAppInfo() {
    const name = Mock.mock(`@county`);
    const id = Mock.mock(`@id`);
    const pageId = Mock.mock(`@guid`);
    return {
        adNm: name,
        adcd: /\d{10,20}/,
        adcdPath: null,
        alias: `admin${id}`,
        appId: `admin${id}`,
        appNm: `${name}云平台`,
        appUrl: ``,
        categoryId: `Flash floods`,
        cfgAcIds: null,
        cfgAcNames: null,
        cloneFlag: false,
        converMarks: `j`,
        creator: `管理员`,
        crtDateName: null,
        crtDt: `@datetime`,
        defaultPageId: `admin${pageId}`,
        defaultStyleId: ``,
        endDateName: null,
        endDt: `@datetime`,
        monitor: null,
        nt: `克隆生成`,
        stat: `1`,
        statNm: `启动`,
        thumbnail: `base/images/logo_default.png`,
        updDt: null
    };
}


function GetAppAll() {
    const appList = [];
    for (let a = 0; a < 20; a++) {
        appList.push(createAppInfo());
    }
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 20,
        pages: 1,
        data: appList,
        stackTrace: null
    };
}

module.exports = {
    GetAppAll
};
