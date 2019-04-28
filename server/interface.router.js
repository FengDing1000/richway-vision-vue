module.exports = {
    baseUrl: global._richwayKoaConfig.InterfaceHost,
    list: [
        ...require(`@rich/richwayweb-pages-sys/server/interface`),
        ...require(`@rich/richwayweb-map/server/interface`),
        require(`./interface/monitor/site`),
    ]
};
