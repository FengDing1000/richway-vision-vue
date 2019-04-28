const path = require('path');
const config = require(path.join(process.cwd(), 'config'));
const Server = require(path.join(process.cwd(), 'server'));

Server.start(config);
