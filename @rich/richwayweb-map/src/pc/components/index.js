import componentsType from "../../constants/componentsType";

const { mapBaseTypeInfo } = componentsType;

export default {
    [mapBaseTypeInfo.MapBase]: r => require.ensure([], () => r(require(`./map/index.vue`)), `richway_map`)
};
