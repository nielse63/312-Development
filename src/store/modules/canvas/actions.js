
export default {
  start({ commit, state }) {
    state.function(document.getElementById('scene'));
    commit('start');
  },
  stop({ commit, state }) {
    commit('pause');
    const { animationFrameId } = state;
    cancelAnimationFrame(animationFrameId);
    commit('reset');
  },
};
