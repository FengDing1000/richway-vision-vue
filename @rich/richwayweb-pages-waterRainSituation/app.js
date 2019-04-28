const path = require('path');
const config = require(path.join(process.cwd(), 'config'));
const RichWayWebServer = require('@rich/richwayweb-server');

RichWayWebServer.start(config);
