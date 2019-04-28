class Router {
    constructor(info = {}) {
        this.code = info.code || info.pageName;
        this.title = info.title;
        this.keysWords = info.keysWords || ``;
        this.description = info.description || ``;
        this.ico = info.ico || ``;
        this.icon = info.icon || `icon-network`;
        this.logo = info.logo || `/images/logo.png`;
        this.url = info.url || `/${info.pageName}`;
        this.method = info.method || `get`;
        this.mustLogin = info.mustLogin || false;
        this.filename = info.filename || ``;
        this.module = info.module || ``;
        this.platform = info.platform || `pc`;
        this.layoutId = info.layoutId || `Layout-Base`;
    }
}

module.exports = {
    Router
};
