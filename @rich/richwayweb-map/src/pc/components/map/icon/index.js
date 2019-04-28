/**

 @Name：底图图例的目录文件
 @Author：g.zhou
 @License：MIT

 */
import iconType from '../../../../constants/iconType';

import Warn from './legend/warn.js';
import Basin from './legend/type1/basin.js';
import Water from './legend/water.js';
import ChemicalPlant from './legend/chemicalPlant.js';
import Extinguishing from './legend/extinguishing.js';
import FireHydrant from './legend/fireHydrant.js';
import GasSite from './legend/gasSite.js';
import HydropowerStation from './legend/hydropowerStation.js';
import ImgSite from './legend/imgSite.js';
import PipeNetwork from './legend/pipeNetwork.js';
import Rain from './legend/rain.js';
import RainfallSite from './legend/rainfallSite.js';
import RescueSite from './legend/rescueSite.js';
import ReservoirSite from './legend/reservoirSite.js';
import RiverSite from './legend/riverSite.js';
import Site from './legend/site.js';
import SluiceSite from './legend/sluiceSite.js';
import VideoSite from './legend/videoSite.js';
import Warehouse from './legend/warehouse.js';

import Dike from './legend/type1/dike.js';
import Bridge from './legend/type1/bridge.js';
import Business from './legend/type1/business.js';
import Culvert from './legend/type1/culvert.js';
import DangerousArea from './legend/type1/dangerousArea.js';
import FloodTrace from './legend/type1/floodTrace.js';
import Gully from './legend/type1/gully.js';
import House from './legend/type1/house.js';
import Hsfwater from './legend/type1/hsfwater.js';
import Placement from './legend/type1/placement.js';
import RiverParagraph from './legend/type1/riverParagraph.js';
import Section from './legend/type1/section.js';
import Town from './legend/type1/town.js';
import Transfer from './legend/type1/transfer.js';
import Village from './legend/type1/village.js';
import Weir from './legend/type1/weir.js';

import template from './legend/legendTemplate';

const { iconTypeList, iconTypeInfo } = iconType;

function getIocnTypeInfo(code) {
    let info = {};
    for (const item of iconTypeList) {
        if (item.componentName === code) {
            info = item;
            break;
        }
    }
    return info;
}

export default {
    [iconTypeInfo.MapIconWarn]: Warn,
    [iconTypeInfo.MapIconBasin]: Basin,
    [iconTypeInfo.MapIconWater]: Water,
    [iconTypeInfo.MapIconChemicalPlant]: ChemicalPlant,
    [iconTypeInfo.MapIconExtinguishing]: Extinguishing,
    [iconTypeInfo.MapIconFireHydrant]: FireHydrant,
    [iconTypeInfo.MapIconGasSite]: GasSite,
    [iconTypeInfo.MapIconHydropowerStation]: HydropowerStation,
    [iconTypeInfo.MapIconImgSite]: ImgSite,
    [iconTypeInfo.MapIconPipeNetwork]: PipeNetwork,
    [iconTypeInfo.MapIconRain]: Rain,
    [iconTypeInfo.MapIconRainfallSite]: RainfallSite,
    [iconTypeInfo.MapIconRescueSite]: RescueSite,
    [iconTypeInfo.MapIconReservoirSite]: ReservoirSite,
    [iconTypeInfo.MapIconRiverSite]: RiverSite,
    [iconTypeInfo.MapIconSite]: Site,
    [iconTypeInfo.MapIconSluiceSite]: SluiceSite,
    [iconTypeInfo.MapIconVideoSite]: VideoSite,
    [iconTypeInfo.MapIconWarehouse]: Warehouse,
    [iconTypeInfo.MapIconDike]: Dike,
    [iconTypeInfo.MapIconBridge]: Bridge,
    [iconTypeInfo.MapIconBusiness]: Business,
    [iconTypeInfo.MapIconCulvert]: Culvert,
    [iconTypeInfo.MapIconDangerousArea]: DangerousArea,
    [iconTypeInfo.MapIconFloodTrace]: FloodTrace,
    [iconTypeInfo.MapIconGully]: Gully,
    [iconTypeInfo.MapIconHouse]: House,
    [iconTypeInfo.MapIconHsfwater]: Hsfwater,
    [iconTypeInfo.MapIconPlacement]: Placement,
    [iconTypeInfo.MapIconRiverParagraph]: RiverParagraph,
    [iconTypeInfo.MapIconSection]: Section,
    [iconTypeInfo.MapIconTown]: Town,
    [iconTypeInfo.MapIconTransfer]: Transfer,
    [iconTypeInfo.MapIconVillage]: Village,
    [iconTypeInfo.MapIconWeir]: Weir,
    [iconTypeInfo.MapIconDefault]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconDefault)),
    [iconTypeInfo.MapIconWellCover]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconWellCover)),
    [iconTypeInfo.MapIconEnclosure]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconEnclosure)),
    [iconTypeInfo.MapIconPumpingStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconPumpingStation)),
    [iconTypeInfo.MapIconGateStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconGateStation)),
    [iconTypeInfo.MapIconSewageTreatmentPlant]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconSewageTreatmentPlant)),
    [iconTypeInfo.MapIconReservoir]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconReservoir)),
    [iconTypeInfo.MapIconWaterQMMStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconWaterQMMStation)),
    [iconTypeInfo.MapIconWaterQAMStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconWaterQAMStation)),
    [iconTypeInfo.MapIconCameraVideoStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconCameraVideoStation)),
    [iconTypeInfo.MapIconCameraImgStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconCameraImgStation)),
    [iconTypeInfo.MapIconRainfallStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconRainfallStation)),
    [iconTypeInfo.MapIconFlowStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconFlowStation)),
    [iconTypeInfo.MapIconWaterLevelStation]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconWaterLevelStation)),
    [iconTypeInfo.MapIconUAV]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconUAV)),
    [iconTypeInfo.MapIconRobot]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconRobot)),
    [iconTypeInfo.MapIconIndustrialDrainageUsers]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconIndustrialDrainageUsers)),
    [iconTypeInfo.MapIconResidentDrainageUsers]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconResidentDrainageUsers)),
    [iconTypeInfo.MapIconOperationalUnit]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconOperationalUnit)),
    [iconTypeInfo.MapIconManagementUnit]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconManagementUnit)),
    [iconTypeInfo.MapIconInspectors]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconInspectors)),
    [iconTypeInfo.MapIconRivers]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconRivers)),
    [iconTypeInfo.MapIconLake]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconLake)),
    [iconTypeInfo.MapIconSewagePipe]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconSewagePipe)),
    [iconTypeInfo.MapIconRainPipe]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconRainPipe)),
    [iconTypeInfo.MapIconSewageInterceptionPipe]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconSewageInterceptionPipe)),
    [iconTypeInfo.MapIconWaterReplenishingPipe]: (o = {}) => template(o, getIocnTypeInfo(iconTypeInfo.MapIconWaterReplenishingPipe))
};
