/**
 * 语言类型数组
 * @type {*[]}
 */
const langList = [
    { code: `zh_CN`, name: `中文`, showTitle: `EN`, toGRPC: `zh_CN` },
    { code: `en_US`, name: `英文`, showTitle: `中文`, toGRPC: `en` }
];

module.exports.getDefaultLang = () => langList[0].code;
