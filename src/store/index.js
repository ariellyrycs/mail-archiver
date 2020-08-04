import Vue from 'vue';
import Vuex from 'vuex';
import emails from './modules/emails';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        emails
    }
});
