export default {
  repos(state, payload) {
    state.repos = payload;
  },
  stats(state, { repo, stats }) {
    state.stats[repo] = stats;
  },
};
