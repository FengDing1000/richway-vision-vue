export default (o = {}) => {
    const config = o._config || {};
    const options = o.options || {};
    const title = options.title || `水库`;
    const color = options.color || config.color || `#0000ff`;
    const fontSize = options.fontSize || config.fontSize || `1rem`;
    const tips = options.tips || {};

    let html = ``;
    if (tips.top) {
        html += `<span class="marker-tips marker-tips-top" style="background-color:${color}">${tips.top}</span>`;
    }
    html += `<span class="map-marker-icon richway-icon icon-reservoir" style="color:${color};font-size:${fontSize}"></span>`;
    if (tips.bottom) {
        html += `<span class="marker-tips marker-tips-bottom">${tips.bottom}</span>`;
    }

    return {
        title,
        className: `map-marker-panel legend-reservoir-site`,
        html,
        legend: `<span class="map-marker-icon richway-icon icon-reservoir" style="color:${color};font-size:${fontSize}"></span>`
    };
};
