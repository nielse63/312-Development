
const path = require('path')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')

module.exports = function images(callback) {
  const src = path.join(__dirname, '..', 'src/assets/images/*')
  const dest = path.join(__dirname, '..', 'build/assets/images')

  imagemin([src], dest, {
    plugins: [
      imageminMozjpeg(),
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
  }).then(() => {
    callback()
  }).catch(err => {
    throw err
  })
}
