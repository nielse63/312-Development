
import * as npm from '@/lib/npm';
import * as github from '@/lib/github';

export default {
  fetchGithubUser: async ({ commit }) => {
    const user = await github.user();
    if (user) {
      commit('user', user);
    }
  },
  fetchRepos: async ({ commit }) => {
    const repos = await github.repos();
    if (repos) {
      commit('repos', repos);
    }
  },
  fetchGists: async ({ commit }) => {
    const gists = await github.gists();
    if (gists) {
      commit('gists', gists);
    }
  },
  fetchNPMPackages: async ({ dispatch, commit }) => {
    const packages = await npm.packages();
    if (!packages) {
      return;
    }
    commit('packages', packages);

    // get downloads
    if (!packages.objects) {
      return;
    }
    packages.objects.forEach((pkg) => {
      dispatch('fetchPackageDownloads', pkg.package.name);
    });
  },
  fetchPackageDownloads: async ({ commit }, name) => {
    const downloads = await npm.downloads(name);
    if (downloads) {
      commit('downloads', downloads);
    }
  },
};
