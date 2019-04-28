module.exports = req => {
    const u = req.headers[`user-agent`] || ``;
    const ua = u.toLowerCase();
    // 移动终端浏览器版本信息
    // console.log4js(u);

    const o = {
        trident: u.indexOf(`Trident`) > -1, // IE内核
        presto: u.indexOf(`Presto`) > -1, // opera内核
        webKit: u.indexOf(`AppleWebKit`) > -1, // 苹果、谷歌内核
        gecko: u.indexOf(`Gecko`) > -1 && u.indexOf(`KHTML`) === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/i), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf(`Android`) > -1 || u.indexOf(`Linux`) > -1, // android终端或uc浏览器
        iPhone: u.indexOf(`iPhone`) > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf(`iPad`) > -1, // 是否iPad
        webApp: u.indexOf(`Safari`) === -1, // 是否web应该程序，没有头部与底部
        weChat: ua.match(/MicroMessenger/i) === `micromessenger`, // 微信
        weiBo: ua.match(/WeiBo/i) === `weibo`, // 微博
        qq: ua.match(/QQ/i) === `qq`// QQ空间
    };
    o.mobile = o.weChat || o.android || o.iPhone || o.iPad ? true : o.mobile;

    return o;
};