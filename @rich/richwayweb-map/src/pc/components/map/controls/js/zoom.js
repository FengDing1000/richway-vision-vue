const L = require(`leaflet`);

export default (map, options = {}) => {
    L.control.zoom({
        position: options.position || `topleft`,
        zoomInTitle: options.zoomInTitle || `放大`,
        zoomOutTitle: options.zoomOutTitle || `缩小`
    }).addTo(map);
};
