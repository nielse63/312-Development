
const fs = require('fs')
const path = require('path')
const critical = require('critical')

const distdir = path.resolve(__dirname, '../build')

function extractCSS(stylepath, callback) {
  const homepath = path.join(distdir, 'home.html')
  fs.readFile(homepath, 'utf8', (err, html) => {
    if (err) {
      throw err
    }

    critical.generate({
      inline: true,
      base: distdir,
      html,
      src: homepath,
      css: [stylepath],
      width: 1300,
      dest: homepath,
      minify: true,
      extract: false,
      ignore: ['@font-face'],
    }).then(() => {
      callback()
    }).error(error => {
      throw error
    })
  })
}

module.exports = function css(callback) {
  const files = fs.readdirSync(distdir).filter(file => /\.css$/.test(file))
  files.forEach(file => {
    const stylepath = path.join(distdir, file)
    extractCSS(stylepath, callback)
  })
}
