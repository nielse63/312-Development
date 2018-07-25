
export default {
  start({ commit, state }) {
    if (state.running) {
      commit('pause');
    }
    if (state.animationFrameId) {
      cancelAnimationFrame(state.animationFrameId);
    }
    state.function(state.element);
    setTimeout(() => {
      commit('start');
    }, 0);
  },
  stop({ commit, state }) {
    if (state.running) {
      commit('pause');
    }
    if (state.animationFrameId) {
      cancelAnimationFrame(state.animationFrameId);
    }
  },
};
