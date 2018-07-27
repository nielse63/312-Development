
import request from './request';

export const packages = async () => {
  const data = await request('https://registry.npmjs.org/-/v1/search?text=author:nielse63');
  return data;
};

export const downloads = async (pkg) => {
  const date = new Date();
  const year = date.getFullYear() + 1;
  const to = `${year}-01-01`;
  const data = await request(`https://api.npmjs.org/downloads/point/2010-01-01:${to}/${pkg}`);
  return data;
};
