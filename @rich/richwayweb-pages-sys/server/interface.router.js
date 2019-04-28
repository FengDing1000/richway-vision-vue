module.exports = {
    baseUrl: global._richwayKoaConfig.InterfaceHost,
    list: [
        require(`./interface/base`),
        require(`./interface/sys/app`),
        require(`./interface/sys/user`),
        require(`./interface/sys/login`),
        require(`./interface/sys/menu`),
        require(`./interface/sys/dept`),
        require(`./interface/sys/role`)
    ]
};
