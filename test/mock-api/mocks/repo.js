const faker = require('faker');
const { kebab } = require('case');
const mockUser = require('./user');

const repo = () => {
  const id = faker.random.number();
  const uuid = faker.random.uuid();
  const name = kebab(faker.lorem.words());
  const fullName = `nielse63/${name}`;
  const url = `https://github.com/${fullName}`;
  const apiUrl = `https://api.github.com/repos/${fullName}`;

  const owner = mockUser();

  return {
    id,
    node_id:           uuid,
    name,
    full_name:         fullName,
    owner,
    private:           false,
    html_url:          url,
    description:       faker.lorem.sentence(),
    fork:              false,
    url:               apiUrl,
    forks_url:         `${apiUrl}/forks`,
    keys_url:          `${apiUrl}/keys{/key_id}`,
    collaborators_url: `${apiUrl}/collaborators{/collaborator}`,
    teams_url:         `${apiUrl}/teams`,
    hooks_url:         `${apiUrl}/hooks`,
    issue_events_url:  `${apiUrl}/issues/events{/number}`,
    events_url:        `${apiUrl}/events`,
    assignees_url:     `${apiUrl}/assignees{/user}`,
    branches_url:      `${apiUrl}/branches{/branch}`,
    tags_url:          `${apiUrl}/tags`,
    blobs_url:         `${apiUrl}/git/blobs{/sha}`,
    git_tags_url:      `${apiUrl}/git/tags{/sha}`,
    git_refs_url:      `${apiUrl}/git/refs{/sha}`,
    trees_url:         `${apiUrl}/git/trees{/sha}`,
    statuses_url:      `${apiUrl}/statuses/{sha}`,
    languages_url:     `${apiUrl}/languages`,
    stargazers_url:    `${apiUrl}/stargazers`,
    contributors_url:  `${apiUrl}/contributors`,
    subscribers_url:   `${apiUrl}/subscribers`,
    subscription_url:  `${apiUrl}/subscription`,
    commits_url:       `${apiUrl}/commits{/sha}`,
    git_commits_url:   `${apiUrl}/git/commits{/sha}`,
    comments_url:      `${apiUrl}/comments{/number}`,
    issue_comment_url: `${apiUrl}/issues/comments{/number}`,
    contents_url:      `${apiUrl}/contents/{+path}`,
    compare_url:       `${apiUrl}/compare/{base}...{head}`,
    merges_url:        `${apiUrl}/merges`,
    archive_url:       `${apiUrl}/{archive_format}{/ref}`,
    downloads_url:     `${apiUrl}/downloads`,
    issues_url:        `${apiUrl}/issues{/number}`,
    pulls_url:         `${apiUrl}/pulls{/number}`,
    milestones_url:    `${apiUrl}/milestones{/number}`,
    notifications_url: `${apiUrl}/notifications{?since,all,participating}`,
    labels_url:        `${apiUrl}/labels{/name}`,
    releases_url:      `${apiUrl}/releases{/id}`,
    deployments_url:   `${apiUrl}/deployments`,
    created_at:        '2016-05-12T12:31:08Z',
    updated_at:        '2018-05-01T06:57:04Z',
    pushed_at:         '2018-07-04T19:45:02Z',
    git_url:           `git://github.com/${fullName}.git`,
    ssh_url:           `git@github.com:${fullName}.git`,
    clone_url:         `https://github.com/${fullName}.git`,
    svn_url:           `https://github.com/${fullName}`,
    homepage:          faker.internet.url(),
    size:              faker.random.number(),
    stargazers_count:  faker.random.number(),
    watchers_count:    faker.random.number(),
    language:          'JavaScript',
    has_issues:        true,
    has_projects:      true,
    has_downloads:     true,
    has_wiki:          true,
    has_pages:         false,
    forks_count:       0,
    mirror_url:        null,
    archived:          false,
    open_issues_count: faker.random.number(),
    license:           null,
    forks:             0,
    open_issues:       4,
    watchers:          faker.random.number(),
    default_branch:    'master',
  };
};

const repos = (count = 10) => {
  const output = [];
  let i = 0;
  while (i < count) {
    output.push(repo());
    i += 1;
  }
  return output;
};

module.exports.repo = repo;
module.exports = repos;
