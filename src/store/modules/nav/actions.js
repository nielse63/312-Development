export default {
  open({ commit }) {
    commit('open');
    commit('canvas/pause', null, { root: true });
  },
  close({ commit }) {
    commit('close');
    commit('canvas/start', null, { root: true });
  },
  toggle({ dispatch, state }) {
    if (state.open) {
      dispatch('close');
    } else {
      dispatch('open');
    }
  },
  darken({ commit }) {
    commit('darken');
  },
  lighten({ commit }) {
    commit('lighten');
  },
};
