/*
  npm author info: http://registry.npmjs.org/-/v1/search?text=author:nielse63
  single package range data: https://api.npmjs.org/downloads/range/2013-01-01:2017-07-20/expand-hex-code
  github user repo data: https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed

  get repo info: https://api.github.com/repos/nielse63/{repo}
  get npm download stats: https://api.npmjs.org/downloads/range/{date-start}:{date-end}/{repo}
*/

import store from '@/store';

export const fetchFromURL = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const completePromise = (resolve, reject, payload, method) => {
  if (!payload || !payload.length) {
    /* istanbul ignore next */
    reject(new Error('No data returned'));
  } else {
    store.commit(method, payload);
    resolve(payload);
  }
};

export const getGithubData = () => new Promise(async (resolve, reject) => {
  const repos = store.getters.getRepos;
  if (repos && repos.length) {
    resolve(repos);
  } else {
    const data = await fetchFromURL('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed');
    const toSave = data.filter(repo => repo.name !== '312-Development');
    completePromise(resolve, reject, toSave, 'saveRepos');
  }
});

export const createNPMUrl = (name) => {
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
};

const handleNPMData = (data = {}) => {
  if (Array.isArray(data)) {
    return { downloads: [] };
  }
  return data;
};

const saveNPMPackage = (data = {}) => {
  /* istanbul ignore if */
  if (data.package) {
    store.commit('saveModule', { name: data.package, data });
  }
};

export const getNPMInfo = name => new Promise(async (resolve, reject) => {
  try {
    const url = createNPMUrl(name);
    const rawData = await fetchFromURL(url);
    const npmData = handleNPMData(rawData);
    const totalDownloads = npmData.downloads.reduce((sum, object) => sum + object.downloads, 0);
    npmData.totalDownloads = totalDownloads;
    npmData.name = name;
    saveNPMPackage(npmData);
    resolve(npmData);
  } catch (e) {
    /* istanbul ignore next */
    reject(e);
  }
});

export const getTweets = () => new Promise(async (resolve, reject) => {
  try {
    const data = await fetchFromURL('/tweets');
    completePromise(resolve, reject, data, 'saveTweets');
  } catch (e) {
    reject(e);
  }
});

