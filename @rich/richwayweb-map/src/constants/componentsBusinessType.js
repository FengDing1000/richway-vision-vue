/**

 @Name：地图业务面板的文件
 @Author：g.zhou
 @License：MIT

 */

const mapBusinessComponents = [
    {
        id: `MapBusinessRealtimeMonitoring`,
        componentName: `Map-Business-RealtimeMonitoring`,
        config: {
            title: `实时监视面板`,
            position: `right`,
            sort: 3
        },
        subComponents: [
            {
                id: `MapBusinessMonitorRain`,
                componentName: `Map-Business-Monitor-Rain`,
                title: `雨情`,
                icon: `icon-rain`,
                sort: 3
            },
            {
                id: `MapBusinessMonitorWater`,
                componentName: `Map-Business-Monitor-Water`,
                title: `水情`,
                icon: `icon-water`,
                sort: 3
            },
            {
                id: `MapBusinessMonitorWeather`,
                componentName: `Map-Business-Monitor-Weather`,
                title: `气象`,
                icon: `icon-cloud`,
                sort: 3
            },
            {
                id: `MapBusinessMonitorWork`,
                componentName: `Map-Business-Monitor-Work`,
                title: `工情`,
                icon: `icon-cloud`,
                sort: 3
            },
            {
                id: `MapBusinessMonitorVideo`,
                componentName: `Map-Business-Monitor-Video`,
                title: `视频`,
                icon: `icon-monitor`,
                sort: 3
            },
            {
                id: `MapBusinessMonitorWarn`,
                componentName: `Map-Business-Monitor-Warn`,
                title: `预警`,
                icon: `icon-warn`,
                sort: 3
            },
            {
                id: `MapBusinessMonitorSite`,
                componentName: `Map-Business-Monitor-Site`,
                title: `站点`,
                icon: `icon-site`,
                sort: 3
            }
        ]
    },
    {
        id: `MapBusinessEffectRange`,
        componentName: `Map-Business-EffectRange`,
        config: {
            title: `影响范围面板`,
            position: `right`,
            sort: 3
        }
    }
];

const mapBusinessTypeInfo = {};
for (const item of mapBusinessComponents) {
    mapBusinessTypeInfo[item.id] = item.componentName;
    if ((item.subComponents || []).length) {
        for (const subItem of item.subComponents) {
            mapBusinessTypeInfo[subItem.id] = subItem.componentName;
        }
    }
}

export default {
    mapBusinessComponents,
    mapBusinessTypeInfo
};
