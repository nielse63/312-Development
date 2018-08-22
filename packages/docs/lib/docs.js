const path = require('path');
const fs = require('fs');
const globby = require('globby');
const Handlebars = require('handlebars');
const Case = require('case');
const mkdirp = require('mkdirp');

const CONTENT_DIR = path.resolve(__dirname, '../content');
// const APP_DIR = path.resolve(__dirname, '../../../');

function getDateMonth(int) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[int];
}

module.exports = async () => {
  const files = await globby(`${CONTENT_DIR}/**/*.js`);
  files.forEach((file) => {
    const content = require(file); // eslint-disable-line import/no-dynamic-require, global-require
    const basename = path.basename(file, '.js');
    content.title = content.title || Case.capital(basename);
    const templateFilePath = path.resolve(__dirname, '../templates', `${(content.template || 'default')}.hbs`);
    // console.log({ content, templateFilePath });
    if (fs.existsSync(templateFilePath)) {
      // load template content and compile template
      const templateContent = fs.readFileSync(templateFilePath, 'utf8');
      const template = Handlebars.compile(templateContent);
      const outputMarkdown = template(content)
        .replace(/\n\n\n/g, '\n');
      const outputBasename = path.basename(file)
        .replace(/\.js$/i, '.md')
        .replace(/README/i, 'README');
      const outputFileName = file
        .replace(/\/packages\/docs\/content/, '')
        .replace(path.basename(file), outputBasename);
      const outputDirName = path.dirname(outputFileName);
      if (!fs.existsSync(outputDirName)) {
        mkdirp.sync(outputDirName);
      }
      // console.log({ outputDirName, exists: fs.existsSync(outputDirName) });
      const stat = fs.statSync(file);
      const date = new Date(stat.mtime);
      const dateYear = date.getFullYear();
      const dateMonth = getDateMonth(date.getMonth());
      const dateDate = date.getDate();
      const modDate = `${dateMonth} ${dateDate}, ${dateYear}`;
      console.log(`Writing ${outputFileName}`);
      const md = [
        outputMarkdown.trim(),
        '',
        '---',
        '',
        `*Last Updated ${modDate}*`,
      ].join('\n');
      fs.writeFileSync(outputFileName, md, 'utf8');
    }
  });
};
