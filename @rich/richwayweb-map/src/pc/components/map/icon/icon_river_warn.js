export default (o = {}) => ({
    className: `map-marker-panel`,
    html: `<span class="marker-tips">${o.tips}</span><span class="map-marker-icon richway-icon icon-warn-1 twinkle-animation" style="color:${o.color}"></span>`
});
