
export default {
  fetchRepos: async ({ commit }) => {
    const response = await fetch('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed&per_page=10', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
  fetchGitHubStatsForRepo: async ({ commit }, repoName) => {
    const response = await fetch(`https://api.github.com/repos/nielse63/${repoName}/stats/contributors`, {
      headers: {
        Authorization:  'Basic: nielse63',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    const allWeeks = json.map(({ weeks }) => weeks);
    const stats = {};
    allWeeks.forEach((collection) => {
      collection.forEach(({
        w, a, d, c,
      }) => {
        const key = `week-${w}`;
        if (!stats[key]) {
          stats[key] = {
            a: 0,
            d: 0,
            c: 0,
          };
        }
        stats[key].a += a;
        stats[key].d -= d;
        stats[key].c += c;
      });
    });
    commit('stats', { repo: repoName, stats });
  },
};
