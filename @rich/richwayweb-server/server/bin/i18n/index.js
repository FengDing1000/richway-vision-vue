const path = require(`path`);
const languagePackage = require(path.join(_richwayKoaConfig.rootDirServer, `bin/i18n/language-package`));

function getLanguageInfo(_i18nMap, ctx) {
    const lang = _richwayKoaSession.getLangType(ctx);
    const languageInfo = {};
    for (const key in _i18nMap) {
        if (Object.hasOwnProperty.call(_i18nMap, key)) {
            languageInfo[key] = _i18nMap[key][lang];
        }
    }
    return languageInfo;
}

function _i18n(ctx, str) {
    return getLanguageInfo(languagePackage.languagesInterface, ctx)[str] || ``;
}


module.exports._i18n = _i18n;
