const path = require(`path`);
const RichWayWebUtils = require('@rich/richwayweb-utils/lib/nutils');
const directory = RichWayWebUtils.directory;

const from = path.resolve(process.cwd(), `config/default`);
const to = path.resolve(process.cwd(), `../../../config/default`);

console.log(`start postinstall...`);
directory.copyFolder(from, to);
console.log(`postinstall success...`);
