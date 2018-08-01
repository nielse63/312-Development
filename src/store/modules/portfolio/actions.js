import api from '@/lib/api';

async function downloadsForPackage(name) {
  const downloads = await api(`/api/npm/downloads/${encodeURIComponent(name)}`);
  return downloads;
}

export default {
  fetchGithubUser: async ({ commit }) => {
    const user = await api('/api/github/user');
    if (user.ok) {
      commit('user', user.data);
    }
  },
  fetchRepos: async ({ commit }) => {
    const repos = await api('/api/github/repos');
    if (repos.ok) {
      commit('repos', repos.data);
    }
  },
  fetchGists: async ({ commit }) => {
    const gists = await api('/api/github/gists');
    if (gists.ok) {
      commit('gists', gists.data);
    }
  },
  fetchNPMPackages: async ({ commit }) => {
    const packages = await api('/api/npm/packages');
    if (!packages.ok) {
      return;
    }
    const promises = packages.data.objects.map(pkg => downloadsForPackage(pkg.package.name));
    const results = await Promise.all(promises);
    let total = 0;
    results.filter(object => object.ok).forEach((object) => {
      total += object.data.downloads;
    });
    commit('downloads', total);
    commit('packages', packages.data);
  },
};
