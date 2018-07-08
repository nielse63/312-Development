const fs = require('fs');
const remark = require('remark');
const guide = require('remark-preset-lint-markdown-style-guide');


const files = process.argv.slice(2);
if (!files.length) {
  process.exit();
}
files.forEach((filepath) => {
  const content = fs.readFileSync(filepath, 'utf8');
  remark()
    .use(guide)
    .process(content, (err, file) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      fs.writeFileSync(filepath, file.contents, 'utf8');
    });
});
