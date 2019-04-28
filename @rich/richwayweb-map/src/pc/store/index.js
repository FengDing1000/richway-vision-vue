/**

 @Name：vuex,全局的状态管理入口文件
 @Author：g.zhou
 @License：MIT

 */

import state from '@rich/richwayweb-components/src/pc/store/state';
import getters from '@rich/richwayweb-components/src/pc/store/getters';
import actions from '@rich/richwayweb-components/src/pc/store/action';
import mutations from '@rich/richwayweb-components/src/pc/store/mutations';

import modules from './modules';
import mapModule from './map';
import effectMap from './effectMap';

const Vue = require(`vue`);
const Vuex = require(`vuex`);

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: Object.assign({}, modules, mapModule, effectMap)
});

export default store;
