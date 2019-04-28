const contacts = [
    {
        groupId: ``,
        groupName: `知名人士`,
        list: [
            {
                contactId: `aaa`,
                contactName: `用户aaa`,
                headerImgUrl: `https://tva2.sinaimg.cn/crop.1.0.747.747.180/633f068fjw8f9h040n951j20ku0kr74t.jpg`,
                describe: `模拟数据`,
                state: 1
            },
            {
                contactId: `bbb`,
                contactName: `用户bbb`,
                headerImgUrl: `https://wx2.sinaimg.cn/mw690/5db11ff4gy1flxmew7edlj203d03wt8n.jpg`,
                describe: `模拟数据`,
                state: 1
            },
            {
                contactId: `ccc`,
                contactName: `用户ccc`,
                headerImgUrl: `https://tva2.sinaimg.cn/crop.0.0.640.640.180/648fbe5ejw8ethmg0u9egj20hs0ht0tn.jpg`,
                describe: `模拟数据`,
                state: 1
            }
        ]
    }
];

function setContactState(id, flag) {
    for (const item of contacts) {
        for (const subItem of item.list) {
            if (subItem.contactId === id) {
                subItem.state = flag || 1;
            }
        }
    }
}


function ChatLogin(ctx) {
    const data = ctx._socketData;
    console.log(`来自客户端的消息chatLogin`, data);
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: ctx._socketData
    };
}

function OnLine(ctx) {
    const data = ctx._socketData;
    console.log(`来自客户端的消息onLine`, data);
    setContactState(data.id, 2);

    let mineInfo = {};
    for (const item of contacts) {
        for (const subItem of item.list) {
            if (subItem.contactId === data.id) {
                mineInfo = subItem;
            }
        }
    }

    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: {
            contacts,
            mineInfo
        }
    };
}

function DownLine(ctx) {
    const data = ctx._socketData;
    console.log(`来自客户端的消息downLine`, data);
    setContactState(data.id, 1);
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: data
    };
}

function GetChat(ctx) {
    const data = ctx._socketData;
    console.log(`来自客户端的消息getChat`, data);
    return {
        success: true,
        code: `1000`,
        message: ``,
        pages: 0,
        total: 0,
        stackTrace: null,
        data: data
    };
}


module.exports = {
    ChatLogin,
    OnLine,
    DownLine,
    GetChat
};
