export default (o = {}) => ({
    className: `map-marker-panel`,
    html: `<span class="site-marker-spot">${o.type}</span>`
});
