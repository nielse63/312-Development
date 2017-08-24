
process.env.NODE_ENV = 'testing';
process.env.BABEL_ENV = 'test';

const spawn = require('cross-spawn');

function close() {
  return spawn('yarn', ['run', 'daemon:kill'], { stdio: 'inherit' });
}

const runner = spawn('./node_modules/.bin/ava', [], { stdio: 'inherit' });

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
