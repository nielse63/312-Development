
function cacheIsOld(dateString) {
  const oneDay = 60 * 60 * 24;
  const date = Date.parse(dateString) / 1000;
  const today = Date.parse(new Date()) / 1000;
  const diff = today - date;
  return diff > oneDay;
}

export function getCachedData(url) {
  const string = localStorage.getItem(url);
  if (!string) {
    return null;
  }
  const cache = JSON.parse(string);
  if (!cacheIsOld(cache.saved)) {
    return cache;
  }
  localStorage.removeItem(cache.url);
  return null;
}

export function saveCachedData(url, data) {
  const stringData = JSON.stringify({
    saved: new Date(),
    ok:    !data.error,
    data,
  });
  localStorage.setItem(url, stringData);
}
