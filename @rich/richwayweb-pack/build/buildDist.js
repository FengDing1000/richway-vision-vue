const path = require(`path`);
const fs = require(`fs`);
const RichWayWebUtils = require('@rich/richwayweb-utils/lib/nutils');
const directory = RichWayWebUtils.directory;

function init() {
    console.log(`start postinstall...`);
    const arr = [`client`, `config`, `server`, `app.js`, `package.json`, `start.json`, `favicon.ico`];

    for (const item of arr) {
        let from = path.resolve(process.cwd(), item);
        let to = path.resolve(process.cwd(), `dist/${item}`);
        directory.copyFolder(from, to);
    }

    console.log(`postinstall success...`);
}

module.exports = () => {
    directory.deleteDirectorySync(path.resolve(process.cwd(), `dist`));
    init();
};
