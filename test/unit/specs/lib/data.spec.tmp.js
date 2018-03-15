
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchFromURL, getGithubData, getNPMInfo, getTweets } from '@/lib/data';
import MockRepo from '../../mocks/repo';
import MockNPMModule from '../../mocks/npm-module';
import MockTweet from '../../mocks/tweet';
import { isFunction, isObject, isArray } from '../../helpers';

const Mock312Repo = Object.assign({}, MockRepo);
Mock312Repo.name = '312-Development';
const githubURL = 'https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed';
const npmURL = /https:\/\/api\.npmjs\.org\/downloads\/range\/(.*?):(.*?)\/minify-hex-code/;

const mock = new MockAdapter(axios);
mock
  .onGet('/valid-request').reply(200, {
    valid: true,
  })
  .onGet('/invalid-request').reply(500, {
    valid: false,
  })
  .onGet(githubURL)
  .reply(200, [MockRepo, Mock312Repo])
  .onGet(npmURL)
  .reply(200, MockNPMModule)
  .onGet('/tweets')
  .reply(200, JSON.stringify([MockTweet]));

describe('data', () => {
  it('should export functions', () => {
    expect(isFunction(fetchFromURL)).to.be.true;
    expect(isFunction(getGithubData)).to.be.true;
    expect(isFunction(getNPMInfo)).to.be.true;
    expect(isFunction(getTweets)).to.be.true;
  });

  describe('fetchFromURL', () => {
    it('should return data on success', async () => {
      const output = await fetchFromURL('/valid-request');
      expect(isObject(output)).to.be.true;
    });

    it('should return array on error', async () => {
      const output = await fetchFromURL('/invalid-request');
      expect(isArray(output)).to.be.true;
    });
  });

  describe('getGithubData', () => {
    it('should return array on success', async () => {
      const output = await getGithubData();
      expect(isArray(output)).to.be.true;
    });

    it('should filter out 312 Development repo', async () => {
      const output = await getGithubData();
      expect(output.length).to.equal(1);
      output.forEach((object) => {
        expect(object.name).to.not.equal('312-Development');
      });
    });
  });

  describe('getNPMInfo', () => {
    it('should return object on success', async () => {
      const output = await getNPMInfo('minify-hex-code');
      expect(isObject(output)).to.be.true;
    });

    it('should have specific keys', async () => {
      const output = await getNPMInfo('minify-hex-code');
      const keys = Object.keys(output);
      expect(keys).to.include('start');
      expect(keys).to.include('end');
      expect(keys).to.include('package');
      expect(keys).to.include('downloads');
      expect(keys).to.include('totalDownloads');
    });

    it('should throw on failure', async () => {
      try {
        await getNPMInfo('some-random-module');
      } catch (e) {
        console.log(e);
        expect(e).to.not.be.null;
      }
    });
  });

  describe('getTweets', () => {
    it('should return array on success', async () => {
      const output = await getTweets();
      expect(isArray(output)).to.be.true;
    });

    // it('should return stored tweets', async () => {
    //   const output = await getTweets();
    //   expect(output).to.equal([MockTweet]);
    // });
  });
});
