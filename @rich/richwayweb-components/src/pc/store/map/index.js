import state from './state';
import getters from './getters';
import actions from './action';
import mutations from './mutations';
import * as _modulesType from '$src/constants/modulesType';

export default {
    [_modulesType.MapMonitoring]: {
        namespaced: true,
        state,
        getters,
        actions,
        mutations
    }
};
