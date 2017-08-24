
const globby = require('globby');
const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '../');
const optimizedFolder = path.join(base, 'src/assets/images/clean');

globby(`${optimizedFolder}/*.svg`).then((paths) => {
  paths.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const jsContent = `module.exports = \`${content}\`;`;
    const newFileName = file.replace(/\.svg$/, '.js');
    fs.writeFileSync(newFileName, jsContent);
    fs.unlinkSync(file);
  });
});
