export default {
  open({ commit }) {
    commit('open');
  },
  close({ commit }) {
    commit('close');
  },
  toggle({ dispatch, state }) {
    if (state.open) {
      dispatch('close');
    } else {
      dispatch('open');
    }
  },
};
