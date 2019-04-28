export default (o = {}) => ({
    className: `map-marker-panel`,
    html: `<span class="marker-tips-name">${o.tipsName}</span><span class="map-marker-icon richway-icon icon-warn-1 twinkle-animation" style="color:${o.color}"></span><span class="marker-tips-num" style="background-color:${o.color}">${o.tipsNum}</span>`
});
