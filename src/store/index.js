import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules,
  state: {
    loading: true,
  },
  mutations: {
    loading(state, payload) {
      Vue.set(state, 'loading', payload);
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('loading', payload);

      // set body styles
      // if (payload) {
      //   document.body.style.overflow = 'hidden';
      // } else {
      //   document.body.style.overflow = '';
      // }
    },
  },
});

export default store;
