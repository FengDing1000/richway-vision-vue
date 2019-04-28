export default (o = {}) => {
    const config = o._config || {};
    const options = o.options || {};
    const title = options.title || `降雨量`;
    const color = options.color || config.color || `#0000ff`;
    const tips = options.tips || ``;

    let html = ``;
    if (tips.top) {
        html += `<span class="marker-tips marker-tips-top" style="background-color:${color}">${tips.top}</span>`;
    }
    html += `<span class="map-marker-icon marker-icon-rain" style="background-color:${color}"></span>`;
    if (tips.bottom) {
        html += `<span class="marker-tips marker-tips-bottom">${tips.bottom}</span>`;
    }
    return {
        title,
        className: `map-marker-panel `,
        html,
        legend: `<span class="map-marker-icon marker-icon-rain" style="background-color:${color}"></span>`
    };
};
