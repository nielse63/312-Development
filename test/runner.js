
const spawn = require('cross-spawn');

const start = () => spawn('node_modules/.bin/pm2', ['start', 'index.js'], { stdio: 'inherit' });

const close = () => spawn('node_modules/.bin/pm2', ['kill'], { stdio: 'inherit' });

const onexit = (code) => {
  close().on('exit', () => {
    process.exit(code);
  });
};

const onerror = (err) => {
  close().on('exit', () => {
    console.error(err);
    throw err;
  });
};

// startup server
const server = start();
server.on('exit', () => {
  console.log('Running the integration server');

  // execute runner
  const runner = spawn('node_modules/.bin/mocha', ['test/specs/**.spec.js'], { stdio: 'inherit' });
  runner.on('exit', onexit);
  runner.on('error', onerror);
});

server.on('error', onerror);
