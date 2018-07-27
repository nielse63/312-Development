import request from './request';

async function req(url) {
  return request(url, {
    headers: {
      Authorization: 'token 9217f80a8ca3cbe7408dc51210c0f094ba88dbd6',
    },
  });
}

export const gists = async () => req('https://api.github.com/users/nielse63/gists');
