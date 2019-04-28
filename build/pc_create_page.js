const path = require(`path`);
global._richwayKoaConfig = require(path.join(process.cwd(), `config`));
const RichWayWebPack = require(`@rich/richwayweb-pack`);
const pagesConfig = require(`../src/pc/pages/config.js`);

function create(pages = [], parentDir = ``, root = ``) {
    if (root) {
        for (const item of pages) {
            const list = item.children || [];
            const dir = [parentDir, item.menuDir].join(`/`);
            const pageInfo = {
                root,
                dir,
                title: item.menuTitle,
                type: list.length ? `` : `component`,
                cover: item.cover,
                component: item.component
            };

            RichWayWebPack.pcCreatePage(pageInfo, _richwayKoaConfig);
            if (list.length) {
                create(list, dir, root);
            }
        }
    }
}

module.exports = (() => {
    for (const item of pagesConfig) {
        create(item.children, ``, item.root);
    }
})();
