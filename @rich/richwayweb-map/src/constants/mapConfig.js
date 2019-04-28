import iconType from './iconType';
import componentsType from './componentsType';
import componentsBusinessType from './componentsBusinessType';
import positionType from './positionType';

const config = {
    baseLayers: {
        title: `地图底图`,
        components: componentsType.baseLayersComponents
    },
    businessLayers: {
        title: `业务图层`,
        components: componentsType.businessLayersComponents
    },
    controls: {
        title: `控制按钮`,
        components: componentsType.controlsComponents
    },
    plugins: {
        title: `地图插件`,
        components: componentsType.pluginsComponents
    },
    mapBusiness: {
        title: `业务监视面板`,
        components: componentsBusinessType.mapBusinessComponents
    },
    positionList: positionType.positionTypeList,
    mapServiceType: [
        {
            code: ``,
            title: `无`
        },
        {
            code: `dynamic`,
            title: `动态图`
        },
        {
            code: `tiled`,
            title: `瓦片`
        }
    ],
    iconList: iconType.iconTypeList
};

/**
 * 通过componentName获取默认title
 * @param {string} type is
 * @param {string} componentName is
 * @return {string} is
 */
function getTitle(type, componentName) {
    let title = ``;
    for (const item of config[type].components) {
        if (item.componentName === componentName) {
            title = item.config.title || ``;
            break;
        }
    }
    return title;
}

/**
 * 通过componentName获取业务图层的title
 * @param {string} componentName is
 * @return {string} is
 */
function getBusinessLayersConfigTitle(componentName) {
    return getTitle(`businessLayers`, componentName);
}

/**
 * 通过componentName获取控制的title
 * @param {string} componentName is
 * @return {string} is
 */
function getMapControlsConfigTitle(componentName) {
    return getTitle(`controls`, componentName);
}

/**
 * 通过componentName获取地图插件的title
 * @param {string} componentName is
 * @return {string} is
 */
function getMapPluginsConfigTitle(componentName) {
    return getTitle(`plugins`, componentName);
}

/**
 * 通过componentName获取业务面板的title
 * @param {string} componentName is
 * @return {string} is
 */
function getMapBusinessConfigTitle(componentName) {
    return getTitle(`mapBusiness`, componentName);
}

export default Object.assign({
    BaseLayersConfig: componentsType.BaseLayersConfig,
    BusinessLayersConfig: componentsType.BusinessLayersConfig,
    MapControlsConfig: componentsType.MapControlsConfig,
    MapPluginsConfig: componentsType.MapPluginsConfig,
    getBusinessLayersConfigTitle,
    getMapControlsConfigTitle,
    getMapPluginsConfigTitle,
    getMapBusinessConfigTitle
}, config);
