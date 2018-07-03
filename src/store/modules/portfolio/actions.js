
export default {
  fetchGitHubData: async ({ commit }) => {
    const response = await fetch('https://api.github.com/users/nielse63/repos?visibility=public&sort=updated&per_page=100&client_id=465fce969e205758fced&client_secret=4062d84bbf2050b5f0dae451c70c5c27208f3ed0');
    const json = await response.json();
    const filtered = json
      .filter((object) => {
        const lang = object.language || '';
        return lang.toLowerCase() !== 'php';
      })
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
        watchers:    object.watchers,
        subscribers: object.subscribers_count,
      }));
    commit('repos', filtered);
  },
};
