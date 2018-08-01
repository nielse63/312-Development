
module.exports = {
  server: {
    command:        'yarn --cwd=packages/api-server serve & yarn start',
    port:           3000,
    usedPortAction: 'kill',
  },
};
