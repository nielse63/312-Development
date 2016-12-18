
// modules
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')

// global vars
const inPath = ['./src/assets/images/*', './src/assets/icons/*']
const outPath = ['./build/assets/images', './build/assets/icons']

// task
inPath.forEach((dir, i) => {
  // console.log(dir)
  // console.log(outPath[i])
  imagemin([dir], outPath[i], {
    plugins: [
      imageminMozjpeg({quality: 85}),
      imageminOptipng(),
      imageminSvgo()
    ]
  }).then(files => {
    console.log(files);
  })
});
