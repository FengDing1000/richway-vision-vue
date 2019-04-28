export default (o = {}) => ({
    className: `map-marker-panel`,
    html: `<span class="marker-tips">${o.tips}</span><span class="map-marker-icon marker-icon-rain" style="background-color:${o.color}"></span>`
});
