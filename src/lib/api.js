
import { getCachedData, saveCachedData } from '@/lib/cache';

const defaults = {
  method: 'GET',
};

export default async function api(url, customOptions = {}) {
  const options = { ...defaults, ...customOptions };
  const cached = options.method === 'GET' && getCachedData(url);
  if (cached) {
    return cached;
  }

  let response;
  const output = {
    status: 0,
    ok:     false,
    data:   {},
  };
  try {
    const requestURL = new URL(url, process.env.API_HOST);
    response = await fetch(requestURL.href, options);
    output.status = response.status;
    output.ok = response.ok;
    const json = await response.json();
    saveCachedData(url, json);
    output.data = json;
  } catch (error) {
    output.data = cached || {};
  }
  return output;
}
