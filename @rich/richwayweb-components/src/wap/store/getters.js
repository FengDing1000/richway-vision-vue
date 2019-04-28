import _setting from '../../constants/setting';

export default {
    themeInfo: state => {
        const info = _setting.getColorInfo(state.settingInfo.navColor);
        return {
            backgroundColor: info.backgroundColor || `#545c64`,
            color: info.color || `#fff`,
            activeTextColor: `#ffd04b`
        };
    }
};
