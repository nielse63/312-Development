
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const sampleContent = fs.readFileSync(
  path.join(__dirname, '../test/unit/sample/Sample.spec.js'), 'utf8'
);
const jsSampleContent = fs.readFileSync(
  path.join(__dirname, '../test/unit/sample/jssample.spec.js'), 'utf8'
);

const samples = {
  vue: sampleContent,
  js: jsSampleContent,
};

const blacklist = [
  'main.js',
  'service-worker.js',
  'prototypes.js',
  'lazy-load.js',
];

function createTestFolder(file) {
  const folder = path.dirname(file);
  if (!fs.existsSync(folder)) {
    console.log(chalk.yellow(`Creating ${folder}`));
    fs.mkdirSync(folder);
  }
}

function createVueTest(file) {
  const srcFile = file.replace(/src\//, '');
  const testFilePath = path.resolve(
    __dirname, '../test/unit/specs',
    srcFile.replace('.vue', '.spec.js')
  );
  if (fs.existsSync(testFilePath)) {
    return;
  }

  // create the test folder
  createTestFolder(testFilePath);

  const componentName = path.basename(file).replace('.vue', '');
  const content = samples.vue
    .replace(/#NAME#/g, componentName)
    .replace(/#PATH#/g, srcFile.replace('.vue', ''));
  console.log(chalk.blue(`Creating ${testFilePath}`));
  fs.writeFileSync(testFilePath, content);
}

function createJSTest(file) {
  const srcFile = file.replace(/src\//, '');
  const testFilePath = path.resolve(
    __dirname, '../test/unit/specs',
    srcFile.replace(/\.js$/, '.spec.js')
  );
  if (fs.existsSync(testFilePath)) {
    return;
  }

  // create the test folder
  createTestFolder(testFilePath);

  // create the test file
  const componentName = path.basename(file).replace('.js', '');
  const content = samples.js
    .replace(/#NAME#/g, componentName)
    .replace(/#PATH#/g, srcFile.replace('.js', ''));
  console.log(chalk.blue(`Creating ${testFilePath}`));
  fs.writeFileSync(testFilePath, content);
}

function createTests() {
  globby(['src/**/*.vue', 'src/**/*.js']).then((paths) => {
    paths.forEach((file) => {
      const basename = path.basename(file);
      if (blacklist.indexOf(basename) > -1) {
        return;
      }
      if (/\.vue$/.test(file)) {
        createVueTest(file);
      } else {
        createJSTest(file);
      }
    });
  }).catch((error) => {
    console.log(chalk.bold.red(`
      Error creating tests
      ${error}
    `));
  });
}

function removeTests() {
  return new Promise(((resolve, reject) => {
    globby(['test/unit/specs/**/*.spec.js']).then((paths) => {
      paths.forEach((file) => {
        const srcFile = file.replace('test/unit/specs/', 'src/');
        const vueFile = srcFile.replace('.spec.js', '.vue');
        const jsFile = srcFile.replace('.spec.js', '.js');
        const vueFileExists = fs.existsSync(vueFile);
        const jsFileExists = fs.existsSync(jsFile);
        if (vueFileExists || jsFileExists) {
          return;
        }
        console.log(chalk.red(`Removing ${path.basename(file)}`));
        fs.unlinkSync(file);
      });
      resolve();
    }).catch((error) => {
      console.log(chalk.bold.red(`
        Error removing tests
        ${error}
      `));
      reject();
    });
  }));
}

removeTests().then(createTests);
