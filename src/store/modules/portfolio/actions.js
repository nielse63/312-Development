
import * as npm from '@/lib/npm';
import * as github from '@/lib/github';

export default {
  fetchGithubUser: async ({ commit }) => {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization:  'token 9217f80a8ca3cbe7408dc51210c0f094ba88dbd6',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok || response.status !== 200) {
      console.warn({ response });
      return;
    }
    const json = await response.json();
    commit('user', json);
  },
  fetchRepos: async ({ commit }) => {
    const response = await fetch('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed&per_page=200', {
      headers: {
        Authorization:  'token 9217f80a8ca3cbe7408dc51210c0f094ba88dbd6',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok || response.status !== 200) {
      console.warn({ response });
      return;
    }
    const json = await response.json();
    const filtered = json
      .map(object => ({
        created:     object.created_at,
        updated:     object.updated_at,
        pushed:      object.pushed_at,
        description: object.description,
        fullname:    object.full_name,
        homepage:    object.homepage,
        language:    object.language,
        name:        object.name,
        stargazers:  object.stargazers_count,
        url:         object.url,
      }));
    commit('repos', filtered);
  },
  fetchGists: async ({ commit }) => {
    const gists = await github.gists();
    commit('gists', gists);
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
    commit('downloads', downloads);
  },
};
