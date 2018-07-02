
export default {
  start({ commit, state }) {
    // const fn = state.function;
    // const { element } = state;
    state.function(document.getElementById('scene'));
    commit('start');
  },
  // pause({ commit }) {
  //   commit('pause');
  // },
  // resume({ commit }) {
  //   commit('pause');
  // },
  stop({ commit, state }) {
    commit('pause');
    const { animationFrameId } = state;
    cancelAnimationFrame(animationFrameId);
    commit('reset');
  },
};
