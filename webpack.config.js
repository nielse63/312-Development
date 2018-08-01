process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';
require('dotenv').config();
const config = isDev ? require('./build/webpack.dev.conf') : require('./build/webpack.prod.conf');

// console.log(config);
// process.exit(1);

module.exports = config;
