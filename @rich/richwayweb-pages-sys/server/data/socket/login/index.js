const KoaOnLine = require(`@rich/richwayweb-server/server/bin/common/models/koa.online`);

async function Online(ctx) {
    const onLineInfo = await KoaOnLine.getOnlineInfo(ctx);
    const arr = [];
    let total = 0;
    for (let key in onLineInfo) {
        if (Object.hasOwnProperty.call(onLineInfo, key)) {
            arr.push(JSON.parse(onLineInfo[key]));
            total++;
        }
    }
    return {
        total,
        data: arr
    };
}


module.exports = {
    Online
};
