import * as _ct from "../../constants/componentsType";

export default {
    [_ct.LayoutWapBase]: r => require.ensure([], () => r(require(`./layout/base`)), `components/layout/wapBase`)
};
