const moment = require('moment');

const space = [
    {
        label: `当日(08:00--现在)`,
        value: `1`
    },
    {
        label: `昨日(昨天08:00--现在)`,
        value: `2`
    },
    {
        label: `最近3天(3天前08:00--现在)`,
        value: `3`
    },
    {
        label: `最近7天(7天前08:00--现在)`,
        value: `4`
    },
    {
        label: `最近1月(30天前08:00--现在)`,
        value: `5`
    },
    {
        label: `自定义`,
        value: `6`
    }
];

function dateRange(val) {
    switch (val) {
    case `1`:
        return [
            moment().hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD HH:mm:ss`),
            moment().format(`YYYY-MM-DD HH:mm:ss`)
        ];
    case `2`:
        return [
            moment().subtract(1, `day`).hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD HH:mm:ss`),
            moment().format(`YYYY-MM-DD HH:mm:ss`)
        ];
    case `3`:
        return [
            moment().subtract(3, `day`).hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD HH:mm:ss`),
            moment().format(`YYYY-MM-DD HH:mm:ss`)
        ];
    case `4`:
        return [
            moment().subtract(7, `day`).hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD HH:mm:ss`),
            moment().format(`YYYY-MM-DD HH:mm:ss`)
        ];
    case `5`:
        return [
            moment().subtract(1, `month`).hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD HH:mm:ss`),
            moment().format(`YYYY-MM-DD HH:mm:ss`)
        ];
    case `6`:
        break;
    default:
        return [
            moment().hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD HH:mm:ss`),
            moment().format(`YYYY-MM-DD HH:mm:ss`)
        ];
    }
}

function dateMonitor(val) {
    switch (val) {
    case `d`:
        return [
            moment().subtract(1, `day`).hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD`),
            moment().format(`YYYY-MM-DD`)
        ];
    case `x`:
        return [
            moment().subtract(10, `day`).hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD`),
            moment().format(`YYYY-MM-DD`)
        ];
    case `m`:
        return [
            moment().subtract(1, `month`).hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM`),
            moment().format(`YYYY-MM`)
        ];
    default:
        return [
            moment().hour(8).minute(0)
                .second(0)
                .format(`YYYY-MM-DD HH`),
            moment().format(`YYYY-MM-DD HH`)
        ];
    }
}

export default {
    dateRange,
    space,
    dateMonitor
};
