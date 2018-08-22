
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
    response = await fetch(url, options);
    console.log({ url, response, options }); // eslint-disable-line no-console
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
