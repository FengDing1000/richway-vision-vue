/**
 *
 * @desc 获取浏览器类型和版本
 * @return {String}
 */

// function getExplore() {
//     var sys = {},
//         ua = navigator.userAgent.toLowerCase(),
//         s;
//     (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
//         (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
//             (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
//                 (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
//                     (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
//                         (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
//                             (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
//     // 根据关系进行判断
//     if (sys.ie) return ('IE: ' + sys.ie)
//     if (sys.edge) return ('EDGE: ' + sys.edge)
//     if (sys.firefox) return ('Firefox: ' + sys.firefox)
//     if (sys.chrome) return ('Chrome: ' + sys.chrome)
//     if (sys.opera) return ('Opera: ' + sys.opera)
//     if (sys.safari) return ('Safari: ' + sys.safari)
//     return 'Unkonwn'
// }

const expUserAgent = {
    // browser
    MSIE: /(msie) ([\w.]+)/,
    MOZILLA: /(mozilla)(?:.*? rv:([\w.]+)|)/,
    SAFARI: /(safari)(?:.*version|)[\\/]([\d.]+)/,
    CHROME: /(chrome|crios)[\\/]([\w.]+)/,
    OPERA: /(opera|opr)(?:.*version|)[\\/]([\w.]+)/,
    WEBOS: /(webos|hpwos)[\s\\/]([\d.]+)/,
    DOLFIN: /(dolfin)(?:.*version|)[\\/]([\w.]+)/, //
    SILK: /(silk)(?:.*version|)[\\/]([\w.]+)/, //
    UC: /(uc)browser(?:.*version|)[\\/]([\w.]+)/, //
    TAOBAO: /(tao|taobao)browser(?:.*version|)[\\/]([\w.]+)/,
    LIEBAO: /(lb)browser(?:.*? rv:([\w.]+)|)/,
    // AMAYA:/(amaya)[\/]([\w.]+)/,
    // SEAMONKEY:/(seamonkey)[\/]([\w.]+)/,
    // OMNIWEB:/(omniweb)[\/]v([\w.]+)/,
    // FLOCK:/(flock)[\/]([\w.]+)/,
    // EPIPHANY:/(epiphany)[\/]([\w.]+)/,
    MicroMessenger: /micromessenger/i, //

    // engine
    WEBKIT: /webkit[\\/]([\w.]+)/,
    GECKO: /gecko[\\/]([\w.]+)/, //
    PRESTO: /presto[\\/]([\w.]+)/, //
    TRIDENT: /trident[\\/]([\w.]+)/,

    // device
    MAC: /(mac os x)\s+([\w_]+)/, //
    WINNDOWS: /(windows nt)\s+([\w.]+)/, //
    LINUX: /linux/, //
    // IOS : /i(?:pad|phone|pod)(?:.*)cpu(?: iphone)? os/,
    IOS: /(i(?:pad|phone|pod))(?:.*)cpu(?: i(?:pad|phone|pod))? os (\d+(?:[\\.|_]\d+){1,})/,
    ANDROID: /(android)\s+([\d.]+)/,
    WINDOWSPHONE: /windowsphone/, //
    IPAD: /(ipad).*os\s([\d_]+)/,
    IPHONE: /(iphone\sos)\s([\d_]+)/,
    IPOD: /(ipod)(?:.*)cpu(?: iphone)? os (\d+(?:[\\.|_]\d+){1,})/,
    TOUCHPAD: /touchpad/,
    BLACKBERRY: /(playbook|blackberry|bb\d+).*version\/([\d.]+)/,
    RIMTABLET: /rimtablet/, //
    BADA: /bada/, //
    CHROMEOS: /cromeos///
};

function getExplore() {
    const ua = navigator.userAgent.toLowerCase();
    const os = {};

    // browser

    const chrome = ua.match(expUserAgent.CHROME);


    const opera = ua.match(expUserAgent.OPERA);


    const msie = ua.match(expUserAgent.MSIE);


    const safari = (ua + ua.replace(expUserAgent.SAFARI, ` `)).match(expUserAgent.SAFARI);
    // modify the jquery bug

    const mozilla = ua.match(expUserAgent.MOZILLA);


    const webos = ua.match(expUserAgent.WEBOS);


    const dolphi = ua.match(expUserAgent.DOLFIN);


    const silk = ua.match(expUserAgent.SILK);


    const uc = ua.match(expUserAgent.UC);


    const taobao = ua.match(expUserAgent.TAOBAO);


    const liebao = ua.match(expUserAgent.LIEBAO);


    // engine

    const webkit = ua.match(expUserAgent.WEBKIT);


    const gecko = ua.match(expUserAgent.GECKO);


    const presto = ua.match(expUserAgent.PRESTO);


    const trident = ua.match(expUserAgent.TRIDENT);


    // device

    const mac = ua.match(expUserAgent.MAC);


    const windows = ua.match(expUserAgent.WINNDOWS);


    const linux = ua.match(expUserAgent.LINUX);


    const chromeos = ua.match(expUserAgent.CHROMEOS);


    // pad

    const ipad = ua.match(expUserAgent.IPAD);


    const rimtablet = ua.match(expUserAgent.RIMTABLET);


    const touchpad = webos && ua.match(expUserAgent.TOUCHPAD);


    // mobile

    // const ios = ua.match(expUserAgent.IOS);


    const ipod = ua.match(expUserAgent.IPOD);


    const iphone = !ipad && ua.match(expUserAgent.IPHONE);


    const android = ua.match(expUserAgent.ANDROID);


    // const windowsphone = ua.match(expUserAgent.WINDOWSPHONE);


    const blackberry = ua.match(expUserAgent.BLACKBERRY);


    const bada = ua.match(expUserAgent.BADA);

    // engine
    if (webkit) os.webkit = true;
    if (gecko) os.gecko = true;
    if (presto) os.presto = true;
    if (trident) os.trident = true;
    // device
    os.device = {};
    //
    if (mac) {
        os.mac = true;
        os.device.name = `mac os`;
        os.version = mac[2];
    }
    if (windows) {
        os.windows = true;
        os.device.name = `window`;
        os.version = windows[2];
    }
    if (linux) {
        os.linux = true;
        os.device.name = `linux`;
    }
    if (chromeos) {
        os.chromeos = true;
        os.device.name = `chromeos`;
        os.version = chromeos[2];
    }
    // if (ios) os.ios=true;//
    if (android) {
        os.android = true;
        os.device.name = `android`;
        os.version = android[2];
    }
    if (iphone) {
        os.ios = true;
        os.device.name = `iphone`;
        os.version = iphone[2].replace(/_/g, `.`);
        os.iphone = true;
    }
    if (ipod) {
        os.ios = true;
        os.device.name = `ipod`;
        os.version = ipod[2].replace(/_/g, `.`);
        os.ipod = true;
    }
    if (ipad) {
        os.ios = true;
        os.device.name = `ipad`;
        os.version = ipad[2].replace(/_/g, `.`);
        os.ipad = true;
    }
    if (webos) {
        os.webos = true;
        os.device.name = `webos`;
        os.version = webos[2];
    }
    if (blackberry) {
        os.blackberry = true;
        os.device.name = `blackberry`;
        os.version = blackberry[2];
    }
    if (bada) {
        os.bada = true;
        os.device.name = `bada`;
        os.version = ``; //
    }
    if (rimtablet) {
        os.rimtablet = true;
        os.device.name = `rimtablet`;
        os.version = ``; //
    }
    if (touchpad) {
        os.touchpad = true;
        os.device.name = `touchpad`;
        os.version = ``; //
    }
    // os.device.version
    os.device.version = os.version;
    if (!(android || iphone || ipad || ipod || webos || blackberry || bada || rimtablet || touchpad)) {
        os.desktop = true;
        os.version = ``;
    }
    // browser
    const match = dolphi || silk || uc || msie || taobao || liebao || opera || chrome || safari || (ua.indexOf(`compatible`) < 0 && mozilla);
    // chrome
    match[1] = match[1] === `crios` ? `chrome` : match[1];
    // taobao
    match[1] = match[1] === `tao` ? `taobao` : match[1];
    //
    os[match[1]] = true;
    os.browser = match[1];
    os.version = match[2] || ``;
    // major
    os.version && (os.major = parseInt(os.version, 10));
    // revise
    // safari
    if (os.ios && os.webkit && !os.desktop) {
        try {
            // in node js
            os.safari = !!((window.canSetSearchEngine || window.TrackEvent));
        } catch (e) {
        }
        const v = os.major || parseInt(os[`device-version`], 10) || ``;
        v && (os[`ios${v}`] = true);
    }
    // ie 11
    if (os.trident && os.major >= 11) {
        os.browser = `msie`;
        os.msie = true;
        delete os.mozilla;
    }
    // mozilla/firefox
    if (os.mozilla) {
        os.firefox = true;
    }
    // opera
    if (os.browser === `opr`) {
        os.browser = `opera`;
        os.opera = os.opr;
    }
    // blackberry
    if (os.blackberry) {
        //
        delete os.safari;
    }
    // MicroMessager
    if (expUserAgent.MicroMessenger.test(ua)) {
        //
        os.micromessage = true;
    }
    // uc
    var DOMWindow = DOMWindow || {};
    if (DOMWindow && DOMWindow.UCNewsJSController) {
        os.uc = true,
        os.browser = `uc`;
    }
    //
    try {
        // orientation
        os.orientation = (window.orientation === 180 || window.orientation === 0) ? `portrait` : `landscape`;
    } catch (e) {
    }
    // os.device.type
    if (os.desktop) {
        os.device.type = `desktop`;
    } else {
        os.device.type = `mobile`;
    }
    //
    return os;
}

module.exports = getExplore;
