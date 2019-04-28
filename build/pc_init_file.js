const path = require('path');
global._richwayKoaConfig = require(path.join(process.cwd(), `config`));
const RichWayWebPack = require(`@rich/richwayweb-pack`);

module.exports = RichWayWebPack.pcInitFile(_richwayKoaConfig);
