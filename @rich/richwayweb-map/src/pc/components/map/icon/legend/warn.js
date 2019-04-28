export default (o = {}) => {
    const options = o.options || {};
    const title = `预警`;
    const tips = options.tips || {};
    let color = ``;
    if (options.level === 1) {
        color = `#fdd835`;
    } else if (options.level === 2) {
        color = `#c62828`;
    }

    let html = ``;
    if (tips.top) {
        html += `<span class="marker-tips marker-tips-top" style="background-color:${color}">${tips.top}</span>`;
    }
    html += `<span class="map-marker-icon richway-icon icon-warn-1 twinkle-animation" style="color:${color}"></span>`;
    html += `<span class="radar radar-1"></span>`;
    html += `<span class="radar radar-2"></span>`;
    html += `<span class="radar radar-3"></span>`;
    html += `<span class="radar radar-4"></span>`;
    html += `<span class="radar radar-5"></span>`;
    if (tips.bottom) {
        html += `<span class="marker-tips marker-tips-bottom">${tips.bottom}</span>`;
    }

    return {
        title,
        className: `map-marker-panel legend-warn map-warn-animation`,
        html,
        legend: `<span class="map-marker-icon richway-icon icon-warn-1" style="color:${color}"></span>`
    };
};
