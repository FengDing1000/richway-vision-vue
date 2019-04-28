const orgScalTypeList = [
    {
        code: 0,
        name: `市级`
    },
    {
        code: 1,
        name: `县级`
    }
];

function fiterOrgScalType(code) {
    let str = ``;
    for (const item of orgScalTypeList) {
        if (item.code === code) {
            str = item.name;
        }
    }
    return str;
}

export default {
    orgScalTypeList,
    fiterOrgScalType
}
