
// modules
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const del = require('del')
const writeFile = require('./utils').writeFile

// global vars
const outputFile = 'test/results/eslint.txt'

// task
gulp.task('eslint', () => {
  String.prototype.ctrim = String.prototype.ctrim || function (what) {
    what = what || /^\s+|\s+$/g
    return this.replace(new RegExp(what), '')
  }

  del.sync([outputFile])

  return gulp.src([
    './app-client.js',
    './app-server.js',
    './app.js',
    'actions/**/*.js',
    'components/**/*.js',
    'dispatcher/**/*.js',
    'stores/scripts/**/*.js',
    'assets/scripts/**/*.js',
    '!./public',
    '!assets/scripts/vendor/*.js',
    '!node_modules',
    '!bower_components',
  ])
	.pipe(eslint({
  fix: true,
}))
	.pipe(eslint.result(result => {
  if (!result.errorCount) {
    return
  }

  const basename = result.filePath
			.replace(path.resolve(__dirname, '../'), '')
			.replace(/\/_/, '/')
  const content = [[
    '\n',
    basename,
    '=============================',
    '\n',
  ].join('\r')]

  result.messages.forEach((message, i) => {
    if (message.severity < 2) {
      return
    }
    content.push([
      `Location: ${message.line}:${message.column}`,
      `Offender: ${message.source.trim()}`,
      `Error:    ${message.message}`,
      `Rule:     ${message.ruleId}`,
    ].join('\r'))
  })

  const outputContent = `${content
			.join('\n=======\n')
			.ctrim('\n=======')}\n=======\n\n`

  writeFile(outputFile, outputContent, err => {
    if (err) console.log(err)
  }, true)
}))
	.pipe(eslint.failAfterError())
})
