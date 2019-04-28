/**
 * 截取行政编码中省份序号
 * @param {string} code is
 * @return {string} is
 * @private
 */
export const _filterProvince = (code = ``) => (`${code}` || ``).substring(0, 2);

/**
 * 截取行政编码中地级市序号
 * @param {string} code is
 * @param {string} flag is
 * @return {string} is
 * @private
 */
export const _filterCity = (code = ``, flag) => {
    let start = 2;
    if (flag === `all`) {
        start = 0;
    }
    const end = 4;
    return (`${code}` || ``).substring(start, end);
};


/**
 * 截取行政编码中县区序号
 * @param {string}code is
 * @param {string}flag is
 * @return {string} is
 * @private
 */
export const _filterCounty = (code = ``, flag) => {
    let start = 4;
    if (flag === `all`) {
        start = 0;
    }
    const end = 6;
    return (`${code}` || ``).substring(start, end);
};
