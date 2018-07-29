export default {
  repos(state, payload) {
    state.repos = payload;

    // set stars stat
    let count = 0;
    payload.forEach((repo) => {
      count += repo.stargazers_count;
    });
    state.stats.stars = count;
  },
  commits(state, payload) {
    state.stats.commits += payload;
  },
  user(state, payload) {
    state.user = payload;
    state.stats.repos = payload.public_repos;
  },
  gists(state, payload) {
    state.stats.gists = payload.length;
  },
  packages(state, payload) {
    state.packages = payload.objects;
    state.stats.packages = payload.total;
  },
  downloads(state, payload) {
    state.stats.downloads = payload || 0;
  },
};
