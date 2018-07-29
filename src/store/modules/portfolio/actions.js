
import api from '@/lib/api';

export default {
  fetchGithubUser: async ({ commit }) => {
    const user = await api('/api/github/user');
    if (user) {
      commit('user', user);
    }
  },
  fetchRepos: async ({ commit }) => {
    const repos = await api('/api/github/repos');
    if (repos) {
      commit('repos', repos);
    }
  },
  fetchGists: async ({ commit }) => {
    const gists = await api('/api/github/gists');
    if (gists) {
      commit('gists', gists);
    }
  },
  fetchNPMPackages: async ({ dispatch, commit }) => {
    const packages = await api('/api/npm/packages');
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
    const downloads = await api(`/api/npm/downloads/${encodeURIComponent(name)}`);
    if (downloads) {
      commit('downloads', downloads);
    }
  },
};
