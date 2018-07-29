
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
  const { saved, data } = JSON.parse(string);
  if (!cacheIsOld(saved)) {
    return data;
  }
  localStorage.removeItem(url);
  return null;
}

export function saveCachedData(url, data) {
  const stringData = JSON.stringify({
    saved: new Date(),
    data,
  });
  localStorage.setItem(url, stringData);
}
