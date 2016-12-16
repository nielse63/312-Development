
// modules
const argv = require('minimist')(process.argv.slice(2))
const gulp = require('gulp')
const gulpif = require('gulp-if')
const del = require('del')
const fs = require('fs')
const path = require('path')
const writeFile = require('./utils').writeFile
const gutil = require('gulp-util')

// global vars
const publicDir = path.resolve(__dirname, '../public/')
const input = path.resolve(__dirname, '../views/index.html')
const output = path.resolve(publicDir, 'index.html')
let attempts = 0

// functions
function getFile() {
  fs.readFile(output, (err, data) => {
    if (err) {
      if (attempts < 5) {
        attempts++
        setTimeout(getFile, 500)
        return
      }
      console.log('File not found')
      return
    }

    const file = new gutil.File({
      cwd: __dirname,
      base: publicDir,
      path: output,
      contents: data,
    })
    let fileContent = file.contents.toString()
    const string = fileContent.replace(/\s/g, '')
    const found = string.match(new RegExp('<!--bower:js-->(.*?)<!--endbower-->'))
    if (!found || !found.length || !found[1]) {
      return
    }
    const content = found[1]
    const sources = content.match(new RegExp('"(.*?)"', 'g'))
    if (!sources || !sources.length) {
      return
    }
    sources.forEach(src => {
      src = src.replace(/"/g, '')
      const bowerInput = path.resolve(__dirname, src)
      const basename = path.basename(bowerInput)
      const distOutput = path.resolve(publicDir, 'dist')
      gulp.src(bowerInput).pipe(gulp.dest(distOutput))
      fileContent = fileContent.replace(new RegExp(src, 'g'), `/dist/${basename}`)
    })
    fileContent = fileContent
			.replace(/^\s+<!-- (.*?) -->\n/gm, '')
    writeFile(output, fileContent)
  })
}

// task
gulp.task('views', () => {
  del([
    'public/index.html',
  ]).then(paths => {
    gulp.src(input)
			.pipe(gulp.dest(publicDir))

    return gulp.src('public/index.html')
			.pipe(gulpif(
				!argv.production,
				getFile(),
			))
  })
})
