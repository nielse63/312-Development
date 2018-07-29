const fetch = require('node-fetch');

module.exports = async (url, additionalHeaders) => {
  const defaultHeaders = {
    'content-type': 'application/json',
  };
  const headers = { ...defaultHeaders, ...additionalHeaders };
  let response;
  const output = {
    status: 200,
    data:   {},
  };
  try {
    response = await fetch(url, headers);
    output.status = response.status;
    output.data = await response.json();
  } catch (error) {
    output.data = error;
  }
  return output;
};
