const plugin = require(`./webpack.plugin`);

function init(config){
    plugin.copyWebpackPlugin(config);
}

module.exports = init;