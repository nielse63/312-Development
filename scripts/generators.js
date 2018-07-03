
const path = require('path');
const fs = require('fs');
const Case = require('case');
const ejs = require('ejs');

function outputPath(type, filename) {
  const kebabName = Case.kebab(filename);
  const className = Case.pascal(filename);
  switch (type) {
    case 'component':
      return path.resolve(__dirname, '../src/components', `${className}.vue`);
    case 'view':
      return path.resolve(__dirname, '../src/views', `${className}.vue`);
    case 'docs':
      return path.resolve(__dirname, '../docs', `${kebabName}.md`);
    default:
      return path.resolve(__dirname, '..', `${kebabName}.js`);
  }
}

function templatePath(type) {
  switch (type) {
    case 'vue':
    case 'component':
      return path.resolve(__dirname, '../blueprints/component.vue');
    case 'docs':
      return path.resolve(__dirname, '../blueprints/docs.md');
    default:
      return path.resolve(__dirname, '../blueprints/basic.js');
  }
}

function generator(type, name) {
  const kebabName = Case.kebab(name);
  const className = Case.pascal(name);

  return {
    type,
    name,
    data: {
      kebab:  kebabName,
      pascal: className,
    },
    paths: {
      output:   outputPath(type, name),
      template: templatePath(type),
    },
  };
}

const generatorObject = generator(process.argv[2], process.argv[3]);
ejs.renderFile(generatorObject.paths.template, { data: generatorObject.data }, (err, str) => {
  if (err) {
    throw err;
  }
  fs.writeFileSync(generatorObject.paths.output, str, 'utf8');
  console.log(`Generated ${generatorObject.paths.output}`);
});
