function html(elem, html) {
    if (arguments.length === 1) {
        return elem.innerHTML;
    } if (arguments.length === 2) {
        elem.innerHTML = html || ``;
        return this;
    }
}

module.exports = html;
