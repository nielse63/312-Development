// http://pm2.keymetrics.io/docs/usage/application-declaration/
// https://gist.github.com/Unitech/4c8ea564aa8bf0a389c5#file-bootstrap-js-L28

const instances = process.env.WEB_CONCURRENCY || 4;
const maxMemory = process.env.WEB_MEMORY || 256;

const apps = ['front-end'].map(app => ({
  name: app,
  script: `./server/${app}.js`,
  watch: [
    `./server/${app}.js`,
    './server/get-tweets.js',
    './server/send-email.js',
    './server/helpers.js',
  ],
  instances,
  max_memory_restart: `${maxMemory}M`,
  exec_mode: 'cluster',
  error_file: `./.logs/${app}-err.log`,
  out_file: `./.logs/${app}-out.log`,
  combine_logs: true,
  env: {
    NODE_ENV: 'development',
  },
  env_production: {
    NODE_ENV: 'production',
  },
}));

module.exports = {
  apps,
};
