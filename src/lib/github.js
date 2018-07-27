import request from './request';

async function req(url) {
  return request(url, {
    headers: {
      Authorization: 'token 9217f80a8ca3cbe7408dc51210c0f094ba88dbd6',
    },
  });
}

export const gists = async () => {
  const data = await req('https://api.github.com/users/nielse63/gists');
  return data;
};

export const user = async () => {
  const data = await req('https://api.github.com/user');
  return data;
};

export const repos = async () => {
  const data = await req('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed&per_page=200');
  return data;
};
