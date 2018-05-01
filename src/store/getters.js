
// getters are functions
export default {
  isMenuOpen(state) {
    return state.menuOpen;
  },
  getRepos(state) {
    return state.repos;
  },
  getRepo(state) {
    return name => state.repos.find(repo => repo.name === name);
  },
  getTweets(state) {
    return state.tweets;
  },
};
