
export default {
  start({ commit, state }) {
    const fn = state.function;
    const { element } = state;
    fn(element);
    commit('start');
  },
  stop({ commit, state }) {
    commit('pause');
    const { animationFrameId } = state;
    cancelAnimationFrame(animationFrameId);
    commit('reset');
  },
};
