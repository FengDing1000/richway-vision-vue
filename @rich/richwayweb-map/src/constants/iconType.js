/**

 @Name：地图图例名称的文件
 @Author：g.zhou
 @License：MIT

 */

const iconTypeList = [
    {
        code: `MapIconSite`,
        componentName: `Map-Icon-Site`,
        title: `测站图例`
    },
    {
        code: `MapIconRain`,
        componentName: `Map-Icon-Rain`,
        title: `雨量图例`
    },
    {
        code: `MapIconWater`,
        componentName: `Map-Icon-Water`,
        title: `水量图例`
    },
    {
        code: `MapIconRainfallSite`,
        componentName: `Map-Icon-RainfallSite`,
        title: `雨量站图例`
    },
    {
        code: `MapIconReservoirSite`,
        componentName: `Map-Icon-ReservoirSite`,
        title: `水库站图例`
    },
    {
        code: `MapIconRiverSite`,
        componentName: `Map-Icon-RiverSite`,
        title: `河道站图例`
    },
    {
        code: `MapIconWarn`,
        componentName: `Map-Icon-Warn`,
        title: `预警图例`
    },
    {
        code: `MapIconBasin`,
        componentName: `Map-Icon-Basin`,
        title: `小流域图例`
    },
    {
        code: `MapIconChemicalPlant`,
        componentName: `Map-Icon-ChemicalPlant`,
        title: `化工厂图例`
    },
    {
        code: `MapIconExtinguishing`,
        componentName: `Map-Icon-Extinguishing`,
        title: `灭火药剂图例`
    },
    {
        code: `MapIconFireHydrant`,
        componentName: `Map-Icon-FireHydrant`,
        title: `消防栓图例`
    },
    {
        code: `MapIconGasSite`,
        componentName: `Map-Icon-GasSite`,
        title: `加油站图例`
    },
    {
        code: `MapIconHydropowerStation`,
        componentName: `Map-Icon-HydropowerStation`,
        title: `水电站图例`
    },
    {
        code: `MapIconImgSite`,
        componentName: `Map-Icon-ImgSite`,
        title: `图像站图例`
    },
    {
        code: `MapIconPipeNetwork`,
        componentName: `Map-Icon-PipeNetwork`,
        title: `管网站图例`
    },
    {
        code: `MapIconRescueSite`,
        componentName: `Map-Icon-RescueSite`,
        title: `救援力量图例`
    },
    {
        code: `MapIconSluiceSite`,
        componentName: `Map-Icon-SluiceSite`,
        title: `闸泵站图例`
    },
    {
        code: `MapIconVideoSite`,
        componentName: `Map-Icon-VideoSite`,
        title: `视频监视站图例`
    },
    {
        code: `MapIconWarehouse`,
        componentName: `Map-Icon-Warehouse`,
        title: `仓库图例`
    },
    {
        code: `MapIconDike`,
        componentName: `Map-Icon-Dike`,
        title: `堤防图例`
    },
    {
        code: `MapIconBridge`,
        componentName: `Map-Icon-Bridge`,
        title: `桥梁图例`
    },
    {
        code: `MapIconBusiness`,
        componentName: `Map-Icon-Business`,
        title: `企事业单位图例`
    },
    {
        code: `MapIconCulvert`,
        componentName: `Map-Icon-Culvert`,
        title: `路涵工程图例`
    },
    {
        code: `MapIconDangerousArea`,
        componentName: `Map-Icon-DangerousArea`,
        title: `危险区图例`
    },
    {
        code: `MapIconFloodTrace`,
        componentName: `Map-Icon-FloodTrace`,
        title: `历史洪痕图例`
    },
    {
        code: `MapIconGully`,
        componentName: `Map-Icon-Gully`,
        title: `需防洪治理山洪沟图例`
    },
    {
        code: `MapIconHouse`,
        componentName: `Map-Icon-House`,
        title: `房屋图例`
    },
    {
        code: `MapIconHsfwater`,
        componentName: `Map-Icon-Hsfwater`,
        title: `历史山洪灾害图例`
    },
    {
        code: `MapIconPlacement`,
        componentName: `Map-Icon-Placement`,
        title: `安置点图例`
    },
    {
        code: `MapIconRiverParagraph`,
        componentName: `Map-Icon-RiverParagraph`,
        title: `河段图例`
    },
    {
        code: `MapIconSection`,
        componentName: `Map-Icon-Section`,
        title: `大断面图例`
    },
    {
        code: `MapIconTown`,
        componentName: `Map-Icon-Town`,
        title: `集镇图例`
    },
    {
        code: `MapIconTransfer`,
        componentName: `Map-Icon-Transfer`,
        title: `转移路线图例`
    },
    {
        code: `MapIconVillage`,
        componentName: `Map-Icon-Village`,
        title: `沿河村落图例`
    },
    {
        code: `MapIconWeir`,
        componentName: `Map-Icon-Weir`,
        title: `塘(堰)坝工程图例`
    },

    // 2019-02-20 ZG新增
    {
        code: `MapIconDefault`,
        componentName: `Map-Icon-Default`,
        // title: `占位图例`
    },
    {
        code: `MapIconWellCover`,
        componentName: `Map-Icon-WellCover`,
        title: `井盖图例`,
        className: `legend-well-cover legend-circle`,
        color: `red`,
        fonts: `richway-icon icon-well-cover`
    },
    {
        code: `MapIconEnclosure`,
        componentName: `Map-Icon-Enclosure`,
        title: `雨篦子图例`,
        className: `legend-enclosure legend-circle`,
        color: `red`,
        fonts: `richway-icon icon-enclosure`
    },
    {
        code: `MapIconPumpingStation`,
        componentName: `Map-Icon-PumpingStation`,
        title: `泵站图例`,
        className: `legend-pumping-station legend-circle`,
        color: `#8a8a8a`,
        fonts: `richway-icon icon-pumping-station`
    },
    {
        code: `MapIconGateStation`,
        componentName: `Map-Icon-GateStation`,
        title: `闸站图例`,
        className: `legend-gate-station legend-circle`,
        color: `#8a8a8a`,
        fonts: `richway-icon icon-sluice`
    },
    {
        code: `MapIconSewageTreatmentPlant`,
        componentName: `Map-Icon-SewageTreatmentPlant`,
        title: `污水处理厂图例`,
        className: `legend-sewage-treatment-plant legend-circle`,
        color: `#882e9f`,
        fonts: `richway-icon icon-sewage`
    },
    {
        code: `MapIconReservoir`,
        componentName: `Map-Icon-Reservoir`,
        title: `蓄水池图例`,
        className: `legend-reservoir legend-circle`,
        color: `red`,
        fonts: `richway-icon icon-pool`
    },
    {
        code: `MapIconWaterQMMStation`,
        componentName: `Map-Icon-WaterQMMStation`,
        title: `水质人工检监测站图例`,
        className: `legend-water-QMM-station legend-circle`,
        color: `#1296db`,
        fontSize: `1rem`,
        fonts: `richway-icon icon-water`
    },
    {
        code: `MapIconWaterQAMStation`,
        componentName: `Map-Icon-WaterQAMStation`,
        title: `水质自动检监测站图例`,
        className: `legend-water-QAM-station legend-circle`,
        color: `red`,
        fontSize: `1rem`,
        fonts: `richway-icon icon-water`
    },
    {
        code: `MapIconCameraVideoStation`,
        componentName: `Map-Icon-CameraVideoStation`,
        title: `视频站图例`,
        className: `legend-camera-video-station legend-circle`,
        color: `#1296db`,
        fonts: `richway-icon icon-camera-1`
    },
    {
        code: `MapIconCameraImgStation`,
        componentName: `Map-Icon-CameraImgStation`,
        title: `图片站图例`,
        className: `legend-camera-img-station legend-circle`,
        color: `#1296db`,
        fonts: `richway-icon icon-camera-2`
    },
    {
        code: `MapIconRainfallStation`,
        componentName: `Map-Icon-RainfallStation`,
        title: `雨量站图例`,
        className: `legend-rainfall-station legend-circle`,
        color: `#1296db`,
        fonts: `richway-icon icon-rain`
    },
    {
        code: `MapIconFlowStation`,
        componentName: `Map-Icon-FlowStation`,
        title: `流量站图例`,
        className: `legend-flow-station legend-circle`,
        color: `blue`,
        fonts: `richway-icon icon-flow`
    },
    {
        code: `MapIconWaterLevelStation`,
        componentName: `Map-Icon-WaterLevelStation`,
        title: `水位站图例`,
        className: `legend-water-level-station legend-circle`,
        color: `red`,
        fonts: `richway-icon icon-water-level`
    },
    {
        code: `MapIconUAV`,
        componentName: `Map-Icon-UAV`,
        title: `无人机图例`,
        className: `legend-uav legend-circle`,
        color: `#594d9c`,
        fonts: `richway-icon icon-aircraft`
    },
    {
        code: `MapIconRobot`,
        componentName: `Map-Icon-Robot`,
        title: `巡检机器人图例`,
        className: `legend-robot legend-circle`,
        color: `#f7c69e`,
        fonts: `richway-icon icon-robot`
    },
    {
        code: `MapIconIndustrialDrainageUsers`,
        componentName: `Map-Icon-IndustrialDrainageUsers`,
        title: `工业排水用户图例`,
        className: `legend-industrial-drainage-users legend-circle`,
        color: `#f7c69e`,
        fonts: `richway-icon icon-fire-hydrant`
    },
    {
        code: `MapIconResidentDrainageUsers`,
        componentName: `Map-Icon-ResidentDrainageUsers`,
        title: `居民排水用户图例`,
        className: `legend-resident-drainage-users legend-circle`,
        color: `red`,
        fonts: `richway-icon icon-shower`
    },
    {
        code: `MapIconOperationalUnit`,
        componentName: `Map-Icon-OperationalUnit`,
        title: `运维单位图例`,
        className: `legend-operational-unit legend-circle`,
        color: `red`,
        fonts: `richway-icon icon-company`
    },
    {
        code: `MapIconManagementUnit`,
        componentName: `Map-Icon-ManagementUnit`,
        title: `管理单位图例`,
        className: `legend-management-unit legend-circle`,
        color: `#06bb67`,
        fonts: `richway-icon icon-company`
    },
    {
        code: `MapIconInspectors`,
        componentName: `Map-Icon-Inspectors`,
        title: `巡检人员图例`,
        className: `legend-inspectors legend-circle`,
        color: `#1258a2`,
        fonts: `richway-icon icon-personnel`
    },
    {
        code: `MapIconRivers`,
        componentName: `Map-Icon-Rivers`,
        title: `河流图例`,
        className: `legend-rivers`,
        borderColor: `#00c9ff`
    },
    {
        code: `MapIconLake`,
        componentName: `Map-Icon-Lake`,
        title: `湖泊图例`,
        className: `legend-well-cover legend-circle`,
        color: `#00c9ff`,
        fonts: `richway-icon icon-lake`
    },
    {
        code: `MapIconSewagePipe`,
        componentName: `Map-Icon-SewagePipe`,
        title: `污水管图例`,
        className: `legend-sewage-pipe legend-pipe`,
        borderColor: `#802098`
    },
    {
        code: `MapIconRainPipe`,
        componentName: `Map-Icon-RainPipe`,
        title: `雨水管图例`,
        className: `legend-rain-pipe legend-pipe`,
        borderColor: `#00c9ff`
    },
    {
        code: `MapIconSewageInterceptionPipe`,
        componentName: `Map-Icon-SewageInterceptionPipe`,
        title: `截污管图例`,
        className: `legend-sewage-interception-pipe legend-pipe`,
        borderColor: `#e46128`
    },
    {
        code: `MapIconWaterReplenishingPipe`,
        componentName: `Map-Icon-WaterReplenishingPipe`,
        title: `补水管图例`,
        className: `legend-water-replenishing-pipe legend-pipe`,
        borderColor: `#ffac19`
    }
];

const iconTypeInfo = {};
for (const item of iconTypeList) {
    iconTypeInfo[item.code] = item.componentName;
}

export default {
    iconTypeList,
    iconTypeInfo
};
