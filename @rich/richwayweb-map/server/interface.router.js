module.exports = {
    baseUrl: global._richwayKoaConfig.InterfaceHost,
    list: [
        require(`@rich/richwayweb-pages-sys/server/interface/base`),
        require(`@rich/richwayweb-pages-sys/server/interface/sys/app`),
        require(`@rich/richwayweb-pages-sys/server/interface/sys/menu`),
        require(`@rich/richwayweb-pages-sys/server/interface/sys/user`),
        require(`@rich/richwayweb-pages-sys/server/interface/sys/login`),
        require(`./interface/mapBase`),
        require(`./interface/monitor/site`),
        require(`./interface/monitor/rain`),
        require(`./interface/monitor/video`),
        require(`./interface/monitor/water`),
        require(`./interface/monitor/warn`),
        require(`./interface/monitor/work`),
        require(`./interface/effectRange`)
    ]
};
