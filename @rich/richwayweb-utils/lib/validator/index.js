import _regexp from './regexp';

function validateFun(o = {}, callback) {
    if (o.value && !(new RegExp(o.reg)).test(o.value)) {
        callback(new Error(`请输入格式正确的${o.title}`));
    } else {
        callback();
    }
}

const validateConfig = {
    userAccount: {
        title: `账号`,
        reg: _regexp.userName,
        verFun: validateFun
    },
    userName: {
        title: `姓名`,
        reg: _regexp.userName,
        verFun: validateFun
    },
    passWord: {
        title: `密码`,
        reg: _regexp.passWord,
        verFun: validateFun
    },
    mobile: {
        title: `手机号码`,
        reg: _regexp.mobile,
        verFun: validateFun
    },
    email: {
        title: `邮箱`,
        reg: _regexp.email,
        verFun: validateFun
    },
    address: {
        title: `地址`,
        reg: _regexp.address,
        verFun: validateFun
    },
    qq: {
        title: `QQ`,
        reg: _regexp.qq,
        verFun: validateFun
    },
    fax: {
        title: `传真`,
        reg: _regexp.fax,
        verFun: validateFun
    },
    menuName: {
        title: `菜单名称`,
        reg: _regexp.menuName,
        verFun: validateFun
    },
    verificationCode: {
        title: `短信验证码`,
        reg: _regexp.verificationCode,
        verFun: validateFun
    },
    name: {
        title: `名称`,
        reg: _regexp.name,
        verFun: validateFun
    },
    nameAll: {
        title: `名称`,
        reg: _regexp.nameAll,
        verFun: validateFun
    },
    code: {
        title: `编码`,
        reg: _regexp.code,
        verFun: validateFun
    },
    lglt: {
        title: `经纬度`,
        reg: _regexp.lglt,
        verFun: validateFun
    }
};

const validateInfo = {};
for (const key in validateConfig) {
    if (Object.hasOwnProperty.call(validateConfig, key)) {
        const item = validateConfig[key];
        validateInfo[key] = (rule, value, callback) => {
            item.value = value;
            item.verFun(item, callback);
        };
    }
}

export default validateInfo;
