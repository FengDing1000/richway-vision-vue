const isDate = require(`./isDate`);

/**
 * 个位数前面补齐0
 * @param {int} m is int
 * @returns {string} is string
 */
function towString(m) {
    return m < 10 ? `0${m}` : m;
}

/**
 * 强制转换成数字
 * @param {string} n is string
 * @returns {*} is number
 */
function getParseInt(n) {
    n = Number(n);
    n = isNaN(parseInt(n, 10)) ? 0 : n;
    return n;
}

/**
 * 处理时间
 * @param {object} obj is date or string
 * @param {boolean} flag is boolean
 * @returns {{}} id object
 */
function getDateInfo(obj = {}, flag = false) {
    if (typeof (obj) === `string`) {
        obj = {
            date: obj
        };
    }

    const def = {
        sign: `-`,
        date: ``,
        format: `yyyy-mm-dd`,
        w: [`星期日`, `星期一`, `星期二`, `星期三`, `星期四`, `星期五`, `星期六`],
        wa: [`周日`, `周一`, `周二`, `周三`, `周四`, `周五`, `周六`],
        d: [`前天`, `昨天`, `今天`, `明天`, `后天`],
        o: [`年`, `月`, `日`]
    };

    Object.assign(def, obj);

    if (def.date && !isDate(def.date)) {
        def.date = `${def.date}`.replace(`T`, ` `);
        def.date = `${def.date}`.replace(/\.\d{3}\+\d{4}/, ``);
    }
    def.date = `${def.date}`.replace(/-/g, `/`);
    if (def.date && (/\d{10}/g).test(def.date)) {
        def.date = parseInt(`${def.date}`, 10);
    }
    let d = def.date ? (new Date(def.date)) : (new Date());
    if (d === `Invalid Date`) {
        if (flag === true) {
            return {
                date: `--`
            };
        }
        d = new Date();
    }
    const y = d.getFullYear();
    const m = towString(d.getMonth() + 1);
    const dd = towString(d.getDate());

    const h = towString(d.getHours());
    const mm = towString(d.getMinutes());
    const s = towString(d.getSeconds());

    const week = d.getDay();
    const thisTime = d.getTime();

    const returnObj = {};
    returnObj.day = dd;
    returnObj.date = `${y}${def.sign}${m}${def.sign}${dd}`;
    returnObj.dateCN = `${y}${def.o[0]}${m}${def.o[1]}${dd}${def.o[2]}`;
    returnObj.dateAbbCN = `${m}${def.o[1]}${dd}${def.o[2]}`;
    returnObj.dateAbb = `${m}${def.sign}${dd}`;
    returnObj.dateMonthCN = `${y}${def.o[0]}${m}${def.o[1]}`;
    returnObj.time = `${h}:${mm}:${s}`;
    returnObj.shortTime = `${h}:${mm}`;
    returnObj.week = def.w[week];
    returnObj.weekAbb = def.wa[week];
    returnObj.weekNum = week;
    returnObj.millisecond = thisTime;

    returnObj.dateTime = `${returnObj.date} ${returnObj.time}`;
    returnObj.dateShortTime = `${returnObj.date} ${returnObj.shortTime}`;
    returnObj.dateHour = `${returnObj.date} ${h}:00`;
    returnObj.yearMonth = `${y}${def.sign}${m}`;


    const nowD = new Date();
    nowD.setHours(0);
    nowD.setMinutes(0);
    nowD.setSeconds(0);
    const nowT = (nowD).getTime();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    const thisT = d.getTime();
    const iDays = Math.ceil((thisT - nowT) / 1000 / 60 / 60 / 24);
    if (iDays >= -2 && iDays <= 2) {
        returnObj.weekAbb = def.d[iDays + 2];
    }

    return returnObj;
}
module.exports.getDateInfo = getDateInfo;


/**
 *
 * @param {number} n is
 * @param {object}date is
 * @param {string}type is
 * @returns {*} is object
 */
function addFun(n = 1, date, type = `second`) {
    const d = date ? (new Date((`${date}`).replace(/-/g, `/`))) : (new Date());

    const day = 1;
    let hour = 1;
    let minute = 1;
    let second = 1;
    if (type === `day`) {
        hour = 24;
        minute = 60;
        second = 60;
    } else if (type === `hour`) {
        minute = 60;
        second = 60;
    } else if (type === `minute`) {
        second = 60;
    }

    const thisTime = d.getTime();
    const addTime = getParseInt(n) * day * hour * minute * second * 1000;
    return getDateInfo({
        date: new Date(thisTime + addTime)
    }).dateTime;
}

/**
 * 增加N秒
 * @param {number} n is number second
 * @param {object} date is object
 * @returns {*} is object
 */
module.exports.addSecond = (n = 1, date) => addFun(n, date, `second`);

/**
 * 增加N分钟
 * @param {number} n is number minute
 * @param {object} date is object
 * @returns {*} is object
 */
module.exports.addMinute = (n = 1, date) => addFun(n, date, `minute`);

/**
 * 增加N小时
 * @param {number} n is number hour
 * @param {object} date is object
 * @returns {*} is object
 */
module.exports.addHour = (n = 1, date) => addFun(n, date, `hour`);

/**
 * 增加N天
 * @param {number} n is number day
 * @param {object} date is object
 * @returns {*} is object
 */
module.exports.addDay = (n = 1, date) => addFun(n, date, `day`);

/**
 * 增加N月
 * @param {number} n is number month
 * @param {object} date is date
 * @returns {string} is object
 */
module.exports.addMonth = (n = 1, date) => {
    const d = getDateInfo({
        date
    }).date;
    n = getParseInt(n);
    let y = parseInt(d.substring(0, 4), 10);
    let m = parseInt(d.substring(5, 7), 10) + n;

    if (m > 12) {
        y++;
        m -= 12;
    }
    m = m < 10 ? `0${m}` : m;
    return `${y}${d.substring(4, 5)}${m}${d.substring(7)}`;
};

/**
 * 增加N年
 * @param {number} n is number year
 * @param {object} date is date
 * @returns {string} is object
 */
module.exports.addYear = (n = 1, date) => {
    const d = getDateInfo({
        date
    }).date;
    n = getParseInt(n);

    let aaa = 4;
    if (aaa) aaa = 8;

    const y = parseInt(d.substring(0, 4), 10) + n;
    return `${y}${d.substring(4)}`;
};

/**
 * 获取早8点，当前时间未超过8点，返回上一天的早8点，当前时间超过8点，返回当天早8点
 * @returns {*|{y, m, d, day, time, formatedDate, date}|{}|{date}}
 */
module.exports.getEightTm = () => {
    const nowDate = this.getDateInfo(new Date());
    let eightDate = nowDate;
    if (nowDate.hour < 8) {
        eightDate = this.getDateInfo(addFun(-1, nowDate.dateTime, `day`));
    }
    return this.getDateInfo(`${eightDate.date} 08:00:00`);
};
