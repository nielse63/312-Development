
process.env.PORT = 9999;
process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

const spawn = require('cross-spawn');

function start() {
  return spawn('yarn', ['run', 'daemon:start'], { stdio: 'inherit' });
}

function close() {
  return spawn('yarn', ['run', 'daemon:kill'], { stdio: 'inherit' });
}

// startup server
const server = start();
server.on('exit', () => {
  // execute runner
  const runner = spawn('./node_modules/.bin/ava', [], { stdio: 'inherit' });

  // listen for exit/error signals
  runner.on('exit', (code) => {
    close().on('exit', () => {
      process.exit(code);
    });
  });

  runner.on('error', (err) => {
    close().on('exit', () => {
      throw err;
    });
  });
});
server.on('error', (err) => {
  close().on('exit', () => {
    throw err;
  });
});
