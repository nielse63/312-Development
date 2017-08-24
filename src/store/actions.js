
// actions are functions that causes side effects and can involve
// asynchronous operations.
export default {
  closeMenu({ commit }) {
    /* istanbul ignore next */
    commit('closeMenu');
  },
  toggleMenu({ commit }) {
    /* istanbul ignore next */
    commit('toggleMenu');
  },
  saveRepos({ commit }, repos) {
    /* istanbul ignore next */
    commit('saveRepos', repos);
  },
  saveModule({ commit }, module) {
    /* istanbul ignore next */
    commit('saveModule', module);
  },
  saveTweets({ commit }, tweets) {
    /* istanbul ignore next */
    commit('saveTweets', tweets);
  },
};
