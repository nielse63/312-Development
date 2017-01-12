
// modules
const path = require('path')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')

// global vars
const src = path.join(__dirname, '..', 'src/assets/images/*')
const dest = path.join(__dirname, '..', 'build/assets/images')

// task
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
}).catch(err => {
  throw new Error(err)
})
