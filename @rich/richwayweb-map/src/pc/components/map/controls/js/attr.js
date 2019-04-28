const L = require(`leaflet`);

export default (map, options = {}) => {
    L.control.attribution({
        // 控制的位置
        position: options.position || `bottomleft`,
        // 在属性之前显示的HTML文本
        prefix: options.prefix || `江河瑞通`
    }).addTo(map);
};
