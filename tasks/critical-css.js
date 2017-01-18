
const fs = require('fs')
const path = require('path')
const critical = require('critical')

module.exports = function css(callback) {
  const distdir = path.resolve(__dirname, '../build')
  const stylepath = path.join(distdir, 'style.css')
  const filepath = path.join(distdir, 'home.html')

  fs.readFile(filepath, 'utf8', (err, html) => {
    if (err) {
      throw err
    }

    critical.generate({
      inline: true,
      base: distdir,
      html,
      src: filepath,
      css: [stylepath],
      width: 1300,
      dest: filepath,
      minify: true,
      extract: false,
      ignore: ['@font-face'],
    }).then(() => {
      callback()
    }).catch(error => {
      throw error
    })
  })
}
