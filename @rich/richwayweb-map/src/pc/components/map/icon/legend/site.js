// import riverSiteImg from '../images/riverSite.png';
//
// export default () => ({
//     title: `河道站`,
//     className: `legend-river-site`,
//     html: `<img src="${riverSiteImg}">`
// });

export default (o = {}) => {
    const config = o._config || {};
    const options = o.options || {};

    const title = options.title || `水库`;
    const color = options.color || config.color || `#0000ff`;
    const fontSize = options.fontSize || config.fontSize || `.75rem`;
    const tips = options.tips || {};

    let html = ``;
    if (tips.top) {
        html += `<span class="marker-tips marker-tips-top" style="background-color:${color}">${tips.top}</span>`;
    }
    html += `<span class="map-marker-icon marker-icon-site" style="color:${color};font-size:${fontSize}">${tips.middle || ``}</span>`;
    if (tips.bottom) {
        html += `<span class="marker-tips marker-tips-bottom">${tips.bottom}</span>`;
    }

    return {
        title,
        className: `map-marker-panel`,
        html,
        legend: `<span class="map-marker-icon marker-icon-site" style="color:${color};font-size:${fontSize}">L</span>`
    };
};
