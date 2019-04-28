const Mock = require(`mockjs`);

const deptList = Mock.mock({
    "data|1000": [
        {
            "addr": "",
            "adlCd": "@guid",
            "appId": "@guid",
            "children": null,
            "crtDt": "@datetime",
            "crtDtTm": "@datetime",
            "deptCd": "@string('upper', 5)",
            "deptNm": "分组@integer(10, 999)",
            "deptParent": "",
            "eMail": "@email",
            "fax": "@integer(100, 999)-@integer(1000000, 99999999)",
            "isParent": true,
            "lrNm": "@cname",
            "menb|1": [0, 1],
            "nt": "",
            "open": null,
            "orgScal|1": [0, 1],
            "orgScalStr|1": ["县级","市级"],
            "orgShnm": "@county(true)水文局",
            "orgTp": "",
            "pnm": null,
            "tel": "@integer(100, 999)-@integer(1000000, 99999999)",
            "ts": "@datetime",
            "tsTm": "@datetime",
            "updDt": "@datetime",
            "updDtTm": "@datetime",
            "userinfo": null,
            "web": "@url",
            "zip": "@integer(100000, 999999)"
        }
    ]
});

module.exports = {
    deptList: deptList.data
};
