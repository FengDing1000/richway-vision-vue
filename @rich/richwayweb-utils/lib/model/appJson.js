const hump = require(`./../butils/hump`);
const guid = require(`./../butils/guid`);

class AppJson {
    constructor(info = {}) {
        this.id = info.id || guid();
        this.code = info.code || info.pageName;
        this.type = info.type || ``;
        this.title = info.title;
        this.icon = info.icon || `icon-network`;
        this.url = info.url || `/${info.pageName}`;
        this.fileName = info.fileName || info.pageName;
        this.menu = info.menu || false;
        if (this.menu === true) {
            this.navigation = info.navigation !== false;
        } else {
            this.navigation = false;
        }
        this.sort = info.sort || 999;
        this.platform = info.platform || `pc`;
        this.root = info.root || `$src/${this.platform}/pages/${info.pageName}`;
        this.compiled = info.compiled || false;

        // this.module = hump(info.module || info.dirName);
        this.module = hump(info.module || `${info.code}`.replace(/\//g, `_`));

        this.target = info.target || `_blank`;
        if (this.type === `root` || this.type === `page` || this.type === `component`) {
            this.method = info.method || `get`;
            this.entry = info.entry || `index.js`;
            this.config = info.config || [];
            this.mustLogin = info.mustLogin || false;
            this.keepAlive = info.keepAlive !== false;

            if (this.type === `root` || this.type === `page`) {
                this.keysWords = info.keysWords || ``;
                this.description = info.description || ``;
                this.ico = info.ico || ``;
                this.logo = info.logo || `/images/logo.png`;
                this.template = info.template || `index.html`;
                this.css = info.css || [];
                this.preJS = info.preJS || [];
                this.js = info.js || [];
                this.layoutId = info.layoutId || `Layout-Base`;
            } else if (this.type === `component`) {
                this.describe = info.describe || ``;
                this.componentName = info.componentName || this.module.replace(/^(\w){1}/, ($1)=>{return ($1 || ``).toUpperCase()});
            }
        } else {
            this.open = info.open || 0;
        }
    }
}

module.exports = {
    AppJson
};
