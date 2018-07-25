const api = require('api-npm');

function fetchGitHubStatsForRepo(state, repoName) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://api.github.com/repos/nielse63/${repoName}/stats/contributors`, {
      headers: {
        Authorization:  'token 9217f80a8ca3cbe7408dc51210c0f094ba88dbd6',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok || response.status !== 200) {
      resolve(0);
      return;
    }
    const json = await response.json();
    const username = state.user.login;
    let commitCount = 0;
    json.filter(object => object.author.login === username).forEach((object) => {
      const { weeks } = object;
      weeks.forEach((week) => {
        commitCount += week.c;
      });
    });
    if (!commitCount) {
      commitCount = 0;
    }
    resolve(commitCount);
  });
}

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
  fetchGitHubStats({ commit, state }) {
    const promises = state.repos.map(({ name }) => fetchGitHubStatsForRepo(state, name));
    Promise.all(promises).then((commits) => {
      const total = commits.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      commit('commits', total);
    }, (error) => {
      console.error(error);
    }).catch((error) => {
      console.error(error);
    });
  },
  fetchGists: async ({ commit }) => {
    const response = await fetch('https://api.github.com/users/nielse63/gists', {
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
    commit('gists', json);
  },
  fetchNPMPackages: async ({ dispatch, commit }) => {
    const response = await fetch('http://registry.npmjs.org/-/v1/search?text=author:nielse63');
    if (!response.ok || response.status !== 200) {
      console.warn({ response });
      return;
    }
    const json = await response.json();
    commit('packages', json);
    dispatch('fetchNPMDownloads');
  },
  fetchNPMDownloads({ dispatch, state }) {
    state.packages.forEach((pkg) => {
      const { name } = pkg.package;
      dispatch('fetchPackageDownloads', name);
    });
  },
  fetchPackageDownloads({ commit }, name) {
    api.getstat(name, '2010-01-01', '2019-01-01', (data) => {
      commit('downloads', data.downloads);
    });
  },
};
