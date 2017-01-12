
const path = require('path')
const Fontmin = require('fontmin')

module.exports = function font(callback) {
  const src = path.join(__dirname, '..', 'src/assets/fonts/*')
  const dest = path.join(__dirname, '..', 'build/assets/fonts')

  const fontmin = new Fontmin()
      .src(src)
      .dest(dest)

  fontmin.run((err, files) => {
    if (err) {
      throw err
    }
    callback()
  })
}
