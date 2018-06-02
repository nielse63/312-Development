
const { shell } = require('execa');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: 'Linting JS',
    task:  () => shell('cross-env NODE_ENV=production yarn run lint:js'),
  },
  {
    title: 'Linting SCSS',
    task:  () => shell('cross-env NODE_ENV=production yarn run lint:scss'),
  },
  {
    title: 'Removing existing build',
    task:  () => shell('rm -rf dist/'),
  },
  {
    title: 'Building dist files',
    task:  ctx => shell('cross-env NODE_ENV=production webpack --mode production --colors')
      .then(({ stdout, stderr, code }) => {
        if (code) {
          throw new Error(`Failed to compile src files: ${stderr}`);
        } else {
          ctx.output = stdout;
        }
      })
    ,
  },
]);

tasks.run().then(({ output }) => {
  console.log(output);
}).catch((err) => {
  console.error(err);
});
