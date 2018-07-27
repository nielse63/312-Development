
function cacheIsOld(dateString) {
  const oneDay = 60 * 60 * 24;
  const date = Date.parse(dateString) / 1000;
  const today = Date.parse(new Date()) / 1000;
  const diff = today - date;
  return diff > oneDay;
}

// function shouldEmptyCache() {
//   const lastSaved = localStorage.saved;
//   if (!lastSaved) {
//     localStorage.setItem('saved', new Date());
//     return false;
//   }
//   return cacheIsOld(lastSaved);
// }

// function emptyCache() {
//   localStorage.clear();
//   localStorage.setItem('saved', new Date());
// }

function getCachedData(url) {
  const string = localStorage.getItem(url);
  if (!string) {
    return null;
  }
  const { saved, data } = JSON.parse(string);
  if (!cacheIsOld(saved)) {
    return data;
  }
  localStorage.removeItem(url);
  return null;
}

function saveCachedData(url, data) {
  const stringData = JSON.stringify({
    saved: new Date(),
    data,
  });
  localStorage.setItem(url, stringData);
}

export default async (url, customHeaders) => {
  // get cached value if we can
  const cached = getCachedData(url);
  if (cached) {
    return cached;
  }

  // get fresh data
  const defaultHeaders = {
    'content-type': 'application/json',
  };
  const options = { ...defaultHeaders, ...customHeaders };
  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    console.error({ error });
    return null;
  }
  const json = await response.json();
  saveCachedData(url, json);
  return json;
};
