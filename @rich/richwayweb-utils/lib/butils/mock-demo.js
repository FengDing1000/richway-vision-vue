

// 加载Mock.js插件，让前端开发与后端独立1
const Mock = require(`mockjs`);
// 加载Mock.mock方法
const M = Mock.mock;
// 加载mock.Random方法
const R = Mock.Random;

_richwayKoaLog.logInfo(R.email());
_richwayKoaLog.logInfo(M({ email: `@email` })); // 这种@的方式叫"占位符"。它可以用来直接生成各种数据

_richwayKoaLog.logInfo(R.email());

// basic：https://github.com/nuysoft/Mock/wiki/Basic
_richwayKoaLog.logInfo(M({ boolean: `@boolean` }));
_richwayKoaLog.logInfo(M({ natural: `@natural` }));
_richwayKoaLog.logInfo(M({ integer: `@integer` }));
_richwayKoaLog.logInfo(M({ float: `@float` }));
_richwayKoaLog.logInfo(M({ character: `@character` }));
_richwayKoaLog.logInfo(M({ range: `@range` }));

// date:https://github.com/nuysoft/Mock/wiki/Date
_richwayKoaLog.logInfo(M({ date: `@date` }));
_richwayKoaLog.logInfo(M({ time: `@time` }));
_richwayKoaLog.logInfo(M({ datetime: `@datetime` }));
_richwayKoaLog.logInfo(M({ now: `@now` }));

// Image：https://github.com/nuysoft/Mock/wiki/Image
_richwayKoaLog.logInfo(M({ image: `@image()` }));
_richwayKoaLog.logInfo(M({ image: `@image(60x60)` }));
_richwayKoaLog.logInfo(M({ image: `@image(60x60,#000000)` }));
_richwayKoaLog.logInfo(M({ image: `@image('200x100', '#00405d', '#FFF', 'Mock.js')` }));
_richwayKoaLog.logInfo(M({ dataImage: `@dataImage` }));
_richwayKoaLog.logInfo(M({ dataImage: `@dataImage('200x100')` }));
_richwayKoaLog.logInfo(M({ dataImage: `@dataImage('200x100', 'Hello Mock.js!')` }));

// color : https://github.com/nuysoft/Mock/wiki/Color
_richwayKoaLog.logInfo(M({ color: `@color` }));
_richwayKoaLog.logInfo(M({ hex: `@hex` }));
_richwayKoaLog.logInfo(M({ rgb: `@rgb` }));
_richwayKoaLog.logInfo(M({ rgba: `@rgba` }));
_richwayKoaLog.logInfo(M({ hsl: `@hsl` }));

// text : https://github.com/nuysoft/Mock/wiki/Text
_richwayKoaLog.logInfo(M({ paragraph: `@paragraph` }));
_richwayKoaLog.logInfo(M({ sentence: `@sentence` }));
_richwayKoaLog.logInfo(M({ title: `@title` }));
_richwayKoaLog.logInfo(M({ cparagraph: `@cparagraph` }));
_richwayKoaLog.logInfo(M({ csentence: `@csentence` }));
_richwayKoaLog.logInfo(M({ cword: `@cword` }));
_richwayKoaLog.logInfo(M({ ctitle: `@ctitle` }));

// name : https://github.com/nuysoft/Mock/wiki/Name
_richwayKoaLog.logInfo(M({ first: `@first` }));
_richwayKoaLog.logInfo(M({ last: `@last` }));
_richwayKoaLog.logInfo(M({ name: `@name` }));
_richwayKoaLog.logInfo(M({ cfirst: `@cfirst` }));
_richwayKoaLog.logInfo(M({ clast: `@clast` }));
_richwayKoaLog.logInfo(M({ cname: `@cname` }));

// Web：https://github.com/nuysoft/Mock/wiki/Name
_richwayKoaLog.logInfo(M({ url: `@url` }));
_richwayKoaLog.logInfo(M({ domain: `@domain` }));
_richwayKoaLog.logInfo(M({ email: `@email` }));
_richwayKoaLog.logInfo(M({ ip: `@ip` }));
_richwayKoaLog.logInfo(M({ tld: `@tld` }));

// address: https://github.com/nuysoft/Mock/wiki/Name
_richwayKoaLog.logInfo(M({ region: `@region` }));
_richwayKoaLog.logInfo(M({ province: `@province` }));
_richwayKoaLog.logInfo(M({ city: `@city` }));
_richwayKoaLog.logInfo(M({ county: `@county` }));
_richwayKoaLog.logInfo(M({ zip: `@zip` }));

// helper Methods : https://github.com/nuysoft/Mock/wiki/Helper
_richwayKoaLog.logInfo(M({ capitalize: `@capitalize(\`hello\`)` }));
_richwayKoaLog.logInfo(M({ upper: `@upper(\`hello\`)` }));
_richwayKoaLog.logInfo(M({ lower: `@lower(\`HELLO\`)` }));
_richwayKoaLog.logInfo(M({ pick: `@pick(['a', 'e', 'i', 'o', 'u'])` }));
_richwayKoaLog.logInfo(M({ shuffle: `@shuffle(['a', 'e', 'i', 'o', 'u'])` }));

// Miscellaneous: https://github.com/nuysoft/Mock/wiki/Miscellaneous
global._richwayKoaLog.logInfo(M({ guid: `@guid` }));
global._richwayKoaLog.logInfo(M({ id: `@id` }));
global._richwayKoaLog.logInfo(M({ increment: `@increment` }));
