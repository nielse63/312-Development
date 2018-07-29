
import { getCachedData, saveCachedData } from '@/lib/cache';

export default async function api(url) {
  const cached = getCachedData(url);
  if (cached) {
    return cached;
  }
  try {
    const response = await fetch(url);
    const json = await response.json();
    saveCachedData(url, json);
    return json;
  } catch (error) {
    console.error({ url, error });
  }
  return null;
}
