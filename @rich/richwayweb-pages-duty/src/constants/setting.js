const colorData = {
    gray: {
        code: `gray`,
        title: `8`,
        value: `#545C64`,
        info: {
            backgroundColor: `#545C64`,
            color: `#fff`
        }
    },
    light: {
        code: `light`,
        title: `1`,
        value: `#f3f3f4`,
        info: {
            backgroundColor: `#f3f3f4`,
            color: `#337ab7`
        }
    },
    dark: {
        code: `dark`,
        title: `2`,
        value: `#373737`,
        info: {
            backgroundColor: `#373737`,
            color: `#white`
        }
    },
    primary: {
        code: `primary`,
        title: `3`,
        value: `#00b1e1`,
        info: {
            backgroundColor: `#00b1e1`,
            color: `white`
        }
    },
    success: {
        code: `success`,
        title: `4`,
        value: `#8cc152`,
        info: {
            backgroundColor: `#8cc152`,
            color: `white`
        }
    },
    info: {
        code: `info`,
        title: `5`,
        value: `#63d3e9`,
        info: {
            backgroundColor: `#63d3e9`,
            color: `white`
        }
    },
    warning: {
        code: `warning`,
        title: `6`,
        value: `#f6bb42`,
        info: {
            backgroundColor: `#f6bb42`,
            color: `white`
        }
    },
    danger: {
        code: `danger`,
        title: `7`,
        value: `#e9573f`,
        info: {
            backgroundColor: `#e9573f`,
            color: `white`
        }
    },

    default: {
        code: `default`,
        title: `9`,
        value: `#FFFFFF`,
        info: {
            backgroundColor: `#FFFFFF`,
            color: `#337ab7`
        }
    },
    antiqueBrass: {
        code: `antiqueBrass`,
        title: `0`,
        value: `#373737`,
        info: {
            backgroundColor: `#373737`,
            color: `#337ab7`
        }
    },
    blue: {
        code: `blue`,
        title: `1`,
        value: `#00B1E1`,
        info: {
            backgroundColor: `#00B1E1`,
            color: `#337ab7`
        }
    },
    cyan: {
        code: `cyan`,
        title: `2`,
        value: `#37BC9B`,
        info: {
            backgroundColor: `#37BC9B`,
            color: `#337ab7`
        }
    },
    yellow: {
        code: `yellow`,
        title: `3`,
        value: `#F6BB42`,
        info: {
            backgroundColor: `#F6BB42`,
            color: `#337ab7`
        }
    },
    purple: {
        code: `purple`,
        title: `4`,
        value: `#906094`,
        info: {
            backgroundColor: `#906094`,
            color: `#337ab7`
        }
    },
    blackWhite: {
        code: `blackWhite`,
        title: `5`,
        value: `#979797`,
        info: {
            backgroundColor: `#979797`,
            color: `#337ab7`
        }
    },
    defaultBg: {
        code: `defaultBg`,
        title: `22`,
        value: `#f2f7fa`,
        info: {
            backgroundColor: `#f2f7fa`,
            color: `#333`
        }
    }
};

function getColorInfo(code) {
    return (colorData[code] || {}).info || {};
}

const settingData = [
    {
        title: `页面布局`,
        code: `layout`,
        icon: `icon-gear-group`,
        list: [
            {
                code: `headerPosition`,
                title: `布局设置`,
                list: [
                    {
                        code: `top`,
                        title: `顶部菜单`
                    },
                    {
                        code: `left`,
                        title: `左侧菜单`
                    }
                    // {
                    //     code: `box`,
                    //     title: `盒状导航`
                    // }
                ]
            },
            {
                code: `container`,
                title: `宽度设置`,
                list: [
                    {
                        code: `fill`,
                        title: `自动填充`
                    },
                    {
                        code: `fixed`,
                        title: `固定宽度`
                    }
                ]
            },
            {
                code: `headerRollType`,
                title: `头部设置`,
                list: [
                    {
                        code: `follow`,
                        title: `滚动`
                    },
                    {
                        code: `fixed`,
                        title: `固定`
                    }
                ]
            }
        ]
    },
    {
        title: `主题颜色`,
        code: `theme`,
        icon: `icon-paint-brush`,
        list: [
            {
                code: `bgColor`,
                title: `主题颜色`,
                list: [colorData.default, colorData.antiqueBrass, colorData.blue, colorData.cyan, colorData.yellow, colorData.purple, colorData.blackWhite]
            },
            {
                code: `navColor`,
                title: `导航颜色`,
                list: [colorData.gray, colorData.light, colorData.dark, colorData.primary, colorData.success, colorData.info, colorData.warning, colorData.danger]
            }
        ]
    }
];

// 全局的页面设置数据
class SettingInfo {
    constructor() {
        // 头部的位置
        this.headerPosition = `top`;
        // 头部是否收起
        this.headerTakeUp = false;
        this.container = `fill`;
        // 头部的滚动方式
        this.headerRollType = `fixed`;
        this.bgColor = `defaultBg`;
        this.navColor = `gray`;
    }
}

class BaseLoading {
    constructor() {
        this.show = false;
        this.text = `数据加载中，请稍后...`;
        this.backgroundMask = `rgba(0,0,0,.2)`;
        this.backgroundSpinner = `#2f96b4`;
        this.icon = `icon-loading`;
        this.skin = ``;
    }
}
// 全局的全屏加载loading
class FullLoading extends BaseLoading {
    constructor() {
        super();
        this.skin = `full`;
    }
}

// 全局的简略加载loading
class BriefLoading extends BaseLoading {
    constructor() {
        super();
        this.backgroundMask = `rgba(0,0,0,0)`;
        this.skin = `brief`;
    }
}

export default {
    settingInfo: new SettingInfo(),
    fullLoading: new FullLoading(),
    briefLoading: new BriefLoading(),
    settingData,
    getColorInfo
};
