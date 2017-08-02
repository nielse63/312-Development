
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');
const chalk = require('chalk');

const SVGO_CONFIG = {
  multipass: false,
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: false },
    { cleanUpEnableBackground: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { cleanupNumericValues: true },
    { moveElemsAttrsToGroup: true },
    { moveGroupAttrsToElems: true },
    { collapseGroups: true },
    { removeRasterImages: false },
    { mergePaths: false },
    { convertShapeToPath: true },
    { sortAttrs: true },
    { transformsWithOnePath: true },
    { removeDimensions: true },
    { removeStyleElement: true },
    { removeScriptElement: true },
  ],
};
const svgo = new SVGO(SVGO_CONFIG);

const base = path.resolve(__dirname, '../');
const optimizedFolder = path.join(base, 'src/assets/images/clean');
const svgFolder = path.resolve(optimizedFolder, '../dirty');
if (!fs.existsSync(optimizedFolder)) {
  console.log(chalk.blue('Creating clean svg folder'));
  fs.mkdirSync(optimizedFolder);
}

globby(`${svgFolder}/*.svg`).then((paths) => {
  paths.forEach((file) => {
    const basename = path.basename(file);
    const outputFile = path.join(optimizedFolder, basename);
    if (fs.existsSync(outputFile)) {
      return;
    }
    console.log(chalk.blue(`Optimizing ${basename}`));
    const content = fs.readFileSync(file, 'utf8');
    svgo.optimize(content, (results) => {
      if (results.data) {
        const output = results.data.split(/></).join('>\n<');
        fs.writeFileSync(outputFile, output);
        console.log(chalk.blue(`Wrote ${outputFile}`));
      }
    });
  });
});
