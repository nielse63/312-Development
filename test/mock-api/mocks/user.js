const faker = require('faker');

const user = () => {
  const username = faker.internet.userName();
  return {
    login:               username,
    id:                  faker.random.number(),
    node_id:             'MDQ6VXNlcjY1NDYzMQ==',
    avatar_url:          'https://avatars1.githubusercontent.com/u/654631?v=4',
    gravatar_id:         '',
    url:                 `https://api.github.com/users/${username}`,
    html_url:            `https://github.com/${username}`,
    followers_url:       `https://api.github.com/users/${username}/followers`,
    following_url:       `https://api.github.com/users/${username}/following{/other_user}`,
    gists_url:           `https://api.github.com/users/${username}/gists{/gist_id}`,
    starred_url:         `https://api.github.com/users/${username}/starred{/owner}{/repo}`,
    subscriptions_url:   `https://api.github.com/users/${username}/subscriptions`,
    organizations_url:   `https://api.github.com/users/${username}/orgs`,
    repos_url:           `https://api.github.com/users/${username}/repos`,
    events_url:          `https://api.github.com/users/${username}/events{/privacy}`,
    received_events_url: `https://api.github.com/users/${username}/received_events`,
    type:                'User',
    site_admin:          false,
  };
};

module.exports = user;
