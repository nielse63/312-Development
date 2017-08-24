
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import state from '@/store/state';
import { createNPMUrl } from '@/lib/data';
import MockTweet from './mocks/tweet';
import MockRepo from './mocks/repo';

const initialState = Object.assign({}, state);

export function isFunction(object) {
  return typeof object === 'function';
}

export function isArray(object) {
  return {}.toString.call(object) === '[object Array]';
}

export function isObject(object) {
  return {}.toString.call(object) === '[object Object]';
}

export function isString(object) {
  return typeof object === 'string';
}

export function resetStore(store) {
  if (store) {
    store.replaceState(
      Object.assign({}, initialState)
    );
  }
}

function blankTweetArray() {
  const output = [];
  let i = 0;
  while (i < 10) {
    output.push(
      Object.assign({}, MockTweet)
    );
    i += 1;
  }
  return output;
}

function blankRepoArray() {
  const output = [];
  let i = 0;
  while (i < 10) {
    output.push(
      Object.assign({}, MockRepo, {
        stargazers_count: Math.floor(Math.random() * 10),
      })
    );
    i += 1;
  }
  return output;
}

export function setupMockRequests() {
  const mock = new MockAdapter(axios);

  // urls
  const tweetsURL = `${window.location.origin}/get-tweets`;
  const githubURL = 'https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed';
  const npmURL = createNPMUrl('Hello-World');

  // set mock output values
  const tweets = blankTweetArray();
  const repos = blankRepoArray();
  const modules = [{
    downloads: [{ downloads: 0, day: '2017-05-26' }, { downloads: 5, day: '2017-05-27' }],
    end: '2017-08-24',
    package: 'project-one',
    start: '2017-05-26',
    totalDownloads: 249,
  }, {
    downloads: [{ downloads: 3, day: '2017-05-26' }, { downloads: 6, day: '2017-05-27' }],
    end: '2017-08-24',
    package: 'project-two',
    start: '2017-05-26',
    totalDownloads: 249,
  }, {
    downloads: [{ downloads: 3, day: '2017-05-26' }, { downloads: 6, day: '2017-05-27' }],
    end: '2017-08-24',
    package: 'project-three',
    start: '2017-05-26',
    totalDownloads: 249,
  }];

  // setup mock responses
  mock.onGet(tweetsURL).reply(() => [200, tweets]);
  mock.onGet(githubURL).reply(() => [200, repos]);
  mock.onGet(npmURL).reply(() => [200, modules]);
  mock.onGet(/^https:\/\/api\.npmjs\.org\//).reply(() => [200, modules]);
}
