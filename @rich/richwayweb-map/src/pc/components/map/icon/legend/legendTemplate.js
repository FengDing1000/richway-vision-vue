export default (o = {}, info = {}) => {
    const config = o._config || {};
    const w = config.imgWidth || `0.8`;
    const h = config.imgHeight || `0.8`;

    const options = o.options || {};
    const tips = options.tips || {};

    const color = options.color || config.color || info.color || `#0000ff`;

    let html = ``;
    if (tips.top) {
        html += `<span class="marker-tips marker-tips-top" style="background-color:${color}">${tips.top}</span>`;
    }
    if (info.img) {
        html += `<img src="${info.img}" style="width:${w}rem;height:${h}rem;">`;
    } else if (info.fonts) {
        html += `<span class="map-marker-icon ${info.fonts}" style="color:${color}; font-size: ${info.fontSize} !important;"></span>`;
    } else {
        html += `<span class="map-marker-icon" style="color:${color}; border-bottom-color: ${info.borderColor}"></span>`;
    }

    if (tips.bottom) {
        html += `<span class="marker-tips marker-tips-bottom">${tips.bottom}</span>`;
    }

    return {
        title: config.title || info.title,
        className: `map-marker-panel ${info.className}`,
        html
    };
};
