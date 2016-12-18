
const Fontmin = require('fontmin')

const fontmin = new Fontmin()
    .src('src/assets/fonts/*')
    .dest('build/assets/fonts')

fontmin.run((err, files) => {
  if (err) {
    throw err
  }
})
