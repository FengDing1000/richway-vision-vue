import * as _ct from "../../constants/componentsType";

export default {
    [_ct.LayoutTheme]: r => require.ensure([], () => r(require(`./layout/theme`)), `components/layout/theme`)
};
