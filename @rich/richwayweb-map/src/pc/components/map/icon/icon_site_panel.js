export default (o = {}) => ({
    iconSize: [400, 260],
    iconAnchor: [-40, 120],
    className: `site-marker-panel`,
    html: `<div id="${o.id}">${o.template}<div class="outerPointer"></div></div>`
});
