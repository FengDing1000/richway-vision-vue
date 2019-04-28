const L = require(`leaflet`);

export default (map, options = {}) => {
    L.control.scale({
        // 控制的位置
        position: options.position || `bottomleft`,
        // 控制最大的像素宽度,宽度可以围绕几个值动态设置.
        maxWidth: options.maxWidth || 200,
        // 是否显示十进制比例线
        metric: options.metric || true,
        // 是否显示公制比例线
        imperial: options.imperial || false

    }).addTo(map);
};
