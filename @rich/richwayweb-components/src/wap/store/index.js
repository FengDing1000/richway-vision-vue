/**

 @Name：vuex,全局的状态管理入口文件
 @Author：g.zhou
 @License：MIT

 */

import state from './state';
import getters from './getters';
import actions from './action';
import mutations from './mutations';
import modules from './modules';
import mapModule from './map';

const Vue = require(`vue`);
const Vuex = require(`vuex`);

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: Object.assign({}, modules, mapModule)
});

export default store;
