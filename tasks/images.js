
// modules
const path = require('path')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')

// global vars
const paths = [
  path.join(__dirname, '..', 'build/assets/images'),
  path.join(__dirname, '..', 'build/assets/icons'),
]

// task
paths.forEach(dir => {
  imagemin([dir], dir, {
    plugins: [
      imageminMozjpeg({
        targa: true,
      }),
      imageminPngquant({
        quality: '65-80',
      }),
      imageminSvgo({
        plugins: [{
          removeTitle: true,
          removeDesc: true,
          removeXMLNS: true,
        }],
      }),
    ],
  }).catch(err => {
    throw new Error(err)
  })
})
