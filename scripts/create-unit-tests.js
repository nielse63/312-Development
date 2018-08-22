const cp = require('child_process');
const path = require('path');
const fs = require('fs');

function exec(cmd) {
  return cp.execSync(cmd).toString().trim();
}

const UNIT_TEST_TEMPLATE = fs.readFileSync(
  path.join(__dirname, 'templates/Component.test.js'),
  'utf8',
);
const APP_DIR = path.resolve(__dirname, '../');
const COMPONENTS_DIR = path.resolve(APP_DIR, 'src/components/');
const UNIT_TESTS_SPECS_DIR = path.resolve(APP_DIR, 'test/unit/specs/');

const output = exec(`find ${COMPONENTS_DIR} -iname "*.vue"`);
const files = output.split('\n');
files.forEach((file) => {
  const relPath = file.replace(`${APP_DIR}/src/`, '');
  const testPath = path.join(UNIT_TESTS_SPECS_DIR, relPath).replace(/\.vue$/, '.test.js');
  if (fs.existsSync(testPath)) {
    return;
  }
  const dirPath = path.dirname(testPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  const componentName = path.basename(file, '.vue');
  const componentSpec = UNIT_TEST_TEMPLATE.replace(/COMPONENT_NAME/g, componentName);
  console.log(`Writing spec file: ${testPath}`);
  fs.writeFileSync(testPath, componentSpec, 'utf8');
});
