const menbTypeList = [
    {
        code: 0,
        name: `上级`
    },
    {
        code: 1,
        name: `下级`
    }
];

function fiterMenbType(code) {
    let str = ``;
    for (const item of menbTypeList) {
        if (item.code === code) {
            str = item.name;
        }
    }
    return str;
}

export default {
    menbTypeList,
    fiterMenbType
}
