
export default {
  start({ commit, state }) {
    const fn = state.function;
    const { element } = state;
    fn(element);
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
