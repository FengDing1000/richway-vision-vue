module.exports.latlngByPoint = (str = ``) => {
    const [lgtd, lttd] = str.split(`,`);

    return [lttd, lgtd];
};


module.exports.latlngByBounds = (arr = []) => {
    const bounds = [];
    for (const item of arr) {
        const [a, b] = item;
        bounds.push([b, a]);
    }

    return bounds;
};
