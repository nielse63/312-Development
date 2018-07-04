/* eslint-disable unicorn/no-process-exit */
const sharp = require('sharp');
const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');

const images = process.argv.slice(2);
if (!images.length) {
  process.exit();
}

images.forEach((imagepath) => {
  const dimensions = sizeOf(imagepath);
  if (dimensions.height <= 500) {
    return;
  }
  const basename = path.basename(imagepath);
  const newpath = path.resolve(__dirname, '../src/assets/images/', `new-${basename}`);
  sharp(imagepath)
    .resize(null, 500)
    .max()
    .toFile(newpath, (err) => {
      if (err) {
        console.error({ basename, err });
      } else {
        fs.renameSync(newpath, imagepath);
      }
    });
});
