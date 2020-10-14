import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions';
import axios from 'axios';

Vue.use(Vuex)
Vue.use(axios);

export default new Vuex.Store({
    state,
    mutations,
    actions,
})