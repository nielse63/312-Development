
// modules
const path =  require('path')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')

// global vars
const paths = [
  path.join(__dirname, '..', 'build/assets/images'),
  path.join(__dirname, '..', 'build/assets/icons'),
]

// task
paths.forEach((dir) => {
  console.log(dir, dir)
  imagemin([dir], dir, {
    plugins: [
      imageminMozjpeg({
        quality: 85
      }),
      imageminOptipng(),
      imageminSvgo(),
    ],
  }).catch(err => {
    throw new Error(err)
  });
})
