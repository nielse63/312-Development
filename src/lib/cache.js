
function cacheIsOld(dateString) {
  const ONE_MINUTE = 60;
  const ONE_HOUR = ONE_MINUTE * 60;
  const TIME_TO_CACHE = ONE_HOUR;
  const date = Date.parse(dateString) / 1000;
  const today = Date.parse(new Date()) / 1000;
  const diff = today - date;
  return diff > TIME_TO_CACHE;
}

export function getCachedData(url) {
  const string = localStorage.getItem(url);
  if (!string) {
    return null;
  }
  const cache = JSON.parse(string);
  if (cacheIsOld(cache.saved)) {
    return null;
  }
  return cache;
}

export function saveCachedData(url, data) {
  const stringData = JSON.stringify({
    saved: new Date(),
    ok:    !data.error,
    data,
  });
  localStorage.setItem(url, stringData);
}
