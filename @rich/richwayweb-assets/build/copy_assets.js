// 拷贝文件
const path = require(`path`);
const fs = require(`fs`);
const RichWayWebUtils = require('@rich/richwayweb-utils/lib/nutils');
const directory = RichWayWebUtils.directory;

const from = path.resolve(process.cwd(), `src/assets`);
const toSrc = path.resolve(process.cwd(), `../../../src/assets`);
const toClient = path.resolve(process.cwd(), `../../../client/static/assets`);

directory.copyFolder(from, toSrc);
directory.copyFolder(from, toClient);
