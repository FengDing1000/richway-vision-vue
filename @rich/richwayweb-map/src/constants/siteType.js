const siteTypeList = [
    {
        code: `RR`,
        abbCode: `R`,
        name: `雨量站`
    },
    {
        code: `PP`,
        abbCode: `D`,
        name: `排水管网站`
    },
    {
        code: `ZZ`,
        abbCode: `L`,
        name: `水位/液位站`
    },
    {
        code: `ZQ`,
        abbCode: `C`,
        name: `气象站`
    },
    {
        code: `PZ`,
        abbCode: `H`,
        name: `水文站`
    },
    {
        code: `PZ1`,
        abbCode: `M`,
        name: `移动/人工站`
    },
    {
        code: `PZ2`,
        abbCode: `F`,
        name: `流量站`
    },
    {
        code: `PZ3`,
        abbCode: `V`,
        name: `视频站`
    },
    {
        code: `PZ4`,
        abbCode: `Q`,
        name: `水质站`
    },
    {
        code: `PZ5`,
        abbCode: `S`,
        name: `土壤墒情站`
    },
    {
        code: `PZ6`,
        abbCode: `W`,
        name: `多功能站`
    },
    {
        code: `PZ7`,
        abbCode: `P`,
        name: `雪量冰雹站`
    }
];

function getAbbCodeByCode(code) {
    let abbC = ``;
    for (const item of siteTypeList) {
        if (item.code === code) {
            abbC = item.abbCode;
            break;
        }
    }
    return abbC;
}

export default {
    siteTypeList,
    getAbbCodeByCode
};
