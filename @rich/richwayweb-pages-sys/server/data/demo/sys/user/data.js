const Mock = require(`mockjs`);

const userList = Mock.mock({
    "data|1000": [
        {
            id: "@guid",
            activateCode: null,
            adCd: `520303000000000`,
            address: `@county(true) @cword(2, 5) 街道134号`,
            adnm: `汇川区`,
            appId: `admin@id`,
            birthday: `@datetime`,
            companyName: null,
            dept: null,
            email: `@email`,
            fax: `@integer(100, 999)-@integer(1000000, 99999999)`,
            idCard: ``,
            "isActive|0-1": 0,
            "isUser|0-1": 0,
            lastActivateTime: `@datetime`,
            loginName: null,
            loginPassWord: null,
            mobileNo: `137@integer(10000000, 99999999)`,
            nickName: `@cname`,
            nt: `@cword(6,30)`,
            passWord: null,
            productInfo: null,
            qq: `@integer(10000000, 999999999999)`,
            registerTime: null,
            resetName: null,
            roles: null,
            rolestrs: null,
            "sex|1": [0, 1],
            sexStr: null,
            status: null,
            tel: ``,
            tmStr: `@datetime`,
            tokenCRTtime: null,
            ts: `@datetime`,
            userAccount: `@last`,
            userName: `@cname`,
            "userStatus|1": [1, 2],
            validateCode: null,
            validateId: null,
            verifyCode: null,
            verifyCodeRegister: null,
            wecatId: `@last`
        }
    ]
});

module.exports = {
    userList: userList.data
};
