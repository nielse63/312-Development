
// actions are functions that causes side effects and can involve
// asynchronous operations.
export default {
  closeMenu({ commit }) {
    commit('closeMenu');
  },
  toggleMenu({ commit }) {
    commit('toggleMenu');
  },
  saveRepos({ commit }, repos) {
    commit('saveRepos', repos);
  },
  saveModule({ commit }, module) {
    commit('saveRepos', module);
  },
  saveTweets({ commit }, tweets) {
    commit('saveTweets', tweets);
  },
};
