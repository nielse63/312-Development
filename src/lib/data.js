/*
  npm author info: http://registry.npmjs.org/-/v1/search?text=author:nielse63
  single package range data: https://api.npmjs.org/downloads/range/2013-01-01:2017-07-20/expand-hex-code
  github user repo data: https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed

  get repo info: https://api.github.com/repos/nielse63/{repo}
  get npm download stats: https://api.npmjs.org/downloads/range/{date-start}:{date-end}/{repo}
*/

import axios from 'axios';
import store from '@/store';

async function fetchFromURL(url) {
  try {
    const response = await axios(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.warn(err);
  }
  return [];
}

function completePromise(resolve, reject, payload, method) {
  if (!payload || !payload.length) {
    reject('No data returned');
  } else {
    store.commit(method, payload);
    resolve(payload);
  }
}

export function getGithubData() {
  return new Promise(async (resolve, reject) => {
    const repos = store.getters.getRepos;
    if (repos && repos.length) {
      resolve(repos);
    } else {
      const data = await fetchFromURL('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed');
      const toSave = data.filter(repo => repo.name !== '312-Development');
      completePromise(resolve, reject, toSave, 'saveRepos');
    }
  });
}

function createNPMUrl(name) {
  function stringFromDate(dateObject) {
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();
    if (month.toString().length < 2) {
      month = `0${month}`;
    }
    if (date.toString().length < 2) {
      date = `0${date}`;
    }
    return `${dateObject.getFullYear()}-${month}-${date}`;
  }

  const threeMonths = 60 * 60 * 24 * 90 * 1000;
  const end = new Date();
  const start = new Date(Date.now() - threeMonths);

  const startString = stringFromDate(start);
  const endString = stringFromDate(end);
  return `https://api.npmjs.org/downloads/range/${startString}:${endString}/${name}`;
}

export function getNPMInfo(name) {
  return new Promise(async (resolve, reject) => {
    const module = store.getters.getModule(name);
    if (module) {
      resolve(module);
    } else {
      const url = createNPMUrl(name);
      try {
        const data = await fetchFromURL(url);
        const totalDownloads = data.downloads.reduce((sum, object) => sum + object.downloads, 0);
        data.totalDownloads = totalDownloads;
        store.commit('saveModule', {
          name: data.package,
          data,
        });
        resolve(data);
      } catch (e) {
        reject(e);
      }
    }
  }).catch((e) => {
    console.error(e);
  });
}

export function getTweets() {
  return new Promise(async (resolve, reject) => {
    const tweets = store.getters.getTweets;
    if (tweets && tweets.length) {
      resolve(tweets);
    } else {
      const url = '/get-tweets';
      const data = await fetchFromURL(url);
      try {
        const output = JSON.parse(data);
        completePromise(resolve, reject, output, 'saveTweets');
      } catch (e) {
        reject(e);
      }
    }
  });
}
