const fs = require('fs');
const path = require('path');

const staticFilePath = path.resolve(__dirname, '../static/404.html');
const content = fs.readFileSync(staticFilePath, 'utf8');
const distFiles = fs.readdirSync(path.resolve(__dirname, '../dist'));
const cssFiles = distFiles.filter(file => file.startsWith('app.') && file.endsWith('.css'));
const jsFiles = distFiles
  .filter(file => (file.startsWith('error.') || file.startsWith('manifest.')) && file.endsWith('.js'))
  .reverse();
console.log({ cssFiles, jsFiles });
const cssString = cssFiles.map(file => `<link rel="stylesheet" href="/${file}">`).join('');
const jsString = jsFiles.map(file => `<script src="/${file}"></script>`).join('');
const newContent = content
  .replace('<%= cssFiles %>', cssString)
  .replace('<%= jsFiles %>', jsString);
fs.writeFileSync(path.resolve(__dirname, '../dist/404.html'), newContent, 'utf8');
