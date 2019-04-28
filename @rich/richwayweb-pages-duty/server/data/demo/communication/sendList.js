const Mock = require(`mockjs`);
// 发送列表页-发送列表信息
function GetSendList(ctx,queryInfo) {

    const sendListInfo = Mock.mock({
        "data|50": [
            {
                "appId": "@id",
                "count": "3",
                "fail": "1",
                "fileUrl": "",
                "id": "@id",
                "mMSContentLocation": "",
                "msg": "前进村5组危险区已预警。(汉源-河西海子水库雨量站)截至【2018-09-20 16:05】累计5分钟降雨10.0毫米，超过准备转移预警指标（8.0毫米）[防汛办]",
                "msgType": 0,
                "sdate": "@datetime",
                "sendType": "0",
                "sendUser": "系统自动",
                "sendUserNm": "",
                "success": "2",
                "title": "前进村5组危险区已预"
            }
        ]
    });

    const start = parseInt(`${queryInfo.rows}`, 10) * (queryInfo.page - 1);
    return {
        success: true,
        code: `1000`,
        message: `操作成功`,
        total: 100,
        pages: queryInfo.page,
        data: (sendListInfo.data || []).splice(start, parseInt(`${queryInfo.rows}`, 10)),
        stackTrace: null
    };
}
// 发送列表页-补发短信成功提示
function Reissue() {
    return {
        success: true,
        code: `1000`,
        message: `补发成功`,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: null
    };
}
// 发送列表页-补发短信成功提示
function DeleteSMSList() {
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
    GetSendList,
    Reissue,
    DeleteSMSList
};