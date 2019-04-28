const Mock = require(`mockjs`);

const userList = Mock.mock({
    "data|1000": [
        {
            "id|+1": 1,
            activateCode: null,
            adCd: ``,
            address: ``,
            adnm: null,
            appId: `admin661001`,
            birthday: `@datetime`,
            companyName: null,
            dept: null,
            email: `@email`,
            fax: ``,
            idCard: ``,
            "isActive|0-1": 0,
            "isUser|0-1": 0,
            lastActivateTime: `@datetime`,
            loginName: null,
            loginPassWord: null,
            mobileNo: `13718992030`,
            nickName: `@name`,
            nt: ``,
            passWord: null,
            productInfo: null,
            qq: ``,
            registerTime: null,
            resetName: null,
            roles: null,
            rolestrs: null,
            "sex|0-1": 0,
            sexStr: null,
            status: null,
            tel: ``,
            tmStr: `@datetime`,
            tokenCRTtime: null,
            ts: `@datetime`,
            userAccount: `@last`,
            userName: `@last`,
            "userStatus|1-2": 0,
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
