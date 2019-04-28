export default (o = {}) => {
    const config = o._config || {};
    const options = o.options || {};
    const title = options.title || `河道`;
    const color = options.color || config.color || `#0000ff`;
    const cla = color !== `#0000ff` ? `twinkle-animation` : ``;
    const tips = options.tips || {};

    let html = ``;
    if (tips.top) {
        html += `<span class="marker-tips marker-tips-top" style="background-color:${color}">${tips.top}</span>`;
    }
    html += `<span class="map-marker-icon marker-icon-river ${cla}" style="border-bottom-color:${color}"></span>`;
    if (tips.bottom) {
        html += `<span class="marker-tips marker-tips-bottom">${tips.bottom}</span>`;
    }

    return {
        title,
        className: `map-marker-panel legend-river-site`,
        html,
        legend: `<span class="map-marker-icon marker-icon-river" style="border-bottom-color:${color}"></span>`
    };
};
