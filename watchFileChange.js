var chokidar = require('chokidar');
var shelljs = require('shelljs');
chokidar.watch(['server/data', 'server/interface']).on('change', function(path) {
  'use strict';
  console.log('serverFileHasChange=====', path);
  shelljs.exec("node build/pc_init_file.js");
});

chokidar.watch(['src'], {
  ignored: /[.vue|.js|.scss]$/,
}).on('change', function(path) {
  'use strict';
  console.log('srcFileHasChange=====', path);
  shelljs.exec("node build/pc_init_file.js");
});

chokidar.watch(['config']).on('change', function(path) {
  'use strict';
  console.log('configFileHasChange=====', path);
  shelljs.exec("node app.js");
});
